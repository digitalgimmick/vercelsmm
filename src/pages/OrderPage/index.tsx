import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Youtube } from 'lucide-react';
import OrderForm from './components/OrderForm';
import PaymentFlow from './components/PaymentFlow';
import PaymentMethods from './components/PaymentMethods';
import SecurityBadges from './components/SecurityBadges';
import { useAuthStore } from '@/stores/authStore';
import { usePackageDetails } from '@/hooks/usePackageDetails';
import { useOrderStore } from '@/stores/orderStore';
import { getVideoStats } from '@/lib/youtube';
import { sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/email-templates';
import { useState } from 'react';
import type { OrderFormValues } from '@/lib/validations/order';

export default function OrderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuthStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packageId = searchParams.get('package');
  const packageDetails = usePackageDetails(packageId);
  const [orderId, setOrderId] = useState<string | null>(null);
  const { createOrder, orders } = useOrderStore();
  const order = orderId ? orders.find(o => o.id === orderId) : null;

  if (!packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h1>
          <p className="text-gray-600">Please select a package from our packages page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: OrderFormValues) => {
    if (!user) return;

    // Get initial video stats
    const videoStats = await getVideoStats(data.videoUrl);

    const order = await createOrder({
      userId: user.id,
      ...data,
      packageId: packageDetails.id,
      videoStats: {
        initialViews: videoStats.viewCount,
        currentViews: videoStats.viewCount,
        lastUpdated: new Date().toISOString()
      }
    });
    
    // Send order confirmation email
    await sendEmail({
      to: data.email,
      message: {
        subject: `Order Confirmation #${order.id}`,
        html: emailTemplates.orderConfirmation({
          orderId: order.id,
          packageName: packageDetails.name
        })
      }
    }).catch(console.error);
    
    setOrderId(order.id);
  };

  const handlePaymentSuccess = async () => {
    navigate(`/payment/success?orderId=${orderId}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-outfit text-3xl font-bold text-gray-900 mb-2">
            {orderId ? 'Complete Payment' : 'Checkout'}
          </h1>
          <p className="text-gray-600">
            {orderId 
              ? 'Choose your preferred payment method to complete your order'
              : 'Complete your order to start growing your YouTube channel'}
          </p>
        </div>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-xl p-8">
          {/* Package summary */}
          <div className="flex items-center justify-center gap-3 p-4 mb-8 rounded-lg bg-gray-50">
            <Youtube className="h-6 w-6 text-red-500" />
            <span className="font-medium text-gray-900">
              {packageDetails.viewCount.toLocaleString()} Views
            </span>
            <span className="text-gray-400">|</span>
            <span className="font-medium text-red-500">${packageDetails.price.toFixed(2)}</span>
          </div>

          {/* Payment methods */}
          {!orderId && <PaymentMethods />}

          {/* Order form or Payment flow */}
          {orderId ? (
            <PaymentFlow 
              packageDetails={packageDetails} 
              orderId={orderId} 
              videoUrl={order?.videoUrl || ''}
              onSuccess={handlePaymentSuccess}
            />
          ) : (
            <OrderForm onSubmit={handleSubmit} price={packageDetails.price} />
          )}

          {/* Security badges */}
          <div className="mt-8">
            <SecurityBadges />
          </div>
        </div>
      </div>
    </div>
  );
}
