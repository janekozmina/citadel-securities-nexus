import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ScatterChart, Scatter, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, Zap, Target, BarChart3 } from 'lucide-react';

const CollateralOptimizationPage = () => {
  const optimizationData = {
    totalCollateral: 34200000000,
    optimizationScore: 87.5,
    costSavings: 24500000,
    efficiency: 92.3,
    portfolios: [
      { name: 'Government Securities', current: 15600000000, optimal: 14200000000, efficiency: 91.0, savings: 8500000 },
      { name: 'Corporate Bonds', current: 9800000000, optimal: 10400000000, efficiency: 94.1, savings: 6200000 },
      { name: 'Bank Deposits', current: 5400000000, optimal: 5800000000, efficiency: 89.3, savings: 4800000 },
      { name: 'Equity Holdings', current: 3400000000, optimal: 3800000000, efficiency: 88.7, savings: 5000000 }
    ],
    aiRecommendations: [
      { priority: 'High', action: 'Rebalance govt securities allocation', impact: 8.5, confidence: 94 },
      { priority: 'Medium', action: 'Optimize corporate bond duration', impact: 6.2, confidence: 87 },
      { priority: 'Medium', action: 'Increase deposit diversification', impact: 4.8, confidence: 91 },
      { priority: 'Low', action: 'Review equity concentration limits', impact: 3.1, confidence: 78 }
    ],
    riskMetrics: [
      { date: '07-06', var: 125000000, stressed: 280000000, concentration: 15.2 },
      { date: '07-07', var: 118000000, stressed: 265000000, concentration: 14.8 },
      { date: '07-08', var: 122000000, stressed: 275000000, concentration: 15.1 },
      { date: '07-09', var: 115000000, stressed: 250000000, concentration: 14.5 },
      { date: '07-10', var: 108000000, stressed: 235000000, concentration: 14.2 }
    ],
    efficiencyTrends: [
      { date: '07-06', efficiency: 85.2, target: 90.0 },
      { date: '07-07', efficiency: 86.1, target: 90.0 },
      { date: '07-08', efficiency: 87.3, target: 90.0 },
      { date: '07-09', efficiency: 88.9, target: 90.0 },
      { date: '07-10', efficiency: 92.3, target: 90.0 }
    ]
  };

  const chartConfig = {
    efficiency: { label: 'Efficiency', color: '#3b82f6' },
    target: { label: 'Target', color: '#10b981' },
    var: { label: 'VaR', color: '#ef4444' },
    stressed: { label: 'Stressed VaR', color: '#f59e0b' }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return <Badge variant="destructive">High</Badge>;
      case 'Medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'Low': return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Collateral Optimization AI</h1>
              <p className="text-slate-600">AI-powered collateral management and optimization</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Collateral</p>
                    <p className="text-2xl font-bold">${(optimizationData.totalCollateral / 1000000000).toFixed(1)}B</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Optimization Score</p>
                    <p className="text-2xl font-bold text-green-600">{optimizationData.optimizationScore}</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Cost Savings</p>
                    <p className="text-2xl font-bold">${(optimizationData.costSavings / 1000000).toFixed(1)}M</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">AI Efficiency</p>
                    <p className="text-2xl font-bold">{optimizationData.efficiency}%</p>
                  </div>
                  <Brain className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={optimizationData.efficiencyTrends}>
                      <XAxis dataKey="date" />
                      <YAxis domain={[80, 95]} tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="var(--color-efficiency)" 
                        strokeWidth={3}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="var(--color-target)" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Metrics Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={optimizationData.riskMetrics}>
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value, name) => [`$${(Number(value) / 1000000).toFixed(1)}M`, name]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="var" 
                        stroke="var(--color-var)" 
                        fill="var(--color-var)"
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="stressed" 
                        stroke="var(--color-stressed)" 
                        fill="var(--color-stressed)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationData.aiRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getPriorityBadge(rec.priority)}
                        <span className="font-medium">{rec.action}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Impact: ${rec.impact}M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Progress value={rec.confidence} className="w-32 h-2" />
                      <span className="text-sm text-slate-600">Confidence: {rec.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Optimization */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Optimization Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Portfolio</th>
                      <th className="text-left p-3 font-semibold">Current Allocation</th>
                      <th className="text-left p-3 font-semibold">Optimal Allocation</th>
                      <th className="text-left p-3 font-semibold">Efficiency</th>
                      <th className="text-left p-3 font-semibold">Potential Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimizationData.portfolios.map((portfolio, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{portfolio.name}</td>
                        <td className="p-3">${(portfolio.current / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">${(portfolio.optimal / 1000000000).toFixed(1)}B</td>
                        <td className="p-3">
                          <span className={`font-medium ${getEfficiencyColor(portfolio.efficiency)}`}>
                            {portfolio.efficiency}%
                          </span>
                        </td>
                        <td className="p-3 font-medium text-green-600">
                          ${(portfolio.savings / 1000000).toFixed(1)}M
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
              <Button className="w-full justify-start">Run AI Optimization</Button>
              <Button variant="outline" className="w-full justify-start">Apply Recommendations</Button>
              <Button variant="outline" className="w-full justify-start">Stress Test Scenarios</Button>
              <Button variant="outline" className="w-full justify-start">Risk Analysis</Button>
              <Button variant="outline" className="w-full justify-start">Generate Report</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CollateralOptimizationPage;