import { usePaymentStore } from '@/stores/paymentStore';
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

export default function PaymentMethodSelector() {
  const { method, setMethod } = usePaymentStore();
  const selectedMethod = paymentMethods.find(m => m.id === method);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Select Payment Method
      </label>
      <Select
        value={method || ''}
        onValueChange={setMethod}
      >
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="Choose payment method" />
        </SelectTrigger>
        <SelectContent>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <SelectItem 
                key={method.id} 
                value={method.id}
                className="py-3"
              >
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-gray-50">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium">{method.name}</span>
                  </div>
                  {method.cashback && (
                    <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                      {method.cashback}% Cashback
                    </span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {selectedMethod && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
          <p className="text-sm text-gray-600">
            {selectedMethod.description}
          </p>
        </div>
      )}
    </div>
  );
}
