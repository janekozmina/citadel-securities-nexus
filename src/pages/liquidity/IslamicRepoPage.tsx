import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Star, TrendingUp, Clock, Shield, Building } from 'lucide-react';

const IslamicRepoPage = () => {
  const islamicData = {
    totalAssets: 28600000000,
    activeContracts: 156,
    avgProfitRate: 3.25,
    complianceRatio: 99.7,
    contracts: [
      { type: 'Murabaha', outstanding: 12400000000, contracts: 68, avgRate: 3.15, status: 'Active' },
      { type: 'Ijarah', outstanding: 8900000000, contracts: 42, avgRate: 3.35, status: 'Active' },
      { type: 'Wakala', outstanding: 4800000000, contracts: 28, avgRate: 3.05, status: 'Active' },
      { type: 'Musharaka', outstanding: 2500000000, contracts: 18, avgRate: 3.45, status: 'Active' }
    ],
    assetTypes: [
      { type: 'Sukuk Government', value: 15200000000, compliance: 100, color: '#3b82f6' },
      { type: 'Sukuk Corporate', value: 8400000000, compliance: 99.8, color: '#10b981' },
      { type: 'Islamic Bonds', value: 3600000000, compliance: 99.5, color: '#f59e0b' },
      { type: 'Shariah Equities', value: 1400000000, compliance: 99.2, color: '#ef4444' }
    ],
    participants: [
      { bank: 'Emirates Islamic Bank', outstanding: 5800000000, compliance: 100, contracts: 34 },
      { bank: 'Dubai Islamic Bank', outstanding: 4200000000, compliance: 99.9, contracts: 28 },
      { bank: 'Sharjah Islamic Bank', outstanding: 3600000000, compliance: 99.8, contracts: 22 },
      { bank: 'Ajman Bank', outstanding: 2400000000, compliance: 99.7, contracts: 18 },
      { bank: 'Al Hilal Bank', outstanding: 1800000000, compliance: 99.5, contracts: 14 }
    ],
    complianceMetrics: [
      { metric: 'Shariah Compliance', score: 99.7, target: 99.5, status: 'Excellent' },
      { metric: 'Asset Screening', score: 100, target: 99.8, status: 'Excellent' },
      { metric: 'Contract Review', score: 99.4, target: 99.0, status: 'Good' },
      { metric: 'Profit Distribution', score: 99.8, target: 99.5, status: 'Excellent' }
    ]
  };

  const chartConfig = {
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
      case 'Excellent': return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'Good': return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'Warning': return <Badge variant="destructive">Warning</Badge>;
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
                  <Star className="h-8 w-8 text-gold-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={islamicData.assetTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {islamicData.assetTypes.map((entry, index) => (
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
                <CardTitle>Contract Types Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={islamicData.contracts}>
                      <XAxis dataKey="type" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000000).toFixed(1)}B`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="outstanding" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Shariah Compliance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {islamicData.complianceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">{metric.metric}</span>
                      <Star className="h-4 w-4 text-gold-500" />
                    </div>
                    <div className="text-2xl font-bold mb-1">{metric.score}%</div>
                    <div className="text-xs text-slate-500 mb-2">Target: {metric.target}%</div>
                    {getStatusBadge(metric.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Participants Table */}
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
                      <th className="text-left p-3 font-semibold">Outstanding</th>
                      <th className="text-left p-3 font-semibold">Contracts</th>
                      <th className="text-left p-3 font-semibold">Compliance Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {islamicData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.bank}</td>
                        <td className="p-3">${(participant.outstanding / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">{participant.contracts}</td>
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
              <Button className="w-full justify-start">New Shariah Contract</Button>
              <Button variant="outline" className="w-full justify-start">Compliance Review</Button>
              <Button variant="outline" className="w-full justify-start">Asset Screening</Button>
              <Button variant="outline" className="w-full justify-start">Profit Distribution</Button>
              <Button variant="outline" className="w-full justify-start">Shariah Board Report</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IslamicRepoPage;