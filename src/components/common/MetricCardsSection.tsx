import { DashboardMetricsGrid } from './DashboardMetricsGrid';
import { MetricConfig } from '@/config/dashboardConfigs';

interface MetricCardsSectionProps {
  metricsConfig: MetricConfig[];
  data: any[];
  stats: Record<string, any>;
  onMetricClick?: (filterKey?: string, filterValue?: string) => void;
  className?: string;
}

export function MetricCardsSection({
  metricsConfig,
  data,
  stats,
  onMetricClick,
  className = "mb-6"
}: MetricCardsSectionProps) {
  return (
    <div className={className}>
      <DashboardMetricsGrid
        metricsConfig={metricsConfig}
        data={data}
        stats={stats}
        onMetricClick={onMetricClick}
      />
    </div>
  );
}