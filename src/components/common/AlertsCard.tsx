import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, Bell } from 'lucide-react';

export interface Alert {
  id: number;
  type: 'warning' | 'info' | 'alert';
  message: string;
  time: string;
  urgent?: boolean;
}

interface AlertsCardProps {
  alerts: Alert[];
}

export const AlertsCard = ({ alerts }: AlertsCardProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'alert':
        return <Bell className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertBadgeColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'info':
        return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'alert':
        return 'bg-red-500/10 text-red-700 border-red-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const urgentAlerts = alerts.filter(alert => alert.urgent);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          System Alerts
          {urgentAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {urgentAlerts.length} Urgent
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active alerts</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div className={`p-1 rounded ${getAlertBadgeColor(alert.type)}`}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
              {alert.urgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};