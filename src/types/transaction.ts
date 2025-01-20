export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed';
export type PaymentMethod = 'wallet' | 'crypto' | 'card' | 'payeer' | 'payoneer';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  paymentMethod?: PaymentMethod;
  orderId?: string;
  paymentId?: string;
  transactionId?: string;
  payoneerEmail?: string;
  isCashback?: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
