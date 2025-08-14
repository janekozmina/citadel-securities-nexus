import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataCardProps {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  icon?: LucideIcon;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
}

export const DataCard = ({ 
  title, 
  value, 
  change, 
  subtitle, 
  icon: Icon, 
  color = 'text-primary', 
  size = 'md',
  className,
  loading = false
}: DataCardProps) => {
  const sizeConfig = {
    sm: {
      padding: 'p-4',
      valueSize: 'text-lg',
      titleSize: 'text-sm',
      iconSize: 'h-5 w-5'
    },
    md: {
      padding: 'p-5',
      valueSize: 'text-xl',
      titleSize: 'text-sm',
      iconSize: 'h-6 w-6'
    },
    lg: {
      padding: 'p-6',
      valueSize: 'text-2xl',
      titleSize: 'text-base',
      iconSize: 'h-8 w-8'
    }
  };

  const config = sizeConfig[size];

  if (loading) {
    return (
      <Card className={cn("bg-card transition-all duration-300 animate-pulse", className)}>
        <CardContent className={config.padding}>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </div>
            <div className={cn("bg-muted rounded-full", config.iconSize)}></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "bg-card transition-all duration-300 hover:shadow-md hover:scale-105",
      className
    )}>
      <CardContent className={config.padding}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-medium text-muted-foreground truncate",
              config.titleSize
            )}>
              {title}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground/70 mt-1">{subtitle}</p>
            )}
            <p className={cn(
              "font-bold text-foreground mt-2 transition-all duration-500",
              config.valueSize
            )}>
              {value}
            </p>
            {change && (
              <p className="text-xs text-muted-foreground mt-1 truncate">{change}</p>
            )}
          </div>
          {Icon && (
            <Icon className={cn(
              "flex-shrink-0 ml-3 transition-colors duration-300",
              config.iconSize,
              color
            )} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;