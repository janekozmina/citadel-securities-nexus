import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { Calendar, CalendarDays, Clock, Coins, Users } from 'lucide-react';

interface AuctionWizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ParticipantData {
  id: string;
  particId: string;
  particCode: string;
  particName: string;
  isSelected: boolean;
}

const AuctionWizardDialog: React.FC<AuctionWizardDialogProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [auctionData, setAuctionData] = useState({
    profile: 'Government Primary Auction',
    type: 'IPOO',
    instrument: 'TESTGOVBOND06 (TESTGOVBOND06)',
    code: 'TESTGOVBOND06/MN1',
    announcementDate: new Date(),
    startDate: new Date(),
    preclosingDate: new Date(),
    submissionFinishDate: new Date(),
    approveDate: new Date(),
    settlementDate: new Date(),
    quotationType: 'Quotation based on yield. Standard P(Y) formula is used (PYIEL)',
    noPriceRecommendations: true,
    noAuctionAmount: true,
    useMinMaxPrices: false,
    minPrice: '',
    maxPrice: '',
    positionAccount: 'MOF PMLC Position Account 01 (MOFPMLCPA01)',
    seller: 'Ministry of Finance',
    depoAccount: 'MOFMISSU',
    deliveryAgent: 'Ministry of Finance',
    paymentAgent: 'Central Bank',
    cashAccount: 'CB-AED'
  });

  const [participants] = useState<ParticipantData[]>([
    { id: '1', particId: '841,414...', particCode: 'ADCBAEAA', particName: 'Abu Dhabi...', isSelected: true },
    { id: '2', particId: '841,315...', particCode: 'BARBSCSC', particName: 'BANK OF ...', isSelected: true },
    { id: '3', particId: '841,315...', particCode: 'BCEYSCSC', particName: 'BANK OF ...', isSelected: true },
    { id: '4', particId: '841,315...', particCode: 'BMUSSCSC', particName: 'AL SALAM ...', isSelected: true },
    { id: '5', particId: '841,315...', particCode: 'BNZWOMRX', particName: 'BANK NIZ...', isSelected: true },
    { id: '6', particId: '841,315...', particCode: 'CITIPHMX', particName: 'CITI BANK', isSelected: true },
    { id: '7', particId: '841,315...', particCode: 'DEUTPHMM', particName: 'DEUTSCH...', isSelected: true },
    { id: '8', particId: '841,414...', particCode: 'EBILAEAD', particName: 'Emirates ...', isSelected: true },
    { id: '9', particId: '841,315...', particCode: 'HSBCOMLA', particName: 'HSBC BANK', isSelected: true },
    { id: '10', particId: '841,315...', particCode: 'IZZBOMRU', particName: 'ALIZZ ISL...', isSelected: true },
    { id: '11', particId: '841,315...', particCode: 'NOVHSCSC', particName: 'NOUVOBA...', isSelected: true },
    { id: '12', particId: '801,289...', particCode: 'TDBMMNUB', particName: 'TRADE AN...', isSelected: true }
  ]);

  const participantColumns = [
    { key: 'particId', label: 'ParticId' },
    { key: 'particCode', label: 'ParticCode' },
    { key: 'particName', label: 'ParticName' }
  ];

  const steps = [
    { number: 1, title: 'General Auction Parameters', icon: Calendar },
    { number: 2, title: 'Invited Participants', icon: Users },
    { number: 3, title: 'Auction Prices and Amounts', icon: Coins },
    { number: 4, title: 'Organizer', icon: CalendarDays }
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    console.log('Auction created:', auctionData);
    onOpenChange(false);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  General Auction Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="profile">Auction Profile</Label>
                    <Select value={auctionData.profile} onValueChange={(value) => setAuctionData({...auctionData, profile: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Government Primary Auction">Government Primary Auction</SelectItem>
                        <SelectItem value="Corporate Auction">Corporate Auction</SelectItem>
                        <SelectItem value="Repo Auction">Repo Auction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Auction Type</Label>
                    <Select value={auctionData.type} onValueChange={(value) => setAuctionData({...auctionData, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IPOO">IPOO</SelectItem>
                        <SelectItem value="REPO">REPO</SelectItem>
                        <SelectItem value="DEPOSIT">DEPOSIT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="instrument">Code of instrument</Label>
                  <Select value={auctionData.instrument} onValueChange={(value) => setAuctionData({...auctionData, instrument: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TESTGOVBOND06 (TESTGOVBOND06)">TESTGOVBOND06 (TESTGOVBOND06)</SelectItem>
                      <SelectItem value="TESTCBBILL001">TESTCBBILL001</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label htmlFor="code">Auction Code</Label>
                    <Input 
                      id="code" 
                      value={auctionData.code}
                      onChange={(e) => setAuctionData({...auctionData, code: e.target.value})}
                    />
                  </div>
                  <Button variant="outline" className="mt-6">Auto</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Announcement Date</Label>
                    <div className="flex items-center gap-2">
                      <Input type="date" defaultValue="2025-07-14" />
                      <Input type="time" defaultValue="07:33:00" />
                    </div>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <div className="flex items-center gap-2">
                      <Input type="date" defaultValue="2025-07-14" />
                      <Input type="time" defaultValue="08:48:00" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Auction Preclosing Date</Label>
                    <div className="flex items-center gap-2">
                      <Input type="date" defaultValue="2025-07-14" />
                      <Input type="time" defaultValue="18:48:00" />
                    </div>
                  </div>
                  <div>
                    <Label>Submission Finish Date</Label>
                    <div className="flex items-center gap-2">
                      <Input type="date" defaultValue="2025-07-14" />
                      <Input type="time" defaultValue="18:49:00" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Approve Auction Date</Label>
                    <div className="flex items-center gap-2">
                      <Input type="date" defaultValue="2025-07-14" />
                      <Input type="time" defaultValue="18:51:00" />
                    </div>
                  </div>
                  <div>
                    <Label>Settlement Date</Label>
                    <div className="flex items-center gap-2">
                      <Input type="date" defaultValue="2025-07-14" />
                      <Checkbox className="mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Invited Participants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  title="Invited Participants"
                  columns={participantColumns}
                  data={participants}
                  itemsPerPage={10}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Auction Prices and Amounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Quotation types</Label>
                  <Select value={auctionData.quotationType} onValueChange={(value) => setAuctionData({...auctionData, quotationType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quotation based on yield. Standard P(Y) formula is used (PYIEL)">
                        Quotation based on yield. Standard P(Y) formula is used (PYIEL)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="no-price-recommendations"
                      checked={auctionData.noPriceRecommendations}
                      onCheckedChange={(checked) => setAuctionData({...auctionData, noPriceRecommendations: checked as boolean})}
                    />
                    <Label htmlFor="no-price-recommendations">No Price Recommendations</Label>
                  </div>
                  
                  {!auctionData.noPriceRecommendations && (
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <Input placeholder="0.000000" />
                      <Input placeholder="0.000000" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="no-auction-amount"
                      checked={auctionData.noAuctionAmount}
                      onCheckedChange={(checked) => setAuctionData({...auctionData, noAuctionAmount: checked as boolean})}
                    />
                    <Label htmlFor="no-auction-amount">No Auction Amount</Label>
                  </div>
                  
                  {!auctionData.noAuctionAmount && (
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <Label>Auction Amount (FAMT)</Label>
                        <Input placeholder="0" />
                      </div>
                      <div>
                        <Label>Available Amount</Label>
                        <Input placeholder="0.00" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-medium">Minimum/Maximum Prices</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Minimum Price</Label>
                      <Input 
                        placeholder="0.000000"
                        value={auctionData.minPrice}
                        onChange={(e) => setAuctionData({...auctionData, minPrice: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Maximum Price</Label>
                      <Input 
                        placeholder="0.000000"
                        value={auctionData.maxPrice}
                        onChange={(e) => setAuctionData({...auctionData, maxPrice: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="use-min-max-prices"
                      checked={auctionData.useMinMaxPrices}
                      onCheckedChange={(checked) => setAuctionData({...auctionData, useMinMaxPrices: checked as boolean})}
                    />
                    <Label htmlFor="use-min-max-prices">Use Minimum/Maximum Prices</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Organizer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <Label>Position Account</Label>
                    <Input 
                      value={auctionData.positionAccount}
                      onChange={(e) => setAuctionData({...auctionData, positionAccount: e.target.value})}
                    />
                  </div>
                  <Button variant="outline" className="mt-6">Search</Button>
                </div>
                <div>
                  <Label>Seller</Label>
                  <Input 
                    value={auctionData.seller}
                    onChange={(e) => setAuctionData({...auctionData, seller: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Depo account</Label>
                  <Input 
                    value={auctionData.depoAccount}
                    onChange={(e) => setAuctionData({...auctionData, depoAccount: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Delivery Agent</Label>
                  <Input 
                    value={auctionData.deliveryAgent}
                    onChange={(e) => setAuctionData({...auctionData, deliveryAgent: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Payment Agent</Label>
                  <Input 
                    value={auctionData.paymentAgent}
                    onChange={(e) => setAuctionData({...auctionData, paymentAgent: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Cash Account</Label>
                  <Input 
                    value={auctionData.cashAccount}
                    onChange={(e) => setAuctionData({...auctionData, cashAccount: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary" />
            <DialogTitle>Auction Wizard</DialogTitle>
          </div>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  currentStep === step.number 
                    ? 'bg-primary text-primary-foreground' 
                    : currentStep > step.number 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-px mx-2 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="flex-1">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            &lt; Back
          </Button>
          <div className="flex gap-2">
            {currentStep === 4 ? (
              <>
                <Button variant="outline" onClick={handleFinish}>
                  Finish
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button onClick={nextStep}>
                  Next &gt;
                </Button>
                <Button variant="outline" onClick={handleFinish}>
                  Finish
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuctionWizardDialog;