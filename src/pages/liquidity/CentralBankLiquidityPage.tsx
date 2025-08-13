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
      { name: 'NBB (National Bank of Bahrain)', currentPosition: 12400000000, allocatedLimit: 15000000000, utilizationPct: 82.7, intradayUsage: 8900000000 },
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Central Bank Liquidity Management</h1>
            <p className="text-slate-600">Monitor and manage central bank liquidity facilities</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Liquidity</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Value:</span>
                      <span className="font-medium">${(liquidityData.totalLiquidity / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Utilization:</span>
                      <span className="font-medium">{liquidityData.utilizationRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Droplets className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Utilization Rate</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Rate:</span>
                      <span className="font-medium">{liquidityData.utilizationRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Facilities:</span>
                      <span className="font-medium">{liquidityData.activeFacilities}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Trend:</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Facilities</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Count:</span>
                      <span className="font-medium">{liquidityData.activeFacilities}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Avg Rate:</span>
                      <span className="font-medium">{liquidityData.avgRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Building2 className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Average Rate</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Rate:</span>
                      <span className="font-medium">{liquidityData.avgRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Liquidity:</span>
                      <span className="font-medium">${(liquidityData.totalLiquidity / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Monitor:</span>
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
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
      </div>
    </TooltipProvider>
  );
};

export default CentralBankLiquidityPage;