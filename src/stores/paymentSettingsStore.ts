import { create } from 'zustand';

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  manualInstructions?: string[];
  minimumAmount: number;
  config: {
    [key: string]: string;
  };
}

interface PaymentSettingsState {
  methods: PaymentMethod[];
  updateMethod: (id: string, updates: Partial<PaymentMethod>) => void;
  toggleMethod: (id: string) => void;
}

const defaultMethods: PaymentMethod[] = [
  {
    id: 'cryptomus',
    name: 'Cryptocurrency',
    description: 'Pay with Bitcoin, Ethereum, USDT, and more',
    isEnabled: true,
    minimumAmount: 100,
    config: {
      merchantId: '',
      apiKey: '',
      webhookUrl: ''
    }
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Pay with Visa, Mastercard, or other cards',
    isEnabled: true,
    minimumAmount: 100,
    config: {
      stripePublicKey: '',
      stripeSecretKey: '',
      webhookSecret: ''
    }
  },
  {
    id: 'payeer',
    name: 'Payeer',
    description: 'Pay using your Payeer account',
    isEnabled: true,
    minimumAmount: 100,
    config: {
      merchantId: '',
      secretKey: '',
      shopId: ''
    }
  },
  {
    id: 'payoneer',
    name: 'Payoneer (Manual)',
    description: 'Manual bank transfer via Payoneer',
    isEnabled: true,
    minimumAmount: 100,
    config: {
      accountEmail: '',
      accountName: '',
      bankDetails: ''
    },
    manualInstructions: [
      'Send payment to: payments@example.com',
      'Include your user ID in transfer notes',
      'Contact support with transfer receipt'
    ]
  }
];

export const usePaymentSettingsStore = create<PaymentSettingsState>((set) => ({
  methods: defaultMethods,
  updateMethod: (id, updates) => set((state) => ({
    methods: state.methods.map((method) =>
      method.id === id ? { ...method, ...updates } : method
    )
  })),
  toggleMethod: (id) => set((state) => ({
    methods: state.methods.map((method) =>
      method.id === id ? { ...method, isEnabled: !method.isEnabled } : method
    )
  }))
}));
