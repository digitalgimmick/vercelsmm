import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Bitcoin, CreditCard, Mail, DollarSign, Pencil, Save, X } from 'lucide-react';
import { usePaymentSettingsStore } from '@/stores/paymentSettingsStore';

const methodIcons = {
  cryptomus: Bitcoin,
  card: CreditCard,
  payeer: CreditCard,
  payoneer: Mail
};

export default function PaymentSettings() {
  const { methods, updateMethod, toggleMethod } = usePaymentSettingsStore();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    description: '',
    minimumAmount: '',
    config: {} as Record<string, string>,
    manualInstructions: [] as string[]
  });

  const handleEdit = (method: typeof methods[0]) => {
    setEditingId(method.id);
    setEditForm({
      description: method.description,
      minimumAmount: method.minimumAmount.toString(),
      config: { ...method.config },
      manualInstructions: method.manualInstructions || []
    });
  };

  const handleSave = (id: string) => {
    const updates = {
      description: editForm.description,
      minimumAmount: parseFloat(editForm.minimumAmount),
      config: editForm.config,
      manualInstructions: editForm.manualInstructions.length > 0 
        ? editForm.manualInstructions 
        : undefined
    };

    updateMethod(id, updates);
    setEditingId(null);
    
    toast({
      title: "Settings Updated",
      description: "Payment method settings have been saved successfully.",
      variant: "success"
    });
  };

  const handleToggle = (id: string, currentState: boolean) => {
    toggleMethod(id);
    toast({
      title: currentState ? "Method Disabled" : "Method Enabled",
      description: `Payment method has been ${currentState ? 'disabled' : 'enabled'}.`,
      variant: currentState ? "default" : "success"
    });
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...editForm.manualInstructions];
    newInstructions[index] = value;
    setEditForm({ ...editForm, manualInstructions: newInstructions });
  };

  const addInstruction = () => {
    setEditForm({
      ...editForm,
      manualInstructions: [...editForm.manualInstructions, '']
    });
  };

  const removeInstruction = (index: number) => {
    setEditForm({
      ...editForm,
      manualInstructions: editForm.manualInstructions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Payment Settings</h2>
        <p className="text-gray-600 mt-1">Configure payment methods and their settings</p>
      </div>

      <div className="grid gap-6">
        {methods.map((method) => {
          const Icon = methodIcons[method.id as keyof typeof methodIcons];
          const isEditing = editingId === method.id;

          return (
            <Card key={method.id} className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      method.isEnabled ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        method.isEnabled ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{method.name}</h3>
                      {!isEditing && (
                        <p className="text-sm text-gray-600">{method.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={method.isEnabled}
                        onCheckedChange={() => handleToggle(method.id, method.isEnabled)}
                      />
                      <Label className="text-sm">
                        {method.isEnabled ? 'Enabled' : 'Disabled'}
                      </Label>
                    </div>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(method)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSave(method.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingId(null)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Form */}
                {isEditing && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={editForm.description}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          description: e.target.value
                        })}
                        placeholder="Enter payment method description"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Minimum Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          value={editForm.minimumAmount}
                          onChange={(e) => setEditForm({
                            ...editForm,
                            minimumAmount: e.target.value
                          })}
                          className="pl-9"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Method-specific Configuration */}
                    <div className="space-y-2">
                      <Label>Configuration Settings</Label>
                      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                        {Object.entries(method.config).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <Label className="capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </Label>
                            <Input
                              type={key.toLowerCase().includes('key') || key.toLowerCase().includes('secret') ? 'password' : 'text'}
                              value={editForm.config[key] || ''}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                config: {
                                  ...editForm.config,
                                  [key]: e.target.value
                                }
                              })}
                              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {method.id === 'payoneer' && (
                      <div className="space-y-2">
                        <Label>Manual Payment Instructions</Label>
                        {editForm.manualInstructions.map((instruction, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={instruction}
                              onChange={(e) => updateInstruction(index, e.target.value)}
                              placeholder="Enter instruction step"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeInstruction(index)}
                              className="flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={addInstruction}
                          className="w-full mt-2"
                        >
                          Add Instruction
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
