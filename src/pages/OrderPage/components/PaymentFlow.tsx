import { Package } from '@/types';
import { ExternalLink } from 'lucide-react';
import { usePaymentStore } from '@/stores/paymentStore';
import { useOrderStore } from '@/stores/orderStore';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import CryptoPayment from '@/components/payment/CryptoPayment';
import WalletPayment from '@/components/payment/WalletPayment';
import PayeerPayment from '@/components/payment/PayeerPayment';
import StripePayment from '@/components/payment/StripePayment';

interface PaymentFlowProps {
  packageDetails: Package;
  orderId: string;
  videoUrl: string;
  onSuccess: () => void;
}

export default function PaymentFlow({ packageDetails, orderId, videoUrl, onSuccess }: PaymentFlowProps) {
  const { method } = usePaymentStore();
  const { orders } = useOrderStore();
  const order = orders.find(o => o.id === orderId);
  const cashbackPercentage = method === 'crypto' ? 5 : method === 'wallet' ? 10 : 0;

  return (
    <div className="space-y-6">
      <PaymentSummary 
        packageDetails={packageDetails} 
        orderId={orderId}
      />
      
      <PaymentMethodSelector />
      
      {method === 'crypto' && (
        <CryptoPayment
          packageDetails={packageDetails}
          orderId={orderId}
          onSuccess={onSuccess}
        />
      )}
      {method === 'card' && (
        <StripePayment
          packageDetails={packageDetails}
          orderId={orderId}
          onSuccess={onSuccess}
        />
      )}
      {method === 'wallet' && (
        <WalletPayment
          packageDetails={packageDetails}
          orderId={orderId}
          onSuccess={onSuccess}
        />
      )}
      {method === 'payeer' && (
        <PayeerPayment
          packageDetails={packageDetails}
          orderId={orderId}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
}
