
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

const ClearingHubPage = () => {
  const [timePeriod, setTimePeriod] = useState('today');

  // Data based on selected time period
  const getDataForPeriod = (period: string) => {
    const baseData = {
      today: {
        netObligations: [
          { participant: 'Bank A', cash: 2500000, securities: 1800000 },
          { participant: 'Bank B', cash: 1200000, securities: 2100000 },
          { participant: 'Bank C', cash: 3100000, securities: 900000 },
          { participant: 'Bank D', cash: 1800000, securities: 2800000 },
          { participant: 'Bank E', cash: 2200000, securities: 1600000 },
        ],
        statusFlags: [
          { status: 'Confirmed', count: 847 },
          { status: 'Pending', count: 123 },
          { status: 'Rejected', count: 34 },
          { status: 'Under Review', count: 56 },
        ]
      },
      week: {
        netObligations: [
          { participant: 'Bank A', cash: 12500000, securities: 9800000 },
          { participant: 'Bank B', cash: 8200000, securities: 11100000 },
          { participant: 'Bank C', cash: 15100000, securities: 6900000 },
          { participant: 'Bank D', cash: 10800000, securities: 14800000 },
          { participant: 'Bank E', cash: 11200000, securities: 8600000 },
        ],
        statusFlags: [
          { status: 'Confirmed', count: 4235 },
          { status: 'Pending', count: 615 },
          { status: 'Rejected', count: 170 },
          { status: 'Under Review', count: 280 },
        ]
      },
      month: {
        netObligations: [
          { participant: 'Bank A', cash: 52500000, securities: 38800000 },
          { participant: 'Bank B', cash: 38200000, securities: 41100000 },
          { participant: 'Bank C', cash: 65100000, securities: 26900000 },
          { participant: 'Bank D', cash: 48800000, securities: 54800000 },
          { participant: 'Bank E', cash: 41200000, securities: 36600000 },
        ],
        statusFlags: [
          { status: 'Confirmed', count: 18235 },
          { status: 'Pending', count: 2615 },
          { status: 'Rejected', count: 720 },
          { status: 'Under Review', count: 1180 },
        ]
      }
    };
    return baseData[period as keyof typeof baseData] || baseData.today;
  };

  const currentData = getDataForPeriod(timePeriod);

  const participantExposureData = [
    { name: 'Bank A', value: 4300000, color: '#3b82f6' },
    { name: 'Bank B', value: 3300000, color: '#10b981' },
    { name: 'Bank C', value: 4000000, color: '#f59e0b' },
    { name: 'Bank D', value: 4600000, color: '#ef4444' },
    { name: 'Bank E', value: 3800000, color: '#8b5cf6' },
  ];

  const positionChangesData = [
    { date: 'Mon', value: 1200000 },
    { date: 'Tue', value: -800000 },
    { date: 'Wed', value: 1500000 },
    { date: 'Thu', value: -300000 },
    { date: 'Fri', value: 900000 },
    { date: 'Sat', value: 200000 },
    { date: 'Sun', value: -600000 },
  ];

  const statusFlags = currentData.statusFlags.map((flag, index) => ({
    ...flag,
    icon: [CheckCircle, Clock, XCircle, AlertTriangle][index],
    color: ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-orange-500'][index]
  }));

  const chartConfig = {
    cash: { label: 'Cash', color: '#3b82f6' },
    securities: { label: 'Securities', color: '#10b981' },
    value: { label: 'Value', color: '#8b5cf6' },
  };

  return (
    <div className="space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Clearing Hub</h1>
        <div className="flex gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>Refresh Data</Button>
        </div>
      </div>

      {/* Status Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusFlags.map((flag) => (
          <Card key={flag.status} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{flag.status}</p>
                  <p className="text-2xl font-bold text-slate-900">{flag.count.toLocaleString()}</p>
                </div>
                <div className={`p-2 rounded-full ${flag.color}`}>
                  <flag.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Net Obligations Stacked Bar Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Net Obligations (Cash vs Securities)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData.netObligations}>
                  <XAxis dataKey="participant" />
                  <YAxis tickFormatter={(value) => `AED ${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`AED ${(Number(value) / 1000000).toFixed(2)}M`, '']}
                  />
                  <Bar dataKey="cash" stackId="a" fill="var(--color-cash)" name="Cash" />
                  <Bar dataKey="securities" stackId="a" fill="var(--color-securities)" name="Securities" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Participant Exposure Pie Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Participant Exposure Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={participantExposureData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {participantExposureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    formatter={(value) => [`AED ${(Number(value) / 1000000).toFixed(2)}M`, 'Exposure']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Position Changes Line Chart */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Daily Changes in Net Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={positionChangesData}>
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(value) => `AED ${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`AED ${(Number(value) / 1000000).toFixed(2)}M`, 'Change']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-value)" 
                    strokeWidth={2}
                    dot={{ fill: 'var(--color-value)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Clearing Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg">Match Trades</Button>
            <Button variant="outline" className="w-full" size="lg">Validation Queue</Button>
            <Button className="w-full" size="lg">Calculate Net Positions</Button>
            <Button variant="outline" className="w-full" size="lg">Netting Reports</Button>
            <Button className="w-full" size="lg">Risk Analysis</Button>
            <Button variant="outline" className="w-full" size="lg">Generate Instructions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClearingHubPage;
