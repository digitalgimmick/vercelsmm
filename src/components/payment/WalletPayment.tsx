import { useState } from 'react';
import { Package } from '@/types';
import { useWalletStore } from '@/stores/walletStore';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletPaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function WalletPayment({ packageDetails, orderId, onSuccess }: WalletPaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { balance, deductFunds, processCashback } = useWalletStore();

  const handlePayment = async () => {
    if (balance < packageDetails.price) {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your wallet",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Deduct payment from wallet
      deductFunds(
        packageDetails.price,
        `Payment for order #${orderId}`,
        orderId
      );

      // Process 10% cashback for wallet payments
      processCashback(orderId, packageDetails.price, 10);

      // Navigate to success page
      onSuccess?.();

      toast({
        title: "Payment Successful",
        description: "10% cashback has been added to your wallet",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || balance < packageDetails.price}
      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
    >
      <Wallet className="mr-2 h-5 w-5" />
      {isLoading ? 'Processing...' : `Pay with Wallet ($${packageDetails.price.toFixed(2)})`}
    </Button>
  );
}
