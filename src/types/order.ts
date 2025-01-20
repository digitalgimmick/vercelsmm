export type OrderStatus = 'pending' | 'in_progress' | 'completed';

export interface Order {
  id: string;
  userId: string;
  email: string;
  packageId: string;
  package: Package;
  videoUrl: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  transactionId?: string;
  videoStats?: {
    initialViews: number;
    currentViews: number;
    lastUpdated: string;
  };
}

export interface OrderFilters {
  status?: OrderStatus;
  search?: string;
}
