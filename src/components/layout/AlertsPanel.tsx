
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, ChevronLeft, ChevronRight, Clock, AlertTriangle, Info } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'alert';
  message: string;
  time: string;
  urgent: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Clock className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string, urgent: boolean) => {
    if (urgent) return 'border-red-500 bg-red-50';
    switch (type) {
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'alert':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-white border-l border-slate-200 transition-all duration-300 z-10 ${isExpanded ? 'w-80' : 'w-12'}`}>
      <div className="flex flex-col h-full">
        <div className="p-2 border-b border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full relative"
          >
            {isExpanded ? (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="ml-2">Hide Alerts</span>
              </>
            ) : (
              <>
                <Bell className="h-4 w-4" />
                {alerts.some(alert => alert.urgent) && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-sm mb-4">Alerts & Tasks</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card 
                  key={alert.id} 
                  className={`${getAlertColor(alert.type, alert.urgent)} border-l-4`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">{alert.time}</span>
                          {alert.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
