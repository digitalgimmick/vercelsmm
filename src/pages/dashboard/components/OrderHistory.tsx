import { useState } from 'react';
import { formatPrice, formatDate } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ExternalLink, Eye } from 'lucide-react';

// Mock data - replace with real data later
const orders = [
  {
    id: 'ORD-001',
    packageName: '5000 Views',
    videoUrl: 'https://youtube.com/watch?v=abc123',
    amount: 34.99,
    status: 'completed',
    date: '2024-03-15T10:30:00Z'
  },
  {
    id: 'ORD-002',
    packageName: '10000 Views',
    videoUrl: 'https://youtube.com/watch?v=def456',
    amount: 59.99,
    status: 'in_progress',
    date: '2024-03-14T15:45:00Z'
  },
  // Add more orders as needed
];

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.videoUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
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
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Package</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Video</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{order.packageName}</span>
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
                    <span className="text-sm font-medium text-gray-900">
                      {formatPrice(order.amount)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(order.date)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
