
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  BarChart3,
  Building,
  Clock,
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Custody Hub</h1>
          <p className="text-slate-600">Real-time custody operations dashboard</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button className="w-full">View Holdings</Button>
          <Button variant="outline" className="w-full">Holdings History</Button>
          <Button variant="outline" className="w-full">Manage Pledges</Button>
          <Button variant="outline" className="w-full">Collateral Locks</Button>
          <Button variant="outline" className="w-full">Lending Operations</Button>
          <Button variant="outline" className="w-full">Manage Sub-Balances</Button>
          <Button variant="outline" className="w-full">Beneficial Ownership</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Securities Settled Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🔄 Securities Settled Today</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{todaySettlements.volume.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Volume (securities)</p>
              <div className="text-xl font-semibold text-green-600">
                AED {(todaySettlements.value / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground">Market Value</p>
            </div>
          </CardContent>
        </Card>

        {/* Settlement Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📊 Settlement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">DvP Success</span>
                <span className="text-sm font-semibold text-green-600">{settlementRate.dvp}%</span>
              </div>
              <Progress value={settlementRate.dvp} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Fails</span>
                <span className="text-sm font-semibold text-red-600">{settlementRate.fails}%</span>
              </div>
              <Progress value={settlementRate.fails} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Partial</span>
                <span className="text-sm font-semibold text-yellow-600">{settlementRate.partial}%</span>
              </div>
              <Progress value={settlementRate.partial} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Daily Trend */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📈 Daily Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dailyTrend.slice(-3).map((day, index) => (
                <div key={day.date} className="flex justify-between items-center text-sm">
                  <span>{day.date}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      S: {day.submitted}
                    </Badge>
                    <Badge variant="default" className="text-xs">
                      C: {day.settled}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Asset Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🧾 Top 5 Asset Classes by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topAssetClasses.map((asset, index) => (
                <div key={asset.isin} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{asset.name}</div>
                    <div className="text-xs text-muted-foreground">ISIN: {asset.isin}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">AED {(asset.volume / 1000000).toFixed(1)}M</div>
                    <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 5 Participants */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🏦 Top 5 Participants by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topParticipants.map((participant, index) => (
                <div key={participant.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="font-medium">{participant.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">AED {(participant.volume / 1000000).toFixed(1)}M</div>
                    <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Corporate Actions Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🕒 Upcoming Corporate Actions Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {corporateActions.map((action, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{action.company}</div>
                  <div className="text-sm text-muted-foreground">{action.action}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{action.date}</div>
                  <div className="text-xs text-muted-foreground">{action.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustodyHubPage;
