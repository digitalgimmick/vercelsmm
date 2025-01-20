import { create } from 'zustand';
import { useOrderStore } from './orderStore';
import { addDays, eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, subWeeks, format } from 'date-fns';

interface MetricsStore {
  getMetrics: () => {
    revenueToday: number;
    revenueThisMonth: number;
    revenueAllTime: number;
    revenueChange: number;
    orders: number;
    ordersChange: number;
    completedOrders: number;
    pendingOrders: number;
  };
  getRevenueData: (days: number) => {
    labels: string[];
    values: number[];
  };
  getOrdersData: (days: number) => {
    labels: string[];
    values: number[];
  };
  getTopPackages: () => Array<{
    id: string;
    name: string;
    orders: number;
    revenue: number;
    percentageOfTotal: number;
  }>;
}

export const useMetricsStore = create<MetricsStore>(() => ({
  getMetrics: () => {
    const orderStore = useOrderStore.getState();
    const orders = orderStore.orders;
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));

    const todayOrders = orders.filter(order => 
      new Date(order.createdAt) >= startOfToday
    );

    const thisMonthOrders = orders.filter(order => 
      new Date(order.createdAt).getMonth() === today.getMonth()
    );

    const lastMonthOrders = orders.filter(order => 
      new Date(order.createdAt).getMonth() === today.getMonth() - 1
    );

    const revenueToday = todayOrders.reduce((sum, order) => 
      sum + order.package.price, 0
    );

    const revenueThisMonth = thisMonthOrders.reduce((sum, order) => 
      sum + order.package.price, 0
    );

    const revenueLastMonth = lastMonthOrders.reduce((sum, order) => 
      sum + order.package.price, 0
    );

    const revenueChange = revenueLastMonth === 0 ? 0 :
      ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;

    const stats = orderStore.getOrderStats();

    return {
      revenueToday,
      revenueThisMonth,
      revenueAllTime: orderStore.getTotalRevenue(),
      revenueChange,
      orders: stats.total,
      ordersChange: lastMonthOrders.length === 0 ? 0 :
        ((thisMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100,
      completedOrders: stats.completed,
      pendingOrders: stats.pending
    };
  },

  getRevenueData: (days) => {
    const orders = useOrderStore.getState().orders;
    const endDate = new Date();
    const startDate = addDays(endDate, -days);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const data = dateRange.map(date => {
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      return {
        date: format(date, 'MMM d'),
        value: orders
          .filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= dayStart && orderDate <= dayEnd;
          })
          .reduce((sum, order) => sum + order.package.price, 0)
      };
    });

    return {
      labels: data.map(d => d.date),
      values: data.map(d => d.value)
    };
  },

  getOrdersData: (days) => {
    const orders = useOrderStore.getState().orders;
    const endDate = new Date();
    const startDate = addDays(endDate, -days);
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const data = dateRange.map(date => {
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      return {
        date: format(date, 'MMM d'),
        value: orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= dayStart && orderDate <= dayEnd;
        }).length
      };
    });

    return {
      labels: data.map(d => d.date),
      values: data.map(d => d.value)
    };
  },

  getTopPackages: () => {
    const orders = useOrderStore.getState().orders;
    const packageStats = orders.reduce((acc, order) => {
      const { id, name } = order.package;
      if (!acc[id]) {
        acc[id] = {
          id,
          name,
          orders: 0,
          revenue: 0
        };
      }
      acc[id].orders++;
      acc[id].revenue += order.package.price;
      return acc;
    }, {} as Record<string, any>);

    const totalRevenue = Object.values(packageStats).reduce(
      (sum: number, pkg: any) => sum + pkg.revenue, 0
    );

    return Object.values(packageStats)
      .map((pkg: any) => ({
        ...pkg,
        percentageOfTotal: totalRevenue === 0 ? 0 :
          Number(((pkg.revenue / totalRevenue) * 100).toFixed(1))
      }))
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5);
  }
}));
