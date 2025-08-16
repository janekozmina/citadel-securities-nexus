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
import { portalConfig } from '@/config/portalConfig';

interface TransferInstructionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TransferType = 'DvP' | 'DvF' | 'RvP' | 'RvF';

const TransferInstructionDialog: React.FC<TransferInstructionDialogProps> = ({ open, onOpenChange }) => {
  const [transferType, setTransferType] = useState<TransferType>('DvP');
  const [formData, setFormData] = useState({
    reference: `${portalConfig.app.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}XXX1120S002`,
    commonReference: `${portalConfig.app.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}XXX1120S002`,
    priority: '1000',
    earlySettlementDate: undefined as Date | undefined,
    tradeDate: new Date(),
    valueDate: new Date(),
    transferFromParticipant: `CITIPHMX – CITI BANK`,
    transferFromAccount: 'CITIDEPO',
    transferFromDelivering: 'CITIPHMX',
    transferToParticipant: `HSBCOMLA – HSBC BANK`,
    transferToAccount: 'HSBCDEPO',
    transferToReceiving: 'HSBCOMLA',
    instrumentCode: 'TESTGTY01',
    settlementCurrency: portalConfig.currencies.supported[0] || 'BHD',
    quantity: '',
    availableQuantity: '100,000.00',
    pricePerUnit: '100.00',
    dealAmount: '',
    taxAmount: '0.00',
    feeAmount: '0.00',
    settlementAmount: '1,015,342.50',
    resultingSettlement: '1,015,342.50',
    purposeOfTransfer: 'UNDF',
    descriptionOfTransfer: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleTransferTypeChange = (type: TransferType) => {
    setTransferType(type);
    // Reset some form fields based on transfer type
    setFormData(prev => ({
      ...prev,
      reference: `${portalConfig.app.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}XXX1120S002`,
      commonReference: `${portalConfig.app.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}XXX1120S002`
    }));
  };

  const handleSave = () => {
    toast({
      title: `${transferType} Transfer Saved`,
      description: `The ${getTransferTypeName(transferType)} instruction has been successfully saved.`,
    });
    onOpenChange(false);
  };

  const handleCreateAnother = () => {
    // Reset form but keep transfer type
    setFormData({
      reference: `${portalConfig.app.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}XXX1120S002`,
      commonReference: `${portalConfig.app.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}XXX1120S002`,
      priority: '1000',
      earlySettlementDate: undefined,
      tradeDate: new Date(),
      valueDate: new Date(),
      transferFromParticipant: `CITIPHMX – CITI BANK`,
      transferFromAccount: 'CITIDEPO',
      transferFromDelivering: 'CITIPHMX',
      transferToParticipant: `HSBCOMLA – HSBC BANK`,
      transferToAccount: 'HSBCDEPO',
      transferToReceiving: 'HSBCOMLA',
      instrumentCode: 'TESTGTY01',
      settlementCurrency: portalConfig.currencies.supported[0] || 'BHD',
      quantity: '',
      availableQuantity: '100,000.00',
      pricePerUnit: '100.00',
      dealAmount: '',
      taxAmount: '0.00',
      feeAmount: '0.00',
      settlementAmount: '1,015,342.50',
      resultingSettlement: '1,015,342.50',
      purposeOfTransfer: 'UNDF',
      descriptionOfTransfer: ''
    });
    toast({
      title: "Form Reset",
      description: `Form has been reset for a new ${transferType} transfer.`,
    });
  };

  const getTransferTypeName = (type: TransferType) => {
    switch (type) {
      case 'DvP': return 'Deliver versus Payment';
      case 'DvF': return 'Deliver versus Free';
      case 'RvP': return 'Receive versus Payment';
      case 'RvF': return 'Receive versus Free';
      default: return 'Transfer';
    }
  };

  const isPaymentType = transferType === 'DvP' || transferType === 'RvP';
  const isDeliveryType = transferType === 'DvP' || transferType === 'DvF';

  const DatePicker = ({ value, onChange, placeholder }: { value?: Date; onChange: (date: Date | undefined) => void; placeholder: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-muted",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "dd.MM.yyyy HH:mm") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-background border shadow-lg z-50" align="start">
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {getTransferTypeName(transferType)} instruction
          </DialogTitle>
        </DialogHeader>
        
        {/* Transfer Type Selection */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <Label className="text-sm font-medium mb-3 block">Transfer Type</Label>
          <div className="grid grid-cols-4 gap-2">
            {(['DvP', 'DvF', 'RvP', 'RvF'] as TransferType[]).map((type) => (
              <Button
                key={type}
                variant={transferType === type ? "default" : "outline"}
                size="sm"
                onClick={() => handleTransferTypeChange(type)}
                className="text-xs"
              >
                {type}
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {getTransferTypeName(transferType)}
          </p>
        </div>
        
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
                  className="bg-muted"
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
                  className="bg-muted"
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
                  className="bg-muted"
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
              <h3 className="font-medium mb-3">
                Transfer from {isPaymentType && <span className="text-primary">Payment agent</span>}
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Participant*</Label>
                  <div className="flex">
                    <Input
                      value={formData.transferFromParticipant}
                      onChange={(e) => handleInputChange('transferFromParticipant', e.target.value)}
                      className="bg-muted"
                    />
                    <Button variant="outline" size="icon" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Account*</Label>
                  <Select value={formData.transferFromAccount} onValueChange={(value) => handleInputChange('transferFromAccount', value)}>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CITIDEPO">CITIDEPO</SelectItem>
                      <SelectItem value="HSBCDEPO">HSBCDEPO</SelectItem>
                      {Object.keys(portalConfig.banks.codes).slice(0, 5).map(bankName => (
                        <SelectItem key={portalConfig.banks.codes[bankName]} value={`${portalConfig.banks.codes[bankName]}DEPO`}>
                          {portalConfig.banks.codes[bankName]}DEPO
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">{isDeliveryType ? 'Delivering' : 'Receiving'} agent*</Label>
                  <Select value={formData.transferFromDelivering} onValueChange={(value) => handleInputChange('transferFromDelivering', value)}>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CITIPHMX">CITIPHMX</SelectItem>
                      <SelectItem value="HSBCOMLA">HSBCOMLA</SelectItem>
                      {Object.values(portalConfig.banks.codes).slice(0, 5).map(code => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
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
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TESTGTY01">TESTGTY01 - TESTGTY01</SelectItem>
                      <SelectItem value="GOV001">GOV001 - Government Bond</SelectItem>
                      <SelectItem value="CORP001">CORP001 - Corporate Bond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Settlement currency*</Label>
                  <Select value={formData.settlementCurrency} onValueChange={(value) => handleInputChange('settlementCurrency', value)}>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {portalConfig.currencies.supported.map(currency => (
                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Quantity*</Label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    className="bg-muted"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-sm">Available quantity</Label>
                  <Input
                    value={formData.availableQuantity}
                    onChange={(e) => handleInputChange('availableQuantity', e.target.value)}
                    className="bg-muted"
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
              <h3 className="font-medium mb-3">
                Transfer to {isPaymentType && <span className="text-primary">Payment agent</span>}
              </h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Participant*</Label>
                  <div className="flex">
                    <Input
                      value={formData.transferToParticipant}
                      onChange={(e) => handleInputChange('transferToParticipant', e.target.value)}
                      className="bg-muted"
                    />
                    <Button variant="outline" size="icon" className="ml-2">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Account*</Label>
                  <Select value={formData.transferToAccount} onValueChange={(value) => handleInputChange('transferToAccount', value)}>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HSBCDEPO">HSBCDEPO</SelectItem>
                      <SelectItem value="CITIDEPO">CITIDEPO</SelectItem>
                      {Object.keys(portalConfig.banks.codes).slice(0, 5).map(bankName => (
                        <SelectItem key={portalConfig.banks.codes[bankName]} value={`${portalConfig.banks.codes[bankName]}DEPO`}>
                          {portalConfig.banks.codes[bankName]}DEPO
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">{isDeliveryType ? 'Receiving' : 'Delivering'} agent*</Label>
                  <Select value={formData.transferToReceiving} onValueChange={(value) => handleInputChange('transferToReceiving', value)}>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HSBCOMLA">HSBCOMLA</SelectItem>
                      <SelectItem value="CITIPHMX">CITIPHMX</SelectItem>
                      {Object.values(portalConfig.banks.codes).slice(0, 5).map(code => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Trade Details Section - Only show for payment types */}
            {isPaymentType && (
              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Trade details</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Price per unit*</Label>
                      <Input
                        value={formData.pricePerUnit}
                        onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                        className="bg-muted"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm bg-muted px-3 py-2 border rounded">{formData.settlementCurrency}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Deal amount*</Label>
                      <Input
                        value={formData.dealAmount}
                        onChange={(e) => handleInputChange('dealAmount', e.target.value)}
                        className="bg-muted"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm bg-muted px-3 py-2 border rounded">{formData.settlementCurrency}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Tax amount</Label>
                      <Input
                        value={formData.taxAmount}
                        onChange={(e) => handleInputChange('taxAmount', e.target.value)}
                        className="bg-muted"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm bg-muted px-3 py-2 border rounded">{formData.settlementCurrency}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Fee amount</Label>
                      <Input
                        value={formData.feeAmount}
                        onChange={(e) => handleInputChange('feeAmount', e.target.value)}
                        className="bg-muted"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm bg-muted px-3 py-2 border rounded">{formData.settlementCurrency}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Settlement amount*</Label>
                      <Input
                        value={formData.settlementAmount}
                        onChange={(e) => handleInputChange('settlementAmount', e.target.value)}
                        className="bg-muted"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm bg-muted px-3 py-2 border rounded">{formData.settlementCurrency}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">Resulting settlement amount*</Label>
                      <Input
                        value={formData.resultingSettlement}
                        onChange={(e) => handleInputChange('resultingSettlement', e.target.value)}
                        className="bg-muted"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm bg-muted px-3 py-2 border rounded">{formData.settlementCurrency}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Purpose and Description */}
            <div className="border-t pt-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Purpose of transfer*</Label>
                  <Select value={formData.purposeOfTransfer} onValueChange={(value) => handleInputChange('purposeOfTransfer', value)}>
                    <SelectTrigger className="bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UNDF">UNDF - Undefined</SelectItem>
                      <SelectItem value="TRAD">TRAD - Trading</SelectItem>
                      <SelectItem value="REPO">REPO - Repurchase Agreement</SelectItem>
                      <SelectItem value="COLL">COLL - Collateral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Description of transfer</Label>
                  <Textarea
                    value={formData.descriptionOfTransfer}
                    onChange={(e) => handleInputChange('descriptionOfTransfer', e.target.value)}
                    className="bg-muted min-h-[80px]"
                    placeholder="Enter transfer description..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <div className="flex items-center mr-auto">
            <input
              type="checkbox"
              id="createAnother"
              className="mr-2"
            />
            <Label htmlFor="createAnother" className="text-sm">Create another</Label>
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateAnother} variant="secondary">
            Create another
          </Button>
          <Button onClick={handleSave}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransferInstructionDialog;
