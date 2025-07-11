import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Droplets, TrendingUp, Clock, AlertTriangle, Building2 } from 'lucide-react';

const CentralBankLiquidityPage = () => {
  const liquidityData = {
    totalLiquidity: 45600000000,
    utilizationRate: 67.8,
    activeFacilities: 12,
    avgRate: 2.75,
    facilities: [
      { name: 'Intraday Liquidity Facility', outstanding: 12400000000, rate: 0.0, utilization: 78.3, status: 'Active' },
      { name: 'Overnight Deposit Facility', outstanding: 8900000000, rate: 2.25, utilization: 65.2, status: 'Active' },
      { name: 'Marginal Lending Facility', outstanding: 6700000000, rate: 3.25, utilization: 52.1, status: 'Active' },
      { name: 'Term Lending Facility', outstanding: 4200000000, rate: 2.75, utilization: 34.8, status: 'Active' },
      { name: 'US Dollar Liquidity Facility', outstanding: 2800000000, rate: 3.50, utilization: 28.5, status: 'Warning' }
    ],
    trends: [
      { date: '07-06', total: 42300000000, intraday: 11200000000, overnight: 8500000000, term: 4100000000 },
      { date: '07-07', total: 43800000000, intraday: 11800000000, overnight: 8800000000, term: 4200000000 },
      { date: '07-08', total: 44200000000, intraday: 12000000000, overnight: 8700000000, term: 4000000000 },
      { date: '07-09', total: 45100000000, intraday: 12200000000, overnight: 8900000000, term: 4300000000 },
      { date: '07-10', total: 45600000000, intraday: 12400000000, overnight: 8900000000, term: 4200000000 }
    ],
    bankUtilization: [
      { bank: 'Emirates NBD', utilization: 85.2, outstanding: 5600000000, limit: 6800000000 },
      { bank: 'First Abu Dhabi Bank', utilization: 73.4, outstanding: 4900000000, limit: 6500000000 },
      { bank: 'ADCB Bank', utilization: 68.1, outstanding: 3800000000, limit: 5600000000 },
      { bank: 'Mashreq Bank', utilization: 54.3, outstanding: 2400000000, limit: 4200000000 },
      { bank: 'RAK Bank', utilization: 42.7, outstanding: 1800000000, limit: 3500000000 }
    ]
  };

  const chartConfig = {
    total: { label: 'Total', color: '#3b82f6' },
    intraday: { label: 'Intraday', color: '#10b981' },
    overnight: { label: 'Overnight', color: '#f59e0b' },
    term: { label: 'Term', color: '#ef4444' }
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

          {/* Liquidity Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Utilization Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liquidityData.trends}>
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [`$${(Number(value) / 1000000000).toFixed(1)}B`, name]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="intraday" 
                      stackId="1"
                      stroke="var(--color-intraday)" 
                      fill="var(--color-intraday)"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="overnight" 
                      stackId="1"
                      stroke="var(--color-overnight)" 
                      fill="var(--color-overnight)"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="term" 
                      stackId="1"
                      stroke="var(--color-term)" 
                      fill="var(--color-term)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Facilities Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Facilities Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Facility</th>
                      <th className="text-left p-3 font-semibold">Outstanding</th>
                      <th className="text-left p-3 font-semibold">Rate</th>
                      <th className="text-left p-3 font-semibold">Utilization</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidityData.facilities.map((facility, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{facility.name}</td>
                        <td className="p-3">${(facility.outstanding / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">{facility.rate.toFixed(2)}%</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={facility.utilization} className="w-16 h-2" />
                            <span className={`font-medium ${getUtilizationColor(facility.utilization)}`}>
                              {facility.utilization.toFixed(1)}%
                            </span>
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

          {/* Bank Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Utilization Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liquidityData.bankUtilization.map((bank, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{bank.bank}</span>
                      <span className={`font-bold ${getUtilizationColor(bank.utilization)}`}>
                        {bank.utilization.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={bank.utilization} className="w-full mb-2" />
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Outstanding: ${(bank.outstanding / 1000000000).toFixed(1)}B</span>
                      <span>Limit: ${(bank.limit / 1000000000).toFixed(1)}B</span>
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
              <Button className="w-full justify-start">Adjust Facility Rates</Button>
              <Button variant="outline" className="w-full justify-start">Monitor Real-time Usage</Button>
              <Button variant="outline" className="w-full justify-start">Set Utilization Alerts</Button>
              <Button variant="outline" className="w-full justify-start">Generate Liquidity Report</Button>
              <Button variant="outline" className="w-full justify-start">Emergency Protocols</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CentralBankLiquidityPage;