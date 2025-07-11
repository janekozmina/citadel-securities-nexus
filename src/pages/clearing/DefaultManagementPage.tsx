import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertTriangle, Shield, Users, DollarSign } from 'lucide-react';

const DefaultManagementPage = () => {
  const defaultData = {
    defaultFund: {
      totalSize: 150000000,
      utilized: 23000000,
      available: 127000000,
      utilization: 15.3
    },
    participants: [
      { name: 'Bank A', contribution: 35000000, status: 'Active', riskScore: 2.1 },
      { name: 'Bank B', contribution: 28000000, status: 'Active', riskScore: 1.8 },
      { name: 'Bank C', contribution: 32000000, status: 'Warning', riskScore: 3.2 },
      { name: 'Investment Corp', contribution: 25000000, status: 'Active', riskScore: 2.4 },
      { name: 'Credit Union', contribution: 30000000, status: 'Active', riskScore: 1.9 }
    ],
    riskMetrics: [
      { date: 'Mon', exposure: 45000000, coverage: 98.5 },
      { date: 'Tue', exposure: 52000000, coverage: 97.2 },
      { date: 'Wed', exposure: 48000000, coverage: 98.1 },
      { date: 'Thu', exposure: 58000000, coverage: 96.8 },
      { date: 'Fri', exposure: 61000000, coverage: 96.3 }
    ],
    stressScenarios: [
      { scenario: 'Single Default - Largest Member', impact: 85000000, coverage: 177 },
      { scenario: 'Two Largest Defaults', impact: 142000000, coverage: 106 },
      { scenario: 'Market Stress + Default', impact: 167000000, coverage: 90 },
      { scenario: 'Extreme Scenario', impact: 189000000, coverage: 79 }
    ]
  };

  const chartConfig = {
    exposure: { label: 'Exposure', color: '#ef4444' },
    coverage: { label: 'Coverage', color: '#10b981' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Warning': return <Badge variant="destructive">Warning</Badge>;
      case 'Critical': return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 3) return 'text-red-600';
    if (score >= 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 120) return 'text-green-600';
    if (coverage >= 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Default Management</h1>
              <p className="text-slate-600">Monitor default fund and risk exposure</p>
            </div>
          </div>

          {/* Default Fund Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Fund Size</p>
                    <p className="text-2xl font-bold">${(defaultData.defaultFund.totalSize / 1000000).toFixed(0)}M</p>
                  </div>
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Utilized</p>
                    <p className="text-2xl font-bold text-red-600">${(defaultData.defaultFund.utilized / 1000000).toFixed(0)}M</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Available</p>
                    <p className="text-2xl font-bold text-green-600">${(defaultData.defaultFund.available / 1000000).toFixed(0)}M</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Utilization</p>
                    <p className="text-2xl font-bold">{defaultData.defaultFund.utilization}%</p>
                    <Progress value={defaultData.defaultFund.utilization} className="w-full mt-2" />
                  </div>
                  <Users className="h-8 w-8 text-slate-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Exposure & Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={defaultData.riskMetrics}>
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value, name) => {
                          if (name === 'exposure') return [`$${(Number(value) / 1000000).toFixed(1)}M`, 'Exposure'];
                          return [`${value}%`, 'Coverage'];
                        }}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="exposure" 
                        stroke="var(--color-exposure)" 
                        strokeWidth={2}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="coverage" 
                        stroke="var(--color-coverage)" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stress Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={defaultData.stressScenarios} layout="horizontal">
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="scenario" type="category" width={120} fontSize={10} />
                      <ChartTooltip 
                        formatter={(value) => [`${value}%`, 'Coverage']}
                      />
                      <Bar dataKey="coverage" fill="var(--color-coverage)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Participant Contributions */}
          <Card>
            <CardHeader>
              <CardTitle>Participant Contributions & Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Participant</th>
                      <th className="text-left p-3 font-semibold">Contribution</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Risk Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {defaultData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.name}</td>
                        <td className="p-3">${(participant.contribution / 1000000).toFixed(1)}M</td>
                        <td className="p-3">{getStatusBadge(participant.status)}</td>
                        <td className="p-3">
                          <span className={`font-medium ${getRiskColor(participant.riskScore)}`}>
                            {participant.riskScore.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Stress Scenarios Table */}
          <Card>
            <CardHeader>
              <CardTitle>Stress Test Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Scenario</th>
                      <th className="text-left p-3 font-semibold">Potential Impact</th>
                      <th className="text-left p-3 font-semibold">Coverage Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {defaultData.stressScenarios.map((scenario, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{scenario.scenario}</td>
                        <td className="p-3">${(scenario.impact / 1000000).toFixed(0)}M</td>
                        <td className="p-3">
                          <span className={`font-medium ${getCoverageColor(scenario.coverage)}`}>
                            {scenario.coverage}%
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

        <div className="w-80 border-l bg-slate-50/50 p-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">Run Stress Test</Button>
              <Button variant="outline" className="w-full justify-start">Update Fund Size</Button>
              <Button variant="outline" className="w-full justify-start">Calculate Contributions</Button>
              <Button variant="outline" className="w-full justify-start">Generate Risk Report</Button>
              <Button variant="outline" className="w-full justify-start">Scenario Analysis</Button>
              <Button variant="outline" className="w-full justify-start">Default Procedures</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DefaultManagementPage;