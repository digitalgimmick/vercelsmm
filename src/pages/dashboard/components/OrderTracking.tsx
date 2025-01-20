import { Card } from '@/components/ui/card';
import { CheckCircle2, Clock, BarChart2, Package2 } from 'lucide-react';

// Mock data - replace with real data later
const activeOrder = {
  id: 'ORD-002',
  packageName: '10000 Views',
  progress: 45,
  currentViews: 4500,
  targetViews: 10000,
  status: 'in_progress',
  estimatedCompletion: '2024-03-20'
};

const steps = [
  { 
    icon: Package2,
    title: 'Order Received',
    description: 'Your order has been confirmed',
    status: 'completed',
    date: '2024-03-14 15:45'
  },
  {
    icon: Clock,
    title: 'Processing',
    description: 'Views are being delivered',
    status: 'current',
    date: '2024-03-14 16:00'
  },
  {
    icon: BarChart2,
    title: 'Monitoring',
    description: 'Tracking view retention',
    status: 'upcoming',
    date: null
  },
  {
    icon: CheckCircle2,
    title: 'Completed',
    description: 'All views delivered',
    status: 'upcoming',
    date: null
  }
];

export default function OrderTracking() {
  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Active Order Progress</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Order ID</div>
              <div className="font-medium">{activeOrder.id}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Package</div>
              <div className="font-medium">{activeOrder.packageName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Views</div>
              <div className="font-medium">{activeOrder.currentViews.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Target Views</div>
              <div className="font-medium">{activeOrder.targetViews.toLocaleString()}</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{activeOrder.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${activeOrder.progress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Order Timeline</h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10
                    ${step.status === 'completed' 
                      ? 'bg-green-100 text-green-600' 
                      : step.status === 'current'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    {step.date && (
                      <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
