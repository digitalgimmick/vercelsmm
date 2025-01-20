import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
initializeApp();
const db = getFirestore();

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export class EmailService {
  private static instance: EmailService;

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendEmail({ to, subject, template, data }: EmailOptions): Promise<void> {
    try {
      // Add email to Firestore collection that triggers the email sending
      await db.collection('mail').add({
        to,
        subject,
        template,
        data,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  // Email Templates
  async sendOrderConfirmation(email: string, orderId: string, packageName: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: `Order Confirmation #${orderId}`,
      template: 'order-confirmation',
      data: {
        orderId,
        packageName,
        dashboardUrl: `${process.env.SITE_URL}/dashboard`
      }
    });
  }

  async sendOrderStatusUpdate(email: string, orderId: string, status: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: `Order Status Update #${orderId}`,
      template: 'order-status',
      data: {
        orderId,
        status,
        dashboardUrl: `${process.env.SITE_URL}/dashboard`
      }
    });
  }

  async sendPaymentConfirmation(email: string, orderId: string, amount: number): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: `Payment Confirmation #${orderId}`,
      template: 'payment-confirmation',
      data: {
        orderId,
        amount: amount.toFixed(2),
        dashboardUrl: `${process.env.SITE_URL}/dashboard`
      }
    });
  }
}
