import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'user' | 'admin'>;
  requireVerification?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles,
  requireVerification = true 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check email verification if required
  if (requireVerification && !user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
