
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Globe,
  MapPin,
  X
} from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'alert' | 'success';
  message: string;
  time: string;
  urgent?: boolean;
  category: 'system' | 'context';
  source?: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onDismissAlert?: (alertId: number) => void;
}

const AlertsPanel = ({ alerts, onDismissAlert }: AlertsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    system: true,
    context: true
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertBadgeColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'alert':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'info':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'success':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const systemAlerts = alerts.filter(alert => alert.category === 'system');
  const contextAlerts = alerts.filter(alert => alert.category === 'context');
  const urgentAlerts = alerts.filter(alert => alert.urgent);

  const toggleSection = (section: 'system' | 'context') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderAlertGroup = (groupAlerts: Alert[], title: string, icon: React.ReactNode, sectionKey: 'system' | 'context') => {
    if (groupAlerts.length === 0) return null;

    const urgentInGroup = groupAlerts.filter(alert => alert.urgent).length;

    return (
      <div className="space-y-2">
        <Collapsible
          open={expandedSections[sectionKey]}
          onOpenChange={() => toggleSection(sectionKey)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto font-medium hover:bg-white/10 text-white"
            >
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm">{title}</span>
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  {groupAlerts.length}
                </Badge>
                {urgentInGroup > 0 && (
                  <Badge className="text-xs bg-red-500 text-white">
                    {urgentInGroup} Urgent
                  </Badge>
                )}
              </div>
              {expandedSections[sectionKey] ? (
                <ChevronUp className="h-4 w-4 text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pt-1">
            {groupAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-2 rounded-lg border transition-colors hover:bg-slate-50 group ${
                  alert.urgent ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start gap-2">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-slate-900 leading-tight">
                        {alert.message}
                      </p>
                      {onDismissAlert && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDismissAlert(alert.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0 hover:bg-red-100 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-500">{alert.time}</span>
                      <div className="flex items-center gap-1">
                        <Badge className={`text-xs border ${getAlertBadgeColor(alert.type)}`}>
                          {alert.type}
                        </Badge>
                        {alert.source && (
                          <Badge variant="outline" className="text-xs">
                            {alert.source}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {alert.urgent && (
                      <Badge className="mt-1 bg-red-100 text-red-800 text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  return (
    <div className={`fixed right-0 top-16 h-[calc(100vh-8rem)] transition-all duration-300 z-40 ${isExpanded ? 'w-80' : 'w-10'}`}>
      <div className="h-full flex">
        {/* Toggle Button */}
        <div className="w-10 h-full flex items-center justify-center alerts-panel-gradient">
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
          <Card className="flex-1 h-full rounded-none border-l-0 shadow-lg">
            <CardHeader className="pb-3 alerts-panel-gradient">
              <CardTitle className="text-white text-base">Alerts & Notifications</CardTitle>
              <div className="text-white/80 text-sm">
                {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
                {urgentAlerts.length > 0 && (
                  <span className="ml-2">• {urgentAlerts.length} urgent</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full overflow-y-auto">
              <div className="p-3 space-y-4">
                {alerts.length === 0 ? (
                  <div className="text-center text-slate-500 py-8">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div>No active alerts</div>
                  </div>
                ) : (
                  <>
                    {/* System Alerts */}
                    {renderAlertGroup(
                      systemAlerts, 
                      'System', 
                      <Globe className="h-4 w-4 text-white" />, 
                      'system'
                    )}
                    
                    {/* Separator */}
                    {systemAlerts.length > 0 && contextAlerts.length > 0 && (
                      <Separator className="my-3 bg-white/20" />
                    )}
                    
                    {/* Context Alerts */}
                    {renderAlertGroup(
                      contextAlerts, 
                      'Context', 
                      <MapPin className="h-4 w-4 text-white" />, 
                      'context'
                    )}
                  </>
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
