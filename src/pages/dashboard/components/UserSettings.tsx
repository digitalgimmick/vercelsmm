import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function UserSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked 
        ? "You will receive email notifications about your orders" 
        : "You will no longer receive email notifications",
      variant: checked ? "success" : "default"
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-50">
            <Mail className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Email Settings</h3>
            <p className="text-sm text-gray-600">Update your email address</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              disabled
              className="max-w-md"
            />
          </div>
          <Button disabled>Update Email</Button>
        </div>
      </Card>

      {/* Password Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-50">
            <Lock className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Password Settings</h3>
            <p className="text-sm text-gray-600">Change your password</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <Input
              type="password"
              placeholder="Enter current password"
              disabled
              className="max-w-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              disabled
              className="max-w-md"
            />
          </div>
          <Button disabled>Change Password</Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-50">
            <Bell className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Notification Settings</h3>
            <p className="text-sm text-gray-600">Manage your notification preferences</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="order-notifications" className="font-medium">Order Notifications</Label>
                <Switch
                  id="order-notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={handleNotificationToggle}
                />
              </div>
              <p className="text-sm text-gray-500">
                Receive email notifications about your orders status and updates
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
