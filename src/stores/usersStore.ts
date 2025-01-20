import { create } from 'zustand';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User } from '@/types/user';

interface UsersStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  loadUsers: () => Promise<void>;
  getUserById: (userId: string) => Promise<User | null>;
  getActiveUserCount: () => Promise<number>;
  getNewUsersToday: () => Promise<number>;
  getTotalUsers: () => Promise<number>;
}

export const useUsersStore = create<UsersStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,

  loadUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];

      set({ users, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load users',
        isLoading: false 
      });
    }
  },

  getUserById: async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) return null;
      return { id: userDoc.id, ...userDoc.data() } as User;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  },

  getActiveUserCount: async () => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isActive', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.size;
  },

  getNewUsersToday: async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('createdAt', '>=', today.toISOString()));
    const snapshot = await getDocs(q);
    return snapshot.size;
  },

  getTotalUsers: async () => {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.size;
  }
}));
