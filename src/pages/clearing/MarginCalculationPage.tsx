import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield } from 'lucide-react';

const MarginCalculationPage = () => {
  const marginData = {
    marginRequirements: [
      { participant: 'Bank A', initial: 25000000, variation: 3200000, total: 28200000, utilization: 78 },
      { participant: 'Bank B', initial: 18500000, variation: -1800000, total: 16700000, utilization: 62 },
      { participant: 'Bank C', initial: 32000000, variation: 5400000, total: 37400000, utilization: 89 },
      { participant: 'Investment Corp', initial: 15000000, variation: 2100000, total: 17100000, utilization: 71 },
      { participant: 'Credit Union', initial: 12000000, variation: -800000, total: 11200000, utilization: 45 }
    ],
    riskFactors: [
      { factor: 'Interest Rate Risk', weight: 35, value: 2.8 },
      { factor: 'Credit Risk', weight: 25, value: 1.9 },
      { factor: 'Market Risk', weight: 20, value: 3.2 },
      { factor: 'Liquidity Risk', weight: 15, value: 2.1 },
      { factor: 'Operational Risk', weight: 5, value: 1.5 }
    ],
    marginByAsset: [
      { asset: 'Government Bonds', margin: 45000000, color: '#3b82f6' },
      { asset: 'Corporate Bonds', margin: 32000000, color: '#10b981' },
      { asset: 'Equities', margin: 28000000, color: '#f59e0b' },
      { asset: 'Derivatives', margin: 22000000, color: '#ef4444' },
      { asset: 'Money Market', margin: 15000000, color: '#8b5cf6' }
    ]
  };

  const chartConfig = {
    margin: { label: 'Margin', color: '#3b82f6' },
    value: { label: 'Value', color: '#10b981' }
  };

  const getVariationIcon = (variation: number) => {
    if (variation > 0) return <TrendingUp className="h-4 w-4 text-red-600" />;
    if (variation < 0) return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <Shield className="h-4 w-4 text-slate-600" />;
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 85) return 'text-red-600';
    if (utilization >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Margin Calculation</h1>
            <p className="text-slate-600">Monitor margin requirements and risk exposure</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Workflow Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Real-time Exposure Monitoring</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Current Exposure:</span>
                      <span className="font-medium">$85.2M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Intraday Peak:</span>
                      <span className="font-medium">$92.4M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Threshold:</span>
                      <span className="font-medium">$100M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Margin Call Automation</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Active Calls:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Pending Response:</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Auto-Resolved:</span>
                      <span className="font-medium">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Haircut Matrix Valuation</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Gov Bonds (AAA):</span>
                      <span className="font-medium">2.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Corp Bonds (AA):</span>
                      <span className="font-medium">5.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Equities:</span>
                      <span className="font-medium">15.0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Risk Summary</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Initial Margin:</span>
                      <span className="font-medium">$102.5M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Variation Margin:</span>
                      <span className="font-medium">+$8.1M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Avg Utilization:</span>
                      <span className="font-medium">69%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Participant Margin Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Participant Margin Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Participant</th>
                        <th className="text-left p-3 font-semibold">Initial Margin</th>
                        <th className="text-left p-3 font-semibold">Variation Margin</th>
                        <th className="text-left p-3 font-semibold">Total Required</th>
                        <th className="text-left p-3 font-semibold">Utilization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marginData.marginRequirements.map((req, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{req.participant}</td>
                          <td className="p-3">${(req.initial / 1000000).toFixed(1)}M</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {getVariationIcon(req.variation)}
                              <span className={req.variation > 0 ? 'text-red-600' : 'text-green-600'}>
                                ${Math.abs(req.variation / 1000000).toFixed(1)}M
                              </span>
                            </div>
                          </td>
                          <td className="p-3 font-medium">${(req.total / 1000000).toFixed(1)}M</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={req.utilization} className="w-16 h-2" />
                              <span className={`font-medium ${getUtilizationColor(req.utilization)}`}>
                                {req.utilization}%
                              </span>
                            </div>
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
                <Button className="w-full justify-start">Calculate Initial Margin</Button>
                <Button variant="outline" className="w-full justify-start">Update Risk Parameters</Button>
                <Button variant="outline" className="w-full justify-start">Generate Margin Call</Button>
                <Button variant="outline" className="w-full justify-start">Review Collateral</Button>
                <Button variant="outline" className="w-full justify-start">Stress Test Scenarios</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MarginCalculationPage;