import { ChartConfig } from '@/components/common/InteractiveChart';

export function updateChartDataWithStats(
  chartConfig: ChartConfig,
  stats: Record<string, any>
): ChartConfig {
  const updatedData = chartConfig.data.map(segment => {
    // Map chart segment names to stats keys
    const statKey = getStatKeyFromSegmentName(segment.name, stats);
    return {
      ...segment,
      value: statKey ? (stats[statKey]?.count || stats[statKey] || 0) : segment.value
    };
  });

  return {
    ...chartConfig,
    data: updatedData
  };
}

function getStatKeyFromSegmentName(segmentName: string, stats: Record<string, any>): string | null {
  // Define mapping between chart segment names and stats keys
  const nameMapping: Record<string, string> = {
    'Settled': 'settled',
    'Rejected': 'rejected',
    'In Queue': 'queue',
    'ILF/BUYBACK': 'ilf',
    'Low Risk': 'low',
    'Medium Risk': 'medium',
    'High Risk': 'high'
  };

  const statKey = nameMapping[segmentName];
  return statKey && stats[statKey] ? statKey : null;
}

export function createDynamicChartConfig(
  title: string,
  type: ChartConfig['type'],
  dataMapping: Array<{
    name: string;
    statKey: string;
    color: string;
    filterKey?: string;
    filterValue?: string;
  }>,
  stats: Record<string, any>
): ChartConfig {
  const data = dataMapping.map(mapping => ({
    name: mapping.name,
    value: stats[mapping.statKey]?.count || stats[mapping.statKey] || 0,
    color: mapping.color,
    filterKey: mapping.filterKey,
    filterValue: mapping.filterValue
  }));

  return {
    type,
    title,
    data,
    height: 320
  };
}