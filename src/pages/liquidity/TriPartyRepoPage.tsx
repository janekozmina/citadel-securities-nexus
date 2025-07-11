import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Shield, Clock, Building, AlertTriangle } from 'lucide-react';

const TriPartyRepoPage = () => {
  const repoData = {
    totalCollateral: 15400000000,
    activeRepos: 247,
    averageMaturity: 7.2,
    collateralUtilization: 83.4,
    participants: [
      { name: 'Emirates NBD', outstanding: 2800000000, collateral: 3200000000, rating: 'AA' },
      { name: 'First Abu Dhabi Bank', outstanding: 2400000000, collateral: 2900000000, rating: 'AA+' },
      { name: 'ADCB Bank', outstanding: 1900000000, collateral: 2300000000, rating: 'AA' },
      { name: 'Mashreq Bank', outstanding: 1500000000, collateral: 1800000000, rating: 'A+' },
      { name: 'CBD Bank', outstanding: 1200000000, collateral: 1450000000, rating: 'A' }
    ],
    collateralTypes: [
      { type: 'Government Bonds', value: 6800000000, haircut: 2.0, color: '#3b82f6' },
      { type: 'Corporate Bonds', value: 4200000000, haircut: 5.5, color: '#10b981' },
      { type: 'Bank Deposits', value: 2600000000, haircut: 0.5, color: '#f59e0b' },
      { type: 'Equities', value: 1800000000, haircut: 15.0, color: '#ef4444' }
    ],
    maturityProfile: [
      { period: 'Overnight', count: 89, value: 3200000000 },
      { period: '1-7 Days', count: 75, value: 2800000000 },
      { period: '1-4 Weeks', count: 48, value: 2100000000 },
      { period: '1-3 Months', count: 35, value: 1500000000 }
    ]
  };

  const chartConfig = {
    value: { label: 'Value', color: '#3b82f6' },
    count: { label: 'Count', color: '#10b981' }
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Tri-Party REPO Services</h1>
              <p className="text-slate-600">Comprehensive collateral management and repo operations</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Collateral</p>
                    <p className="text-2xl font-bold">${(repoData.totalCollateral / 1000000000).toFixed(1)}B</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active REPOs</p>
                    <p className="text-2xl font-bold">{repoData.activeRepos}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Maturity</p>
                    <p className="text-2xl font-bold">{repoData.averageMaturity} days</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Collateral Utilization</p>
                    <p className="text-2xl font-bold">{repoData.collateralUtilization}%</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-600">84</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Collateral Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={repoData.collateralTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {repoData.collateralTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maturity Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={repoData.maturityProfile}>
                      <XAxis dataKey="period" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Participant Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Participant</th>
                      <th className="text-left p-3 font-semibold">Outstanding</th>
                      <th className="text-left p-3 font-semibold">Collateral Value</th>
                      <th className="text-left p-3 font-semibold">Credit Rating</th>
                      <th className="text-left p-3 font-semibold">Coverage Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repoData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.name}</td>
                        <td className="p-3">${(participant.outstanding / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">${(participant.collateral / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">
                          <Badge variant="outline">{participant.rating}</Badge>
                        </td>
                        <td className="p-3">
                          <span className="font-medium">
                            {((participant.collateral / participant.outstanding) * 100).toFixed(1)}%
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
              <Button className="w-full justify-start">New REPO Transaction</Button>
              <Button variant="outline" className="w-full justify-start">Collateral Substitution</Button>
              <Button variant="outline" className="w-full justify-start">Haircut Analysis</Button>
              <Button variant="outline" className="w-full justify-start">Risk Assessment</Button>
              <Button variant="outline" className="w-full justify-start">Settlement Monitor</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TriPartyRepoPage;