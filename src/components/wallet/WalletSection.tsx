import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard } from 'lucide-react';
import AddFundsModal from '@/components/wallet/AddFundsModal';
import { usePayoneerStore } from '@/stores/payoneerStore';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useWalletStore } from '@/stores/walletStore';
import { Pagination } from '@/components/ui/pagination';

export default function WalletSection() {
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { toast } = useToast();
  const { balance, transactions, addFunds } = useWalletStore();
  const { requests: payoneerRequests } = usePayoneerStore();

  // Convert Payoneer requests to transaction format for display
  const payoneerTransactions = payoneerRequests.map(request => ({
    id: request.id,
    type: 'payoneer',
    amount: request.amount,
    description: `Payoneer payment request`,
    date: request.createdAt,
    status: request.status,
    transactionId: request.transactionId
  }));

  const allTransactions = [...transactions, ...payoneerTransactions];

  const paginatedTransactions = allTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddFunds = async (amount: number, method: string, paymentData?: any) => {
    try {
      if (method === 'payoneer') {
        const { addRequest } = usePayoneerStore.getState();
        addRequest({
          email: paymentData.payoneerEmail,
          amount,
          transactionId: paymentData.transactionId
        });
      
        toast({
          title: "Request Submitted",
          description: "Your Payoneer payment request has been submitted for approval",
          variant: "success"
        });
      } else {
        // For other payment methods
        addFunds(amount, `Added funds via ${method}`);
        
        toast({
          title: "Funds Added Successfully",
          description: `${formatPrice(amount)} has been added to your wallet`,
          variant: "success"
        });
      }
      
      setIsAddFundsOpen(false);
    } catch (error) {
      toast({
        title: "Failed to Add Funds",
        description: "There was an error processing your request",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-50">
              <Wallet className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Available Balance</div>
              <div className="text-3xl font-semibold mt-1">
                {formatPrice(balance)}
              </div>
            </div>
          </div>
          <Button 
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setIsAddFundsOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </div>
      </Card>

      {/* Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {paginatedTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No transactions yet
            </div>
          ) : (
            paginatedTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg 
                    ${transaction.type === 'credit' 
                      ? 'bg-green-50 text-green-600' 
                      : transaction.type === 'payoneer'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-red-50 text-red-600'}`}>
                    {transaction.type === 'payoneer' ? (
                      <CreditCard className="h-5 w-5" />
                    ) : transaction.type === 'credit' 
                      ? <ArrowDownLeft className="h-5 w-5" />
                      : <ArrowUpRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    {transaction.transactionId && (
                      <div className="text-sm text-gray-500 mt-1">Transaction ID: {transaction.transactionId}</div>
                    )}
                    {transaction.orderId && (
                      <div className="text-sm text-gray-500">Order ID: {transaction.orderId}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'payoneer' ? '' : transaction.type === 'credit' ? '+' : '-'}
                    {formatPrice(transaction.amount)}
                  </div>
                  {transaction.type === 'payoneer' && (
                    <div className={`text-xs font-medium mt-1 ${
                      transaction.status === 'approved' ? 'text-green-600' :
                      transaction.status === 'declined' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {transaction.status?.toUpperCase()}
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {transactions.length > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalItems={transactions.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </Card>
      
      <AddFundsModal
        isOpen={isAddFundsOpen}
        onClose={() => setIsAddFundsOpen(false)}
        onAddFunds={handleAddFunds}
      />
    </div>
  );
}
