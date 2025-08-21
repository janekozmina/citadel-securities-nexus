import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';
import { 
  Cpu, 
  Database, 
  HardDrive, 
  Activity, 
  Server, 
  Wifi,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Shield
} from 'lucide-react';
import { useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';

const AdminDashboardPage = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard | Unified Portal';
  }, []);

  // Sample data - more Grafana-style metrics
  const cpuData = [
    { time: '16:50', usage: 45, system: 12, user: 33 },
    { time: '16:55', usage: 52, system: 15, user: 37 },
    { time: '17:00', usage: 78, system: 20, user: 58 },
    { time: '17:05', usage: 85, system: 25, user: 60 },
    { time: '17:10', usage: 72, system: 18, user: 54 },
    { time: '17:15', usage: 68, system: 16, user: 52 },
    { time: '17:20', usage: 58, system: 14, user: 44 }
  ];

  const memoryData = [
    { time: '16:50', total: 16, used: 6.2, cached: 3.8, free: 6.0 },
    { time: '16:55', total: 16, used: 6.8, cached: 4.2, free: 5.0 },
    { time: '17:00', total: 16, used: 8.2, cached: 4.8, free: 3.0 },
    { time: '17:05', total: 16, used: 9.1, cached: 4.9, free: 2.0 },
    { time: '17:10', total: 16, used: 7.6, cached: 4.4, free: 4.0 },
    { time: '17:15', total: 16, used: 7.2, cached: 4.8, free: 4.0 },
    { time: '17:20', total: 16, used: 6.5, cached: 4.5, free: 5.0 }
  ];

  const diskData = [
    { name: '/root', used: 2.1, total: 50, percent: 4.2 },
    { name: '/var', used: 18.5, total: 100, percent: 18.5 },
    { name: '/tmp', used: 0.5, total: 10, percent: 5.0 },
    { name: '/home', used: 125, total: 500, percent: 25.0 },
    { name: '/opt', used: 85, total: 200, percent: 42.5 }
  ];

  const networkData = [
    { time: '16:50', rx: 120, tx: 80, total: 200 },
    { time: '16:55', rx: 180, tx: 120, total: 300 },
    { time: '17:00', rx: 280, tx: 190, total: 470 },
    { time: '17:05', rx: 350, tx: 240, total: 590 },
    { time: '17:10', rx: 310, tx: 210, total: 520 },
    { time: '17:15', rx: 220, tx: 150, total: 370 },
    { time: '17:20', rx: 190, tx: 130, total: 320 }
  ];

  const serviceMetrics = [
    { name: 'RTGS Core', status: 'up', response: 85, uptime: 99.9 },
    { name: 'CSD Core', status: 'up', response: 92, uptime: 99.8 },
    { name: 'Message Queue', status: 'up', response: 12, uptime: 100 },
    { name: 'Database Primary', status: 'warning', response: 145, uptime: 98.5 },
    { name: 'Load Balancer', status: 'up', response: 8, uptime: 100 },
    { name: 'Cache Layer', status: 'up', response: 3, uptime: 99.9 }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <PageHeader />
      
      <div className="p-6 space-y-6">
        {/* Header Stats - Grafana style */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-xs text-slate-400">System Uptime</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">1,247</div>
                <div className="text-xs text-slate-400">Active Sessions</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">3.2K</div>
                <div className="text-xs text-slate-400">Requests/min</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">12ms</div>
                <div className="text-xs text-slate-400">Avg Response</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">2</div>
                <div className="text-xs text-slate-400">Alerts</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">8.2GB</div>
                <div className="text-xs text-slate-400">Memory Used</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CPU Usage */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-sm font-medium">
                <Cpu className="h-4 w-4 text-orange-400" />
                CPU Usage (Last 20 minutes)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cpuData}>
                    <defs>
                      <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="usage" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#cpuGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Memory Usage */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-sm font-medium">
                <Database className="h-4 w-4 text-blue-400" />
                Memory Usage (GB)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={memoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                    <Area type="monotone" dataKey="used" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="cached" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="free" stackId="1" stroke="#6b7280" fill="#6b7280" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network and Disk Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Traffic */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-sm font-medium">
                <Wifi className="h-4 w-4 text-purple-400" />
                Network I/O (MB/s)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={networkData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="rx" stroke="#8b5cf6" strokeWidth={2} name="Received" dot={false} />
                    <Line type="monotone" dataKey="tx" stroke="#f59e0b" strokeWidth={2} name="Transmitted" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Disk Usage */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2 text-sm font-medium">
                <HardDrive className="h-4 w-4 text-green-400" />
                Disk Usage by Mount Point
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="percent" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              Service Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceMetrics.map((service, index) => (
                <div key={index} className="bg-slate-700 p-4 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{service.name}</span>
                    {service.status === 'up' ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Response Time:</span>
                      <span className="text-white">{service.response}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Uptime:</span>
                      <span className="text-white">{service.uptime}%</span>
                    </div>
                    <Progress 
                      value={service.uptime} 
                      className="h-1 bg-slate-600" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;