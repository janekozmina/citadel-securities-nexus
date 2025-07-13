import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Upload, 
  Settings,
  Activity,
  Database,
  RefreshCw
} from 'lucide-react';

const MarketDataPage = () => {
  const quickActions = [
    {
      title: 'Market Prices Feed Management',
      description: 'Configure and monitor real-time market price feeds',
      icon: TrendingUp,
      status: 'active',
      lastUpdate: '2024-07-13 14:35:00'
    },
    {
      title: 'Market Prices Rates Management', 
      description: 'Manage interest rates and yield curve data',
      icon: BarChart3,
      status: 'active',
      lastUpdate: '2024-07-13 14:30:00'
    },
    {
      title: 'Currency Exchange Rates Feed Management',
      description: 'Monitor and configure FX rates across currencies',
      icon: DollarSign,
      status: 'active',
      lastUpdate: '2024-07-13 14:25:00'
    },
    {
      title: 'Price Valuations',
      description: 'Calculate and manage security valuations',
      icon: Activity,
      status: 'processing',
      lastUpdate: '2024-07-13 14:20:00'
    },
    {
      title: 'Upload Market Data',
      description: 'Bulk upload market data files and feeds',
      icon: Upload,
      status: 'ready',
      lastUpdate: '2024-07-13 14:15:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Market Data Management</h1>
          <p className="text-slate-600">Configure and monitor market data feeds and pricing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh All
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Feed Settings
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Feeds</p>
                <p className="text-2xl font-bold text-slate-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Instruments Covered</p>
                <p className="text-2xl font-bold text-slate-900">8,432</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Updates Today</p>
                <p className="text-2xl font-bold text-slate-900">156,892</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg">
                      <action.icon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{action.title}</h3>
                      <p className="text-sm text-slate-600">{action.description}</p>
                      <p className="text-xs text-slate-500 mt-1">Last update: {action.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(action.status)}>
                      {action.status}
                    </Badge>
                    <Button>
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDataPage;