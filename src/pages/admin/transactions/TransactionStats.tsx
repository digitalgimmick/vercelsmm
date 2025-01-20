import { useWalletStore } from '@/stores/walletStore';
import { usePayoneerStore } from '@/stores/payoneerStore';
import { DollarSign, ArrowDownLeft, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function TransactionStats() {
  const { transactions } = useWalletStore();
  const { requests: payoneerRequests } = usePayoneerStore();

  const stats = {
    totalVolume: transactions.reduce((sum, t) => sum + t.amount, 0),
    totalDeposits: transactions
      .filter(t => t.type === 'credit' && !t.isCashback)
      .reduce((sum, t) => sum + t.amount, 0),
    pendingTransactions: payoneerRequests.filter(r => r.status === 'pending').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={DollarSign}
        label="Total Volume"
        value={formatPrice(stats.totalVolume)}
        color="blue"
      />
      <StatCard
        icon={ArrowDownLeft}
        label="Total Deposits"
        value={formatPrice(stats.totalDeposits)}
        color="green"
      />
      <StatCard
        icon={Clock}
        label="Pending Transactions"
        value={stats.pendingTransactions.toString()}
        color="yellow"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'red' | 'yellow';
}

function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
      </div>
    </div>
  );
}
