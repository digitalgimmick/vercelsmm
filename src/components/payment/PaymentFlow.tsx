import { Package } from '@/types';
import { ExternalLink } from 'lucide-react';
import { usePaymentStore } from '@/stores/paymentStore';
import { useOrderStore } from '@/stores/orderStore';
import { usePaymentSettingsStore } from '@/stores/paymentSettingsStore';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentSummary from './PaymentSummary';
import CryptoPayment from './CryptoPayment';
import StripePayment from './StripePayment';
import WalletPayment from './WalletPayment';
import PayeerPayment from './PayeerPayment';
import PayoneerPayment from './PayoneerPayment';

interface PaymentFlowProps {
  packageDetails: Package;
  orderId: string;
  videoUrl: string;
  onSuccess: () => void;
}

export default function PaymentFlow({ packageDetails, orderId, videoUrl, onSuccess }: PaymentFlowProps) {
  const { method } = usePaymentStore();
  const { orders } = useOrderStore();
  const { methods } = usePaymentSettingsStore();
  const order = orders.find(o => o.id === orderId);

  const selectedMethod = methods.find(m => m.id === method);
  const cashbackPercentage = method === 'cryptomus' ? 5 : method === 'wallet' ? 10 : 0;

  return (
    <div className="space-y-6">
      {/* Video Details */}
      <div className="rounded-lg bg-gray-50 p-6">
        <h3 className="font-outfit text-lg font-semibold mb-4">Video Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Video URL</span>
            <a 
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <span>View Video</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Current Views</span>
            <span className="font-medium">{order?.videoStats?.initialViews?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Target Views</span>
            <span className="font-medium">+{packageDetails.viewCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <PaymentSummary 
        packageDetails={packageDetails} 
        cashbackPercentage={cashbackPercentage}
      />
      
      <PaymentMethodSelector />
      
      {method === 'cryptomus' && (
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
      {method === 'payoneer' && (
        <PayoneerPayment
          packageDetails={packageDetails}
          orderId={orderId}
          onSuccess={onSuccess}
          instructions={selectedMethod?.manualInstructions}
        />
      )}
    </div>
  );
}
