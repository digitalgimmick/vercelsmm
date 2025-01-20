import { useState } from 'react';
import { usePayoneerStore } from '@/stores/payoneerStore';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PayoneerRequestsTableProps {
  searchQuery: string;
  statusFilter: string | null;
}

const statusConfig = {
  pending: {
    icon: Clock,
    className: 'bg-yellow-50 text-yellow-700 border-yellow-100'
  },
  approved: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-700 border-green-100'
  },
  declined: {
    icon: XCircle,
    className: 'bg-red-50 text-red-700 border-red-100'
  }
};

export default function PayoneerRequestsTable({ 
  searchQuery, 
  statusFilter 
}: PayoneerRequestsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { requests, approveRequest, declineRequest } = usePayoneerStore();
  const { toast } = useToast();

  const filteredRequests = requests.filter(request => {
    const matchesSearch = (
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = !statusFilter || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleApprove = async (requestId: string) => {
    try {
      await approveRequest(requestId);
      toast({
        title: "Request Approved",
        description: "The payment request has been approved and funds added to user's wallet.",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineRequest(requestId);
      toast({
        title: "Request Declined",
        description: "The payment request has been declined.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decline request. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Request Info</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {paginatedRequests.map((request) => {
            const StatusIcon = statusConfig[request.status].icon;
            return (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{request.id}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{request.email}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-mono text-gray-600">
                    {request.transactionId}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(request.amount)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center">
                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${statusConfig[request.status].className}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{request.status.toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-gray-500">
                    {formatDate(request.createdAt)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-2">
                    {request.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDecline(request.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="px-4 border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredRequests.length}
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
