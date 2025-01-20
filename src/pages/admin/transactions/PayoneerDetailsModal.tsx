import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, CreditCard } from 'lucide-react';

interface PayoneerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  transactionId: string;
}

export default function PayoneerDetailsModal({
  isOpen,
  onClose,
  email,
  transactionId
}: PayoneerDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payoneer Payment Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Payoneer Email</div>
                <div className="font-medium mt-0.5">{email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Transaction ID</div>
                <div className="font-medium font-mono mt-0.5">{transactionId}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
