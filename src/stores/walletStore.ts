import { create } from 'zustand';
import { getWallet, addFunds as addWalletFunds, deductFunds as deductWalletFunds, getTransactions } from '@/lib/wallet';
import type { Transaction } from '@/types';

interface WalletStore {
  balance: number;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  loadWallet: (userId: string) => Promise<void>;
  addFunds: (userId: string, amount: number, description: string) => Promise<void>;
  deductFunds: (userId: string, amount: number, description: string) => Promise<void>;
  processCashback: (userId: string, orderId: string, amount: number, percentage: number) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set) => ({
  balance: 0,
  transactions: [],
  isLoading: false,
  error: null,

  loadWallet: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const wallet = await getWallet(userId);
      const transactions = await getTransactions(userId);
      
      set({
        balance: wallet?.balance || 0,
        transactions,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load wallet',
        isLoading: false 
      });
    }
  },

  addFunds: async (userId: string, amount: number, description: string) => {
    set({ isLoading: true, error: null });
    try {
      await addWalletFunds(userId, amount, description);
      const wallet = await getWallet(userId);
      const transactions = await getTransactions(userId);
      
      set({
        balance: wallet?.balance || 0,
        transactions,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add funds',
        isLoading: false 
      });
      throw error;
    }
  },

  deductFunds: async (userId: string, amount: number, description: string) => {
    set({ isLoading: true, error: null });
    try {
      await deductWalletFunds(userId, amount, description);
      const wallet = await getWallet(userId);
      const transactions = await getTransactions(userId);
      
      set({
        balance: wallet?.balance || 0,
        transactions,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to deduct funds',
        isLoading: false 
      });
      throw error;
    }
  },

  processCashback: async (userId: string, orderId: string, amount: number, percentage: number) => {
    const cashbackAmount = (amount * percentage) / 100;
    const description = `${percentage}% Cashback for order #${orderId}`;
    
    await useWalletStore.getState().addFunds(userId, cashbackAmount, description);
  }
}));
