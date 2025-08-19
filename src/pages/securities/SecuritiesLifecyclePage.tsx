import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Securities Lifecycle
const generateMockLifecycleData = () => {
  const securities = [
    'Apple Inc.', 'Microsoft Corp.', 'Alphabet Inc.', 'Tesla Inc.', 'Meta Platforms',
    'Amazon.com Inc.', 'Netflix Inc.', 'NVIDIA Corp.', 'Government Bond A', 'Corporate Bond B'
  ];
  
  const lifecycleStages = ['Pre-Issuance', 'Active Trading', 'Corporate Action', 'Maturity', 'Delisted'];
  const securityTypes = ['Equity', 'Government Bond', 'Corporate Bond', 'ETF', 'Preferred Stock'];
  const currencies = ['USD', 'EUR', 'GBP', 'BHD'];
  
  return Array.from({ length: 90 }, (_, i) => {
    const security = securities[i % securities.length];
    const issueDate = new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityDate = new Date(issueDate.getFullYear() + Math.floor(Math.random() * 15) + 1, issueDate.getMonth(), issueDate.getDate());
    
    return {
      id: `SEC-${String(i + 1).padStart(4, '0')}`,
      securityName: security,
      securityType: securityTypes[Math.floor(Math.random() * securityTypes.length)],
      isin: `US${String(i + 1).padStart(8, '0')}${Math.floor(Math.random() * 10)}`,
      lifecycleStage: lifecycleStages[Math.floor(Math.random() * lifecycleStages.length)],
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      outstandingValue: Math.floor(Math.random() * 2000000000) + 50000000, // 50M to 2.05B
      marketValue: Math.floor(Math.random() * 2000000000) + 50000000,
      holders: Math.floor(Math.random() * 50000) + 100,
      lastCorporateAction: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      nextCorporateAction: Math.random() > 0.7 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
    };
  });
};

const getLifecycleStats = (data: any[]) => {
  const totalSecurities = data.length;
  const activeSecurities = data.filter(s => s.lifecycleStage === 'Active Trading').length;
  const totalOutstanding = data.reduce((sum, s) => sum + s.outstandingValue, 0);
  const totalMarketValue = data.reduce((sum, s) => sum + s.marketValue, 0);
  
  // Lifecycle stage distribution
  const stageStats = data.reduce((acc, s) => {
    acc[s.lifecycleStage] = (acc[s.lifecycleStage] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Security type distribution
  const typeStats = data.reduce((acc, s) => {
    acc[s.securityType] = (acc[s.securityType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Maturity profile
  const currentYear = new Date().getFullYear();
  const maturityProfile = data.reduce((acc, s) => {
    const maturityYear = new Date(s.maturityDate).getFullYear();
    if (maturityYear >= currentYear && maturityYear <= currentYear + 10) {
      acc[maturityYear] = (acc[maturityYear] || 0) + s.outstandingValue;
    }
    return acc;
  }, {} as Record<number, number>);
  
  return {
    totalSecurities,
    activeSecurities,
    totalOutstanding,
    totalMarketValue,
    stageStats,
    typeStats,
    maturityProfile
  };
};

const lifecycleConfig = {
  defaultView: 'visual' as const,
  searchFields: ['securityName', 'isin', 'securityType'] as (keyof ReturnType<typeof generateMockLifecycleData>[0])[],
  filters: [
    {
      key: 'lifecycleStage' as keyof ReturnType<typeof generateMockLifecycleData>[0],
      label: 'Lifecycle Stage',
      options: ['Pre-Issuance', 'Active Trading', 'Corporate Action', 'Maturity', 'Delisted']
    },
    {
      key: 'securityType' as keyof ReturnType<typeof generateMockLifecycleData>[0],
      label: 'Security Type',
      options: ['Equity', 'Government Bond', 'Corporate Bond', 'ETF', 'Preferred Stock']
    },
    {
      key: 'currency' as keyof ReturnType<typeof generateMockLifecycleData>[0],
      label: 'Currency',
      options: ['USD', 'EUR', 'GBP', 'BHD']
    }
  ]
};

const lifecycleMetricsConfig = [
  {
    key: 'totalSecurities',
    title: 'Total Securities',
    iconName: 'FileText',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'activeSecurities',
    title: 'Active Trading',
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'totalOutstanding',
    title: 'Total Outstanding',
    valueFormatter: (value: number) => `USD ${(value / 1000000000).toFixed(1)}B`,
    iconName: 'Building2',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'totalMarketValue',
    title: 'Total Market Value',
    valueFormatter: (value: number) => `USD ${(value / 1000000000).toFixed(1)}B`,
    iconName: 'DollarSign',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function SecuritiesLifecyclePage() {
  const [lifecycle] = useState(generateMockLifecycleData());
  const {
    viewMode,
    filteredData,
    activeFilters,
    searchTerm,
    hasActiveFilters,
    setFilter,
    clearFilter,
    clearAllFilters,
    setSearchTerm,
    setViewMode,
    applyFilterAndSwitchView
  } = useDashboardFilters(lifecycle, lifecycleConfig);

  const stats = getLifecycleStats(filteredData);
  const colors = getChartColors();

  // Lifecycle Stage Distribution Chart
  const stageData = Object.entries(stats.stageStats)
    .map(([stage, count], index) => ({
      name: stage,
      value: count as number,
      color: colors.getPieColors(5)[index]
    }));

  const stageChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: stageData
  };

  // Maturity Profile Chart
  const maturityData = Object.entries(stats.maturityProfile)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .slice(0, 8)
    .map(([year, value], index) => ({
      name: year,
      value: Math.round((value as number) / 1000000), // Convert to millions
      color: colors.getBarColors(8)[index]
    }));

  const maturityChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: maturityData
  };

  useEffect(() => {
    document.title = 'Securities Lifecycle | CBB Portal';
  }, []);

  const columns = [
    { key: 'securityName', label: 'Security Name', sortable: true },
    { key: 'isin', label: 'ISIN', sortable: true },
    { key: 'securityType', label: 'Type', sortable: true },
    { key: 'lifecycleStage', label: 'Lifecycle Stage', sortable: true },
    { 
      key: 'outstandingValue', 
      label: 'Outstanding Value', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${(value / 1000000).toFixed(1)}M`
    },
    { key: 'issueDate', label: 'Issue Date', sortable: true },
    { key: 'maturityDate', label: 'Maturity Date', sortable: true },
    { 
      key: 'holders', 
      label: 'Holders', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={lifecycleMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Lifecycle Stage Distribution"
              description="Securities breakdown by lifecycle stage"
              data={filteredData}
              chartConfig={stageChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Maturity Profile"
              description="Outstanding value by maturity year"
              data={filteredData}
              chartConfig={maturityChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Securities Lifecycle Table */}
          <ConfigurableDashboardSection
            title="Securities Lifecycle Registry"
            description="Complete lifecycle tracking of all securities"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Pre-Issuance', value: filteredData.filter(s => s.lifecycleStage === 'Pre-Issuance').length },
                { name: 'Active Trading', value: filteredData.filter(s => s.lifecycleStage === 'Active Trading').length },
                { name: 'Corporate Action', value: filteredData.filter(s => s.lifecycleStage === 'Corporate Action').length },
                { name: 'Maturity', value: filteredData.filter(s => s.lifecycleStage === 'Maturity').length },
                { name: 'Delisted', value: filteredData.filter(s => s.lifecycleStage === 'Delisted').length }
              ])
            }}
            defaultView={viewMode}
            onChartClick={applyFilterAndSwitchView}
            showViewSwitcher={true}
            titleFontSize="text-lg font-semibold"
          />
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="securities-lifecycle"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}