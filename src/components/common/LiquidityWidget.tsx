import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricData {
  label: string;
  value: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

interface LiquidityWidgetProps {
  title: string;
  icon: LucideIcon;
  realTimeData: MetricData[];
  endOfDayData: MetricData[];
  className?: string;
}

export const LiquidityWidget = ({ 
  title, 
  icon: Icon, 
  realTimeData, 
  endOfDayData, 
  className 
}: LiquidityWidgetProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Real-time</h4>
          <div className="space-y-2">
            {realTimeData.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{metric.value}</span>
                  {metric.change && (
                    <Badge 
                      variant={metric.change.isPositive ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {metric.change.isPositive ? '+' : ''}{metric.change.value}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">End-of-Day (Previous)</h4>
          <div className="space-y-2">
            {endOfDayData.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <span className="font-medium text-muted-foreground">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};