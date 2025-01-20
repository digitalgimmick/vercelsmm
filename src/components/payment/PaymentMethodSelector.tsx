import { usePaymentStore } from '@/stores/paymentStore';
import { usePaymentSettingsStore } from '@/stores/paymentSettingsStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bitcoin, CreditCard, Wallet } from 'lucide-react';

const paymentMethods = [
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: Bitcoin,
    description: 'Get 5% cashback after order completion',
    cashback: 5
  },
  {
    id: 'wallet',
    name: 'HypedX Wallet',
    icon: Wallet,
    description: 'Get 10% cashback after order completion',
    cashback: 10
  },
  {
    id: 'card',
    name: 'Credit / Debit Card',
    icon: CreditCard,
    description: 'Secure payment via credit/debit card'
  }
];

const methodIcons = {
  cryptomus: Bitcoin,
  card: CreditCard,
  payoneer: Wallet,
  wallet: Wallet
};

export default function PaymentMethodSelector() {
  const { method, setMethod } = usePaymentStore();
  const { methods } = usePaymentSettingsStore();

  // Filter only enabled payment methods
  const enabledMethods = methods.filter(m => m.isEnabled);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Payment Method
      </label>
      <Select
        value={method || ''}
        onValueChange={setMethod}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose payment method" />
        </SelectTrigger>
        <SelectContent>
          {enabledMethods.map((method) => {
            const Icon = methodIcons[method.id as keyof typeof methodIcons];
            return (
              <SelectItem key={method.id} value={method.id}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{method.name}</span>
                  </div>
                  {method.id === 'cryptomus' && (
                    <span className="text-sm text-green-600">5% Cashback</span>
                  )}
                  {method.id === 'wallet' && (
                    <span className="text-sm text-green-600">10% Cashback</span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {method === 'cryptomus' && (
        <p className="text-sm text-gray-500">
          Get 5% cashback when paying with cryptocurrency
        </p>
      )}
      {method === 'card' && (
        <p className="text-sm text-gray-500">
          Secure payment via credit/debit card
        </p>
      )}
      {method === 'payoneer' && (
        <p className="text-sm text-gray-500">
          Manual bank transfer via Payoneer
        </p>
      )}
      {method === 'wallet' && (
        <p className="text-sm text-gray-500">
          Pay using your wallet balance and get 10% cashback
        </p>
      )}
    </div>
  );
}
