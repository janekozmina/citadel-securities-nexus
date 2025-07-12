import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DvPTransferFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DvPTransferForm: React.FC<DvPTransferFormProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    reference: '',
    commonReference: '',
    priority: '1000',
    earlySettlementDate: undefined as Date | undefined,
    tradeDate: undefined as Date | undefined,
    valueDate: undefined as Date | undefined,
    transferFromParticipant: '',
    transferFromAccount: '',
    transferFromDelivering: '',
    transferToParticipant: '',
    transferToAccount: '',
    transferToReceiving: '',
    instrumentCode: '',
    settlementCurrency: '',
    quantity: '',
    availableQuantity: '100.000.00',
    pricePerUnit: '100.00',
    dealAmount: '',
    taxAmount: '0.00',
    feeAmount: '0.00',
    settlementAmount: '1.015.342.50',
    resultingSettlement: '1.015.342.50',
    purposeOfTransfer: '',
    descriptionOfTransfer: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSave = () => {
    // Emulate saving
    toast({
      title: "DvP Transfer Saved",
      description: "The deliver versus payment instruction has been successfully saved.",
    });
    onOpenChange(false);
  };

  const handleCreateAnother = () => {
    // Reset form
    setFormData({
      reference: '',
      commonReference: '',
      priority: '1000',
      earlySettlementDate: undefined,
      tradeDate: undefined,
      valueDate: undefined,
      transferFromParticipant: '',
      transferFromAccount: '',
      transferFromDelivering: '',
      transferToParticipant: '',
      transferToAccount: '',
      transferToReceiving: '',
      instrumentCode: '',
      settlementCurrency: '',
      quantity: '',
      availableQuantity: '100.000.00',
      pricePerUnit: '100.00',
      dealAmount: '',
      taxAmount: '0.00',
      feeAmount: '0.00',
      settlementAmount: '1.015.342.50',
      resultingSettlement: '1.015.342.50',
      purposeOfTransfer: '',
      descriptionOfTransfer: ''
    });
    toast({
      title: "Form Reset",
      description: "Form has been reset for a new DvP transfer.",
    });
  };

  const DatePicker = ({ value, onChange, placeholder }: { value?: Date; onChange: (date: Date | undefined) => void; placeholder: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-gray-100",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd.MM.yyyy HH:mm") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Deliver versus payment instruction</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reference" className="text-sm font-medium">Reference</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  className="bg-gray-100"
                  placeholder="CITIAXXX1120S002"
                />
              </div>
              <div>
                <Label htmlFor="earlySettlement" className="text-sm font-medium">Early settlement date/time*</Label>
                <DatePicker
                  value={formData.earlySettlementDate}
                  onChange={(date) => handleDateChange('earlySettlementDate', date)}
                  placeholder="20.09.2023 00:00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commonRef" className="text-sm font-medium">Common reference*</Label>
                <Input
                  id="commonRef"
                  value={formData.commonReference}
                  onChange={(e) => handleInputChange('commonReference', e.target.value)}
                  className="bg-gray-100"
                  placeholder="CITIAXXX1120S002"
                />
              </div>
              <div>
                <Label htmlFor="tradeDate" className="text-sm font-medium">Trade date*</Label>
                <DatePicker
                  value={formData.tradeDate}
                  onChange={(date) => handleDateChange('tradeDate', date)}
                  placeholder="20.09.2023"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
                <Input
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="valueDate" className="text-sm font-medium">Value date*</Label>
                <DatePicker
                  value={formData.valueDate}
                  onChange={(date) => handleDateChange('valueDate', date)}
                  placeholder="20.09.2023"
                />
              </div>
            </div>

            {/* Transfer From Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Transfer from <span className="text-blue-600">Payment agent</span></h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Participant*</Label>
                  <div className="flex">
                    <Input
                      value={formData.transferFromParticipant}
                      onChange={(e) => handleInputChange('transferFromParticipant', e.target.value)}
                      className="bg-gray-100"
                      placeholder="CITIPHMX – CITI BANK"
                    />
                    <Button variant="outline" size="icon" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Account*</Label>
                  <Select value={formData.transferFromAccount} onValueChange={(value) => handleInputChange('transferFromAccount', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="CITIDEPO" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="CITIDEPO">CITIDEPO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Delivering agent*</Label>
                  <Select value={formData.transferFromDelivering} onValueChange={(value) => handleInputChange('transferFromDelivering', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="CITIPHMX" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="CITIPHMX">CITIPHMX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Instrument Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Instrument</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Code*</Label>
                  <Select value={formData.instrumentCode} onValueChange={(value) => handleInputChange('instrumentCode', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="TESTGTY01 - TESTGTY01" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="TESTGTY01">TESTGTY01 - TESTGTY01</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Settlement currency*</Label>
                  <Select value={formData.settlementCurrency} onValueChange={(value) => handleInputChange('settlementCurrency', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="PHP" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="PHP">PHP</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Quantity*</Label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    className="bg-gray-100"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm">Available quantity</Label>
                  <Input
                    value={formData.availableQuantity}
                    onChange={(e) => handleInputChange('availableQuantity', e.target.value)}
                    className="bg-gray-100"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Transfer To Section */}
            <div>
              <h3 className="font-medium mb-3">Transfer to <span className="text-blue-600">Payment agent</span></h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Participant*</Label>
                  <div className="flex">
                    <Input
                      value={formData.transferToParticipant}
                      onChange={(e) => handleInputChange('transferToParticipant', e.target.value)}
                      className="bg-gray-100"
                      placeholder="HSBCOMLA – HSBC BANK"
                    />
                    <Button variant="outline" size="icon" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Account*</Label>
                  <Select value={formData.transferToAccount} onValueChange={(value) => handleInputChange('transferToAccount', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="HSBCDEPO" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="HSBCDEPO">HSBCDEPO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Receiving agent*</Label>
                  <Select value={formData.transferToReceiving} onValueChange={(value) => handleInputChange('transferToReceiving', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="HSBCOMLA" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="HSBCOMLA">HSBCOMLA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Trade Details Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Trade details</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Price per unit*</Label>
                    <Input
                      value={formData.pricePerUnit}
                      onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-gray-100 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Deal amount*</Label>
                    <Input
                      value={formData.dealAmount}
                      onChange={(e) => handleInputChange('dealAmount', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-gray-100 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Tax amount</Label>
                    <Input
                      value={formData.taxAmount}
                      onChange={(e) => handleInputChange('taxAmount', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-gray-100 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Fee amount</Label>
                    <Input
                      value={formData.feeAmount}
                      onChange={(e) => handleInputChange('feeAmount', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-gray-100 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Settlement amount*</Label>
                    <Input
                      value={formData.settlementAmount}
                      onChange={(e) => handleInputChange('settlementAmount', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-gray-100 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Resulting settlement amount*</Label>
                    <Input
                      value={formData.resultingSettlement}
                      onChange={(e) => handleInputChange('resultingSettlement', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-gray-100 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Purpose of transfer*</Label>
                  <Select value={formData.purposeOfTransfer} onValueChange={(value) => handleInputChange('purposeOfTransfer', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="UNDF - Undefined" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="UNDF">UNDF - Undefined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Description of transfer</Label>
                  <Textarea
                    value={formData.descriptionOfTransfer}
                    onChange={(e) => handleInputChange('descriptionOfTransfer', e.target.value)}
                    className="bg-gray-100 min-h-[80px]"
                    placeholder="Enter description..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCreateAnother}>
            Create another
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DvPTransferForm;