import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Link, Zap, CheckCircle, AlertTriangle } from 'lucide-react';

const IntegrationsManagementPage = () => {
  const integrations = [
    {
      title: 'Bloomberg Auctions Integration Management',
      status: 'active',
      description: 'Manage Bloomberg auction data feeds and configurations',
      lastSync: '2024-07-13 14:30:00',
      actions: ['Configure', 'Test Connection', 'View Logs']
    },
    {
      title: 'Bloomberg E-bond Integration Management', 
      status: 'active',
      description: 'Electronic bond trading integration with Bloomberg terminal',
      lastSync: '2024-07-13 14:25:00',
      actions: ['Configure', 'Test Connection', 'View Logs']
    },
    {
      title: 'Euroclear Integration Management',
      status: 'warning',
      description: 'Settlement and custody services integration',
      lastSync: '2024-07-13 13:45:00',
      actions: ['Configure', 'Test Connection', 'View Logs', 'Troubleshoot']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integrations Management</h1>
          <p className="text-slate-600">Manage external system integrations and data feeds</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Global Settings
        </Button>
      </div>

      <div className="grid gap-6">
        {integrations.map((integration, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <Link className="h-5 w-5 text-slate-600" />
                  {integration.title}
                </CardTitle>
                <Badge className={getStatusColor(integration.status)}>
                  {getStatusIcon(integration.status)}
                  <span className="ml-1 capitalize">{integration.status}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">{integration.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>Last Sync: {integration.lastSync}</span>
                  <Zap className="h-3 w-3" />
                  <span>Auto-sync enabled</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {integration.actions.map((action, actionIndex) => (
                    <Button 
                      key={actionIndex} 
                      variant={actionIndex === 0 ? "default" : "outline"} 
                      size="sm"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsManagementPage;