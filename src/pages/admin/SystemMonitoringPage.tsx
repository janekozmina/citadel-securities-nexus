
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Cpu, HardDrive, Database, Activity, Clock, Gauge } from 'lucide-react';

const SystemMonitoringPage = () => {
  // System uptime and basic metrics
  const systemMetrics = {
    uptime: '3.5 hours',
    totalMemory: '986 MiB',
    cpuUsage: 11.60,
    cpuLowait: 0.07,
    memoryUsage: 70,
    openFileDescriptors: 1150,
    rootPartitionUsage: 9.4,
    maxPartitionUsage: 9.4
  };

  // Chart data
  const systemLoadData = [
    { time: '08:50', load1m: 0.15, load5m: 0.12, load15m: 0.10 },
    { time: '09:00', load1m: 0.18, load5m: 0.14, load15m: 0.11 },
    { time: '09:10', load1m: 0.22, load5m: 0.16, load15m: 0.12 },
    { time: '09:20', load1m: 0.19, load5m: 0.15, load15m: 0.11 },
    { time: '09:30', load1m: 0.16, load5m: 0.13, load15m: 0.10 },
    { time: '09:40', load1m: 0.14, load5m: 0.12, load15m: 0.09 },
  ];

  const diskSpaceData = [
    { name: 'Used', value: 24.1, color: '#f59e0b' },
    { name: 'Free', value: 75.9, color: '#10b981' }
  ];

  const cpuUsageData = [
    { time: '08:50', system: 1.2, user: 8.2, iowait: 0.5 },
    { time: '09:00', system: 1.8, user: 7.8, iowait: 0.3 },
    { time: '09:10', system: 2.1, user: 9.2, iowait: 0.4 },
    { time: '09:20', system: 1.5, user: 8.5, iowait: 0.2 },
    { time: '09:30', system: 1.3, user: 7.9, iowait: 0.3 },
    { time: '09:40', system: 1.1, user: 7.2, iowait: 0.1 },
  ];

  const diskIOData = [
    { time: '08:50', read: 8, write: 12 },
    { time: '09:00', read: 15, write: 18 },
    { time: '09:10', read: 22, write: 25 },
    { time: '09:20', read: 18, write: 20 },
    { time: '09:30', read: 12, write: 15 },
    { time: '09:40', read: 10, write: 13 },
  ];

  const memoryData = [
    { time: '08:50', total: 985.52, used: 689.87 },
    { time: '09:00', total: 985.52, used: 695.23 },
    { time: '09:10', total: 985.52, used: 702.15 },
    { time: '09:20', total: 985.52, used: 698.45 },
    { time: '09:30', total: 985.52, used: 692.30 },
    { time: '09:40', total: 985.52, used: 688.75 },
  ];

  const chartConfig = {
    load1m: { label: '1m', color: '#3b82f6' },
    load5m: { label: '5m', color: '#10b981' },
    load15m: { label: '15m', color: '#f59e0b' },
    system: { label: 'System', color: '#ef4444' },
    user: { label: 'User', color: '#3b82f6' },
    iowait: { label: 'IO Wait', color: '#f59e0b' },
    read: { label: 'Read', color: '#10b981' },
    write: { label: 'Write', color: '#3b82f6' },
    total: { label: 'Total', color: '#6b7280' },
    used: { label: 'Used', color: '#3b82f6' },
  };

  return (
    <div className="space-y-6 bg-slate-900 min-h-screen p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Monitoring</h1>
          <p className="text-slate-300">Node Exporter 0.16+ for Prometheus Monitoring</p>
        </div>
        <div className="text-sm text-slate-300">
          Last 1 hour • localhost:9100
        </div>
      </div>

      {/* Top Row - Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-green-400 text-2xl font-bold">3.5</div>
            <div className="text-green-400 text-sm">hour</div>
            <div className="text-xs text-slate-400 mt-1">System runtime</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-orange-400 text-lg font-bold">1</div>
            <div className="text-green-400 text-2xl font-bold">986 MiB</div>
            <div className="text-xs text-slate-400 mt-1">Total memory</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 relative">
          <CardContent className="p-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-600"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - systemMetrics.cpuUsage / 100)}`}
                  className="text-orange-400"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-orange-400 font-bold">{systemMetrics.cpuUsage}%</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-center mt-2">CPU Usage rate (5m)</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 relative">
          <CardContent className="p-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-600"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - systemMetrics.cpuLowait / 100)}`}
                  className="text-red-400"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-red-400 font-bold">{systemMetrics.cpuLowait}%</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-center mt-2">CPU Iowait (5m)</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 relative">
          <CardContent className="p-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-600"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - systemMetrics.memoryUsage / 100)}`}
                  className="text-green-400"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-400 font-bold">{systemMetrics.memoryUsage}%</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-center mt-2">Memory usage</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 relative">
          <CardContent className="p-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-600"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - (systemMetrics.openFileDescriptors / 2000))}`}
                  className="text-green-400"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-400 font-bold text-xs">{systemMetrics.openFileDescriptors}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-center mt-2">Currently open file descriptor</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 relative">
          <CardContent className="p-4">
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-600"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - systemMetrics.rootPartitionUsage / 100)}`}
                  className="text-green-400"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-green-400 font-bold">{systemMetrics.rootPartitionUsage}%</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 text-center mt-2">Root partition usage</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Load */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">System average load</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={systemLoadData}>
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="load1m" stroke="var(--color-load1m)" strokeWidth={2} />
                  <Line type="monotone" dataKey="load5m" stroke="var(--color-load5m)" strokeWidth={2} />
                  <Line type="monotone" dataKey="load15m" stroke="var(--color-load15m)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Disk Space */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Total disk space</CardTitle>
            <div className="text-blue-400">24.1 GiB</div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diskSpaceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {diskSpaceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* CPU Usage */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">CPU usage, disk I/O operations per second (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cpuUsageData}>
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="system" stackId="1" stroke="var(--color-system)" fill="var(--color-system)" />
                  <Area type="monotone" dataKey="user" stackId="1" stroke="var(--color-user)" fill="var(--color-user)" />
                  <Area type="monotone" dataKey="iowait" stackId="1" stroke="var(--color-iowait)" fill="var(--color-iowait)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Memory Information */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Memory information</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memoryData}>
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`${value} MiB`, '']} />
                  <Area type="monotone" dataKey="used" stroke="var(--color-used)" fill="var(--color-used)" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="total" stroke="var(--color-total)" fill="transparent" strokeDasharray="5,5" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Disk I/O and Free Space */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Disk read and write rate (IOPS)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={diskIOData}>
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="read" stroke="var(--color-read)" strokeWidth={2} />
                  <Line type="monotone" dataKey="write" stroke="var(--color-write)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Free space for each partition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">ext4</span>
                <span className="text-blue-400">localhost:9100</span>
                <span className="text-slate-300">/</span>
                <span className="text-green-400">21.80 GiB</span>
                <Badge className="bg-green-600 text-white">9.32%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Disk I/O read and write time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl text-slate-500">100 ms</div>
              <div className="text-slate-400 text-sm mt-2">Average I/O time</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitoringPage;
