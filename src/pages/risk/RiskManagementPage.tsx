import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Shield, AlertTriangle, Activity, TrendingUp } from 'lucide-react';

const RiskManagementPage = () => {
  const riskData = {
    totalParticipants: 247,
    totalExposure: 45600000000,
    activeLimits: 8,
    varValue: 2840000000,
    participantsAtLimit: [
      { participant: 'Goldman Sachs', limit: 8000000000, utilization: 7560000000, percentage: 94.5, status: 'High Risk', threshold: 8000000000 },
      { participant: 'JPMorgan Chase', limit: 8000000000, utilization: 6800000000, percentage: 85.0, status: 'Warning', threshold: 8000000000 },
      { participant: 'Morgan Stanley', limit: 5000000000, utilization: 4650000000, percentage: 93.0, status: 'High Risk', threshold: 5000000000 },
      { participant: 'Bank of America', limit: 6000000000, utilization: 5280000000, percentage: 88.0, status: 'Warning', threshold: 6000000000 },
      { participant: 'Citigroup', limit: 6000000000, utilization: 4920000000, percentage: 82.0, status: 'Normal', threshold: 6000000000 }
    ],
    varSecurities: [
      { security: 'US Treasury 10Y', var: 245000000, confidence: '99%', holdingValue: 12400000000, riskWeight: 2.0 },
      { security: 'German Bund 5Y', var: 189000000, confidence: '99%', holdingValue: 8900000000, riskWeight: 2.1 },
      { security: 'Corporate AAA Bonds', var: 324000000, confidence: '99%', holdingValue: 6800000000, riskWeight: 4.8 },
      { security: 'Mortgage-Backed Securities', var: 456000000, confidence: '99%', holdingValue: 5200000000, riskWeight: 8.8 },
      { security: 'Municipal Bonds', var: 178000000, confidence: '99%', holdingValue: 3400000000, riskWeight: 5.2 }
    ],
    exposureLimits: [
      { counterparty: 'Goldman Sachs', limit: 8000000000, utilization: 7560000000, available: 440000000, status: 'Critical' },
      { counterparty: 'JPMorgan Chase', limit: 8000000000, utilization: 6800000000, available: 1200000000, status: 'Warning' },
      { counterparty: 'Morgan Stanley', limit: 5000000000, utilization: 4650000000, available: 350000000, status: 'Critical' },
      { counterparty: 'Bank of America', limit: 6000000000, utilization: 5280000000, available: 720000000, status: 'Warning' },
      { counterparty: 'Citigroup', limit: 6000000000, utilization: 4920000000, available: 1080000000, status: 'Normal' }
    ],
    auditTrail: [
      { id: 'RE001', event: 'Liquidity Limit Breach', participant: 'Goldman Sachs', severity: 'High', timestamp: '14:45:23', action: 'Automated Alert Sent', status: 'Open' },
      { id: 'RE002', event: 'VaR Threshold Exceeded', security: 'Corporate AAA Bonds', severity: 'Medium', timestamp: '14:32:15', action: 'Risk Committee Notified', status: 'Investigating' },
      { id: 'RE003', event: 'Concentration Risk Alert', participant: 'Morgan Stanley', severity: 'High', timestamp: '14:28:07', action: 'Position Reduction Required', status: 'Open' },
      { id: 'RE004', event: 'Margin Call Initiated', participant: 'Deutsche Bank', severity: 'Medium', timestamp: '14:15:42', action: 'Collateral Posted', status: 'Resolved' },
      { id: 'RE005', event: 'Credit Rating Downgrade', security: 'Municipal Bonds', severity: 'Low', timestamp: '13:58:19', action: 'Position Review Scheduled', status: 'Monitoring' }
    ],
    riskTrends: [
      { date: '07-06', totalVar: 2650000000, limitUtilization: 78.2, breaches: 2 },
      { date: '07-07', totalVar: 2720000000, limitUtilization: 81.5, breaches: 3 },
      { date: '07-08', totalVar: 2890000000, limitUtilization: 84.8, breaches: 5 },
      { date: '07-09', totalVar: 2760000000, limitUtilization: 87.3, breaches: 4 },
      { date: '07-10', totalVar: 2840000000, limitUtilization: 89.7, breaches: 6 }
    ]
  };

  const chartConfig = {
    totalVar: { label: 'Total VaR', color: '#ef4444' },
    limitUtilization: { label: 'Limit Utilization', color: '#f59e0b' },
    breaches: { label: 'Risk Breaches', color: '#dc2626' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical': return <Badge variant="destructive">Critical</Badge>;
      case 'High Risk': return <Badge variant="destructive">High Risk</Badge>;
      case 'Warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'Normal': return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      case 'Open': return <Badge variant="destructive">Open</Badge>;
      case 'Investigating': return <Badge className="bg-yellow-100 text-yellow-800">Investigating</Badge>;
      case 'Resolved': return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'Monitoring': return <Badge variant="secondary">Monitoring</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRiskColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Risk Management</h1>
            <p className="text-slate-600">Monitor and manage comprehensive risk exposure across all participants</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Participants</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Count:</span>
                      <span className="font-medium">{riskData.totalParticipants}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">At Limit:</span>
                      <span className="font-medium">{riskData.activeLimits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Monitor:</span>
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Exposure</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Value:</span>
                      <span className="font-medium">${(riskData.totalExposure / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">VaR:</span>
                      <span className="font-medium">${(riskData.varValue / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Risk Events</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Events:</span>
                      <span className="font-medium">{riskData.activeLimits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Status:</span>
                      <span className="font-medium">Monitoring</span>
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
                  <div className="text-sm font-medium text-slate-600 mb-2">Total VaR</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Amount:</span>
                      <span className="font-medium">${(riskData.varValue / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Confidence:</span>
                      <span className="font-medium">99%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Trend:</span>
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Participants at Liquidity Limit */}
            <Card>
              <CardHeader>
                <CardTitle>Top Participants at Liquidity Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Participant</th>
                        <th className="text-left p-3 font-semibold">Limit</th>
                        <th className="text-left p-3 font-semibold">Utilization</th>
                        <th className="text-left p-3 font-semibold">Percentage</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskData.participantsAtLimit.map((participant, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{participant.participant}</td>
                          <td className="p-3">${(participant.limit / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">${(participant.utilization / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Progress value={participant.percentage} className="w-16 h-2" />
                              <span className={`font-medium ${getRiskColor(participant.percentage)}`}>
                                {participant.percentage}%
                              </span>
                            </div>
                          </td>
                          <td className="p-3">{getStatusBadge(participant.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Value-at-Risk (VaR) for Held Securities */}
            <Card>
              <CardHeader>
                <CardTitle>Value-at-Risk (VaR) for Held Securities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Security</th>
                        <th className="text-left p-3 font-semibold">VaR</th>
                        <th className="text-left p-3 font-semibold">Confidence</th>
                        <th className="text-left p-3 font-semibold">Holding Value</th>
                        <th className="text-left p-3 font-semibold">Risk Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskData.varSecurities.map((security, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{security.security}</td>
                          <td className="p-3 font-medium text-red-600">${(security.var / 1000000).toFixed(1)}M</td>
                          <td className="p-3">{security.confidence}</td>
                          <td className="p-3">${(security.holdingValue / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">
                            <Badge variant="outline">{security.riskWeight}%</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Exposure Limits vs. Utilization */}
            <Card>
              <CardHeader>
                <CardTitle>Exposure Limits vs. Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Counterparty</th>
                        <th className="text-left p-3 font-semibold">Limit</th>
                        <th className="text-left p-3 font-semibold">Utilization</th>
                        <th className="text-left p-3 font-semibold">Available</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskData.exposureLimits.map((exposure, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{exposure.counterparty}</td>
                          <td className="p-3">${(exposure.limit / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">${(exposure.utilization / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">${(exposure.available / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">{getStatusBadge(exposure.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Audit Trail of Risk Events */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Trail of Risk Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Event ID</th>
                        <th className="text-left p-3 font-semibold">Event</th>
                        <th className="text-left p-3 font-semibold">Entity</th>
                        <th className="text-left p-3 font-semibold">Severity</th>
                        <th className="text-left p-3 font-semibold">Timestamp</th>
                        <th className="text-left p-3 font-semibold">Action</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskData.auditTrail.map((event, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{event.id}</td>
                          <td className="p-3">{event.event}</td>
                          <td className="p-3">{event.participant || event.security}</td>
                          <td className="p-3">
                            <span className={`font-medium ${getSeverityColor(event.severity)}`}>
                              {event.severity}
                            </span>
                          </td>
                          <td className="p-3 text-sm">{event.timestamp}</td>
                          <td className="p-3 text-sm">{event.action}</td>
                          <td className="p-3">{getStatusBadge(event.status)}</td>
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
                <Button className="w-full justify-start">Trigger Liquidity Injection Request</Button>
                <Button variant="outline" className="w-full justify-start">Run Intraday Liquidity Simulation</Button>
                <Button variant="outline" className="w-full justify-start">Run On-Demand Stress Test</Button>
                <Button variant="outline" className="w-full justify-start">Export Risk Report</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default RiskManagementPage;