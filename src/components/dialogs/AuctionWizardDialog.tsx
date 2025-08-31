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
import { Separator } from '@/components/ui/separator';
import { Calendar, CalendarDays, Clock, Coins, Users, PlayCircle, RotateCcw } from 'lucide-react';

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
  const [isAuctionCreated, setIsAuctionCreated] = useState(false);
  const [simulationResults, setSimulationResults] = useState({
    satisfied: 2,
    partlySatisfied: 1,
    rejected: 1,
    satisfiedValue: 50000000,
    rejectedValue: 10000000,
    winnerPrice: 5.80000,
    minPrice: 5.50000,
    maxPrice: 6.00000
  });
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
    { number: 4, title: 'Organizer', icon: CalendarDays },
    { number: 5, title: 'Run Simulation', icon: PlayCircle }
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      if (currentStep === 4) {
        setIsAuctionCreated(true);
      }
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
    setIsAuctionCreated(false);
  };

  const runSimulation = () => {
    // Generate random simulation results
    const randomSatisfied = Math.floor(Math.random() * 3) + 1;
    const randomRejected = Math.floor(Math.random() * 2) + 1;
    const randomSatisfiedValue = Math.floor(Math.random() * 40000000) + 30000000;
    const randomRejectedValue = Math.floor(Math.random() * 20000000) + 5000000;
    const randomWinnerPrice = (Math.random() * 1.5 + 5.0).toFixed(5);
    
    setSimulationResults({
      satisfied: randomSatisfied,
      partlySatisfied: Math.floor(Math.random() * 2),
      rejected: randomRejected,
      satisfiedValue: randomSatisfiedValue,
      rejectedValue: randomRejectedValue,
      winnerPrice: parseFloat(randomWinnerPrice),
      minPrice: 5.50000,
      maxPrice: 6.00000
    });
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
                      <SelectItem value="TESTCCBOND01">TESTCCBOND01</SelectItem>
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
                  title=""
                  columns={participantColumns}
                  data={participants}
                  itemsPerPage={10}
                  searchPlaceholder="Search participants..."
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

      case 5:
        return (
          <div className="space-y-6">
            {isAuctionCreated && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <PlayCircle className="h-5 w-5" />
                  <span className="font-medium">Auction Created Successfully!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">You can now run simulations to see various auction results.</p>
              </div>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Auction Results Calculations
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Auction Code: {auctionData.code}
                  </div>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Quotation Method: {auctionData.quotationType} - Instrument Code: {auctionData.instrument}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auction Summary */}
                <div className="grid grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Issued Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Registration Date</span>
                        <span>July 14, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Issue Date</span>
                        <span>July 14, 2025</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Auction Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Auction Amount</span>
                        <span>0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Orders Amount</span>
                        <span>60,000,000</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Concurrent Orders Price Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Orders Min Price</span>
                        <span>5.00000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Orders Max Price</span>
                        <span>6.00000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Orders Avg Price</span>
                        <span>5.66667</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Calculation Parameters */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Amount Calculations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Calculate to satisfy following quantity</span>
                        <Input className="w-24 h-8" value="50,000,000" readOnly />
                        <Checkbox defaultChecked />
                        <span>Use</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>Calculate to satisfy following amount</span>
                        <Input className="w-24 h-8" value="50,000,000" readOnly />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Cut off Price Calculations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span>Cut Off Price/Rate</span>
                        <Input className="w-24 h-8" value="5.50000" readOnly />
                        <Checkbox defaultChecked />
                        <span>Use</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>Abs Value Per 1 Unit</span>
                        <Input className="w-32 h-8" value="1.000000000000000" readOnly />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Calculated Bids Table */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Calculated Bids</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">ID</th>
                            <th className="text-left p-2">DocId</th>
                            <th className="text-left p-2">IssueCode</th>
                            <th className="text-left p-2">QuotationMethodCode</th>
                            <th className="text-left p-2">PriceQual</th>
                            <th className="text-left p-2">PriceType</th>
                            <th className="text-left p-2">AuctionPriceCurrencyCode</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">302</td>
                            <td className="p-2">14,862</td>
                            <td className="p-2">TESTGOVBOND06</td>
                            <td className="p-2">PYIEL</td>
                            <td className="p-2">YIEL</td>
                            <td className="p-2">P</td>
                            <td className="p-2"></td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">301</td>
                            <td className="p-2">14,861</td>
                            <td className="p-2">TESTGOVBOND06</td>
                            <td className="p-2">PYIEL</td>
                            <td className="p-2">YIEL</td>
                            <td className="p-2">P</td>
                            <td className="p-2"></td>
                          </tr>
                          <tr>
                            <td className="p-2">300</td>
                            <td className="p-2">14,860</td>
                            <td className="p-2">TESTGOVBOND06</td>
                            <td className="p-2">PYIEL</td>
                            <td className="p-2">YIEL</td>
                            <td className="p-2">P</td>
                            <td className="p-2"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Calculation Summary */}
                <div className="grid grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Satisfied Orders Qty Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Satisfied Orders</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">{simulationResults.satisfied}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Partly Satisfied Orders</span>
                        <Badge variant="outline">{simulationResults.partlySatisfied}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sum</span>
                        <Badge variant="outline">{simulationResults.satisfied + simulationResults.partlySatisfied}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Rejected Orders Qty Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rejected Orders</span>
                        <Badge variant="outline" className="bg-red-50 text-red-700">{simulationResults.rejected}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Partly Rejected Orders</span>
                        <Badge variant="outline">0</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sum</span>
                        <Badge variant="outline">{simulationResults.rejected}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Winner Price/Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Minimum Price/Rate</span>
                        <span>{simulationResults.minPrice.toFixed(5)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Maximum Price/Rate</span>
                        <span>{simulationResults.maxPrice.toFixed(5)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>WA Price/Rate</span>
                        <span className="font-medium">{simulationResults.winnerPrice.toFixed(5)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Satisfied Orders Value Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <span>Satisfied Orders Value</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {simulationResults.satisfiedValue.toLocaleString()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Rejected Orders Value Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <span>Rejected Orders Value</span>
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          {simulationResults.rejectedValue.toLocaleString()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Print...
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={runSimulation}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Simulate
                  </Button>
                  <Button variant="outline" size="sm">
                    Save Simulation
                  </Button>
                  <Button variant="outline" size="sm">
                    Load Simulation
                  </Button>
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
      <DialogContent className="max-w-6xl w-full h-[85vh] flex flex-col p-6">
        <DialogHeader className="flex flex-row items-center gap-4 space-y-0 mb-4">
          <div className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-primary" />
            <DialogTitle>Auction Wizard</DialogTitle>
          </div>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            &lt; Back
          </Button>
          <div className="flex gap-2">
            {currentStep === 3 ? (
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
            ) : currentStep === 4 ? (
              <>
                <Button onClick={nextStep}>
                  Run Simulation &gt;
                </Button>
                <Button variant="outline" onClick={handleFinish}>
                  Finish
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </>
            ) : currentStep === 5 ? (
              <>
                <Button variant="outline" onClick={handleFinish}>
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button onClick={nextStep}>
                  Next &gt;
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