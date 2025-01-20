import { Package } from '@/types/index';
import { ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useOrderStore } from '@/stores/orderStore';
import { useEffect, useState } from 'react';
import { getVideoStats } from '@/lib/youtube';

interface PaymentSummaryProps {
  packageDetails: Package;
  orderId: string;
}

export default function PaymentSummary({ packageDetails, orderId }: PaymentSummaryProps) {
  const { orders } = useOrderStore();
  const order = orders.find(o => o.id === orderId);
  const originalPrice = packageDetails.discount 
    ? packageDetails.price / (1 - packageDetails.discount / 100) 
    : packageDetails.price;

  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="font-outfit text-lg font-semibold mb-4">Video Details</h3>
      
      <div className="space-y-3">
        {/* Video URL */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Video URL</span>
          <a 
            href={order?.videoUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <span>{order?.videoUrl ? 'View Video' : 'No video URL'}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Views Stats */}
        <div className="flex justify-between">
          <span className="text-gray-600">Current Views</span>
          <span className="font-medium">
            {order?.videoStats?.initialViews?.toLocaleString() || '0'}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Target Views</span>
          <span className="font-medium">+{packageDetails.viewCount.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <h3 className="font-outfit text-lg font-semibold mb-2">Order Summary</h3>

        <div className="flex justify-between">
          <span className="text-gray-600">Package</span>
          <span className="font-medium">{packageDetails.name}</span>
        </div>
        
        {packageDetails.discount && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>{packageDetails.discount}% OFF</span>
          </div>
        )}

        {packageDetails.discount && (
          <div className="flex justify-between text-gray-500">
            <span>Original Price</span>
            <span className="line-through">{formatPrice(originalPrice)}</span>
          </div>
        )}

        <div className="pt-3 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-red-500">{formatPrice(packageDetails.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
