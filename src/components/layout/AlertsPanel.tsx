
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'alert';
  message: string;
  time: string;
  urgent?: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel = ({ alerts }: AlertsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getAlertBadgeColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const urgentAlerts = alerts.filter(alert => alert.urgent);

  return (
    <div className={`fixed right-0 top-0 h-full transition-all duration-300 z-50 ${isExpanded ? 'w-80' : 'w-12'}`}>
      <div className="h-full flex">
        {/* Toggle Button */}
        <div className="w-12 h-full flex items-center justify-center" style={{ backgroundColor: '#5435E1' }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 text-white hover:bg-white/10"
          >
            {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          {!isExpanded && urgentAlerts.length > 0 && (
            <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {urgentAlerts.length}
            </div>
          )}
        </div>

        {/* Panel Content */}
        {isExpanded && (
          <Card className="flex-1 h-full rounded-none border-l-0">
            <CardHeader className="pb-3" style={{ backgroundColor: '#5435E1' }}>
              <CardTitle className="text-white text-lg">Alerts & Tasks</CardTitle>
              <div className="text-white/80 text-sm">
                {alerts.length} active item{alerts.length !== 1 ? 's' : ''}
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full overflow-y-auto">
              <div className="space-y-1 p-4">
                {alerts.length === 0 ? (
                  <div className="text-center text-slate-500 py-8">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div>No active alerts</div>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg border transition-colors hover:bg-slate-50 ${
                        alert.urgent ? 'border-red-200 bg-red-50' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 leading-tight">
                            {alert.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-500">{alert.time}</span>
                            <Badge className={`text-xs ${getAlertBadgeColor(alert.type)}`}>
                              {alert.type}
                            </Badge>
                          </div>
                          {alert.urgent && (
                            <Badge className="mt-1 bg-red-100 text-red-800 text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { AlertsPanel };
