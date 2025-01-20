import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Wallet } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

interface UserManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    email: string;
    walletBalance: number;
    totalSpent: number;
    createdAt: string;
  } | null;
  onUpdateEmail: (userId: string, newEmail: string) => void;
  onAddFunds: (userId: string, amount: number) => void;
}

export default function UserManageModal({
  isOpen,
  onClose,
  user,
  onUpdateEmail,
  onAddFunds
}: UserManageModalProps) {
  const { toast } = useToast();
  const [newEmail, setNewEmail] = useState('');
  const [fundAmount, setFundAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleEmailUpdate = async () => {
    if (!newEmail.trim()) return;
    
    setIsLoading(true);
    try {
      await onUpdateEmail(user.id, newEmail);
      toast({
        title: "Email Updated",
        description: "User's email has been successfully updated.",
        variant: "success"
      });
      setNewEmail('');
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFunds = async () => {
    const amount = parseFloat(fundAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    setIsLoading(true);
    try {
      await onAddFunds(user.id, amount);
      toast({
        title: "Funds Added",
        description: `Successfully added ${formatPrice(amount)} to user's wallet.`,
        variant: "success"
      });
      setFundAmount('');
    } catch (error) {
      toast({
        title: "Failed to Add Funds",
        description: "There was an error adding funds. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage User Account</DialogTitle>
          <p className="text-sm text-gray-500 mt-1">Update email or add funds to wallet</p>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Email Update Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <h4 className="font-medium">Update Email Address</h4>
            </div>
            <div className="space-y-2">
              <Input
                id="new-email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
              />
            </div>
            <Button 
              onClick={handleEmailUpdate}
              disabled={!newEmail.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Update Email
            </Button>
          </div>

          <div className="border-t border-gray-200" />

          {/* Add Funds Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-gray-500" />
              <h4 className="font-medium">Add Funds to Wallet</h4>
            </div>
            <div className="space-y-2">
              <Input
                id="fund-amount"
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Enter amount to add"
                min="0"
                step="0.01"
              />
            </div>
            <Button 
              onClick={handleAddFunds}
              disabled={!fundAmount || parseFloat(fundAmount) <= 0 || isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Add Funds
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
