import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Droplets, TrendingUp, Clock, AlertTriangle, Building2 } from 'lucide-react';

const CentralBankLiquidityPage = () => {
  const liquidityData = {
    totalLiquidity: 78400000000,
    utilizationRate: 67.8,
    activeFacilities: 12,
    avgRate: 2.75,
    participants: [
      { name: 'Emirates NBD', currentPosition: 12400000000, allocatedLimit: 15000000000, utilizationPct: 82.7, intradayUsage: 8900000000 },
      { name: 'First Abu Dhabi Bank', currentPosition: 10800000000, allocatedLimit: 14000000000, utilizationPct: 77.1, intradayUsage: 7600000000 },
      { name: 'ADCB Bank', currentPosition: 8200000000, allocatedLimit: 12000000000, utilizationPct: 68.3, intradayUsage: 5800000000 },
      { name: 'Mashreq Bank', currentPosition: 6500000000, allocatedLimit: 10000000000, utilizationPct: 65.0, intradayUsage: 4200000000 },
      { name: 'RAK Bank', currentPosition: 4100000000, allocatedLimit: 8000000000, utilizationPct: 51.3, intradayUsage: 2900000000 }
    ],
    facilities: [
      { name: 'Intraday Liquidity Facility', outstanding: 32400000000, rate: 0.0, requests: 45, accepted: 43, rejected: 2, status: 'Active' },
      { name: 'Overnight Deposit Facility', outstanding: 18900000000, rate: 2.25, requests: 28, accepted: 27, rejected: 1, status: 'Active' },
      { name: 'Marginal Lending Facility', outstanding: 12700000000, rate: 3.25, requests: 18, accepted: 16, rejected: 2, status: 'Active' },
      { name: 'Term Lending Facility', outstanding: 8200000000, rate: 2.75, requests: 12, accepted: 11, rejected: 1, status: 'Active' },
      { name: 'US Dollar Liquidity Facility', outstanding: 5200000000, rate: 3.50, requests: 8, accepted: 6, rejected: 2, status: 'Warning' }
    ],
    settlementImpact: [
      { date: 'Today (T+0)', failedAmount: 450000000, liquidityShortfall: 280000000, criticalAlerts: 3 },
      { date: 'T+1', forecastNeeds: 1200000000, availableLiquidity: 950000000, gap: 250000000 },
      { date: 'T+2', forecastNeeds: 800000000, availableLiquidity: 1100000000, gap: -300000000 }
    ],
    usageTrends: [
      { date: '07-06', am: 28400000000, pm: 31200000000, total: 59600000000 },
      { date: '07-07', am: 32800000000, pm: 35600000000, total: 68400000000 },
      { date: '07-08', am: 29200000000, pm: 33800000000, total: 63000000000 },
      { date: '07-09', am: 35600000000, pm: 38200000000, total: 73800000000 },
      { date: '07-10', am: 36400000000, pm: 42000000000, total: 78400000000 }
    ],
    facilityDisbursement: [
      { type: 'Intraday', amount: 32400000000, color: '#3b82f6' },
      { type: 'Overnight', amount: 18900000000, color: '#10b981' },
      { type: 'Term', amount: 8200000000, color: '#f59e0b' },
      { type: 'Emergency', amount: 5200000000, color: '#ef4444' }
    ]
  };

  const chartConfig = {
    am: { label: 'AM Session', color: '#3b82f6' },
    pm: { label: 'PM Session', color: '#10b981' },
    total: { label: 'Total', color: '#8b5cf6' },
    amount: { label: 'Amount', color: '#3b82f6' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Warning': return <Badge variant="destructive">Warning</Badge>;
      case 'Inactive': return <Badge variant="secondary">Inactive</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return 'text-red-600';
    if (utilization >= 65) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getGapColor = (gap: number) => {
    if (gap > 0) return 'text-red-600'; // Shortfall
    return 'text-green-600'; // Surplus
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Central Bank Liquidity Management</h1>
              <p className="text-slate-600">Monitor and manage central bank liquidity facilities</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Liquidity</p>
                    <p className="text-2xl font-bold">${(liquidityData.totalLiquidity / 1000000000).toFixed(1)}B</p>
                  </div>
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Utilization Rate</p>
                    <p className="text-2xl font-bold">{liquidityData.utilizationRate}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Facilities</p>
                    <p className="text-2xl font-bold">{liquidityData.activeFacilities}</p>
                  </div>
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Average Rate</p>
                    <p className="text-2xl font-bold">{liquidityData.avgRate}%</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liquidity Position Dashboard & Lending Facility Monitor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Usage Trends by Session</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={liquidityData.usageTrends}>
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value, name) => [`$${(Number(value) / 1000000000).toFixed(1)}B`, name]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="am" 
                        stackId="1"
                        stroke="var(--color-am)" 
                        fill="var(--color-am)"
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="pm" 
                        stackId="1"
                        stroke="var(--color-pm)" 
                        fill="var(--color-pm)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facility Disbursement Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={liquidityData.facilityDisbursement}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {liquidityData.facilityDisbursement.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Participant Liquidity Position Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Participant Liquidity Position Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Participant</th>
                      <th className="text-left p-3 font-semibold">Current Position</th>
                      <th className="text-left p-3 font-semibold">Allocated Limit</th>
                      <th className="text-left p-3 font-semibold">Utilization</th>
                      <th className="text-left p-3 font-semibold">Intraday Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidityData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.name}</td>
                        <td className="p-3">${(participant.currentPosition / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">${(participant.allocatedLimit / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={participant.utilizationPct} className="w-16 h-2" />
                            <span className={`font-medium ${getUtilizationColor(participant.utilizationPct)}`}>
                              {participant.utilizationPct.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">${(participant.intradayUsage / 1000000000).toFixed(1)}B</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Lending Facility Monitor */}
          <Card>
            <CardHeader>
              <CardTitle>Lending Facility Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Facility</th>
                      <th className="text-left p-3 font-semibold">Outstanding</th>
                      <th className="text-left p-3 font-semibold">Rate</th>
                      <th className="text-left p-3 font-semibold">Requests</th>
                      <th className="text-left p-3 font-semibold">Accepted/Rejected</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidityData.facilities.map((facility, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{facility.name}</td>
                        <td className="p-3">${(facility.outstanding / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">{facility.rate.toFixed(2)}%</td>
                        <td className="p-3">{facility.requests}</td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Badge className="bg-green-100 text-green-800">{facility.accepted}</Badge>
                            <Badge variant="destructive">{facility.rejected}</Badge>
                          </div>
                        </td>
                        <td className="p-3">{getStatusBadge(facility.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Settlement Impact Analyzer */}
          <Card>
            <CardHeader>
              <CardTitle>Settlement Impact Analyzer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liquidityData.settlementImpact.map((impact, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg">{impact.date}</span>
                      {impact.criticalAlerts && (
                        <Badge variant="destructive">
                          {impact.criticalAlerts} Critical Alerts
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {impact.failedAmount && (
                        <div>
                          <span className="text-red-600">Failed Settlements: ${(impact.failedAmount / 1000000).toFixed(0)}M</span>
                        </div>
                      )}
                      {impact.liquidityShortfall && (
                        <div>
                          <span className="text-red-600">Liquidity Shortfall: ${(impact.liquidityShortfall / 1000000).toFixed(0)}M</span>
                        </div>
                      )}
                      {impact.forecastNeeds && (
                        <div>
                          <span className="text-blue-600">Forecast Needs: ${(impact.forecastNeeds / 1000000).toFixed(0)}M</span>
                        </div>
                      )}
                      {impact.availableLiquidity && (
                        <div>
                          <span className="text-green-600">Available: ${(impact.availableLiquidity / 1000000).toFixed(0)}M</span>
                        </div>
                      )}
                      {impact.gap && (
                        <div>
                          <span className={getGapColor(impact.gap)}>
                            Gap: {impact.gap > 0 ? '+' : ''}${(impact.gap / 1000000).toFixed(0)}M
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start">Inject Liquidity Manually</Button>
              <Button variant="outline" className="w-full justify-start">Approve/Decline Draw Requests</Button>
              <Button variant="outline" className="w-full justify-start">Adjust Participant Limits</Button>
              <Button variant="outline" className="w-full justify-start">Run Stress Scenario</Button>
              <Button variant="outline" className="w-full justify-start">Emergency Protocols</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CentralBankLiquidityPage;