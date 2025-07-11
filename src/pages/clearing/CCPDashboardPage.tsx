import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Activity, Users, Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const CCPDashboardPage = () => {
  const ccpData = {
    summary: {
      totalTrades: 15847,
      totalVolume: 8500000000,
      activeParticipants: 47,
      systemUptime: 99.97
    },
    operationalMetrics: [
      { metric: 'Trade Processing', value: 98.7, status: 'Good' },
      { metric: 'Settlement Rate', value: 99.2, status: 'Excellent' },
      { metric: 'Risk Coverage', value: 96.8, status: 'Good' },
      { metric: 'System Performance', value: 97.5, status: 'Good' }
    ],
    volumeByProduct: [
      { product: 'Interest Rate Swaps', volume: 3400000000, color: '#3b82f6' },
      { product: 'Credit Default Swaps', volume: 2800000000, color: '#10b981' },
      { product: 'FX Forwards', volume: 1500000000, color: '#f59e0b' },
      { product: 'Equity Derivatives', volume: 800000000, color: '#ef4444' }
    ],
    riskExposure: [
      { date: 'Mon', credit: 2400000000, market: 1800000000, operational: 400000000 },
      { date: 'Tue', credit: 2600000000, market: 2100000000, operational: 350000000 },
      { date: 'Wed', credit: 2300000000, market: 1900000000, operational: 380000000 },
      { date: 'Thu', credit: 2800000000, market: 2300000000, operational: 420000000 },
      { date: 'Fri', credit: 3100000000, market: 2500000000, operational: 450000000 }
    ],
    participants: [
      { name: 'Major Bank A', trades: 3245, volume: 1800000000, status: 'Active', lastActivity: '2 min ago' },
      { name: 'Investment Bank B', trades: 2856, volume: 1500000000, status: 'Active', lastActivity: '5 min ago' },
      { name: 'Regional Bank C', trades: 2134, volume: 1200000000, status: 'Active', lastActivity: '1 min ago' },
      { name: 'Credit Union D', trades: 1789, volume: 950000000, status: 'Warning', lastActivity: '15 min ago' },
      { name: 'International Bank E', trades: 1623, volume: 880000000, status: 'Active', lastActivity: '3 min ago' }
    ]
  };

  const chartConfig = {
    credit: { label: 'Credit Risk', color: '#ef4444' },
    market: { label: 'Market Risk', color: '#f59e0b' },
    operational: { label: 'Operational Risk', color: '#8b5cf6' }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Excellent': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Good': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'Warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Warning': return <Badge variant="destructive">Warning</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CCP Dashboard</h1>
              <p className="text-slate-600">Central Counterparty oversight and monitoring</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Trades</p>
                    <p className="text-2xl font-bold">{ccpData.summary.totalTrades.toLocaleString()}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Participants</p>
                    <p className="text-2xl font-bold">{ccpData.summary.activeParticipants}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operational Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Operational Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {ccpData.operationalMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">{metric.metric}</span>
                      {getStatusIcon(metric.status)}
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.value}%</div>
                    <Badge variant={metric.status === 'Excellent' ? 'default' : 'secondary'}>
                      {metric.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Exposure Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ccpData.riskExposure}>
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value, name) => [`$${(Number(value) / 1000000000).toFixed(1)}B`, name]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="credit" 
                        stroke="var(--color-credit)" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        stroke="var(--color-market)" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="operational" 
                        stroke="var(--color-operational)" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Participant Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Top Participants Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Participant</th>
                      <th className="text-left p-3 font-semibold">Trades</th>
                      <th className="text-left p-3 font-semibold">Volume</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ccpData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.name}</td>
                        <td className="p-3">{participant.trades.toLocaleString()}</td>
                        <td className="p-3">${(participant.volume / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">{getStatusBadge(participant.status)}</td>
                        <td className="p-3 text-sm text-slate-600">{participant.lastActivity}</td>
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
            <Button className="w-full justify-start">System Health Check</Button>
            <Button variant="outline" className="w-full justify-start">Generate Daily Report</Button>
            <Button variant="outline" className="w-full justify-start">Risk Assessment</Button>
            <Button variant="outline" className="w-full justify-start">Participant Review</Button>
            <Button variant="outline" className="w-full justify-start">Emergency Procedures</Button>
          </div>
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
};

export default CCPDashboardPage;