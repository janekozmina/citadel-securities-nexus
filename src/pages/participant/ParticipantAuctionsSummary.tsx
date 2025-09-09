import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gavel,
  Calendar,
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  BarChart3,
  Target,
  Eye,
  FileText,
  Activity
} from 'lucide-react';

const ParticipantAuctionsSummary = () => {
  const [selectedAuction, setSelectedAuction] = useState('');

  // Mock auction data
  const auctionStats = {
    totalAuctions: 45,
    activeAuctions: 5,
    participatedAuctions: 28,
    successfulBids: 22,
    totalBidValue: 450000000,
    averageSuccessRate: 78.6
  };

  const activeAuctions = [
    {
      id: 'AUC001',
      type: 'Treasury Bill',
      instrument: 'TB-2024-Q1-001',
      maturity: '91 Days',
      targetAmount: 50000000,
      minBidAmount: 1000000,
      bidDeadline: '2024-01-15 11:00:00',
      status: 'Active',
      myBid: 15000000,
      currentRate: 4.25
    },
    {
      id: 'AUC002',
      type: 'Government Bond',
      instrument: 'GB-2024-5Y-002',
      maturity: '5 Years',
      targetAmount: 100000000,
      minBidAmount: 5000000,
      bidDeadline: '2024-01-16 14:00:00',
      status: 'Active',
      myBid: null,
      currentRate: 5.15
    },
    {
      id: 'AUC003',
      type: 'Islamic Sukuk',
      instrument: 'SUKUK-2024-3Y-001',
      maturity: '3 Years',
      targetAmount: 75000000,
      minBidAmount: 2000000,
      bidDeadline: '2024-01-17 10:00:00',
      status: 'Active',
      myBid: 10000000,
      currentRate: 4.85
    },
    {
      id: 'AUC004',
      type: 'Treasury Bill',
      instrument: 'TB-2024-Q1-002',
      maturity: '182 Days',
      targetAmount: 30000000,
      minBidAmount: 1000000,
      bidDeadline: '2024-01-18 11:00:00',
      status: 'Bidding Soon',
      myBid: null,
      currentRate: 4.35
    }
  ];

  const completedAuctions = [
    {
      id: 'AUC-C001',
      type: 'Treasury Bill',
      instrument: 'TB-2024-001',
      maturity: '91 Days',
      auctionDate: '2024-01-10',
      targetAmount: 40000000,
      finalAmount: 42000000,
      cutoffRate: 4.20,
      myBid: 12000000,
      allocatedAmount: 8000000,
      status: 'Partially Allocated',
      allocationRate: 66.7
    },
    {
      id: 'AUC-C002',
      type: 'Government Bond',
      instrument: 'GB-2024-3Y-001',
      maturity: '3 Years',
      auctionDate: '2024-01-08',
      targetAmount: 60000000,
      finalAmount: 60000000,
      cutoffRate: 5.10,
      myBid: 15000000,
      allocatedAmount: 15000000,
      status: 'Fully Allocated',
      allocationRate: 100
    },
    {
      id: 'AUC-C003',
      type: 'Islamic Sukuk',
      instrument: 'SUKUK-2024-2Y-001',
      maturity: '2 Years',
      auctionDate: '2024-01-05',
      targetAmount: 50000000,
      finalAmount: 45000000,
      cutoffRate: 4.75,
      myBid: 8000000,
      allocatedAmount: 0,
      status: 'Not Allocated',
      allocationRate: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'bidding soon': return 'secondary';
      case 'fully allocated': return 'default';
      case 'partially allocated': return 'secondary';
      case 'not allocated': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatTimeRemaining = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Auctions Summary</h1>
          <p className="text-muted-foreground">Central Bank Securities Auctions - Participant View</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Gavel className="w-3 h-3 mr-1" />
          Participant Portal
        </Badge>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Auctions</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctionStats.totalAuctions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctionStats.activeAuctions}</div>
            <p className="text-xs text-muted-foreground">Available for bidding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participated</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctionStats.participatedAuctions}</div>
            <p className="text-xs text-muted-foreground">Auctions participated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Bids</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctionStats.successfulBids}</div>
            <p className="text-xs text-muted-foreground">Allocated bids</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bid Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD {auctionStats.totalBidValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Cumulative</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctionStats.averageSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">Average allocation</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Auctions</TabsTrigger>
          <TabsTrigger value="completed">Completed Auctions</TabsTrigger>
          <TabsTrigger value="calendar">Auction Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Active Auctions
              </CardTitle>
              <CardDescription>Current auctions available for bidding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAuctions.map((auction) => (
                  <div key={auction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{auction.type}</h3>
                          <Badge variant={getStatusColor(auction.status)} className="text-xs">
                            {auction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{auction.instrument}</p>
                        <p className="text-xs text-muted-foreground">Maturity: {auction.maturity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Target: BHD {auction.targetAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Min Bid: BHD {auction.minBidAmount.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Bid Deadline</p>
                        <p className="font-medium">{new Date(auction.bidDeadline).toLocaleString()}</p>
                        <p className="text-xs text-orange-600">
                          {formatTimeRemaining(auction.bidDeadline)} remaining
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Rate</p>
                        <p className="font-medium">{auction.currentRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">My Bid</p>
                        <p className="font-medium">
                          {auction.myBid ? `BHD ${auction.myBid.toLocaleString()}` : 'No bid'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        {auction.status === 'Active' && (
                          <Button size="sm">
                            {auction.myBid ? 'Modify Bid' : 'Place Bid'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Completed Auctions
              </CardTitle>
              <CardDescription>Historical auction results and allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedAuctions.map((auction) => (
                  <div key={auction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{auction.type}</h3>
                          <Badge variant={getStatusColor(auction.status)} className="text-xs">
                            {auction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{auction.instrument}</p>
                        <p className="text-xs text-muted-foreground">
                          Auction Date: {new Date(auction.auctionDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Final Amount: BHD {auction.finalAmount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Cutoff Rate: {auction.cutoffRate}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">My Bid</p>
                        <p className="font-medium">BHD {auction.myBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Allocated Amount</p>
                        <p className="font-medium">
                          {auction.allocatedAmount > 0 
                            ? `BHD ${auction.allocatedAmount.toLocaleString()}`
                            : 'None'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Allocation Rate</p>
                        <p className="font-medium">{auction.allocationRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Maturity</p>
                        <p className="font-medium">{auction.maturity}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="w-3 h-3 mr-1" />
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Auction Calendar
              </CardTitle>
              <CardDescription>Upcoming auction schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  {/* Calendar view placeholder - would integrate with a calendar component */}
                  <div className="p-8 text-center border rounded-lg">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Auction Calendar</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      View upcoming auctions and important dates
                    </p>
                    <Button variant="outline" onClick={() => window.open('/auction-calendar', '_blank')}>
                      <Calendar className="w-4 h-4 mr-2" />
                      View Full Calendar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantAuctionsSummary;