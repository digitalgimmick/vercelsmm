import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Wallet, BarChart2, Settings } from 'lucide-react';
import Metrics from './components/Metrics';
import WalletSection from '@/components/wallet/WalletSection';
import UserSettings from './components/UserSettings';

export default function UserDashboard() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your orders and manage your account</p>
      </div>
      
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Wallet</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <Metrics />
        </TabsContent>
        <TabsContent value="wallet">
          <WalletSection />
        </TabsContent>
        <TabsContent value="settings">
          <UserSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
