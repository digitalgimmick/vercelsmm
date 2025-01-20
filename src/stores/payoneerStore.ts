import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useWalletStore } from './walletStore';

interface PayoneerRequest {
  id: string;
  email: string;
  amount: number;
  transactionId: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt: string;
  updatedAt: string;
}

interface PayoneerStore {
  requests: PayoneerRequest[];
  addRequest: (data: { email: string; amount: number; transactionId: string }) => void;
  approveRequest: (requestId: string) => Promise<void>;
  declineRequest: (requestId: string) => Promise<void>;
}

export const usePayoneerStore = create<PayoneerStore>()(
  persist(
    (set, get) => ({
      requests: [],

      addRequest: (data) => set((state) => ({
        requests: [{
          id: crypto.randomUUID(),
          email: data.email,
          amount: data.amount,
          transactionId: data.transactionId,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, ...state.requests]
      })),

      approveRequest: async (requestId) => {
        const request = get().requests.find(r => r.id === requestId);
        if (!request || request.status !== 'pending') return;

        // Update request status
        set((state) => ({
          requests: state.requests.map(r => 
            r.id === requestId 
              ? { 
                  ...r, 
                  status: 'approved',
                  updatedAt: new Date().toISOString()
                }
              : r
          )
        }));

        // Add funds to user's wallet after approval
        const walletStore = useWalletStore.getState();
        walletStore.addFunds(
          request.amount,
          `Payoneer payment approved - Transaction ID: ${request.transactionId}`,
          request.id
        );
      },

      declineRequest: async (requestId) => {
        set((state) => ({
          requests: state.requests.map(r => 
            r.id === requestId 
              ? { 
                  ...r, 
                  status: 'declined',
                  updatedAt: new Date().toISOString()
                }
              : r
          )
        }));
      }
    }),
    {
      name: 'payoneer-storage'
    }
  )
);
