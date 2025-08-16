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
    <PieChart margin={{ top: 10, right: 120, bottom: 100, left: 10 }}>
      <Pie
        data={config.data}
        cx="50%"
        cy="35%"
        labelLine={false}
        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        outerRadius={Math.min((config.height || 320) * 0.22, 80)}
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
      <Legend 
        verticalAlign="bottom" 
        height={60}
        wrapperStyle={{ 
          paddingTop: '30px',
          fontSize: '12px',
          lineHeight: '18px',
          whiteSpace: 'normal'
        }}
        layout="horizontal"
        align="center"
        iconType="square"
      />
    </PieChart>
  );

  const renderBarChart = () => (
    <BarChart 
      data={config.data} 
      margin={{ top: 20, right: 30, bottom: 40, left: 20 }}
    >
      <XAxis 
        dataKey="name" 
        tick={{ fontSize: 12 }}
        interval={0}
        angle={-45}
        textAnchor="end"
        height={40}
      />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip formatter={(value: any) => [value.toLocaleString(), 'Amount']} />
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
    <div style={{ height: config.height || 380, width: '100%', minHeight: '320px' }}>
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