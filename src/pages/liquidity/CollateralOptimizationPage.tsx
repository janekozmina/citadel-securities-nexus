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
    totalCollateral: 54200000000,
    optimizationScore: 91.2,
    costSavings: 38500000,
    efficiency: 94.7,
    collateralDistribution: [
      { type: 'Government Bonds', current: 18600000000, optimal: 16200000000, cost: 12000, eligibility: 'High', liquidity: 'High', savings: 9200000 },
      { type: 'Corporate Bonds', current: 14800000000, optimal: 16400000000, cost: 28000, eligibility: 'Medium', liquidity: 'Medium', savings: 4800000 },
      { type: 'HQLA Securities', current: 12200000000, optimal: 13800000000, cost: 8500, eligibility: 'High', liquidity: 'High', savings: 12400000 },
      { type: 'Cash Equivalents', current: 8600000000, optimal: 7800000000, cost: 5200, eligibility: 'High', liquidity: 'High', savings: 12100000 }
    ],
    aiRecommendations: [
      { priority: 'High', action: 'Substitute $2.4B Gov Bonds with Corp Bonds', impact: 12.4, confidence: 96, costReduction: 18000, riskImpact: 'Low' },
      { priority: 'High', action: 'Increase HQLA allocation by $1.6B', impact: 9.8, confidence: 92, costReduction: 14500, riskImpact: 'Minimal' },
      { priority: 'Medium', action: 'Optimize cash equivalent duration', impact: 6.2, confidence: 89, costReduction: 8200, riskImpact: 'Low' },
      { priority: 'Medium', action: 'Rebalance cross-CCP eligibility', impact: 4.5, confidence: 87, costReduction: 6400, riskImpact: 'Medium' },
      { priority: 'Low', action: 'Review counterparty concentration limits', impact: 2.8, confidence: 82, costReduction: 3200, riskImpact: 'Low' }
    ],
    assetUtilization: [
      { asset: 'US Treasury 10Y', utilization: 95.2, counterparties: ['Goldman Sachs', 'JPMorgan', 'Morgan Stanley'], hqlaStatus: 'Level 1', status: 'Overused' },
      { asset: 'German Bund 5Y', utilization: 87.4, counterparties: ['Deutsche Bank', 'Credit Suisse'], hqlaStatus: 'Level 1', status: 'High' },
      { asset: 'UK Gilts 7Y', utilization: 34.8, counterparties: ['Barclays'], hqlaStatus: 'Level 1', status: 'Underused' },
      { asset: 'Corporate AAA Bonds', utilization: 76.3, counterparties: ['Citigroup', 'Bank of America'], hqlaStatus: 'Level 2A', status: 'Optimal' },
      { asset: 'Money Market Funds', utilization: 23.1, counterparties: ['UBS'], hqlaStatus: 'Level 2B', status: 'Underused' }
    ],
    eligibilityMatrix: [
      { asset: 'US Treasury', ccp1: 'Eligible', ccp2: 'Eligible', ccp3: 'Eligible', haircut1: 2.0, haircut2: 2.5, haircut3: 2.0, recommendation: 'Optimal' },
      { asset: 'German Bund', ccp1: 'Eligible', ccp2: 'Eligible', ccp3: 'Restricted', haircut1: 2.5, haircut2: 3.0, haircut3: 5.0, recommendation: 'Consider Substitution' },
      { asset: 'Corporate AAA', ccp1: 'Eligible', ccp2: 'Restricted', ccp3: 'Eligible', haircut1: 5.5, haircut2: 8.0, haircut3: 6.0, recommendation: 'CCP2 Alternative' },
      { asset: 'Covered Bonds', ccp1: 'Restricted', ccp2: 'Eligible', ccp3: 'Eligible', haircut1: 8.0, haircut2: 6.5, haircut3: 7.0, recommendation: 'Diversify Usage' },
      { asset: 'Agency MBS', ccp1: 'Eligible', ccp2: 'Ineligible', ccp3: 'Restricted', haircut1: 12.0, haircut2: 0.0, haircut3: 15.0, recommendation: 'Limited Use' }
    ],
    scenarioAnalysis: [
      { scenario: 'Stress Test - Market Shock', currentCost: 245000, optimizedCost: 198000, savings: 47000, riskIncrease: 15.2 },
      { scenario: 'Rate Hike - 200bp', currentCost: 298000, optimizedCost: 242000, savings: 56000, riskIncrease: 8.7 },
      { scenario: 'Liquidity Crunch', currentCost: 412000, optimizedCost: 328000, savings: 84000, riskIncrease: 22.4 },
      { scenario: 'Credit Downgrade', currentCost: 186000, optimizedCost: 156000, savings: 30000, riskIncrease: 12.1 }
    ]
  };

  const chartConfig = {
    efficiency: { label: 'Efficiency', color: '#3b82f6' },
    target: { label: 'Target', color: '#10b981' },
    current: { label: 'Current', color: '#ef4444' },
    optimal: { label: 'Optimal', color: '#10b981' },
    savings: { label: 'Savings', color: '#f59e0b' },
    currentReuse: { label: 'Current Reuse', color: '#8b5cf6' },
    optimalReuse: { label: 'Optimal Reuse', color: '#06b6d4' }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return <Badge variant="destructive">High</Badge>;
      case 'Medium': return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'Low': return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 80) return 'text-yellow-600';
    if (utilization >= 60) return 'text-green-600';
    return 'text-blue-600';
  };

  const getEligibilityBadge = (status: string) => {
    switch (status) {
      case 'Eligible': return <Badge className="bg-green-100 text-green-800">Eligible</Badge>;
      case 'Restricted': return <Badge className="bg-yellow-100 text-yellow-800">Restricted</Badge>;
      case 'Ineligible': return <Badge variant="destructive">Ineligible</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRecommendationColor = (rec: string) => {
    if (rec.includes('Optimal')) return 'text-green-600';
    if (rec.includes('Consider') || rec.includes('Alternative')) return 'text-yellow-600';
    return 'text-blue-600';
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Collateral Optimization AI</h1>
            <p className="text-slate-600">AI-powered collateral management and optimization</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Collateral</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Value:</span>
                      <span className="font-medium">${(optimizationData.totalCollateral / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Score:</span>
                      <span className="font-medium">{optimizationData.optimizationScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Optimization Score</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Score:</span>
                      <span className="font-medium">{optimizationData.optimizationScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Efficiency:</span>
                      <span className="font-medium">{optimizationData.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">AI:</span>
                      <Target className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Cost Savings</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Amount:</span>
                      <span className="font-medium">${(optimizationData.costSavings / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Status:</span>
                      <span className="font-medium">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Trend:</span>
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">AI Efficiency</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Rate:</span>
                      <span className="font-medium">{optimizationData.efficiency}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Savings:</span>
                      <span className="font-medium">${(optimizationData.costSavings / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">AI:</span>
                      <Brain className="h-4 w-4 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current vs Optimal Collateral Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Current vs Optimal Collateral Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Asset Type</th>
                        <th className="text-left p-3 font-semibold">Current</th>
                        <th className="text-left p-3 font-semibold">Optimal</th>
                        <th className="text-left p-3 font-semibold">Cost/Day</th>
                        <th className="text-left p-3 font-semibold">Eligibility</th>
                        <th className="text-left p-3 font-semibold">Liquidity</th>
                        <th className="text-left p-3 font-semibold">Predicted Savings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimizationData.collateralDistribution.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{item.type}</td>
                          <td className="p-3">${(item.current / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">${(item.optimal / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">${item.cost.toLocaleString()}</td>
                          <td className="p-3">
                            <Badge className={item.eligibility === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {item.eligibility}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={item.liquidity === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {item.liquidity}
                            </Badge>
                          </td>
                          <td className="p-3 font-medium text-green-600">
                            ${(item.savings / 1000000).toFixed(1)}M
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Asset Utilization Heatmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Asset Utilization Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Asset</th>
                        <th className="text-left p-3 font-semibold">Utilization</th>
                        <th className="text-left p-3 font-semibold">Absorbing Counterparties</th>
                        <th className="text-left p-3 font-semibold">HQLA Status</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimizationData.assetUtilization.map((asset, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{asset.asset}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={asset.utilization} className="w-20 h-2" />
                              <span className={`font-medium ${getUtilizationColor(asset.utilization)}`}>
                                {asset.utilization.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-sm">
                            {asset.counterparties.slice(0, 2).join(', ')}
                            {asset.counterparties.length > 2 && ' +' + (asset.counterparties.length - 2)}
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{asset.hqlaStatus}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge className={
                              asset.status === 'Overused' ? 'bg-red-100 text-red-800' :
                              asset.status === 'High' ? 'bg-yellow-100 text-yellow-800' :
                              asset.status === 'Optimal' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {asset.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations Engine */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Recommendations Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationData.aiRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {getPriorityBadge(rec.priority)}
                          <span className="font-semibold">{rec.action}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-600 font-medium">
                            ${rec.costReduction.toLocaleString()}/day savings
                          </div>
                          <div className="text-xs text-slate-500">
                            {rec.confidence}% confidence
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Impact: {rec.impact}%</span>
                        <span className="text-slate-600">Risk: {rec.riskImpact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Eligibility & Haircut Analyzer */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility & Haircut Analyzer Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Asset Type</th>
                        <th className="text-left p-3 font-semibold">CCP 1</th>
                        <th className="text-left p-3 font-semibold">CCP 2</th>
                        <th className="text-left p-3 font-semibold">CCP 3</th>
                        <th className="text-left p-3 font-semibold">Avg Haircut</th>
                        <th className="text-left p-3 font-semibold">AI Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimizationData.eligibilityMatrix.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{item.asset}</td>
                          <td className="p-3">
                            <div className="space-y-1">
                              {getEligibilityBadge(item.ccp1)}
                              <div className="text-xs text-slate-500">{item.haircut1}%</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1">
                              {getEligibilityBadge(item.ccp2)}
                              <div className="text-xs text-slate-500">{item.haircut2}%</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1">
                              {getEligibilityBadge(item.ccp3)}
                              <div className="text-xs text-slate-500">{item.haircut3}%</div>
                            </div>
                          </td>
                          <td className="p-3 font-medium">
                            {((item.haircut1 + item.haircut2 + item.haircut3) / 3).toFixed(1)}%
                          </td>
                          <td className="p-3">
                            <span className={`text-sm font-medium ${getRecommendationColor(item.recommendation)}`}>
                              {item.recommendation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Analysis & Stress Testing */}
            <Card>
              <CardHeader>
                <CardTitle>Scenario Analysis & Stress Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Scenario</th>
                        <th className="text-left p-3 font-semibold">Current Cost</th>
                        <th className="text-left p-3 font-semibold">Optimized Cost</th>
                        <th className="text-left p-3 font-semibold">Savings</th>
                        <th className="text-left p-3 font-semibold">Risk Increase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimizationData.scenarioAnalysis.map((scenario, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{scenario.scenario}</td>
                          <td className="p-3">${scenario.currentCost.toLocaleString()}</td>
                          <td className="p-3">${scenario.optimizedCost.toLocaleString()}</td>
                          <td className="p-3 text-green-600 font-medium">
                            ${scenario.savings.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className={
                              scenario.riskIncrease > 20 ? 'text-red-600' :
                              scenario.riskIncrease > 15 ? 'text-yellow-600' :
                              'text-green-600'
                            }>
                              +{scenario.riskIncrease}%
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
                <Button className="w-full justify-start">Run AI Optimization</Button>
                <Button variant="outline" className="w-full justify-start">Apply Recommendations</Button>
                <Button variant="outline" className="w-full justify-start">Generate Scenario Analysis</Button>
                <Button variant="outline" className="w-full justify-start">Export Optimization Report</Button>
                <Button variant="outline" className="w-full justify-start">Configure AI Parameters</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CollateralOptimizationPage;