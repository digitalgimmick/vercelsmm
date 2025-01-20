import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOrderStore } from '@/stores/orderStore';
import { formatPrice, formatDate } from '@/lib/utils';

export default function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useOrderStore();
  
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    if (!order) {
      navigate('/dashboard');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600">
            Your order has been confirmed and is being processed.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-6">
            {/* Order Details */}
            <div className="pb-6 border-b border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Order ID</div>
                  <div className="font-medium">{order.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-medium">{formatDate(order.createdAt)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {order.status.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Amount</div>
                  <div className="font-medium text-green-600">
                    {formatPrice(order.package.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="pb-6 border-b border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Package Details</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{order.package.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {order.package.viewCount.toLocaleString()} Views
                    </div>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatPrice(order.package.price)}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Video Details</h2>
              <a 
                href={order.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="truncate flex-1 mr-4">
                    <div className="font-medium truncate">{order.videoUrl}</div>
                    <div className="text-sm text-gray-600 mt-1">YouTube Video</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </a>
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-red-500 hover:bg-red-600"
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.print()}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
