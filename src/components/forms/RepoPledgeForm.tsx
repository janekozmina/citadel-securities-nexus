import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RepoPledgeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RepoPledgeForm: React.FC<RepoPledgeFormProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    reference: '',
    commonReference: '',
    priority: '1000',
    earlySettlementDate: undefined as Date | undefined,
    tradeDate: undefined as Date | undefined,
    lenderParticipant: '',
    lenderAccount: '',
    lenderDelivering: '',
    borrowerParticipant: '',
    borrowerAccount: '',
    borrowerReceiving: '',
    loanValue: '',
    valueDate: undefined as Date | undefined,
    allowExtension: false,
    repoCollateralType: 'HIC',
    initialMargin: '100',
    repoRate: '10',
    maturityDate: undefined as Date | undefined,
    terminationValue: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSave = () => {
    toast({
      title: "Repo Pledge Saved",
      description: "The repo pledge instruction has been successfully saved.",
    });
    onOpenChange(false);
  };

  const handleCreateAnother = () => {
    setFormData({
      reference: '',
      commonReference: '',
      priority: '1000',
      earlySettlementDate: undefined,
      tradeDate: undefined,
      lenderParticipant: '',
      lenderAccount: '',
      lenderDelivering: '',
      borrowerParticipant: '',
      borrowerAccount: '',
      borrowerReceiving: '',
      loanValue: '',
      valueDate: undefined,
      allowExtension: false,
      repoCollateralType: 'HIC',
      initialMargin: '100',
      repoRate: '10',
      maturityDate: undefined,
      terminationValue: ''
    });
    toast({
      title: "Form Reset",
      description: "Form has been reset for a new repo pledge.",
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
          <DialogTitle className="text-lg font-semibold">REPO pledge (initiated by lender)</DialogTitle>
          <div className="flex space-x-4 text-sm">
            <span className="text-blue-600 border-b-2 border-blue-600 pb-1">Details</span>
            <span className="text-gray-500">Instruments</span>
          </div>
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
                  placeholder="CITIAXXX1120S003"
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
                  placeholder="CITIAXXX1120S003"
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

            <div>
              <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
              <Input
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="bg-gray-100"
              />
            </div>

            {/* Lender Party Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Lender party <span className="text-blue-600">Payment agent</span></h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Participant*</Label>
                  <div className="flex">
                    <Input
                      value={formData.lenderParticipant}
                      onChange={(e) => handleInputChange('lenderParticipant', e.target.value)}
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
                  <Select value={formData.lenderAccount} onValueChange={(value) => handleInputChange('lenderAccount', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="CITICASHVI" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="CITICASHVI">CITICASHVI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Delivering agent*</Label>
                  <Select value={formData.lenderDelivering} onValueChange={(value) => handleInputChange('lenderDelivering', value)}>
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

            {/* 1st leg details */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">1st leg details</h3>
              <div className="flex justify-end mb-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Collateral allocation ↗
                </Button>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Loan value*</Label>
                    <Input
                      value={formData.loanValue}
                      onChange={(e) => handleInputChange('loanValue', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-2 border rounded">PHP</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm">Value date*</Label>
                  <DatePicker
                    value={formData.valueDate}
                    onChange={(date) => handleDateChange('valueDate', date)}
                    placeholder="20.09.2023"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Borrower Party Section */}
            <div>
              <h3 className="font-medium mb-3">Borrower party <span className="text-blue-600">Payment agent</span></h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Participant*</Label>
                  <div className="flex">
                    <Input
                      value={formData.borrowerParticipant}
                      onChange={(e) => handleInputChange('borrowerParticipant', e.target.value)}
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
                  <Select value={formData.borrowerAccount} onValueChange={(value) => handleInputChange('borrowerAccount', value)}>
                    <SelectTrigger className="bg-gray-100">
                      <SelectValue placeholder="HSBCCASHVI" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="HSBCCASHVI">HSBCCASHVI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">Receiving agent*</Label>
                  <Select value={formData.borrowerReceiving} onValueChange={(value) => handleInputChange('borrowerReceiving', value)}>
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

            {/* 2nd leg details */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">2nd leg details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="allowExtension"
                    checked={formData.allowExtension}
                    onCheckedChange={(checked) => handleInputChange('allowExtension', checked as boolean)}
                  />
                  <Label htmlFor="allowExtension" className="text-sm">Allow extension</Label>
                </div>

                <div>
                  <Label className="text-sm font-medium">REPO collateral settlement type*</Label>
                  <RadioGroup 
                    value={formData.repoCollateralType} 
                    onValueChange={(value) => handleInputChange('repoCollateralType', value)}
                    className="flex space-x-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HIC" id="hic" />
                      <Label htmlFor="hic" className="text-sm">HIC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Classic" id="classic" />
                      <Label htmlFor="classic" className="text-sm">Classic</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-sm">Initial margin</Label>
                  <Input
                    value={formData.initialMargin}
                    onChange={(e) => handleInputChange('initialMargin', e.target.value)}
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label className="text-sm">Repo rate*</Label>
                  <Input
                    value={formData.repoRate}
                    onChange={(e) => handleInputChange('repoRate', e.target.value)}
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label className="text-sm">Maturity date*</Label>
                  <DatePicker
                    value={formData.maturityDate}
                    onChange={(date) => handleDateChange('maturityDate', date)}
                    placeholder="28.09.2023"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-sm">Termination value*</Label>
                    <Input
                      value={formData.terminationValue}
                      onChange={(e) => handleInputChange('terminationValue', e.target.value)}
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="flex items-end">
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-2 border rounded">PHP</span>
                  </div>
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

export default RepoPledgeForm;