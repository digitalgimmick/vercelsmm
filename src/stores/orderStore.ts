import { create } from 'zustand';
import { collection, addDoc, query, where, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getVideoStats } from '@/lib/youtube';
import type { Order, OrderStatus } from '@/types/order';
import { usePackageStore } from './packageStore';

interface OrderStore {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  loadOrders: (userId: string) => Promise<void>;
  createOrder: (data: {
    userId: string;
    email: string;
    videoUrl: string;
    packageId: string;
    videoStats?: {
      initialViews: number;
      currentViews: number;
      lastUpdated: string;
    };
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updateOrderStats: (orderId: string, currentViews: number) => Promise<void>;
  getOrdersByUserId: (userId: string) => Promise<Order[]>;
  getTotalRevenue: () => number;
  getRecentOrders: (limit?: number) => Order[];
  getOrderStats: () => {
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
  };
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  loadOrders: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];

      set({ orders, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load orders',
        isLoading: false 
      });
    }
  },

  createOrder: async (data) => {
    const pkg = usePackageStore.getState().getPackageById(data.packageId);
    if (!pkg) throw new Error('Package not found');

    // Get initial video stats with error handling
    try {
      const stats = await getVideoStats(data.videoUrl);
      const videoStats = {
        initialViews: stats.viewCount,
        currentViews: stats.viewCount,
        lastUpdated: new Date().toISOString()
      };

      const order: Omit<Order, 'id'> = {
        userId: data.userId,
        email: data.email,
        packageId: data.packageId,
        package: pkg,
        videoUrl: data.videoUrl,
        videoStats,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      const newOrder = { id: docRef.id, ...order };

      set(state => ({
        orders: [newOrder, ...state.orders]
      }));

      return newOrder;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    // If status is being set to completed, fetch final view count
    if (status === 'completed') {
      try {
        const order = get().orders.find(o => o.id === orderId);
        if (order) {
          const stats = await getVideoStats(order.videoUrl);
          await updateDoc(doc(db, 'orders', orderId), {
            status,
            'videoStats.currentViews': stats.viewCount,
            'videoStats.lastUpdated': new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });

          set(state => ({
            orders: state.orders.map(o =>
              o.id === orderId
                ? {
                    ...o,
                    status,
                    videoStats: {
                      ...o.videoStats,
                      currentViews: stats.viewCount,
                      lastUpdated: new Date().toISOString()
                    },
                    updatedAt: new Date().toISOString()
                  }
                : o
            )
          }));
          return;
        }
      } catch (error) {
        console.error('Failed to fetch final view count:', error);
      }
    }

    // Default update if not completed or if view count fetch fails
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString()
    });

    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    }));
  },

  updateOrderStats: async (orderId: string, currentViews: number) => {
    await updateDoc(doc(db, 'orders', orderId), {
      'videoStats.currentViews': currentViews,
      'videoStats.lastUpdated': new Date().toISOString()
    });

    set(state => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? {
              ...order,
              videoStats: {
                ...order.videoStats,
                currentViews,
                lastUpdated: new Date().toISOString()
              }
            }
          : order
      )
    }));
  },
  getOrdersByUserId: async (userId: string) => {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  },

  getTotalRevenue: () => {
    return get().orders.reduce((sum, order) => {
      return order.status === 'completed' ? sum + order.package.price : sum;
    }, 0);
  },

  getRecentOrders: (limit = 10) => {
    return [...get().orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  },

  getOrderStats: () => {
    const orders = get().orders;
    return {
      total: orders.length,
      completed: orders.filter(o => o.status === 'completed').length,
      pending: orders.filter(o => o.status === 'pending').length,
      inProgress: orders.filter(o => o.status === 'in_progress').length
    };
  }
}));
