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
    totalExposure: 45600000000,
    activeRepos: 247,
    marginCallsActive: 8,
    avgMaturity: 7.2,
    repoExposure: [
      { counterparty: 'Goldman Sachs', exposure: 8400000000, assetClass: 'Gov Bonds', maturity: '7 days', status: 'Active' },
      { counterparty: 'JPMorgan Chase', exposure: 6800000000, assetClass: 'Corporate', maturity: '14 days', status: 'Active' },
      { counterparty: 'Morgan Stanley', exposure: 5200000000, assetClass: 'MBS', maturity: '3 days', status: 'Margin Call' },
      { counterparty: 'Bank of America', exposure: 4100000000, assetClass: 'Gov Bonds', maturity: '21 days', status: 'Active' },
      { counterparty: 'Citigroup', exposure: 3600000000, assetClass: 'Corporate', maturity: '1 day', status: 'Active' }
    ],
    collateralTypes: [
      { type: 'Government Bonds', value: 22800000000, percentage: 50, haircut: 2.0, color: '#3b82f6' },
      { type: 'Corporate Bonds', value: 13680000000, percentage: 30, haircut: 5.5, color: '#10b981' },
      { type: 'Mortgage-Backed Securities', value: 6840000000, percentage: 15, haircut: 8.0, color: '#f59e0b' },
      { type: 'Agency Bonds', value: 2280000000, percentage: 5, haircut: 3.5, color: '#ef4444' }
    ],
    marginCalls: [
      { id: 'MC001', counterparty: 'Morgan Stanley', amount: 45000000, type: 'Initial', status: 'Pending', deadline: '2 hours' },
      { id: 'MC002', counterparty: 'Deutsche Bank', amount: 28000000, type: 'Variation', status: 'Accepted', deadline: 'Met' },
      { id: 'MC003', counterparty: 'Credit Suisse', amount: 35000000, type: 'Initial', status: 'Disputed', deadline: '4 hours' },
      { id: 'MC004', counterparty: 'UBS', amount: 19000000, type: 'Variation', status: 'Fulfilled', deadline: 'Met' }
    ],
    maturityLadder: [
      { period: 'Today', count: 45, amount: 8200000000, percentage: 18 },
      { period: '1-3 Days', count: 67, amount: 12400000000, percentage: 27 },
      { period: '4-7 Days', count: 89, amount: 15800000000, percentage: 35 },
      { period: '1-2 Weeks', count: 32, amount: 6900000000, percentage: 15 },
      { period: '2+ Weeks', count: 14, amount: 2300000000, percentage: 5 }
    ],
    counterpartyRisk: [
      { name: 'Goldman Sachs', riskWeighted: 6720000000, limitUtilization: 84, threshold: 8000000000, rating: 'AA+' },
      { name: 'JPMorgan Chase', riskWeighted: 5440000000, limitUtilization: 68, threshold: 8000000000, rating: 'AA+' },
      { name: 'Morgan Stanley', riskWeighted: 4680000000, limitUtilization: 93, threshold: 5000000000, rating: 'AA' },
      { name: 'Bank of America', riskWeighted: 3280000000, limitUtilization: 55, threshold: 6000000000, rating: 'AA' },
      { name: 'Citigroup', riskWeighted: 2880000000, limitUtilization: 48, threshold: 6000000000, rating: 'AA' }
    ],
    collateralSubstitution: [
      { date: '07-06', accepted: 12, rejected: 3, pending: 5 },
      { date: '07-07', accepted: 15, rejected: 2, pending: 7 },
      { date: '07-08', accepted: 18, rejected: 4, pending: 3 },
      { date: '07-09', accepted: 22, rejected: 1, pending: 8 },
      { date: '07-10', accepted: 19, rejected: 3, pending: 6 }
    ]
  };

  const chartConfig = {
    amount: { label: 'Amount', color: '#3b82f6' },
    accepted: { label: 'Accepted', color: '#10b981' },
    rejected: { label: 'Rejected', color: '#ef4444' },
    pending: { label: 'Pending', color: '#f59e0b' },
    value: { label: 'Value', color: '#3b82f6' },
    count: { label: 'Count', color: '#10b981' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Margin Call': return <Badge variant="destructive">Margin Call</Badge>;
      case 'Pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Accepted': return <Badge className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'Disputed': return <Badge variant="destructive">Disputed</Badge>;
      case 'Fulfilled': return <Badge className="bg-blue-100 text-blue-800">Fulfilled</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRiskColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tri-Party REPO Services</h1>
            <p className="text-slate-600">Comprehensive collateral management and repo operations</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Exposure</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Value:</span>
                      <span className="font-medium">${(repoData.totalExposure / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Active REPOs:</span>
                      <span className="font-medium">{repoData.activeRepos}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active REPOs</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Count:</span>
                      <span className="font-medium">{repoData.activeRepos}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Avg Maturity:</span>
                      <span className="font-medium">{repoData.avgMaturity} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Margin Calls</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Count:</span>
                      <span className="font-medium">{repoData.marginCallsActive}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Status:</span>
                      <span className="font-medium">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Alert:</span>
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Avg Maturity</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Days:</span>
                      <span className="font-medium">{repoData.avgMaturity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Exposure:</span>
                      <span className="font-medium">${(repoData.totalExposure / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Monitor:</span>
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          {/* Repo Exposure Monitor & Margin Call Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Collateral Types Distribution</CardTitle>
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
                        label={({ type, percentage }) => `${type} ${percentage}%`}
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
                <CardTitle>Collateral Substitution Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={repoData.collateralSubstitution}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="accepted" fill="var(--color-accepted)" stackId="a" />
                      <Bar dataKey="rejected" fill="var(--color-rejected)" stackId="a" />
                      <Bar dataKey="pending" fill="var(--color-pending)" stackId="a" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Repo Exposure by Counterparty */}
          <Card>
            <CardHeader>
              <CardTitle>Repo Exposure Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Counterparty</th>
                      <th className="text-left p-3 font-semibold">Exposure</th>
                      <th className="text-left p-3 font-semibold">Asset Class</th>
                      <th className="text-left p-3 font-semibold">Maturity</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repoData.repoExposure.map((repo, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{repo.counterparty}</td>
                        <td className="p-3">${(repo.exposure / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">{repo.assetClass}</td>
                        <td className="p-3">{repo.maturity}</td>
                        <td className="p-3">{getStatusBadge(repo.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Margin Call Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Margin Call Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Active Margin Calls</h4>
                  {repoData.marginCalls.map((call, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{call.id} - {call.counterparty}</div>
                          <div className="text-sm text-slate-600">{call.type} Margin Call</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${(call.amount / 1000000).toFixed(1)}M</div>
                          <div className="text-xs text-slate-500">Deadline: {call.deadline}</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        {getStatusBadge(call.status)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Maturity Ladder</h4>
                  {repoData.maturityLadder.map((period, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{period.period}</span>
                        <span>{period.percentage}%</span>
                      </div>
                      <Progress value={period.percentage} className="w-full" />
                      <div className="text-xs text-slate-600 flex justify-between">
                        <span>{period.count} repos</span>
                        <span>${(period.amount / 1000000000).toFixed(1)}B</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Counterparty Risk Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Counterparty Risk Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Counterparty</th>
                      <th className="text-left p-3 font-semibold">Risk-Weighted Exposure</th>
                      <th className="text-left p-3 font-semibold">Limit Utilization</th>
                      <th className="text-left p-3 font-semibold">Threshold</th>
                      <th className="text-left p-3 font-semibold">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repoData.counterpartyRisk.map((risk, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{risk.name}</td>
                        <td className="p-3">${(risk.riskWeighted / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Progress value={risk.limitUtilization} className="w-16 h-2" />
                            <span className={`font-medium ${getRiskColor(risk.limitUtilization)}`}>
                              {risk.limitUtilization}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3">${(risk.threshold / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">
                          <Badge variant="outline">{risk.rating}</Badge>
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
                <Button className="w-full justify-start">Initiate New Tri-Party Repo</Button>
                <Button variant="outline" className="w-full justify-start">Accept/Reject Collateral Sub</Button>
                <Button variant="outline" className="w-full justify-start">Trigger Margin Call</Button>
                <Button variant="outline" className="w-full justify-start">Download Exposure Reconciliation</Button>
                <Button variant="outline" className="w-full justify-start">Risk Limit Monitoring</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TriPartyRepoPage;