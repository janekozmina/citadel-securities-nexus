import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DashboardViewSwitcher } from './DashboardViewSwitcher';
import { DataTable } from './DataTable';
import { InteractiveChart, ChartConfig } from './InteractiveChart';

interface ConfigurableDashboardSectionProps {
  title: string;
  description?: string;
  data: any[];
  tableColumns?: any[];
  chartConfig: ChartConfig;
  defaultView?: 'visual' | 'table';
  onChartClick?: (filterKey?: string, filterValue?: string) => void;
  className?: string;
  showViewSwitcher?: boolean;
  titleFontSize?: string;
}

export function ConfigurableDashboardSection({
  title,
  description,
  data,
  tableColumns,
  chartConfig,
  defaultView = 'visual',
  onChartClick,
  className = "",
  showViewSwitcher = true,
  titleFontSize = "text-lg"
}: ConfigurableDashboardSectionProps) {
  const [viewMode, setViewMode] = useState<'visual' | 'table'>(defaultView);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={titleFontSize}>{title}</CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {showViewSwitcher && tableColumns && (
            <DashboardViewSwitcher
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'visual' || !tableColumns ? (
          <InteractiveChart
            config={chartConfig}
            showCard={false}
          />
        ) : (
          <DataTable
            title=""
            data={data}
            columns={tableColumns}
          />
        )}
      </CardContent>
    </Card>
  );
}