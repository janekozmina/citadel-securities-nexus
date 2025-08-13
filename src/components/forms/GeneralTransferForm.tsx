import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface GeneralTransferFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function GeneralTransferForm({ onSubmit, onCancel }: GeneralTransferFormProps) {
  const [formData, setFormData] = useState({
    debitParticipant: '',
    debitAccount: '',
    debitAccountLimitType: '',
    creditParticipant: '',
    creditAccount: '',
    creditAccountLimitType: '',
    amount: '',
    availableAmount: '',
    currency: 'BHD',
    valueDate: new Date(),
    purposeOfTransfer: '',
    description: '',
    priority: '10'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Debit Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Debit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="debitParticipant" className="text-red-600">Participant</Label>
              <Select value={formData.debitParticipant} onValueChange={(value) => updateField('debitParticipant', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select participant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahli">Ahli United Bank</SelectItem>
                  <SelectItem value="abc">Arab Banking Corporation (Bank ABC)</SelectItem>
                  <SelectItem value="gib">Gulf International Bank (GIB)</SelectItem>
                  <SelectItem value="nbb">National Bank of Bahrain (NBB)</SelectItem>
                  <SelectItem value="bbk">Bank of Bahrain and Kuwait (BBK)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="debitAccount" className="text-red-600">Account</Label>
              <Select value={formData.debitAccount} onValueChange={(value) => updateField('debitAccount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acc1">Account 001</SelectItem>
                  <SelectItem value="acc2">Account 002</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="debitAccountLimitType">Account Limit Type</Label>
              <Select value={formData.debitAccountLimitType} onValueChange={(value) => updateField('debitAccountLimitType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select limit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Credit Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Credit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="creditParticipant" className="text-red-600">Participant</Label>
              <Select value={formData.creditParticipant} onValueChange={(value) => updateField('creditParticipant', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select participant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahli">Ahli United Bank</SelectItem>
                  <SelectItem value="abc">Arab Banking Corporation (Bank ABC)</SelectItem>
                  <SelectItem value="gib">Gulf International Bank (GIB)</SelectItem>
                  <SelectItem value="nbb">National Bank of Bahrain (NBB)</SelectItem>
                  <SelectItem value="bbk">Bank of Bahrain and Kuwait (BBK)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="creditAccount" className="text-red-600">Account</Label>
              <Select value={formData.creditAccount} onValueChange={(value) => updateField('creditAccount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acc1">Account 001</SelectItem>
                  <SelectItem value="acc2">Account 002</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="creditAccountLimitType">Account Limit Type</Label>
              <Select value={formData.creditAccountLimitType} onValueChange={(value) => updateField('creditAccountLimitType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select limit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount" className="text-red-600">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => updateField('amount', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="availableAmount">Available Amount</Label>
              <Input
                id="availableAmount"
                type="number"
                value={formData.availableAmount}
                onChange={(e) => updateField('availableAmount', e.target.value)}
                placeholder="0"
                className="bg-gray-50"
                readOnly
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={formData.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                className="bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="valueDate">Value Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.valueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.valueDate ? format(formData.valueDate, "EEEE - MMMM - dd - yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.valueDate}
                    onSelect={(date) => updateField('valueDate', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <Label htmlFor="purposeOfTransfer" className="text-red-600">Purpose of transfer</Label>
            <Select value={formData.purposeOfTransfer} onValueChange={(value) => updateField('purposeOfTransfer', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="settlement">Settlement</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description of transfer (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Enter description..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Priority Section */}
      <Card>
        <CardHeader>
          <CardTitle>Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="priority">Priority (0-10)</Label>
            <Select value={formData.priority} onValueChange={(value) => updateField('priority', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 11 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>{i} {i === 10 ? '(10)' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Close
        </Button>
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}