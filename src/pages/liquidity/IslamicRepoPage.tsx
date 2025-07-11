import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Star, TrendingUp, Clock, Shield, Building } from 'lucide-react';

const IslamicRepoPage = () => {
  const islamicData = {
    totalAssets: 38600000000,
    activeContracts: 186,
    avgProfitRate: 3.45,
    complianceRatio: 99.8,
    sharihTransactions: [
      { id: 'MUR001', type: 'Murabaha', participant: 'Emirates Islamic Bank', asset: 'Sukuk Gov UAE 2027', purchasePrice: 85000000, resalePrice: 87400000, status: 'Executed', cycle: 'Complete' },
      { id: 'TAW002', type: 'Tawarruq', participant: 'Dubai Islamic Bank', asset: 'Islamic Corp Bond', purchasePrice: 65000000, resalePrice: 66950000, status: 'Pending Delivery', cycle: 'Asset Purchase' },
      { id: 'MUR003', type: 'Murabaha', participant: 'Sharjah Islamic Bank', asset: 'Commodity Murabaha', purchasePrice: 42000000, resalePrice: 43470000, status: 'In Progress', cycle: 'Re-sale' },
      { id: 'TAW004', type: 'Tawarruq', participant: 'Al Hilal Bank', asset: 'Sukuk Corporate', purchasePrice: 28000000, resalePrice: 28840000, status: 'Executed', cycle: 'Complete' }
    ],
    profitRates: [
      { maturity: 'Overnight', offered: 2.85, agreed: 2.75, benchmark: 2.65, volume: 8400000000 },
      { maturity: '1 Week', offered: 3.15, agreed: 3.05, benchmark: 2.95, volume: 12600000000 },
      { maturity: '1 Month', offered: 3.45, agreed: 3.35, benchmark: 3.25, volume: 9800000000 },
      { maturity: '3 Month', offered: 3.75, agreed: 3.65, benchmark: 3.55, volume: 7800000000 }
    ],
    assetInventory: [
      { asset: 'UAE Government Sukuk', totalValue: 22400000000, utilized: 18200000000, available: 4200000000, utilizationPct: 81.3, status: 'Active', compliance: 100 },
      { asset: 'Islamic Corporate Bonds', totalValue: 8600000000, utilized: 6800000000, available: 1800000000, utilizationPct: 79.1, status: 'Active', compliance: 99.8 },
      { asset: 'Commodity Murabaha Assets', totalValue: 5400000000, utilized: 4200000000, available: 1200000000, utilizationPct: 77.8, status: 'Active', compliance: 100 },
      { asset: 'Real Estate Sukuk', totalValue: 2200000000, utilized: 1400000000, available: 800000000, utilizationPct: 63.6, status: 'Review', compliance: 99.5 }
    ],
    profitTrends: [
      { date: '07-06', murabaha: 3.25, tawarruq: 3.45, benchmark: 3.15 },
      { date: '07-07', murabaha: 3.30, tawarruq: 3.50, benchmark: 3.20 },
      { date: '07-08', murabaha: 3.35, tawarruq: 3.55, benchmark: 3.25 },
      { date: '07-09', murabaha: 3.40, tawarruq: 3.60, benchmark: 3.30 },
      { date: '07-10', murabaha: 3.45, tawarruq: 3.65, benchmark: 3.35 }
    ],
    participants: [
      { bank: 'Emirates Islamic Bank', activeTrades: 45, totalValue: 12400000000, avgProfitRate: 3.35, compliance: 100 },
      { bank: 'Dubai Islamic Bank', activeTrades: 38, totalValue: 9800000000, avgProfitRate: 3.42, compliance: 99.9 },
      { bank: 'Sharjah Islamic Bank', activeTrades: 32, totalValue: 7600000000, avgProfitRate: 3.48, compliance: 99.8 },
      { bank: 'Al Hilal Bank', activeTrades: 28, totalValue: 5400000000, avgProfitRate: 3.52, compliance: 99.7 },
      { bank: 'Ajman Bank', activeTrades: 24, totalValue: 3400000000, avgProfitRate: 3.58, compliance: 99.6 }
    ]
  };

  const chartConfig = {
    murabaha: { label: 'Murabaha', color: '#3b82f6' },
    tawarruq: { label: 'Tawarruq', color: '#10b981' },
    benchmark: { label: 'Benchmark', color: '#f59e0b' },
    value: { label: 'Value', color: '#3b82f6' },
    compliance: { label: 'Compliance', color: '#10b981' }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 99.5) return 'text-green-600';
    if (compliance >= 99.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Executed': return <Badge className="bg-green-100 text-green-800">Executed</Badge>;
      case 'In Progress': return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'Pending Delivery': return <Badge className="bg-yellow-100 text-yellow-800">Pending Delivery</Badge>;
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Review': return <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Islamic REPO</h1>
              <p className="text-slate-600">Shariah-compliant repo operations and asset management</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Assets</p>
                    <p className="text-2xl font-bold">${(islamicData.totalAssets / 1000000000).toFixed(1)}B</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Contracts</p>
                    <p className="text-2xl font-bold">{islamicData.activeContracts}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Profit Rate</p>
                    <p className="text-2xl font-bold">{islamicData.avgProfitRate}%</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Shariah Compliance</p>
                    <p className="text-2xl font-bold text-green-600">{islamicData.complianceRatio}%</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shariah-Compliant Transaction Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Shariah-Compliant Transaction Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Trade ID</th>
                      <th className="text-left p-3 font-semibold">Type</th>
                      <th className="text-left p-3 font-semibold">Participant</th>
                      <th className="text-left p-3 font-semibold">Asset</th>
                      <th className="text-left p-3 font-semibold">Purchase Price</th>
                      <th className="text-left p-3 font-semibold">Re-sale Price</th>
                      <th className="text-left p-3 font-semibold">Cycle</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {islamicData.sharihTransactions.map((transaction, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-mono text-sm">{transaction.id}</td>
                        <td className="p-3">{transaction.type}</td>
                        <td className="p-3">{transaction.participant}</td>
                        <td className="p-3 text-sm">{transaction.asset}</td>
                        <td className="p-3">${(transaction.purchasePrice / 1000000).toFixed(1)}M</td>
                        <td className="p-3">${(transaction.resalePrice / 1000000).toFixed(1)}M</td>
                        <td className="p-3 text-sm">{transaction.cycle}</td>
                        <td className="p-3">{getStatusBadge(transaction.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Profit Rate Monitor & Asset Inventory Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit Rate Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {islamicData.profitRates.map((rate, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{rate.maturity}</span>
                          <span className="text-sm text-slate-600">${(rate.volume / 1000000000).toFixed(1)}B</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-slate-600">Offered: </span>
                            <span className="font-medium text-blue-600">{rate.offered}%</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Agreed: </span>
                            <span className="font-medium text-green-600">{rate.agreed}%</span>
                          </div>
                          <div>
                            <span className="text-slate-600">Benchmark: </span>
                            <span className="font-medium text-slate-600">{rate.benchmark}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={islamicData.profitTrends}>
                      <XAxis dataKey="date" />
                      <YAxis domain={[3.0, 3.8]} tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="murabaha" 
                        stroke="var(--color-murabaha)" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="tawarruq" 
                        stroke="var(--color-tawarruq)" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="var(--color-benchmark)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Asset Inventory Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Asset Inventory Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Asset Type</th>
                      <th className="text-left p-3 font-semibold">Total Value</th>
                      <th className="text-left p-3 font-semibold">Utilized</th>
                      <th className="text-left p-3 font-semibold">Available</th>
                      <th className="text-left p-3 font-semibold">Utilization %</th>
                      <th className="text-left p-3 font-semibold">Compliance</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {islamicData.assetInventory.map((asset, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{asset.asset}</td>
                        <td className="p-3">${(asset.totalValue / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">${(asset.utilized / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">${(asset.available / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={asset.utilizationPct} className="w-16 h-2" />
                            <span className="font-medium">{asset.utilizationPct.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`font-medium ${getComplianceColor(asset.compliance)}`}>
                            {asset.compliance}%
                          </span>
                        </td>
                        <td className="p-3">{getStatusBadge(asset.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Islamic Banking Participants */}
          <Card>
            <CardHeader>
              <CardTitle>Islamic Banking Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Bank</th>
                      <th className="text-left p-3 font-semibold">Active Trades</th>
                      <th className="text-left p-3 font-semibold">Total Value</th>
                      <th className="text-left p-3 font-semibold">Avg Profit Rate</th>
                      <th className="text-left p-3 font-semibold">Compliance Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {islamicData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.bank}</td>
                        <td className="p-3">{participant.activeTrades}</td>
                        <td className="p-3">${(participant.totalValue / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">{participant.avgProfitRate.toFixed(2)}%</td>
                        <td className="p-3">
                          <span className={`font-medium ${getComplianceColor(participant.compliance)}`}>
                            {participant.compliance}%
                          </span>
                        </td>
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
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start">Initiate New Murabaha</Button>
              <Button variant="outline" className="w-full justify-start">Submit Profit Rate Offer</Button>
              <Button variant="outline" className="w-full justify-start">Approve Asset Substitution</Button>
              <Button variant="outline" className="w-full justify-start">Validate Shariah Compliance</Button>
              <Button variant="outline" className="w-full justify-start">Shariah Board Report</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IslamicRepoPage;