import { useState } from 'react';
import { Package } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface PayeerPaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function PayeerPayment({ packageDetails, orderId, onSuccess }: PayeerPaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully",
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
      className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {isLoading ? 'Processing...' : `Pay with Payeer ($${packageDetails.price.toFixed(2)})`}
    </Button>
  );
}
