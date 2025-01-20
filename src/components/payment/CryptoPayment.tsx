import { useState } from 'react';
import { Package } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Bitcoin } from 'lucide-react';

interface CryptoPaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function CryptoPayment({ packageDetails, orderId, onSuccess }: CryptoPaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual crypto payment integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment Successful",
        description: "Your crypto payment has been processed successfully",
        variant: "success"
      });
      
      onSuccess?.();
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
      disabled={isLoading}
      className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6"
    >
      <Bitcoin className="mr-2 h-5 w-5" />
      {isLoading ? 'Processing...' : `Pay ${packageDetails.price.toFixed(2)} USD`}
    </Button>
  );
}
