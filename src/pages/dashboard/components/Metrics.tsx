import { Card } from '@/components/ui/card';
import { ShoppingCart, DollarSign, Package2, Wallet, Search, ExternalLink } from 'lucide-react';
import { Pagination } from '@/components/ui/pagination';
import { formatPrice, formatDate } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useEffect } from 'react';
import { useOrderStore } from '@/stores/orderStore'; 
import { useWalletStore } from '@/stores/walletStore'; 
import { useAuthStore } from '@/stores/authStore'; 

export default function Metrics() { 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [pageSize, setPageSize] = useState(20); 
  const { user } = useAuthStore(); 
  const { orders, loadOrders } = useOrderStore(); 
  const { balance, loadWallet } = useWalletStore();

  useEffect(() => {
    if (user) {
      loadOrders(user.id);
      loadWallet(user.id);
    }
  }, [user, loadOrders, loadWallet]);

  // Calculate metrics
  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status === 'in_progress').length,
    totalSpent: orders.reduce((sum, order) => sum + order.package.price, 0)
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.videoUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={ShoppingCart}
          label="Total Orders"
          value={stats.totalOrders.toString()}
          color="blue"
        />
        <MetricCard
          icon={DollarSign}
          label="Total Spent"
          value={formatPrice(stats.totalSpent)}
          color="green"
        />
        <MetricCard
          icon={Package2}
          label="Active Orders"
          value={stats.activeOrders.toString()}
          color="orange"
        />
        <MetricCard
          icon={Wallet}
          label="Funds Left"
          value={formatPrice(balance)}
          color="red"
        />
      </div>

      {/* Orders Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Order Info</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Package</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Video</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Views</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{order.id}</span>
                        <span className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{order.package.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <a 
                        href={order.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <span className="truncate max-w-[150px]">View Video</span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {order.videoStats?.currentViews?.toLocaleString() || '0'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Target: {((order.videoStats?.initialViews || 0) + order.package.viewCount).toLocaleString()}
                        </div>
                        {order.videoStats?.initialViews !== order.videoStats?.currentViews && (
                          <div className="text-xs text-green-600 mt-0.5">
                            +{((order.videoStats?.currentViews || 0) - (order.videoStats?.initialViews || 0)).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {formatPrice(order.package.price)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${order.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'in_progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 border-t border-gray-200">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredOrders.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'orange' | 'red';
}

function MetricCard({ icon: Icon, label, value, color }: MetricCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
      </div>
    </Card>
  );
}
