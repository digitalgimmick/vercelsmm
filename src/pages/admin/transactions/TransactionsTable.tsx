import { useState } from 'react';
import { useWalletStore } from '@/stores/walletStore';
import { usePayoneerStore } from '@/stores/payoneerStore';
import { Pagination } from '@/components/ui/pagination';
import { formatPrice, formatDate } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft, CheckCircle, XCircle, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { InfoIcon } from 'lucide-react';
import PayoneerDetailsModal from './PayoneerDetailsModal';

interface TransactionsTableProps {
  searchQuery: string;
  statusFilter: string | null;
  typeFilter: string | null;
}

const statusConfig = {
  approved: {
    icon: CheckCircle,
    className: 'bg-green-50 text-green-700 border-green-100'
  },
  pending: {
    icon: Clock,
    className: 'bg-yellow-50 text-yellow-700 border-yellow-100'
  },
  declined: {
    icon: XCircle,
    className: 'bg-red-50 text-red-700 border-red-100'
  }
};

export default function TransactionsTable({ 
  searchQuery, 
  statusFilter,
  typeFilter 
}: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [selectedPayoneerDetails, setSelectedPayoneerDetails] = useState<{
    email: string;
    transactionId: string;
  } | null>(null);
  const { transactions: walletTransactions } = useWalletStore();
  const { requests: payoneerRequests, approveRequest, declineRequest } = usePayoneerStore();
  const { toast } = useToast();

  // Convert Payoneer requests to transaction format
  const payoneerTransactions = payoneerRequests.map(request => ({
    id: request.id,
    type: 'payoneer',
    amount: request.amount,
    description: 'Payoneer payment request',
    date: request.createdAt,
    status: request.status,
    email: request.email,
    transactionId: request.transactionId
  }));

  const allTransactions = [...walletTransactions, ...payoneerTransactions];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || transaction.status === statusFilter;
    const matchesType = !typeFilter || 
      (typeFilter === 'cashback' ? transaction.isCashback : 
       typeFilter === 'payoneer' ? transaction.type === 'payoneer' :
       transaction.type === typeFilter);
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = async (id: string) => {
    try {
      await approveRequest(id);
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

  const handleDecline = async (id: string) => {
    try {
      await declineRequest(id);
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

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Transaction Info</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {paginatedTransactions.map((transaction) => {
            const status = transaction.status || 'pending';
            const StatusIcon = statusConfig[status]?.icon || statusConfig.pending.icon;
            const TypeIcon = transaction.type === 'credit' ? ArrowDownLeft : ArrowUpRight;
            return (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{transaction.email || 'utsav@inbound.link'}</div>
                    <div className="text-xs text-gray-500 mt-1">{formatDate(transaction.date)}</div>
                    {transaction.orderId && (
                      <span className="text-xs text-gray-500 mt-1">
                        Order: {transaction.orderId}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-lg ${
                      transaction.type === 'credit' 
                        ? 'bg-green-50' :
                        transaction.type === 'payoneer'
                        ? 'bg-blue-50'
                        : 'bg-red-50'
                    }`}>
                      {transaction.type === 'payoneer' ? (
                        <CreditCard className="h-4 w-4 text-blue-600" />
                      ) : (
                        <TypeIcon className={`h-4 w-4 ${
                          transaction.type === 'credit'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900">{transaction.description}</span>
                      {transaction.transactionId && (
                        <span className="text-xs text-gray-500 mt-1">Transaction ID: {transaction.transactionId}</span>
                      )}
                    </div>
                    {transaction.type === 'payoneer' && (
                      <button
                        onClick={() => setSelectedPayoneerDetails({
                          email: transaction.email,
                          transactionId: transaction.transactionId || ''
                        })}
                        className="ml-2 p-1 rounded-full hover:bg-gray-100"
                      >
                        <InfoIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`text-sm font-medium ${
                    transaction.type === 'credit' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatPrice(transaction.amount)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {transaction.type === 'payoneer' && transaction.status === 'pending' ? (
                    <Select
                      value={transaction.status}
                      onValueChange={(value) => {
                        if (value === 'approved') handleApprove(transaction.id);
                        if (value === 'declined') handleDecline(transaction.id);
                      }}
                      disabled={transaction.status !== 'pending'}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span>Pending</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="approved">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Approve</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="declined">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>Decline</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border bg-green-50 text-green-700 border-green-100">
                        <CheckCircle className="h-3 w-3" />
                        <span>COMPLETED</span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="px-4 border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalItems={filteredTransactions.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
      {selectedPayoneerDetails && (
        <PayoneerDetailsModal
          isOpen={!!selectedPayoneerDetails}
          onClose={() => setSelectedPayoneerDetails(null)}
          email={selectedPayoneerDetails.email}
          transactionId={selectedPayoneerDetails.transactionId}
        />
      )}
    </div>
  );
}
