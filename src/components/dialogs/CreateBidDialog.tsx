import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateBidDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateBidDialog = ({ open, onOpenChange }: CreateBidDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    auctionCode: '',
    instrumentType: '',
    bidAmount: '',
    bidPrice: '',
    bidYield: '',
    participantId: '',
    notes: ''
  });

  // Calculate yield from price (simplified formula for MTB)
  const calculateYield = () => {
    const price = parseFloat(formData.bidPrice);
    if (price && price > 0) {
      // Simplified discount yield formula: ((100 - Price) / Price) * (365 / Days to Maturity) * 100
      // Assuming 91 days for Treasury Bills
      const discountYield = ((100 - price) / price) * (365 / 91) * 100;
      setFormData(prev => ({
        ...prev,
        bidYield: discountYield.toFixed(3)
      }));
      toast({
        title: "Yield Calculated",
        description: `Discount yield calculated: ${discountYield.toFixed(3)}%`
      });
    }
  };

  // Calculate price from yield
  const calculatePrice = () => {
    const yieldValue = parseFloat(formData.bidYield);
    if (yieldValue && yieldValue > 0) {
      // Reverse formula: Price = 100 / (1 + (Yield * Days to Maturity / 365))
      const price = 100 / (1 + (yieldValue / 100 * 91 / 365));
      setFormData(prev => ({
        ...prev,
        bidPrice: price.toFixed(3)
      }));
      toast({
        title: "Price Calculated", 
        description: `Bid price calculated: $${price.toFixed(3)}`
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.bidPrice || !formData.bidAmount) {
      toast({
        title: "Missing Information",
        description: "Please provide bid price and amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bid Created",
      description: `Bid submitted with price $${formData.bidPrice} per $100 face value`
    });
    onOpenChange(false);
    
    // Reset form
    setFormData({
      auctionCode: '',
      instrumentType: '',
      bidAmount: '',
      bidPrice: '',
      bidYield: '',
      participantId: '',
      notes: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Create Bid
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Auction Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Auction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="auctionCode">Auction Code</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, auctionCode: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select auction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A03">A03 - TESTCBBILL001</SelectItem>
                      <SelectItem value="A04">A04 - TESTCBBILL002</SelectItem>
                      <SelectItem value="A05">A05 - TESTCBBOND001</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="instrumentType">Instrument Type</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, instrumentType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mtb">Treasury Bill (MTB)</SelectItem>
                      <SelectItem value="bond">Treasury Bond</SelectItem>
                      <SelectItem value="sukuk">Islamic Sukuk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bid Parameters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Bid Parameters (Main Quotation Type: Price)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bidAmount">Bid Amount (BHD)</Label>
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter bid amount"
                  value={formData.bidAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, bidAmount: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bidPrice">Price (per $100 face value)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bidPrice"
                      type="number"
                      step="0.001"
                      placeholder="e.g., 98.500"
                      value={formData.bidPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, bidPrice: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={calculatePrice}
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      Calc Price
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="bidYield">Discount Yield (%)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bidYield"
                      type="number"
                      step="0.001"
                      placeholder="e.g., 1.750"
                      value={formData.bidYield}
                      onChange={(e) => setFormData(prev => ({ ...prev, bidYield: e.target.value }))}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={calculateYield}
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      Calc Yield
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="participantId">Participant ID</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, participantId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select participant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="P001">P001 - ABC Bank</SelectItem>
                    <SelectItem value="P002">P002 - XYZ Financial</SelectItem>
                    <SelectItem value="P003">P003 - DEF Securities</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Additional notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Bid
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};