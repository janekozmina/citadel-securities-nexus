import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const ClearingManagerPage = () => {
  const clearingData = {
    workflowStatus: [
      { stage: 'Trade Capture', processed: 1247, pending: 23, failed: 3 },
      { stage: 'Trade Validation', processed: 1156, pending: 67, failed: 1 },
      { stage: 'Netting Calculation', processed: 1098, pending: 54, failed: 4 },
      { stage: 'Settlement Preparation', processed: 1034, pending: 68, failed: 0 }
    ],
    clearingVolume: [
      { date: 'Mon', volume: 2400000, trades: 847 },
      { date: 'Tue', volume: 3100000, trades: 1034 },
      { date: 'Wed', volume: 2800000, trades: 923 },
      { date: 'Thu', volume: 3600000, trades: 1245 },
      { date: 'Fri', volume: 4200000, trades: 1456 }
    ],
    participants: [
      { name: 'Bank A', trades: 234, volume: 850000000, status: 'Active' },
      { name: 'Bank B', trades: 189, volume: 720000000, status: 'Active' },
      { name: 'Bank C', trades: 167, volume: 645000000, status: 'Warning' },
      { name: 'Investment Corp', trades: 145, volume: 590000000, status: 'Active' },
      { name: 'Credit Union', trades: 123, volume: 445000000, status: 'Active' }
    ]
  };

  const chartConfig = {
    volume: { label: 'Volume', color: '#3b82f6' },
    trades: { label: 'Trades', color: '#10b981' }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Error': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-slate-600" />;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1 space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Clearing Manager</h1>
              <p className="text-slate-600">Monitor and manage clearing operations</p>
            </div>
          </div>

          {/* Workflow Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clearingData.workflowStatus.map((stage) => (
              <Card key={stage.stage}>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">{stage.stage}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Processed:</span>
                      <span className="font-medium">{stage.processed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-yellow-600">Pending:</span>
                      <span className="font-medium">{stage.pending}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Failed:</span>
                      <span className="font-medium">{stage.failed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


          {/* Participants Table */}
          <Card>
            <CardHeader>
              <CardTitle>Clearing Participants Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Participant</th>
                      <th className="text-left p-3 font-semibold">Trades</th>
                      <th className="text-left p-3 font-semibold">Volume</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clearingData.participants.map((participant, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3 font-medium">{participant.name}</td>
                        <td className="p-3">{participant.trades.toLocaleString()}</td>
                        <td className="p-3">${(participant.volume / 1000000).toFixed(1)}M</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(participant.status)}
                            <Badge variant={participant.status === 'Warning' ? 'destructive' : 'default'}>
                              {participant.status}
                            </Badge>
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
              <Button className="w-full justify-start">Process Pending Trades</Button>
              <Button variant="outline" className="w-full justify-start">Generate Clearing Report</Button>
              <Button variant="outline" className="w-full justify-start">View Failed Transactions</Button>
              <Button variant="outline" className="w-full justify-start">Participant Management</Button>
              <Button variant="outline" className="w-full justify-start">Workflow Configuration</Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ClearingManagerPage;