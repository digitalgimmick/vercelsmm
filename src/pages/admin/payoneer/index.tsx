import { useState } from 'react';
import PayoneerRequestsTable from './PayoneerRequestsTable';
import PayoneerStats from './PayoneerStats';
import PayoneerFilters from './PayoneerFilters';

export default function PayoneerRequestsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  return (
    <div className="space-y-6 px-1">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Payoneer Requests</h2>
        <p className="text-gray-600 mt-1">Manage manual Payoneer payment requests</p>
      </div>

      <PayoneerStats />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mx-0">
        <PayoneerFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <PayoneerRequestsTable 
          searchQuery={searchQuery} 
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
}
