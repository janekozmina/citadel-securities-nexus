import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

export interface ChartSegment {
  name: string;
  value: number;
  color: string;
  filterKey?: string;
  filterValue?: string;
}

export interface ChartConfig {
  type: 'pie' | 'bar' | 'line';
  title: string;
  height?: number;
  data: ChartSegment[];
  onSegmentClick?: (filterKey?: string, filterValue?: string) => void;
}

interface InteractiveChartProps {
  config: ChartConfig;
  className?: string;
  showCard?: boolean;
  titleFontSize?: string;
}

export function InteractiveChart({ config, className = "", showCard = true, titleFontSize = "text-lg" }: InteractiveChartProps) {
  const handleSegmentClick = (segment: ChartSegment) => {
    if (config.onSegmentClick && segment.filterKey) {
      config.onSegmentClick(segment.filterKey, segment.filterValue);
    }
  };

  const renderPieChart = () => (
    <PieChart>
      <Pie
        data={config.data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onClick={handleSegmentClick}
        style={{ cursor: config.onSegmentClick ? 'pointer' : 'default' }}
      >
        {config.data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={entry.color}
            style={{ cursor: config.onSegmentClick && entry.filterKey ? 'pointer' : 'default' }}
          />
        ))}
      </Pie>
      <Tooltip formatter={(value: any) => [value, 'Count']} />
      <Legend />
    </PieChart>
  );

  const renderBarChart = () => (
    <BarChart data={config.data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar 
        dataKey="value" 
        onClick={handleSegmentClick}
        style={{ cursor: config.onSegmentClick ? 'pointer' : 'default' }}
      >
        {config.data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Bar>
    </BarChart>
  );

  const renderChart = () => {
    switch (config.type) {
      case 'pie':
        return renderPieChart();
      case 'bar':
        return renderBarChart();
      default:
        return renderPieChart();
    }
  };

  const chartContent = (
    <div style={{ height: config.height || 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );

  if (!showCard) {
    return <div className={className}>{chartContent}</div>;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className={titleFontSize}>{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {chartContent}
      </CardContent>
    </Card>
  );
}