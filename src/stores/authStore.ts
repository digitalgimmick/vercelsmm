import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserData } from '@/lib/auth';

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  setUser: (user: UserData | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
