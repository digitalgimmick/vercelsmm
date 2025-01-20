import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
import { getVideoStats } from './utils/youtube';
import serviceAccount from './service-account.json';

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

// Create transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'hello@hypedx.net',
    pass: 'lkbiahhqddbkdkri'
  }
});

// Cloud Function to process emails from mail collection
export const processEmailQueue = functions.firestore
  .document('mail/{emailId}')
  .onCreate(async (snap, context) => {
    const emailData = snap.data();
    const { to, message: { subject, html } } = emailData;

    if (!Array.isArray(to) || !subject || !html) {
      throw new Error('Invalid email data structure');
    }

    try {
      // Send the email
      const mailOptions = {
        from: {
          name: 'HypedX',
          address: 'hello@hypedx.net'
        },
        to: to,
        subject: subject,
        html: html
      };

      const result = await transporter.sendMail(mailOptions);

      // Update document status
      await snap.ref.update({
        status: 'sent',
        messageId: result.messageId,
        sentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Email sent successfully to ${to.join(', ')}`);
    } catch (error) {
      console.error('Failed to send email:', error.message);
      
      // Update document with error
      await snap.ref.update({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      throw error;
    }
  });

// Cloud Function to update video stats for in-progress orders
export const updateVideoStats = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    const db = admin.firestore();
    const ordersRef = db.collection('orders');
    
    try {
      // Get all in-progress orders
      const snapshot = await ordersRef
        .where('status', '==', 'in_progress')
        .get();

      const batch = db.batch();
      const updates = [];

      for (const doc of snapshot.docs) {
        const order = doc.data();
        
        try {
          const stats = await getVideoStats(order.videoUrl);
          
          // Check if target views reached
          const targetViews = (order.videoStats?.initialViews || 0) + order.package.viewCount;
          const isCompleted = stats.viewCount >= targetViews;

          updates.push({
            ref: doc.ref,
            stats,
            isCompleted
          });
        } catch (error) {
          console.error(`Failed to get stats for order ${doc.id}:`, error);
        }
      }

      // Apply all updates in a batch
      for (const update of updates) {
        batch.update(update.ref, {
          'videoStats.currentViews': update.stats.viewCount,
          'videoStats.lastUpdated': admin.firestore.FieldValue.serverTimestamp(),
          ...(update.isCompleted && { status: 'completed' })
        });
      }

      await batch.commit();
      console.log(`Successfully updated ${updates.length} orders`);
    } catch (error) {
      console.error('Failed to update video stats:', error);
      throw error;
    }
  });
