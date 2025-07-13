
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import { 
  TrendingUp, 
  Building,
  Calendar,
  RefreshCw
} from 'lucide-react';

const CustodyHubPage = () => {
  // Mock data - in real app this would come from API
  const todaySettlements = {
    volume: 1250000,
    value: 125000000
  };

  const settlementRate = {
    dvp: 95.2,
    fails: 3.8,
    partial: 1.0
  };

  const topAssetClasses = [
    { name: 'UAE Treasury Bond 26', isin: 'AE123456789', volume: 45000000 },
    { name: 'Emaar Properties', isin: 'AE987654321', volume: 32000000 },
    { name: 'ADNOC Drilling', isin: 'AE112233445', volume: 28000000 },
    { name: 'First Abu Dhabi Bank', isin: 'AE556677889', volume: 22000000 },
    { name: 'ADCB Bank', isin: 'AE998877665', volume: 18000000 }
  ];

  const topParticipants = [
    { name: 'ABC Bank', volume: 65000000 },
    { name: 'XYZ Securities', volume: 52000000 },
    { name: 'Emirates NBD', volume: 48000000 },
    { name: 'ADCB Securities', volume: 35000000 },
    { name: 'FAB Securities', volume: 29000000 }
  ];

  const corporateActions = [
    { company: 'Emaar Properties', action: 'Dividend Payment', date: '2025-07-15', amount: 'AED 0.15/share' },
    { company: 'ADNOC Distribution', action: 'Rights Issue', date: '2025-07-20', amount: '1:10 ratio' },
    { company: 'UAE Treasury Bond 26', action: 'Coupon Payment', date: '2025-07-25', amount: '4.5% p.a.' },
    { company: 'First Abu Dhabi Bank', action: 'Stock Split', date: '2025-08-01', amount: '2:1 split' }
  ];

  const dailyTrend = [
    { date: '07-06', submitted: 1200, settled: 1140 },
    { date: '07-07', submitted: 1350, settled: 1285 },
    { date: '07-08', submitted: 1100, settled: 1065 },
    { date: '07-09', submitted: 1450, settled: 1380 },
    { date: '07-10', submitted: 1320, settled: 1250 }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Custody Hub</h1>
            <p className="text-slate-600">Real-time custody operations dashboard</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Government Bond Holdings as of Today */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Government Bond Holdings as of Today</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Total Value:</span>
                      <span className="font-medium">AED 125.5M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Instruments:</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Planned Auctions */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Planned Auctions</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Next Auction:</span>
                      <span className="font-medium">MBill5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Date:</span>
                      <span className="font-medium">2024-07-16</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Amount:</span>
                      <span className="font-medium">AED 50M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Total balances by sub-balances */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total balances by sub-balances</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">AVAI:</span>
                      <span className="font-medium">AED 45.2M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">BLOK:</span>
                      <span className="font-medium">AED 15.8M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-600">PLED:</span>
                      <span className="font-medium">AED 28.5M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-orange-600">RSTR:</span>
                      <span className="font-medium">AED 8.2M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">NAVL:</span>
                      <span className="font-medium">AED 27.8M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top 5 Asset Classes */}
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Asset Classes by Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Asset</th>
                          <th className="text-left p-3 font-semibold">ISIN</th>
                          <th className="text-left p-3 font-semibold">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topAssetClasses.map((asset, index) => (
                          <tr key={asset.isin} className="border-b hover:bg-slate-50">
                            <td className="p-3 font-medium">{asset.name}</td>
                            <td className="p-3 text-sm">{asset.isin}</td>
                            <td className="p-3">AED {(asset.volume / 1000000).toFixed(1)}M</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Top 5 Participants */}
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 Participants by Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Participant</th>
                          <th className="text-left p-3 font-semibold">Volume</th>
                          <th className="text-left p-3 font-semibold">Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topParticipants.map((participant, index) => (
                          <tr key={participant.name} className="border-b hover:bg-slate-50">
                            <td className="p-3 font-medium">{participant.name}</td>
                            <td className="p-3">AED {(participant.volume / 1000000).toFixed(1)}M</td>
                            <td className="p-3">
                              <Badge variant="outline">#{index + 1}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">View Holdings</Button>
                <Button variant="outline" className="w-full justify-start">Holdings History</Button>
                <Button variant="outline" className="w-full justify-start">Manage Pledges</Button>
                <Button variant="outline" className="w-full justify-start">Collateral Locks</Button>
                <Button variant="outline" className="w-full justify-start">Lending Operations</Button>
                <Button variant="outline" className="w-full justify-start">Manage Sub-Balances</Button>
                <Button variant="outline" className="w-full justify-start">Beneficial Ownership</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CustodyHubPage;
