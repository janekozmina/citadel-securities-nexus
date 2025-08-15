import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SystemStatusProps {
  systems: {
    name: string;
    status: 'online' | 'warning' | 'offline' | 'maintenance';
    uptime?: string;
    lastUpdate?: string;
  }[];
}

export const SystemStatus = ({ systems }: SystemStatusProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'offline': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online': return 'default';
      case 'warning': return 'secondary';
      case 'offline': return 'destructive';
      case 'maintenance': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systems.map((system) => (
          <div key={system.name} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(system.status)}
              <div>
                <div className="font-medium">{system.name}</div>
                {system.uptime && (
                  <div className="text-sm text-muted-foreground">
                    Uptime: {system.uptime}
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <Badge variant={getStatusVariant(system.status) as any}>
                {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
              </Badge>
              {system.lastUpdate && (
                <div className="text-xs text-muted-foreground mt-1">
                  {system.lastUpdate}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};