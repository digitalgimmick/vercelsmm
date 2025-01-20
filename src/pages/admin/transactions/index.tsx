import { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionStats from './TransactionStats';
import TransactionFilters from './TransactionFilters';

export default function TransactionsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  return (
    <div className="space-y-6 px-1">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Transaction Management</h2>
        <p className="text-gray-600 mt-1">View and manage all user transactions</p>
      </div>

      <TransactionStats />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mx-0">
        <TransactionFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
        />
        <TransactionsTable 
          searchQuery={searchQuery} 
          statusFilter={statusFilter}
          typeFilter={typeFilter}
        />
      </div>
    </div>
  );
}
