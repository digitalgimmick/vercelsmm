import { useState } from 'react';
import { useOrderStore } from '@/stores/orderStore';
import { useToast } from '@/components/ui/use-toast';
import { Pagination } from '@/components/ui/pagination';
import { formatPrice, formatDate } from '@/lib/utils';
import { ExternalLink, Clock, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrdersTableProps {
  searchQuery: string;
  statusFilter: string | null;
}

const statusConfig = {
  pending: {
    icon: Clock,
    className: 'bg-yellow-50 text-yellow-700 border-yellow-100'
  },
  in_progress: {
    icon: AlertCircle,
    className: 'bg-blue-50 text-blue-700 border-blue-100'
  },
  completed: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-700 border-green-100'
  }
};

export default function OrdersTable({ searchQuery, statusFilter }: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { orders, updateOrderStatus } = useOrderStore();
  const { toast } = useToast();
  
  const handleStatusChange = async (orderId: string, status: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Show appropriate toast based on status
    if (status === 'in_progress') {
      toast({
        title: "Order Started",
        description: "Views will start delivering shortly",
        variant: "info"
      });
    } else if (status === 'completed') {
      toast({
        title: "Order Completed",
        description: "All views have been delivered successfully",
        variant: "success"
      });
    }

    await updateOrderStatus(orderId, status as any);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.videoUrl.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-6 rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{order.id}</span>
                        <span className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</span>
                        {order.transactionId && (
                          <div className="flex items-center gap-1 mt-1">
                            <CreditCard className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-500 font-mono truncate">
                              {order.transactionId}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col max-w-[200px]">
                        <span className="text-sm text-gray-900">{order.email}</span>
                        <div className="flex items-center gap-1 mt-1">
                          <a 
                            href={order.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            {getYouTubeVideoId(order.videoUrl)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                        {order.transactionId && (
                          <div className="flex items-center gap-1 mt-1">
                            <CreditCard className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-500 font-mono truncate">
                              {order.transactionId}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-900">
                          {order.package.viewCount.toLocaleString()} Views • {formatPrice(order.package.price)}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {order.package.category === 'premium' ? 'Premium' : 'Regular'} • {order.package.region ? order.package.region.toUpperCase() : 'Worldwide'}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-xs text-gray-500">Current: {order.videoStats?.currentViews?.toLocaleString() || '0'}</div>
                        <div className="text-xs text-gray-500">Target: {((order.videoStats?.initialViews || 0) + order.package.viewCount).toLocaleString()}</div>
                        {order.videoStats?.currentViews > order.videoStats?.initialViews && (
                          <div className="text-xs text-green-600 mt-0.5">
                            +{(order.videoStats.currentViews - order.videoStats.initialViews).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex justify-center">
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as any)}
                        >
                          <SelectTrigger 
                            className={`h-9 w-[160px] px-3 ${
                              order.status === 'completed'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : order.status === 'in_progress'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }`}
                          >
                            <SelectValue>
                              <div className="flex items-center gap-2 px-1">
                                <StatusIcon className="h-3 w-3" />
                                <span>{order.status.replace('_', ' ').toUpperCase()}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="min-w-[160px] p-1">
                            <SelectItem value="pending">
                              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-yellow-50">
                                <Clock className="h-4 w-4 text-yellow-500" />
                                <span>PENDING</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="in_progress">
                              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-blue-50">
                                <AlertCircle className="h-4 w-4 text-blue-500" />
                                <span>IN PROGRESS</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="completed">
                              <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>COMPLETED</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
  );
}

// Helper function to extract video ID from YouTube URL
function getYouTubeVideoId(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v') || 'Invalid ID';
    } else if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1) || 'Invalid ID';
    }
    return 'Invalid URL';
  } catch {
    return 'Invalid URL';
  }
}
