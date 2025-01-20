import { useState } from 'react';
import { useUsersStore } from '@/stores/usersStore';
import { Pagination } from '@/components/ui/pagination';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Lock, Mail, Power, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ResetPasswordDialog from './ResetPasswordDialog';
import UserManageModal from './UserManageModal';

interface UsersTableProps {
  searchQuery: string;
  sortBy: 'recent' | 'spent';
}

export default function UsersTable({ searchQuery, sortBy }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { users, toggleUserStatus } = useUsersStore();
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [manageUserId, setManageUserId] = useState<string | null>(null);

  const selectedUser = manageUserId 
    ? users.find(user => user.id === manageUserId)
    : null;

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.totalSpent - a.totalSpent;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleStatusToggle = (userId: string, currentStatus: boolean) => {
    toggleUserStatus(userId);
    toast({
      title: `User ${currentStatus ? 'Deactivated' : 'Activated'}`,
      description: `User account has been ${currentStatus ? 'deactivated' : 'activated'} successfully.`,
      variant: currentStatus ? 'warning' : 'success'
    });
  };

  const handleUpdateEmail = async (userId: string, newEmail: string) => {
    // TODO: Implement email update logic
    console.log('Update email:', userId, newEmail);
  };

  const handleAddFunds = async (userId: string, amount: number) => {
    // TODO: Implement add funds logic
    console.log('Add funds:', userId, amount);
  };

  return (
    <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">User</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
            <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {paginatedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{user.email}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Joined {formatDate(user.createdAt)}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-right text-sm">{user.totalOrders}</td>
              <td className="py-4 px-4 text-right">
                <span className={`text-sm ${
                  user.walletBalance > 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {formatPrice(user.walletBalance)}
                </span>
              </td>
              <td className="py-4 px-4 text-right text-sm">{formatPrice(user.totalSpent)}</td>
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${user.isActive 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setManageUserId(user.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusToggle(user.id, user.isActive)}
                    className={user.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                  >
                    <Power className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <Lock className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-4 border-t border-gray-200">
        <Pagination
          currentPage={currentPage}
          totalItems={sortedUsers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      <ResetPasswordDialog
        isOpen={!!selectedUserId}
        onClose={() => setSelectedUserId(null)}
        userId={selectedUserId}
      />
      <UserManageModal
        isOpen={!!manageUserId}
        onClose={() => setManageUserId(null)}
        user={selectedUser}
        onUpdateEmail={handleUpdateEmail}
        onAddFunds={handleAddFunds}
      />
    </div>
  );
}
