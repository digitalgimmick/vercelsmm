import { DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { usePayoneerStore } from '@/stores/payoneerStore';
import { formatPrice } from '@/lib/utils';

export default function PayoneerStats() {
  const { requests } = usePayoneerStore();

  const stats = {
    totalRequests: requests.length,
    pendingAmount: requests
      .filter(r => r.status === 'pending')
      .reduce((sum, r) => sum + r.amount, 0),
    approvedAmount: requests
      .filter(r => r.status === 'approved')
      .reduce((sum, r) => sum + r.amount, 0),
    pendingRequests: requests
      .filter(r => r.status === 'pending')
      .length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={DollarSign}
        label="Total Requests"
        value={stats.totalRequests.toString()}
        color="blue"
      />
      <StatCard
        icon={Clock}
        label="Pending Amount"
        value={formatPrice(stats.pendingAmount)}
        color="yellow"
      />
      <StatCard
        icon={CheckCircle}
        label="Approved Amount"
        value={formatPrice(stats.approvedAmount)}
        color="green"
      />
      <StatCard
        icon={XCircle}
        label="Pending Requests"
        value={stats.pendingRequests.toString()}
        color="red"
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
