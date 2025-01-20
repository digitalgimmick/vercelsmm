import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string | null;
  onStatusChange: (status: string | null) => void;
  typeFilter: string | null;
  onTypeChange: (type: string | null) => void;
}

export default function TransactionFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by user email or transaction ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select 
          value={statusFilter || "all"} 
          onValueChange={(value) => onStatusChange(value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-48">
        <Select 
          value={typeFilter || "all"} 
          onValueChange={(value) => onTypeChange(value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="credit">Deposits</SelectItem>
            <SelectItem value="debit">Withdrawals</SelectItem>
            <SelectItem value="payoneer">Payoneer Requests</SelectItem>
            <SelectItem value="cashback">Cashback</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
