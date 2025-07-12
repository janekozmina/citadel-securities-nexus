
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CalendarDays, TrendingUp, Users, DollarSign, Activity, Timer, CheckCircle } from 'lucide-react';

const AuctionManagementPage = () => {
  const auctionData = {
    totalUpcoming: 12,
    totalBids: 2847,
    avgParticipation: 87.5,
    totalValue: 15600000000,
    upcomingAuctions: [
      { id: 'AU001', type: 'Primary', assetClass: 'Government Bonds', issuer: 'Treasury', maturity: '10Y', date: '2024-07-15', status: 'Scheduled', value: 2500000000 },
      { id: 'AU002', type: 'Secondary', assetClass: 'Corporate Bonds', issuer: 'ABC Corp', maturity: '5Y', date: '2024-07-16', status: 'Pre-Registration', value: 800000000 },
      { id: 'AU003', type: 'Primary', assetClass: 'Government Bonds', issuer: 'Treasury', maturity: '2Y', date: '2024-07-17', status: 'Scheduled', value: 1200000000 },
      { id: 'AU004', type: 'Tap', assetClass: 'Islamic Bonds', issuer: 'Islamic Dev Bank', maturity: '7Y', date: '2024-07-18', status: 'Pre-Registration', value: 600000000 },
      { id: 'AU005', type: 'Primary', assetClass: 'Municipal Bonds', issuer: 'City Council', maturity: '15Y', date: '2024-07-19', status: 'Scheduled', value: 400000000 }
    ],
    typeBreakdown: [
      { type: 'Government Bonds', count: 8, percentage: 66.7, totalValue: 10400000000 },
      { type: 'Corporate Bonds', count: 2, percentage: 16.7, totalValue: 2600000000 },
      { type: 'Islamic Bonds', count: 1, percentage: 8.3, totalValue: 1300000000 },
      { type: 'Municipal Bonds', count: 1, percentage: 8.3, totalValue: 1300000000 }
    ],
    participantPipeline: [
      { participant: 'Goldman Sachs', registrations: 12, bidIntentions: 8, avgBidSize: 450000000, participation: 95.2 },
      { participant: 'JPMorgan Chase', registrations: 11, bidIntentions: 9, avgBidSize: 380000000, participation: 89.7 },
      { participant: 'Bank of America', registrations: 10, bidIntentions: 7, avgBidSize: 320000000, participation: 84.3 },
      { participant: 'Morgan Stanley', registrations: 9, bidIntentions: 6, avgBidSize: 290000000, participation: 78.9 },
      { participant: 'Citigroup', registrations: 8, bidIntentions: 5, avgBidSize: 250000000, participation: 72.4 }
    ],
    bidInterest: [
      { auction: 'AU001', registeredBidders: 24, indicatedAmount: 4200000000, coverageRatio: 1.68, avgIndicatedYield: 4.25 },
      { auction: 'AU002', registeredBidders: 18, indicatedAmount: 1340000000, coverageRatio: 1.68, avgIndicatedYield: 5.15 },
      { auction: 'AU003', registeredBidders: 22, indicatedAmount: 1980000000, coverageRatio: 1.65, avgIndicatedYield: 3.85 },
      { auction: 'AU004', registeredBidders: 15, indicatedAmount: 920000000, coverageRatio: 1.53, avgIndicatedYield: 4.75 },
      { auction: 'AU005', registeredBidders: 12, indicatedAmount: 630000000, coverageRatio: 1.58, avgIndicatedYield: 4.95 }
    ],
    ongoingAuctions: [
      { id: 'AU006', type: 'Primary', issuer: 'Treasury', maturity: '5Y', status: 'Open', timeRemaining: '2h 15m', bidCount: 47, topYield: 4.15, volume: 1850000000 },
      { id: 'AU007', type: 'Secondary', issuer: 'XYZ Corp', maturity: '3Y', status: 'Closing Soon', timeRemaining: '0h 45m', bidCount: 32, topYield: 5.25, volume: 720000000 },
      { id: 'AU008', type: 'Tap', issuer: 'Government', maturity: '10Y', status: 'In Evaluation', timeRemaining: 'Closed', bidCount: 58, topYield: 4.35, volume: 2100000000 }
    ]
  };

  const chartConfig = {
    value: { label: 'Value', color: '#3b82f6' },
    count: { label: 'Count', color: '#06b6d4' },
    participation: { label: 'Participation', color: '#10b981' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'Pre-Registration': return <Badge className="bg-yellow-100 text-yellow-800">Pre-Registration</Badge>;
      case 'Open': return <Badge className="bg-green-100 text-green-800">Open</Badge>;
      case 'Closing Soon': return <Badge className="bg-orange-100 text-orange-800">Closing Soon</Badge>;
      case 'In Evaluation': return <Badge className="bg-purple-100 text-purple-800">In Evaluation</Badge>;
      case 'Closed': return <Badge variant="secondary">Closed</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Auction Management</h1>
            <p className="text-slate-600">Comprehensive auction oversight and real-time monitoring platform</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Upcoming Auctions</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Total:</span>
                      <span className="font-medium">{auctionData.totalUpcoming}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Next 7 Days:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <CalendarDays className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Bid Volume</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Amount:</span>
                      <span className="font-medium">${(auctionData.totalValue / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Bids:</span>
                      <span className="font-medium">{auctionData.totalBids.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Activity:</span>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Participant Activity</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Rate:</span>
                      <span className="font-medium">{auctionData.avgParticipation}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Active:</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Live Auctions</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Active:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Closing:</span>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Monitor:</span>
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Auctions Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Auction Calendar (Next 30–90 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Auction ID</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Asset Class</th>
                        <th className="text-left p-3 font-semibold">Issuer</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Date</th>
                        <th className="text-left p-3 font-semibold">Value</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionData.upcomingAuctions.map((auction, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{auction.id}</td>
                          <td className="p-3">{auction.type}</td>
                          <td className="p-3">{auction.assetClass}</td>
                          <td className="p-3">{auction.issuer}</td>
                          <td className="p-3">{auction.maturity}</td>
                          <td className="p-3">{auction.date}</td>
                          <td className="p-3">${(auction.value / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{getStatusBadge(auction.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Auction Type & Asset Class Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Auction Type & Asset Class Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Asset Class</th>
                        <th className="text-left p-3 font-semibold">Count</th>
                        <th className="text-left p-3 font-semibold">Percentage</th>
                        <th className="text-left p-3 font-semibold">Total Value</th>
                        <th className="text-left p-3 font-semibold">Distribution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionData.typeBreakdown.map((type, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{type.type}</td>
                          <td className="p-3">{type.count}</td>
                          <td className="p-3">{type.percentage}%</td>
                          <td className="p-3">${(type.totalValue / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">
                            <Progress value={type.percentage} className="w-20 h-2" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Issuer Participation Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Issuer Participation Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Participant</th>
                        <th className="text-left p-3 font-semibold">Registrations</th>
                        <th className="text-left p-3 font-semibold">Bid Intentions</th>
                        <th className="text-left p-3 font-semibold">Avg Bid Size</th>
                        <th className="text-left p-3 font-semibold">Participation Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionData.participantPipeline.map((participant, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{participant.participant}</td>
                          <td className="p-3">{participant.registrations}</td>
                          <td className="p-3">{participant.bidIntentions}</td>
                          <td className="p-3">${(participant.avgBidSize / 1000000).toFixed(0)}M</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={participant.participation} className="w-16 h-2" />
                              <span className="font-medium text-green-600">{participant.participation}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pre-Auction Bid Interest Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Pre-Auction Bid Interest Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Auction</th>
                        <th className="text-left p-3 font-semibold">Registered Bidders</th>
                        <th className="text-left p-3 font-semibold">Indicated Amount</th>
                        <th className="text-left p-3 font-semibold">Coverage Ratio</th>
                        <th className="text-left p-3 font-semibold">Avg Indicated Yield</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionData.bidInterest.map((interest, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{interest.auction}</td>
                          <td className="p-3">{interest.registeredBidders}</td>
                          <td className="p-3">${(interest.indicatedAmount / 1000000000).toFixed(1)}B</td>
                          <td className="p-3 font-medium text-blue-600">{interest.coverageRatio}x</td>
                          <td className="p-3">{interest.avgIndicatedYield}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Ongoing Auction Monitor */}
            <Card>
              <CardHeader>
                <CardTitle>Ongoing Auction Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Auction ID</th>
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Issuer</th>
                        <th className="text-left p-3 font-semibold">Maturity</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Time Remaining</th>
                        <th className="text-left p-3 font-semibold">Bids</th>
                        <th className="text-left p-3 font-semibold">Top Yield</th>
                        <th className="text-left p-3 font-semibold">Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionData.ongoingAuctions.map((auction, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{auction.id}</td>
                          <td className="p-3">{auction.type}</td>
                          <td className="p-3">{auction.issuer}</td>
                          <td className="p-3">{auction.maturity}</td>
                          <td className="p-3">{getStatusBadge(auction.status)}</td>
                          <td className="p-3 font-medium">{auction.timeRemaining}</td>
                          <td className="p-3">{auction.bidCount}</td>
                          <td className="p-3 font-medium text-green-600">{auction.topYield}%</td>
                          <td className="p-3">${(auction.volume / 1000000000).toFixed(1)}B</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <Button className="w-full justify-start">
                  Create New Auction
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Duplicate Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Open Bidding Window
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Pause or Extend Auction
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Close & Lock Bidding
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AuctionManagementPage;
