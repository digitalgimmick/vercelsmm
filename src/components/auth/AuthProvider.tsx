import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { onAuthStateChange, getUserData } from '@/lib/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Set up real-time listener for user document
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = {
                ...doc.data(),
                id: doc.id,
                emailVerified: firebaseUser.emailVerified // Use Firebase auth emailVerified status
              };
              setUser(userData);
            }
          });

          // Initial data fetch
          const userData = await getUserData(firebaseUser.uid);
          if (userData) {
            setUser({
              ...userData,
              emailVerified: firebaseUser.emailVerified
            });
          }

          return () => unsubscribeUser();
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
