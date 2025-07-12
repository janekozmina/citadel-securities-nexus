
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SystemMonitoringPage = () => {
  // System metrics matching Grafana display
  const systemMetrics = {
    uptime: '3.5 hour',
    totalMemory: '986 MiB',
    cpuUsage: 11.60,
    cpuIowait: 0.07,
    memoryUsage: 70,
    openFileDescriptor: '1.15K',
    rootPartitionUsage: 9.4,
    maxPartitionUsage: 9.4
  };

  // Chart data for system load
  const systemLoadData = [
    { time: '08:50', localhost_9100_1m: 0.0100, localhost_9100_5m: 0.0100, localhost_9100_15m: 0 },
    { time: '09:00', localhost_9100_1m: 0.0120, localhost_9100_5m: 0.0110, localhost_9100_15m: 0 },
    { time: '09:10', localhost_9100_1m: 0.0140, localhost_9100_5m: 0.0120, localhost_9100_15m: 0 },
    { time: '09:20', localhost_9100_1m: 0.0110, localhost_9100_5m: 0.0115, localhost_9100_15m: 0 },
    { time: '09:30', localhost_9100_1m: 0.0100, localhost_9100_5m: 0.0105, localhost_9100_15m: 0 },
    { time: '09:40', localhost_9100_1m: 0.0090, localhost_9100_5m: 0.0100, localhost_9100_15m: 0 },
  ];

  const diskSpaceData = [
    { name: 'Used', value: 24.1, color: '#f59e0b' },
    { name: 'Free', value: 75.9, color: 'transparent' }
  ];

  const cpuUsageData = [
    { time: '08:50', localhost_9100_System: 1.52, localhost_9100_User: 8.67, localhost_9100_Iowait: 0.73, localhost_9100_idle_per_second: 1.20 },
    { time: '09:00', localhost_9100_System: 1.36, localhost_9100_User: 2.98, localhost_9100_Iowait: 0.07, localhost_9100_idle_per_second: 0.03 },
    { time: '09:10', localhost_9100_System: 1.20, localhost_9100_User: 4.53, localhost_9100_Iowait: 0.07, localhost_9100_idle_per_second: 0 },
    { time: '09:20', localhost_9100_System: 1.15, localhost_9100_User: 3.45, localhost_9100_Iowait: 0.05, localhost_9100_idle_per_second: 0 },
    { time: '09:30', localhost_9100_System: 1.10, localhost_9100_User: 2.87, localhost_9100_Iowait: 0.03, localhost_9100_idle_per_second: 0 },
    { time: '09:40', localhost_9100_System: 1.05, localhost_9100_User: 2.15, localhost_9100_Iowait: 0.02, localhost_9100_idle_per_second: 0 },
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
    { time: '08:50', localhost_9100_Total_memory: 985.52, localhost_9100_Used: 689.87 },
    { time: '09:00', localhost_9100_Total_memory: 985.52, localhost_9100_Used: 695.23 },
    { time: '09:10', localhost_9100_Total_memory: 985.52, localhost_9100_Used: 702.15 },
    { time: '09:20', localhost_9100_Total_memory: 985.52, localhost_9100_Used: 698.45 },
    { time: '09:30', localhost_9100_Total_memory: 985.52, localhost_9100_Used: 692.30 },
    { time: '09:40', localhost_9100_Total_memory: 985.52, localhost_9100_Used: 688.75 },
  ];

  const partitionData = [
    { filesystem: 'ext4', ip: 'localhost:9100', partition: '/', availableSpace: '21.80 GiB', usage: '9.32%' }
  ];

  const chartConfig = {
    localhost_9100_1m: { label: 'localhost:9100_1m', color: '#22c55e' },
    localhost_9100_5m: { label: 'localhost:9100_5m', color: '#3b82f6' },
    localhost_9100_15m: { label: 'localhost:9100_15m', color: '#f59e0b' },
    localhost_9100_System: { label: 'localhost:9100_System', color: '#ef4444' },
    localhost_9100_User: { label: 'localhost:9100_User', color: '#3b82f6' },
    localhost_9100_Iowait: { label: 'localhost:9100_Iowait', color: '#f59e0b' },
    localhost_9100_idle_per_second: { label: 'localhost:9100_idle_per_second (%)', color: '#f97316' },
    localhost_9100_Total_memory: { label: 'localhost:9100_Total memory', color: '#6b7280' },
    localhost_9100_Used: { label: 'localhost:9100_Used', color: '#3b82f6' },
  };

  const StatCard = ({ title, value, unit, color = 'text-green-400', subtitle }: { 
    title: string; 
    value: string | number; 
    unit?: string; 
    color?: string;
    subtitle?: string;
  }) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-3">
        <div className="text-xs text-gray-400 mb-1">{title}</div>
        <div className={`text-lg font-bold ${color}`}>
          {value}{unit && <span className="text-sm ml-1">{unit}</span>}
        </div>
        {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
      </CardContent>
    </Card>
  );

  const GaugeCard = ({ title, value, max = 100, color = '#22c55e' }: {
    title: string;
    value: number;
    max?: number;
    color?: string;
  }) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-3">
        <div className="text-xs text-gray-400 mb-1">{title}</div>
        <div className="relative w-16 h-16 mx-auto">
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#374151"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={color}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - value / max)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold" style={{ color }}>{value}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-white">System Monitoring</h1>
          <p className="text-gray-400">Real-time system performance metrics</p>
        </div>
      </div>

      {/* Top metrics row */}
      <div className="grid grid-cols-7 gap-3 mb-4">
        <StatCard title="System runtime" value="3.5" unit="hour" color="text-green-400" />
        <div className="space-y-1">
          <StatCard title="CPU Audit numb..." value="1" color="text-orange-400" />
          <StatCard title="Total memory" value="986 MiB" color="text-green-400" />
        </div>
        <GaugeCard title="CPU Usage rate (5m)" value={11.60} color="#f59e0b" />
        <GaugeCard title="CPU Iowait (5m)" value={0.07} color="#ef4444" />
        <GaugeCard title="Memory usage" value={70} color="#22c55e" />
        <GaugeCard title="Currently open file descriptor" value={57.5} max={100} color="#22c55e" />
        <GaugeCard title="Root partition usage" value={9.4} color="#22c55e" />
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* System Load Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">System average load</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={systemLoadData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="localhost_9100_1m" 
                    stroke="#22c55e" 
                    strokeWidth={1}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="localhost_9100_5m" 
                    stroke="#3b82f6" 
                    strokeWidth={1}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="localhost_9100_15m" 
                    stroke="#f59e0b" 
                    strokeWidth={1}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 text-xs mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400"></div>
                <span className="text-blue-400">current</span>
                <span className="text-white">0.0100</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disk Space Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Total disk space</CardTitle>
            <div className="text-blue-400 text-sm">24.1 GiB</div>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-48 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="#f59e0b"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-blue-400 text-xs">current</span>
                  <span className="text-white text-sm font-bold">24.1 GiB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partition Space Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Free space for each partition</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-xs text-blue-400 p-1">File system</TableHead>
                  <TableHead className="text-xs text-blue-400 p-1">IP</TableHead>
                  <TableHead className="text-xs text-blue-400 p-1">Partition</TableHead>
                  <TableHead className="text-xs text-blue-400 p-1">Available space</TableHead>
                  <TableHead className="text-xs text-blue-400 p-1">Usage rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-700">
                  <TableCell className="text-xs text-white p-1">ext4</TableCell>
                  <TableCell className="text-xs text-white p-1">localhost:9100</TableCell>
                  <TableCell className="text-xs text-white p-1">/</TableCell>
                  <TableCell className="text-xs text-white p-1">21.80 GiB</TableCell>
                  <TableCell className="text-xs p-1">
                    <Badge className="bg-green-600 text-white text-xs">9.32%</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* CPU and Memory Charts */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* CPU Usage Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">CPU usage, disk I/O operations per second (%)</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cpuUsageData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="localhost_9100_System" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="localhost_9100_User" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="localhost_9100_Iowait" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs mt-2">
              <div>
                <div className="text-blue-400">max</div>
                <div className="text-gray-300">7.52%</div>
              </div>
              <div>
                <div className="text-blue-400">avg</div>
                <div className="text-gray-300">1.36%</div>
              </div>
              <div>
                <div className="text-blue-400">current</div>
                <div className="text-gray-300">1.20%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memory Information Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Memory information</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memoryData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="localhost_9100_Used" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="localhost_9100_Total_memory" 
                    stroke="#f59e0b" 
                    fill="transparent" 
                    strokeDasharray="2,2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs mt-2">
              <div className="text-blue-400">current</div>
              <div className="flex gap-4">
                <span className="text-white">localhost:9100_Total memory: 985.52 MiB</span>
                <span className="text-white">localhost:9100_Used: 689.87 MiB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Disk I/O Rate */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Disk read and write rate (IOPS)</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diskIOData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar dataKey="read" fill="#22c55e" />
                  <Bar dataKey="write" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Disk Capacity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Disk read and write capacity</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diskIOData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar dataKey="read" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Disk I/O Time */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Disk I/O read and write time</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl text-gray-300">100 ms</div>
                <div className="text-xs text-gray-500">Disk usage rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitoringPage;
