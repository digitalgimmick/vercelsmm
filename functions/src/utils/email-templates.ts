import { formatPrice } from './utils';

export const emailTemplates = {
  orderConfirmation: (data: { orderId: string; packageName: string }) => ({
    subject: `Order Confirmation #${data.orderId}`,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .button { 
            display: inline-block;
            padding: 10px 20px;
            background: #ef4444;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Order Confirmation</h2>
          </div>
          <div class="content">
            <p>Thank you for your order!</p>
            <h3>Order Details:</h3>
            <ul>
              <li>Order ID: ${data.orderId}</li>
              <li>Package: ${data.packageName}</li>
            </ul>
            <p>We'll start processing your order shortly.</p>
            <p>
              <a href="https://hypedx.net/dashboard" class="button">
                View Order Status
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `}),

  orderStatusUpdate: (data: { orderId: string; status: string }) => ({
    subject: `Order Status Update #${data.orderId}`,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .status { 
            display: inline-block;
            padding: 5px 10px;
            background: #22c55e;
            color: white;
            border-radius: 3px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Order Status Update</h2>
          </div>
          <div class="content">
            <p>Your order #${data.orderId} has been updated.</p>
            <p>Current Status: <span class="status">${data.status}</span></p>
            <p>You can check the detailed progress in your dashboard.</p>
          </div>
        </div>
      </body>
    </html>
  `}),

  paymentConfirmation: (data: { orderId: string; amount: number }) => ({
    subject: `Payment Confirmation #${data.orderId}`,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .amount { font-size: 24px; color: #16a34a; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Payment Confirmation</h2>
          </div>
          <div class="content">
            <p>We've received your payment!</p>
            <p>Amount: <span class="amount">${formatPrice(data.amount)}</span></p>
            <p>Order ID: ${data.orderId}</p>
            <p>Thank you for your business!</p>
          </div>
        </div>
      </body>
    </html>
  `})
};
