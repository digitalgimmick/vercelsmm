import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/utils';
import { Bitcoin, CreditCard, Mail, AlertCircle, DollarSign, ArrowRight } from 'lucide-react';
import { usePaymentSettingsStore } from '@/stores/paymentSettingsStore';
import { z } from 'zod';

const MIN_AMOUNT = 10;

const emailSchema = z.string().email('Please enter a valid email address');

const PAYMENT_METHODS = [
  {
    id: 'cryptomus',
    name: 'Cryptocurrency',
    icon: Bitcoin,
    description: 'Pay with Bitcoin, Ethereum, USDT, and more'
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Pay with Visa, Mastercard, or other cards'
  },
  {
    id: 'payeer',
    name: 'Payeer',
    icon: CreditCard,
    description: 'Pay using your Payeer account'
  },
  {
    id: 'payoneer',
    name: 'Payoneer (Manual)',
    icon: Mail,
    description: 'Manual bank transfer via Payoneer'
  }
];

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFunds: (amount: number, method: string, paymentData?: any) => Promise<void>;
}

export default function AddFundsModal({ 
  isOpen, 
  onClose, 
  onAddFunds 
}: AddFundsModalProps) {
  const { toast } = useToast();
  const { methods } = usePaymentSettingsStore();
  const [step, setStep] = useState<'method' | 'details'>('method');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [payoneerEmail, setPayoneerEmail] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const selectedMethod = methods.find(m => m.id === method);
  const isPayoneer = method === 'payoneer';
  const isPayoneerValid = isPayoneer ? 
    (payoneerEmail.trim() !== '' && !emailError && transactionId.trim() !== '') : 
    true;

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      setEmailError(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleNext = () => {
    if (!amount || !method) {
      toast({
        title: "Required Fields",
        description: "Please enter amount and select payment method",
        variant: "destructive"
      });
      return;
    }
    
    if (parseFloat(amount) < MIN_AMOUNT) {
      toast({
        title: "Invalid Amount",
        description: `Minimum funding amount is ${formatPrice(MIN_AMOUNT)}`,
        variant: "destructive"
      });
      return;
    }

    setStep('details');
  };

  const handleBack = () => {
    setStep('method');
    setPayoneerEmail('');
    setEmailError(null);
    setTransactionId('');
  };

  const handleSubmit = async () => {
    if (isPayoneer && !validateEmail(payoneerEmail)) {
      return;
    }

    const fundAmount = parseFloat(amount);
    if (isNaN(fundAmount) || fundAmount < MIN_AMOUNT) {
      toast({
        title: "Invalid Amount",
        description: `Minimum funding amount is ${formatPrice(MIN_AMOUNT)}`,
        variant: "destructive"
      });
      return;
    }

    if (!method) {
      toast({
        title: "Select Payment Method",
        description: "Please select a payment method to continue",
        variant: "destructive"
      });
      return;
    }

    const paymentData = isPayoneer ? {
      amount: fundAmount,
      method,
      payoneerEmail,
      transactionId: transactionId.trim() // Use the exact transaction ID entered by user
    } : {
      amount: fundAmount,
      method
    };

    setIsLoading(true);
    try {
      await onAddFunds(fundAmount, method, paymentData);
      setAmount('');
      setMethod('');
      setPayoneerEmail('');
      setEmailError(null);
      setTransactionId('');
      setStep('method');
    } catch (error) {
      toast({
        title: "Failed to Add Funds",
        description: "There was an error processing your request",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
        </DialogHeader>

        {step === 'method' ? (
          <div className="grid gap-6 py-4">
          {/* Amount Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount (min. ${formatPrice(MIN_AMOUNT)})`}
              min={MIN_AMOUNT}
              step="0.01"
              className="pl-9"
            />
          </div>

          {/* Payment Method Selection */}
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((pm) => {
              const Icon = pm.icon;
              const isSelected = method === pm.id;
              return (
                <div
                  key={pm.id}
                  className={`p-4 cursor-pointer rounded-lg border transition-all duration-200 
                    hover:border-red-200 hover:shadow-sm
                    ${isSelected ? 'border-red-500 bg-red-50/50' : 'border-gray-200'}`}
                  onClick={() => setMethod(pm.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isSelected ? 'text-red-500' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{pm.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{pm.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        
          {/* Payoneer Instructions */}
          {isPayoneer && selectedMethod?.manualInstructions && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2">Please follow these instructions:</h4>
              <ol className="list-decimal list-inside space-y-1">
                {selectedMethod.manualInstructions.map((instruction, index) => (
                  <li key={index} className="text-sm text-blue-700">{instruction}</li>
                ))}
              </ol>
              <p className="text-sm text-blue-700 mt-4">
                After sending the payment, click Next to submit your transaction details.
              </p>
            </div>
          )}

          <Button
            onClick={isPayoneer ? handleNext : handleSubmit}
            disabled={isLoading || !amount || !method || parseFloat(amount) < MIN_AMOUNT}
            className="w-full bg-red-500 hover:bg-red-600 text-lg py-6"
          >
            {isLoading ? 'Processing...' : isPayoneer ? (
              <span className="flex items-center justify-center gap-2">
                Next <ArrowRight className="h-5 w-5" />
              </span>
            ) : 'Add Funds'}
          </Button>
        </div>
        ) : (
          <div className="grid gap-6 py-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Submit Transaction Details</h3>
              <p className="text-sm text-gray-600 mt-1">
                Please provide your Payoneer payment details
              </p>
            </div>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Payoneer Email</label>
                <Input
                  type="email"
                  value={payoneerEmail}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setPayoneerEmail(value);
                    if (value) validateEmail(value);
                  }}
                  onBlur={() => {
                    if (payoneerEmail) validateEmail(payoneerEmail);
                  }}
                  placeholder="Enter your Payoneer email"
                  className={emailError ? 'border-red-500' : ''}
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {emailError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Transaction ID</label>
                <Input
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !isPayoneerValid}
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                {isLoading ? 'Processing...' : 'Submit Request'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
