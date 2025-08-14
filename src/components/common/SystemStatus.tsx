import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import dataConfig from '@/config/dataConfig';

interface SystemStatusProps {
  title?: string;
  className?: string;
  showAllSystems?: boolean;
  compactView?: boolean;
}

export const SystemStatus = ({
  title = "System Status",
  className,
  showAllSystems = true,
  compactView = false
}: SystemStatusProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    const variant = status === 'operational' ? 'default' : 
                   status === 'warning' ? 'secondary' : 'destructive';
    
    return (
      <Badge variant={variant} className="text-xs">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const systemsToShow = showAllSystems 
    ? [
        { name: 'RTGS Systems', systems: dataConfig.systemStatus.rtgs },
        { name: 'CSD Systems', systems: dataConfig.systemStatus.csd },
        { name: 'CMS Systems', systems: dataConfig.systemStatus.cms }
      ]
    : [{ name: 'All Systems', systems: [...dataConfig.systemStatus.rtgs, ...dataConfig.systemStatus.csd, ...dataConfig.systemStatus.cms] }];

  if (compactView) {
    return (
      <Card className={cn("bg-card", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {systemsToShow.flatMap(group => group.systems).map((system, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", getStatusColor(system.status))}></div>
                <span className="text-xs text-muted-foreground">{system.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-card", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "grid gap-6",
          showAllSystems ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"
        )}>
          {systemsToShow.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                {group.name}
              </h4>
              <div className="space-y-3">
                {group.systems.map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{system.name}</span>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(system.status)}
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        getStatusColor(system.status)
                      )}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;