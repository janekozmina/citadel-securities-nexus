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
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Margin Calculation</h1>
              <p className="text-slate-600">Monitor margin requirements and risk exposure</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Initial Margin</p>
                    <p className="text-2xl font-bold">$102.5M</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Variation Margin</p>
                    <p className="text-2xl font-bold text-red-600">+$8.1M</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Margin Required</p>
                    <p className="text-2xl font-bold">$110.6M</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Average Utilization</p>
                    <p className="text-2xl font-bold text-yellow-600">69%</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-600">69</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Margin by Asset Class</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marginData.marginByAsset}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="margin"
                        label={({ asset, percent }) => `${asset} ${(percent * 100).toFixed(0)}%`}
                      >
                        {marginData.marginByAsset.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        formatter={(value) => [`$${(Number(value) / 1000000).toFixed(1)}M`, 'Margin']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factor Weights</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marginData.riskFactors} layout="horizontal">
                      <XAxis type="number" domain={[0, 40]} />
                      <YAxis dataKey="factor" type="category" width={100} fontSize={12} />
                      <ChartTooltip 
                        formatter={(value) => [`${value}%`, 'Weight']}
                      />
                      <Bar dataKey="weight" fill="var(--color-margin)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
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

        <div className="w-80 border-l bg-slate-50/50 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">Calculate Initial Margin</Button>
              <Button variant="outline" className="w-full justify-start">Update Risk Parameters</Button>
              <Button variant="outline" className="w-full justify-start">Generate Margin Call</Button>
              <Button variant="outline" className="w-full justify-start">Review Collateral</Button>
              <Button variant="outline" className="w-full justify-start">Stress Test Scenarios</Button>
              <Button variant="outline" className="w-full justify-start">Export Margin Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MarginCalculationPage;