import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Issuance
const generateMockIssuanceData = () => {
  const issuers = [
    'Government of Bahrain', 'Apple Inc.', 'Microsoft Corp.', 'Alphabet Inc.', 'Tesla Inc.',
    'Amazon.com Inc.', 'Meta Platforms', 'Netflix Inc.', 'NVIDIA Corp.', 'PayPal Holdings'
  ];
  
  const issuerTypes = ['Corporate', 'Government', 'Municipal', 'Supranational'];
  const assetClasses = ['Bonds', 'Equities', 'ETFs', 'Others'];
  const currencies = ['USD', 'EUR', 'GBP', 'BHD'];
  
  return Array.from({ length: 95 }, (_, i) => {
    const issuer = issuers[i % issuers.length];
    const issueDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const issuanceValue = Math.floor(Math.random() * 2000000000) + 50000000; // 50M to 2.05B
    
    return {
      id: `ISS-${String(i + 1).padStart(4, '0')}`,
      issuer: issuer,
      issuerType: issuerTypes[Math.floor(Math.random() * issuerTypes.length)],
      assetClass: assetClasses[Math.floor(Math.random() * assetClasses.length)],
      issuanceValue: issuanceValue,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      issueDate: issueDate.toISOString().split('T')[0],
      period: `Q${Math.floor((issueDate.getMonth() / 3)) + 1} ${issueDate.getFullYear()}`,
      status: ['Active', 'Closed', 'Pending'][Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 2) + 1],
      volume: Math.floor(Math.random() * 1000) + 50, // 50 to 1050 issues
      underwriter: ['Goldman Sachs', 'JPMorgan', 'Morgan Stanley', 'Citi'][Math.floor(Math.random() * 4)]
    };
  });
};

const getIssuanceStats = (data: any[]) => {
  const totalIssuances = data.length;
  const activeIssuances = data.filter(i => i.status === 'Active').length;
  const totalValue = data.reduce((sum, i) => sum + i.issuanceValue, 0);
  const totalVolume = data.reduce((sum, i) => sum + i.volume, 0);
  
  // Issuer type distribution
  const issuerTypeStats = data.reduce((acc, i) => {
    acc[i.issuerType] = (acc[i.issuerType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Asset class distribution
  const assetClassStats = data.reduce((acc, i) => {
    acc[i.assetClass] = (acc[i.assetClass] || 0) + i.volume;
    return acc;
  }, {} as Record<string, number>);
  
  // Period trends
  const periodStats = data.reduce((acc, i) => {
    acc[i.period] = (acc[i.period] || { volume: 0, value: 0 });
    acc[i.period].volume += i.volume;
    acc[i.period].value += i.issuanceValue;
    return acc;
  }, {} as Record<string, { volume: number; value: number }>);
  
  return {
    totalIssuances,
    activeIssuances,
    totalValue,
    totalVolume,
    issuerTypeStats,
    assetClassStats,
    periodStats
  };
};

const issuanceConfig = {
  defaultView: 'visual' as const,
  searchFields: ['issuer', 'issuerType', 'assetClass'] as (keyof ReturnType<typeof generateMockIssuanceData>[0])[],
  filters: [
    {
      key: 'issuerType' as keyof ReturnType<typeof generateMockIssuanceData>[0],
      label: 'Issuer Type',
      options: ['Corporate', 'Government', 'Municipal', 'Supranational']
    },
    {
      key: 'assetClass' as keyof ReturnType<typeof generateMockIssuanceData>[0],
      label: 'Asset Class',
      options: ['Bonds', 'Equities', 'ETFs', 'Others']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockIssuanceData>[0],
      label: 'Status',
      options: ['Active', 'Closed', 'Pending']
    }
  ]
};

const issuanceMetricsConfig = [
  {
    key: 'totalIssuances',
    title: 'Total Issuances',
    iconName: 'FileText',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'totalValue',
    title: 'Total Issuance Value',
    valueFormatter: (value: number) => `USD ${(value / 1000000000).toFixed(1)}B`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'activeIssuances',
    title: 'Active Issuances',
    iconName: 'CheckCircle',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'totalVolume',
    title: 'Total Volume',
    iconName: 'BarChart3',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function IssuancePage() {
  const [issuances] = useState(generateMockIssuanceData());
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
  } = useDashboardFilters(issuances, issuanceConfig);

  const stats = getIssuanceStats(filteredData);
  const colors = getChartColors();

  // Issuer Type Distribution Chart
  const issuerTypeData = Object.entries(stats.issuerTypeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(4)[index]
    }));

  const issuerTypeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: issuerTypeData
  };

  // Asset Class Distribution Chart
  const assetClassData = Object.entries(stats.assetClassStats)
    .map(([assetClass, volume], index) => ({
      name: assetClass,
      value: volume as number,
      color: colors.getBarColors(4)[index]
    }));

  const assetClassChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: assetClassData
  };

  useEffect(() => {
    document.title = 'Issuance | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Issuance ID', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { key: 'issuerType', label: 'Issuer Type', sortable: true },
    { key: 'assetClass', label: 'Asset Class', sortable: true },
    { 
      key: 'issuanceValue', 
      label: 'Issuance Value', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${(value / 1000000).toFixed(1)}M`
    },
    { key: 'volume', label: 'Volume', sortable: true },
    { key: 'issueDate', label: 'Issue Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'underwriter', label: 'Underwriter', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={issuanceMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Issuer Type Distribution"
              description="Breakdown of issuances by issuer type"
              data={filteredData}
              chartConfig={issuerTypeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Asset Class Volume"
              description="Issuance volume by asset class"
              data={filteredData}
              chartConfig={assetClassChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Issuance Registry Table */}
          <ConfigurableDashboardSection
            title="Issuance Registry"
            description="Complete registry of securities issuances"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(i => i.status === 'Active').length },
                { name: 'Closed', value: filteredData.filter(i => i.status === 'Closed').length },
                { name: 'Pending', value: filteredData.filter(i => i.status === 'Pending').length }
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
            pageKey="issuance"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}