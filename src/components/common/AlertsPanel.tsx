import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  AlertTriangle, 
  Info, 
  Bell, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Globe,
  X
} from 'lucide-react';

export interface Alert {
  id: number;
  type: 'warning' | 'info' | 'alert' | 'success';
  message: string;
  time: string;
  urgent?: boolean;
  category: 'context' | 'global';
  source?: string; // e.g., 'RTGS', 'CSD', 'CMS', 'System'
}

interface AlertsPanelProps {
  alerts: Alert[];
  className?: string;
  onDismissAlert?: (alertId: number) => void;
}

export const AlertsPanel = ({ alerts, className = '', onDismissAlert }: AlertsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    context: true,
    global: true
  });

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'alert':
        return <Bell className="h-4 w-4" />;
      case 'success':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertBadgeColor = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-800';
      case 'alert':
        return 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-800';
      case 'success':
        return 'bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-800';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const contextAlerts = alerts.filter(alert => alert.category === 'context');
  const globalAlerts = alerts.filter(alert => alert.category === 'global');
  const urgentAlerts = alerts.filter(alert => alert.urgent);

  const toggleSection = (section: 'context' | 'global') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderAlertGroup = (groupAlerts: Alert[], title: string, icon: React.ReactNode, sectionKey: 'context' | 'global') => {
    if (groupAlerts.length === 0) return null;

    const urgentInGroup = groupAlerts.filter(alert => alert.urgent).length;

    return (
      <Collapsible
        open={expandedSections[sectionKey]}
        onOpenChange={() => toggleSection(sectionKey)}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-2 h-auto font-medium hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              {icon}
              <span>{title}</span>
              <Badge variant="secondary" className="text-xs">
                {groupAlerts.length}
              </Badge>
              {urgentInGroup > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {urgentInGroup} Urgent
                </Badge>
              )}
            </div>
            {expandedSections[sectionKey] ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          {groupAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 group hover:bg-muted/70 transition-colors"
            >
              <div className={`p-1.5 rounded-full ${getAlertBadgeColor(alert.type)}`}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-relaxed">{alert.message}</p>
                  {onDismissAlert && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDismissAlert(alert.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                  {alert.source && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <Badge variant="outline" className="text-xs px-1.5 py-0">
                        {alert.source}
                      </Badge>
                    </>
                  )}
                  {alert.urgent && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <Badge variant="destructive" className="text-xs px-1.5 py-0">
                        Urgent
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  if (alerts.length === 0) {
    return (
      <Card className={`transition-all duration-300 ${className}`}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No active alerts
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            Alerts
            <Badge variant="secondary" className="text-xs">
              {alerts.length}
            </Badge>
            {urgentAlerts.length > 0 && (
              <Badge variant="destructive" className="text-xs">
                {urgentAlerts.length} Urgent
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Context Alerts */}
            {renderAlertGroup(
              contextAlerts, 
              'Page Context', 
              <MapPin className="h-4 w-4" />, 
              'context'
            )}
            
            {/* Separator */}
            {contextAlerts.length > 0 && globalAlerts.length > 0 && (
              <Separator className="my-3" />
            )}
            
            {/* Global Alerts */}
            {renderAlertGroup(
              globalAlerts, 
              'System Wide', 
              <Globe className="h-4 w-4" />, 
              'global'
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};