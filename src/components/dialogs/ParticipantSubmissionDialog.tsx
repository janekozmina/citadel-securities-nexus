import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ParticipantSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ParticipantSubmissionDialog = ({ open, onOpenChange }: ParticipantSubmissionDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    auctionCode: '',
    bidAmount: '',
    bidPrice: '',
    bidYield: '',
    quotationType: 'price' as 'price' | 'yield'
  });

  // Calculate yield from price (MTB discount yield formula)
  const calculateYield = () => {
    const price = parseFloat(formData.bidPrice);
    if (price && price > 0) {
      // Discount yield formula for Treasury Bills: ((100 - Price) / Price) * (365 / Days to Maturity) * 100
      // Assuming 91 days for Treasury Bills
      const discountYield = ((100 - price) / price) * (365 / 91) * 100;
      setFormData(prev => ({
        ...prev,
        bidYield: discountYield.toFixed(3)
      }));
      toast({
        title: "Yield Calculated",
        description: `Discount yield: ${discountYield.toFixed(3)}%`
      });
    } else {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price value",
        variant: "destructive"
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
        description: `Bid price: $${price.toFixed(3)} per $100 face value`
      });
    } else {
      toast({
        title: "Invalid Yield",
        description: "Please enter a valid yield value",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.bidPrice || !formData.bidAmount || !formData.auctionCode) {
      toast({
        title: "Missing Information",
        description: "Please provide auction code, bid amount, and price",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bid Submitted Successfully",
      description: `Bid submitted for auction ${formData.auctionCode} with price $${formData.bidPrice} (Amount: BHD ${formData.bidAmount})`
    });
    onOpenChange(false);
    
    // Reset form
    setFormData({
      auctionCode: '',
      bidAmount: '',
      bidPrice: '',
      bidYield: '',
      quotationType: 'price'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Submit Bid - Participant Portal
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Auction Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                Available Auctions
                <Badge variant="secondary">Main Quotation Type: Price</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="auctionCode">Select Auction</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, auctionCode: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose auction to bid on" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A04">A04 - TESTCBBILL002 (Active)</SelectItem>
                    <SelectItem value="A05">A05 - TESTCBBOND001 (Active)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bid Submission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Bid Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bidAmount">Bid Amount (BHD)</Label>
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter your bid amount"
                  value={formData.bidAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, bidAmount: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bidPrice">Price (per $100 face value) *</Label>
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
                      disabled={!formData.bidYield}
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      Calc Price
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Main parameter for bid submission
                  </p>
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
                      disabled={!formData.bidPrice}
                      className="flex items-center gap-1"
                    >
                      <Calculator className="h-3 w-3" />
                      Calc Yield
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    For MTB instruments (91-day calculation)
                  </p>
                </div>
              </div>

              {/* Calculation Info */}
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Calculation Notes:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Price calculation: Based on discount yield formula for Treasury Bills</li>
                  <li>• Yield calculation: Discount yield = ((100 - Price) / Price) × (365 / Days) × 100</li>
                  <li>• Final bid will be submitted using Price as the main parameter</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Bid Summary */}
          {formData.bidPrice && formData.bidAmount && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Bid Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Auction:</span>
                    <p className="font-medium">{formData.auctionCode}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <p className="font-medium">BHD {formData.bidAmount}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <p className="font-medium">${formData.bidPrice}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Yield:</span>
                    <p className="font-medium">{formData.bidYield}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Submit Bid
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};