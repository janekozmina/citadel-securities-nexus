// Unified Chart Color Configuration
export interface ChartColorConfig {
  primary: string[];
  secondary: string[];
  accent: string[];
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
    neutral: string;
  };
}

// Default color palette - can be easily customized
export const defaultChartColors: ChartColorConfig = {
  // Primary palette for main data visualization
  primary: [
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan
    '#84cc16', // Lime
    '#f97316', // Orange
    '#ec4899', // Pink
    '#6366f1'  // Indigo
  ],
  
  // Secondary palette for supporting data
  secondary: [
    '#60a5fa', // Light Blue
    '#34d399', // Light Emerald
    '#fbbf24', // Light Amber
    '#f87171', // Light Red
    '#a78bfa', // Light Violet
    '#22d3ee', // Light Cyan
    '#a3e635', // Light Lime
    '#fb923c', // Light Orange
    '#f472b6', // Light Pink
    '#818cf8'  // Light Indigo
  ],
  
  // Accent colors for highlights
  accent: [
    '#1e40af', // Dark Blue
    '#047857', // Dark Emerald
    '#d97706', // Dark Amber
    '#dc2626', // Dark Red
    '#7c3aed', // Dark Violet
    '#0891b2', // Dark Cyan
    '#65a30d', // Dark Lime
    '#ea580c', // Dark Orange
    '#db2777', // Dark Pink
    '#4f46e5'  // Dark Indigo
  ],
  
  // Status-specific colors
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    neutral: '#6b7280'
  }
};

// Chart type specific color getters
export const getChartColors = (colorConfig: ChartColorConfig = defaultChartColors) => ({
  // Get colors for pie charts (use primary palette)
  getPieColors: (count: number): string[] => {
    return Array.from({ length: count }, (_, i) => 
      colorConfig.primary[i % colorConfig.primary.length]
    );
  },
  
  // Get colors for bar charts (use primary palette)
  getBarColors: (count: number): string[] => {
    return Array.from({ length: count }, (_, i) => 
      colorConfig.primary[i % colorConfig.primary.length]
    );
  },
  
  // Get colors for line charts (use accent palette)
  getLineColors: (count: number): string[] => {
    return Array.from({ length: count }, (_, i) => 
      colorConfig.accent[i % colorConfig.accent.length]
    );
  },
  
  // Get status-based colors
  getStatusColors: () => colorConfig.status,
  
  // Get colors by category
  getColorsByCategory: (category: 'primary' | 'secondary' | 'accent') => {
    return colorConfig[category];
  }
});

// Predefined color schemes for common chart patterns
export const chartColorSchemes = {
  // For transaction status charts
  transactionStatus: {
    settled: defaultChartColors.status.success,
    rejected: defaultChartColors.status.error,
    pending: defaultChartColors.status.warning,
    inQueue: defaultChartColors.status.info
  },
  
  // For risk level charts
  riskLevels: {
    low: defaultChartColors.status.success,
    medium: defaultChartColors.status.warning,
    high: defaultChartColors.status.error
  },
  
  // For account type charts
  accountTypes: {
    custody: defaultChartColors.primary[0],
    settlement: defaultChartColors.primary[1],
    margin: defaultChartColors.primary[2]
  },
  
  // For financial data (debit/credit)
  financial: {
    debit: defaultChartColors.status.error,
    credit: defaultChartColors.status.success,
    balance: defaultChartColors.status.info
  }
};

// Utility function to get consistent colors for data arrays
export const assignColorsToData = (
  data: Array<{ name: string; value: number; [key: string]: any }>,
  colorScheme?: Record<string, string>
): Array<{ name: string; value: number; color: string; [key: string]: any }> => {
  const colors = getChartColors();
  const pieColors = colors.getPieColors(data.length);
  
  return data.map((item, index) => ({
    ...item,
    color: colorScheme?.[item.name.toLowerCase().replace(/\s+/g, '')] || 
           colorScheme?.[item.name] || 
           pieColors[index]
  }));
};