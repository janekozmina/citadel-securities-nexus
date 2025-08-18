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
  pieChartSize?: 'small' | 'medium' | 'large' | 'full';
}

export function InteractiveChart({ config, className = "", showCard = true, titleFontSize = "text-lg", pieChartSize = "medium" }: InteractiveChartProps) {
  const handleSegmentClick = (segment: ChartSegment) => {
    if (config.onSegmentClick && segment.filterKey) {
      config.onSegmentClick(segment.filterKey, segment.filterValue);
    }
  };

  // Configure pie chart sizing based on prop
  const getPieChartConfig = () => {
    switch (pieChartSize) {
      case 'small':
        return {
          margin: { top: 10, right: 60, bottom: 80, left: 10 },
          cy: "40%",
          outerRadius: Math.min((config.height || 320) * 0.2, 60),
          legendHeight: 50
        };
      case 'large':
        return {
          margin: { top: 20, right: 180, bottom: 20, left: 20 },
          cy: "50%",
          outerRadius: Math.min((config.height || 320) * 0.4, 130),
          legendHeight: 70,
          legendLayout: 'vertical',
          legendAlign: 'right',
          legendVerticalAlign: 'middle'
        };
      case 'full':
        return {
          margin: { top: 20, right: 40, bottom: 80, left: 20 },
          cy: "40%",
          outerRadius: Math.min((config.height || 420) * 0.4, 150),
          legendHeight: 60
        };
      default: // medium
        return {
          margin: { top: 10, right: 120, bottom: 100, left: 10 },
          cy: "35%",
          outerRadius: Math.min((config.height || 320) * 0.22, 80),
          legendHeight: 60
        };
    }
  };

  const pieConfig = getPieChartConfig();

  const renderPieChart = () => (
    <PieChart margin={pieConfig.margin}>
      <Pie
        data={config.data}
        cx="50%"
        cy={pieConfig.cy}
        labelLine={false}
        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        outerRadius={pieConfig.outerRadius}
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
        verticalAlign={(pieConfig.legendVerticalAlign as any) || "bottom"} 
        height={pieConfig.legendVerticalAlign === 'middle' ? undefined : pieConfig.legendHeight}
        wrapperStyle={{ 
          paddingTop: pieConfig.legendVerticalAlign === 'middle' ? '0px' : '20px',
          fontSize: '12px',
          lineHeight: '18px',
          whiteSpace: 'normal'
        }}
        layout={(pieConfig.legendLayout as any) || "horizontal"}
        align={(pieConfig.legendAlign as any) || "center"}
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