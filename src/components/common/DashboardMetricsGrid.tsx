import { ClickableMetricCard } from './ClickableMetricCard';
import { MetricConfig } from '@/config/dashboardConfigs';
import * as LucideIcons from 'lucide-react';

interface DashboardMetricsGridProps {
  metricsConfig: MetricConfig[];
  data: any[];
  stats: Record<string, any>;
  onMetricClick?: (filterKey?: string, filterValue?: string) => void;
  className?: string;
}

export function DashboardMetricsGrid({
  metricsConfig,
  data,
  stats,
  onMetricClick,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
}: DashboardMetricsGridProps) {
  
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.BarChart3;
  };

  const handleMetricClick = (config: MetricConfig) => {
    if (onMetricClick && config.filterKey) {
      onMetricClick(config.filterKey, config.filterValue || 'all');
    }
  };

  return (
    <div className={className}>
      {metricsConfig.map((config) => {
        const value = stats[config.key];
        const formattedValue = config.valueFormatter 
          ? config.valueFormatter(value)
          : value;
        const subtitle = config.subtitleFormatter 
          ? config.subtitleFormatter(data)
          : undefined;

        return (
          <ClickableMetricCard
            key={config.key}
            title={config.title}
            value={formattedValue}
            subtitle={subtitle}
            icon={getIcon(config.iconName)}
            iconColor={config.iconColor}
            textColor={config.textColor}
            onClick={config.filterKey ? () => handleMetricClick(config) : undefined}
          />
        );
      })}
    </div>
  );
}