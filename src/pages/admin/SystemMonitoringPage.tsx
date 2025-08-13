import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Server, 
  Database, 
  Network, 
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Monitor,
  Shield
} from 'lucide-react';

interface SystemMetrics {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  transactions: {
    total: number;
    successful: number;
    failed: number;
    pending: number;
  };
  services: Array<{
    name: string;
    status: 'running' | 'stopped' | 'error';
    port: number;
    health: 'healthy' | 'degraded' | 'down';
  }>;
}

const rtgsMetrics: SystemMetrics = {
  name: 'RTGS System',
  status: 'healthy',
  uptime: '45 days, 12:34:56',
  cpu: 23,
  memory: 67,
  disk: 45,
  network: 89,
  transactions: {
    total: 15420,
    successful: 15385,
    failed: 12,
    pending: 23
  },
  services: [
    { name: 'Payment Processing Service', status: 'running', port: 8080, health: 'healthy' },
    { name: 'Liquidity Management', status: 'running', port: 8081, health: 'healthy' },
    { name: 'Settlement Engine', status: 'running', port: 8082, health: 'healthy' },
    { name: 'Notification Service', status: 'running', port: 8083, health: 'degraded' },
    { name: 'Audit Service', status: 'running', port: 8084, health: 'healthy' },
    { name: 'Reporting Service', status: 'running', port: 8085, health: 'healthy' }
  ]
};

const csdMetrics: SystemMetrics = {
  name: 'CSD System',
  status: 'warning',
  uptime: '38 days, 08:15:42',
  cpu: 45,
  memory: 82,
  disk: 67,
  network: 76,
  transactions: {
    total: 8940,
    successful: 8895,
    failed: 8,
    pending: 37
  },
  services: [
    { name: 'Settlement Processing', status: 'running', port: 9080, health: 'healthy' },
    { name: 'Securities Management', status: 'running', port: 9081, health: 'healthy' },
    { name: 'Corporate Actions', status: 'running', port: 9082, health: 'degraded' },
    { name: 'Custody Service', status: 'running', port: 9083, health: 'healthy' },
    { name: 'Trade Matching', status: 'stopped', port: 9084, health: 'down' },
    { name: 'Risk Management', status: 'running', port: 9085, health: 'healthy' }
  ]
};

export default function SystemMonitoringPage() {
  useEffect(() => {
    document.title = 'System Monitoring | Unified Portal';
  }, []);

  const [activeSystem, setActiveSystem] = useState<'rtgs' | 'csd'>('rtgs');
  const currentMetrics = activeSystem === 'rtgs' ? rtgsMetrics : csdMetrics;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'error':
      case 'down':
        return 'text-red-600 bg-red-100';
      case 'stopped':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
      case 'error':
      case 'down':
        return <AlertTriangle className="h-4 w-4" />;
      case 'stopped':
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">System Monitoring</h1>
            <p className="text-muted-foreground">Real-time monitoring of RTGS and CSD system health and performance</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={activeSystem === 'rtgs' ? 'default' : 'outline'}
              onClick={() => setActiveSystem('rtgs')}
              className="gap-2"
            >
              <Server className="h-4 w-4" />
              RTGS System
            </Button>
            <Button
              variant={activeSystem === 'csd' ? 'default' : 'outline'}
              onClick={() => setActiveSystem('csd')}
              className="gap-2"
            >
              <Database className="h-4 w-4" />
              CSD System
            </Button>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              {getStatusIcon(currentMetrics.status)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge className={getStatusColor(currentMetrics.status)}>
                  {currentMetrics.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Uptime: {currentMetrics.uptime}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(currentMetrics.transactions.total)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(currentMetrics.transactions.successful)} successful
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentMetrics.services.filter(s => s.status === 'running').length}/{currentMetrics.services.length}
              </div>
              <p className="text-xs text-muted-foreground">
                services running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((currentMetrics.transactions.failed / currentMetrics.transactions.total) * 100).toFixed(2)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(currentMetrics.transactions.failed)} failed transactions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* System Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                System Resources
              </CardTitle>
              <CardDescription>Current resource utilization for {currentMetrics.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{currentMetrics.cpu}%</span>
                  </div>
                  <Progress value={currentMetrics.cpu} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{currentMetrics.memory}%</span>
                  </div>
                  <Progress value={currentMetrics.memory} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Disk Usage</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{currentMetrics.disk}%</span>
                  </div>
                  <Progress value={currentMetrics.disk} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Network I/O</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{currentMetrics.network} MB/s</span>
                  </div>
                  <Progress value={Math.min(currentMetrics.network, 100)} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Transaction Status
              </CardTitle>
              <CardDescription>Real-time transaction processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(currentMetrics.transactions.successful)}
                    </div>
                    <div className="text-sm text-green-600">Successful</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {formatNumber(currentMetrics.transactions.failed)}
                    </div>
                    <div className="text-sm text-red-600">Failed</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">
                    {formatNumber(currentMetrics.transactions.pending)}
                  </div>
                  <div className="text-sm text-yellow-600">Pending Processing</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-medium">
                      {((currentMetrics.transactions.successful / currentMetrics.transactions.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={(currentMetrics.transactions.successful / currentMetrics.transactions.total) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Service Status
            </CardTitle>
            <CardDescription>
              Detailed status of all {currentMetrics.name} microservices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentMetrics.services.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(service.health)}>
                        {service.health}
                      </Badge>
                    </TableCell>
                    <TableCell>:{service.port}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          View Logs
                        </Button>
                        <Button variant="ghost" size="sm">
                          Restart
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* System Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSL Certificate</span>
                  <Badge className="bg-green-100 text-green-800">Valid</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall Status</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Intrusion Detection</span>
                  <Badge className="bg-green-100 text-green-800">Monitoring</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Security Scan</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Primary DB</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Replica DB</span>
                  <Badge className="bg-green-100 text-green-800">Synced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Status</span>
                  <Badge className="bg-green-100 text-green-800">Current</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-sm text-muted-foreground">6 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">External Connectivity</span>
                  <Badge className="bg-green-100 text-green-800">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Latency</span>
                  <span className="text-sm text-muted-foreground">12ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bandwidth Usage</span>
                  <span className="text-sm text-muted-foreground">45% of 1Gbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Packet Loss</span>
                  <span className="text-sm text-muted-foreground">0.01%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}