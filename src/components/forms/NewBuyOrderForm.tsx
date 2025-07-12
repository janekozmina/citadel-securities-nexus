import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewBuyOrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewBuyOrderForm: React.FC<NewBuyOrderFormProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    positionAccount: '1100062BARB00',
    orderType: 'competitive',
    executionType: 'partial',
    rate: '5.00',
    price: '98.7687728',
    faceAmount: '1,000,000',
    unitValue: '10.00',
    discountPrice: '98,768.77',
    settlementAmount: '987,687.70'
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCalcPrice = () => {
    // Simulate price calculation
    const newPrice = (100 - (parseFloat(formData.rate) * 0.5)).toFixed(7);
    setFormData(prev => ({ ...prev, price: newPrice }));
    toast({
      title: "Price Calculated",
      description: `Price updated to ${newPrice}`,
    });
  };

  const handleCalcSettlement = () => {
    // Simulate settlement calculation
    const faceValue = parseFloat(formData.faceAmount.replace(/,/g, ''));
    const price = parseFloat(formData.price);
    const settlement = (faceValue * price / 100).toFixed(2);
    setFormData(prev => ({ ...prev, settlementAmount: settlement }));
    toast({
      title: "Settlement Calculated",
      description: `Settlement amount updated to ${settlement}`,
    });
  };

  const handleBuy = () => {
    toast({
      title: "Buy Order Created",
      description: "The buy order has been successfully submitted.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader className="bg-blue-600 text-white p-4 -m-6 mb-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              New buy order (Session code: CBBILLTEST004/MN - Instrument: CBBILLTEST004)
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Buyer Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Buyer</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Position account</Label>
                <Select value={formData.positionAccount} onValueChange={(value) => handleInputChange('positionAccount', value)}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    <SelectItem value="1100062BARB00">1100062BARB00</SelectItem>
                    <SelectItem value="1100062BARB01">1100062BARB01</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Order details</h3>
            
            {/* Order Type Radio Buttons */}
            <div className="mb-4">
              <RadioGroup 
                value={formData.orderType} 
                onValueChange={(value) => handleInputChange('orderType', value)}
                className="flex space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="competitive" id="competitive" />
                  <Label htmlFor="competitive" className="text-sm">Competitive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-competitive" id="non-competitive" />
                  <Label htmlFor="non-competitive" className="text-sm">Non-Competitive</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Execution Type Radio Buttons */}
            <div className="mb-6">
              <RadioGroup 
                value={formData.executionType} 
                onValueChange={(value) => handleInputChange('executionType', value)}
                className="flex space-x-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="partial" id="partial" />
                  <Label htmlFor="partial" className="text-sm">Partial Execution</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="text-sm">Full Execution</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Rate *</Label>
                  <Input
                    value={formData.rate}
                    onChange={(e) => handleInputChange('rate', e.target.value)}
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Price</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="bg-gray-100 flex-1"
                    />
                    <Button 
                      onClick={handleCalcPrice}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                    >
                      Calc price
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span>Discount price per 1 unit: {formData.discountPrice}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-600">Face amount *</Label>
                  <Input
                    value={formData.faceAmount}
                    onChange={(e) => handleInputChange('faceAmount', e.target.value)}
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Unit value</Label>
                  <Input
                    value={formData.unitValue}
                    onChange={(e) => handleInputChange('unitValue', e.target.value)}
                    className="bg-gray-100"
                  />
                </div>

                <div>
                  <Label className="text-sm text-gray-600">Approx. settlement amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={formData.settlementAmount}
                      onChange={(e) => handleInputChange('settlementAmount', e.target.value)}
                      className="bg-gray-100 flex-1"
                    />
                    <Button 
                      onClick={handleCalcSettlement}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                    >
                      Calc
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 border-t">
          <Button 
            onClick={handleBuy}
            className="bg-blue-800 hover:bg-blue-900 text-white px-8"
          >
            Buy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewBuyOrderForm;