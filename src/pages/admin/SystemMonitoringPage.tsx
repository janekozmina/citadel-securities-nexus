
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Database, Activity, Clock, Cpu, HardDrive, Wifi } from 'lucide-react';

const SystemMonitoringPage = () => {
  const serverStatus = [
    { name: 'Access Server', acc1: 'UP', acc2: 'UP', status: 'online' },
    { name: 'APIGW', acc1: 'UP', acc2: 'UP', status: 'online' },
    { name: 'CORE', acc1: 'DOWN', acc2: 'DOWN', status: 'offline' },
    { name: 'PIE', acc1: 'DOWN', acc2: 'DOWN', status: 'offline' },
    { name: 'Governor', acc1: 'DOWN', acc2: 'UP', status: 'partial' }
  ];

  const uptimeData = [
    { name: 'AS Uptime', acc1: '1 week', acc2: '1 week' },
    { name: 'APIGW Uptime', acc1: '2 weeks', acc2: '2 weeks' },
    { name: 'CORE Uptime', acc1: '2 days', acc2: '2 days' },
    { name: 'PIE Uptime', acc1: '2 days', acc2: '2 days' },
    { name: 'GV Uptime', acc1: '1 hour', acc2: '2 weeks' }
  ];

  const wenData = [
    { name: 'WEN', acc1: { date: '2025-06-06', time: '12:43:37' }, acc2: { date: '2025-06-06', time: '12:43:23' } },
    { name: 'WEN', acc1: { date: '2025-06-05', time: '14:42:55' }, acc2: { date: '2025-06-05', time: '14:42:55' } },
    { name: 'WEN', acc1: { date: '2025-06-17', time: '12:53:48' }, acc2: { date: '2025-06-17', time: '12:54:05' } },
    { name: 'WEN', acc1: { date: '2025-06-17', time: '12:53:37' }, acc2: { date: '2025-06-17', time: '12:53:56' } }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">Online</Badge>;
      case 'offline':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white">Offline</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Partial</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getServerStatusColor = (status: string) => {
    return status === 'UP' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
  };

  return (
    <div className="space-y-6 bg-slate-900 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Technical Monitoring</h1>
          <p className="text-slate-300">System status and uptime monitoring</p>
        </div>
        <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg">
          Access Technical Monitoring
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Server Status Cards */}
        <div className="space-y-4">
          {serverStatus.map((server, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    {server.name}
                  </CardTitle>
                  {getStatusBadge(server.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button className={`px-3 py-2 rounded text-sm font-medium ${getServerStatusColor(server.acc1)}`}>
                    acc1 {server.acc1}
                  </button>
                  <button className={`px-3 py-2 rounded text-sm font-medium ${getServerStatusColor(server.acc2)}`}>
                    acc2 {server.acc2}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Uptime Information */}
        <div className="space-y-4">
          {uptimeData.map((uptime, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {uptime.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-slate-400 text-sm">acc1</p>
                    <p className="text-green-400 text-lg font-bold">{uptime.acc1}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">acc2</p>
                    <p className="text-green-400 text-lg font-bold">{uptime.acc2}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* WEN Status */}
        <div className="space-y-4">
          {wenData.map((wen, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  {wen.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-slate-400 text-sm">acc1</p>
                    <p className="text-blue-400 text-xs">{wen.acc1.date}</p>
                    <p className="text-blue-400 text-xs">{wen.acc1.time}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">acc2</p>
                    <p className="text-blue-400 text-xs">{wen.acc2.date}</p>
                    <p className="text-blue-400 text-xs">{wen.acc2.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">CPU Usage</p>
                <p className="text-white text-2xl font-bold">45%</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Memory Usage</p>
                <p className="text-white text-2xl font-bold">68%</p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Disk Usage</p>
                <p className="text-white text-2xl font-bold">32%</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">DB Connections</p>
                <p className="text-white text-2xl font-bold">147</p>
              </div>
              <Database className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemMonitoringPage;
