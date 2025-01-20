import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { resendVerificationEmail } from '@/lib/auth';
import { Mail, RefreshCw } from 'lucide-react';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const checkVerification = async () => {
      if (user?.firebaseUser) {
        await user.firebaseUser.reload(); // Reload user to get latest verification status
        if (user.firebaseUser.emailVerified) {
          // Redirect to dashboard based on user role
          const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
          navigate(redirectPath, { replace: true });
          
          toast({
            title: "Email Verified",
            description: "Your email has been verified successfully.",
            variant: "success"
          });
        }
      }
    };

    const interval = setInterval(checkVerification, 3000); // Check every 3 seconds
    return () => clearInterval(interval);
  }, [user, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!user?.firebaseUser) return;
    
    setIsResending(true);
    try {
      await resendVerificationEmail(user.firebaseUser);
      setCountdown(60); // Start 60 second countdown
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox for the verification link.',
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Failed to send email',
        description: 'Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsResending(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Mail className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification link to {user.email}
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Waiting for verification
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Please check your email and click the verification link to continue.
                      The page will automatically update once your email is verified.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={handleResendEmail}
                disabled={isResending || countdown > 0}
                variant="outline"
                className="w-full"
              >
                {countdown > 0
                  ? `Resend email in ${countdown}s`
                  : isResending
                  ? 'Sending...'
                  : 'Resend verification email'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
