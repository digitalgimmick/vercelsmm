import { useState } from 'react';
import { Package } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface CardPaymentProps {
  packageDetails: Package;
  orderId: string;
  onSuccess?: () => void;
}

export default function CardPayment({ packageDetails, orderId, onSuccess }: CardPaymentProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment Successful",
        description: "Your card payment has been processed successfully",
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
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-6"
    >
      <CreditCard className="mr-2 h-5 w-5" />
      {isLoading ? 'Processing...' : `Pay with Card ($${packageDetails.price.toFixed(2)})`}
    </Button>
  );
}
