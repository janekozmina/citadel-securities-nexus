import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Instrument Reference
const generateMockInstrumentData = () => {
  const instruments = [
    'Apple Inc.', 'Meta Platforms Inc.', 'Tesla Inc.', 'Alphabet Inc.', 'Microsoft Corp.',
    'Amazon.com Inc.', 'Netflix Inc.', 'NVIDIA Corp.', 'PayPal Holdings', 'Adobe Inc.'
  ];
  
  const assetTypes = ['Equity', 'Bond', 'ETF', 'Preferred Stock'];
  const currencies = ['USD', 'EUR', 'GBP', 'BHD'];
  const statuses = ['Active', 'Suspended', 'Delisted'];
  
  return Array.from({ length: 120 }, (_, i) => {
    const company = instruments[i % instruments.length];
    const issueDate = new Date(2000 + Math.floor(Math.random() * 24), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    return {
      id: `INST-${String(i + 1).padStart(4, '0')}`,
      isin: `US${String(i + 1).padStart(8, '0')}${Math.floor(Math.random() * 10)}`,
      name: company,
      issuer: company,
      assetType: assetTypes[Math.floor(Math.random() * assetTypes.length)],
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      status: statuses[Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 2) + 1],
      cfi: `ES${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}FR`,
      fisn: company.split(' ')[0].toUpperCase(),
      issueDate: issueDate.toISOString().split('T')[0],
      maturity: Math.random() > 0.7 ? 'N/A' : new Date(issueDate.getFullYear() + Math.floor(Math.random() * 20) + 1, issueDate.getMonth(), issueDate.getDate()).toISOString().split('T')[0],
      exCoupon: Math.random() > 0.8 ? new Date().toISOString().split('T')[0] : 'N/A',
      marketValue: Math.floor(Math.random() * 1000000000) + 100000000 // 100M to 1.1B
    };
  });
};

const getInstrumentStats = (data: any[]) => {
  const totalInstruments = data.length;
  const activeInstruments = data.filter(i => i.status === 'Active').length;
  const uniqueIssuers = new Set(data.map(i => i.issuer)).size;
  const totalMarketValue = data.reduce((sum, i) => sum + i.marketValue, 0);
  
  // Asset type distribution
  const assetTypeStats = data.reduce((acc, i) => {
    acc[i.assetType] = (acc[i.assetType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Currency distribution
  const currencyStats = data.reduce((acc, i) => {
    acc[i.currency] = (acc[i.currency] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Status distribution
  const statusStats = data.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalInstruments,
    activeInstruments,
    uniqueIssuers,
    totalMarketValue,
    assetTypeStats,
    currencyStats,
    statusStats
  };
};

const instrumentConfig = {
  defaultView: 'visual' as const,
  searchFields: ['name', 'issuer', 'isin'] as (keyof ReturnType<typeof generateMockInstrumentData>[0])[],
  filters: [
    {
      key: 'assetType' as keyof ReturnType<typeof generateMockInstrumentData>[0],
      label: 'Asset Type',
      options: ['Equity', 'Bond', 'ETF', 'Preferred Stock']
    },
    {
      key: 'currency' as keyof ReturnType<typeof generateMockInstrumentData>[0],
      label: 'Currency',
      options: ['USD', 'EUR', 'GBP', 'BHD']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockInstrumentData>[0],
      label: 'Status',
      options: ['Active', 'Suspended', 'Delisted']
    }
  ]
};

const instrumentMetricsConfig = [
  {
    key: 'totalInstruments',
    title: 'Total Instruments',
    iconName: 'FileText',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'activeInstruments',
    title: 'Active Instruments',
    iconName: 'CheckCircle',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'uniqueIssuers',
    title: 'Unique Issuers',
    iconName: 'Building2',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'totalMarketValue',
    title: 'Total Market Value',
    valueFormatter: (value: number) => `USD ${(value / 1000000000).toFixed(1)}B`,
    iconName: 'TrendingUp',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function InstrumentReferencePage() {
  const [instruments] = useState(generateMockInstrumentData());
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
  } = useDashboardFilters(instruments, instrumentConfig);

  const stats = getInstrumentStats(filteredData);
  const colors = getChartColors();

  // Asset Type Distribution Chart
  const assetTypeData = Object.entries(stats.assetTypeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(4)[index]
    }));

  const assetTypeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: assetTypeData
  };

  // Currency Distribution Chart
  const currencyData = Object.entries(stats.currencyStats)
    .map(([currency, count], index) => ({
      name: currency,
      value: count as number,
      color: colors.getBarColors(4)[index]
    }));

  const currencyChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: currencyData
  };

  useEffect(() => {
    document.title = 'Instrument Reference | CBB Portal';
  }, []);

  const columns = [
    { key: 'isin', label: 'ISIN', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { key: 'assetType', label: 'Asset Type', sortable: true },
    { key: 'currency', label: 'Currency', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'cfi', label: 'CFI', sortable: true },
    { key: 'fisn', label: 'FISN', sortable: true },
    { key: 'issueDate', label: 'Issue Date', sortable: true },
    { 
      key: 'marketValue', 
      label: 'Market Value', 
      sortable: true,
      render: (value: number) => `${(value / 1000000).toFixed(1)}M`
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={instrumentMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Asset Type Distribution"
              description="Breakdown of instruments by asset type"
              data={filteredData}
              chartConfig={assetTypeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Currency Distribution"
              description="Instruments grouped by trading currency"
              data={filteredData}
              chartConfig={currencyChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Instrument Reference Table */}
          <ConfigurableDashboardSection
            title="Instrument Reference Data"
            description="Complete registry of financial instruments"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(i => i.status === 'Active').length },
                { name: 'Suspended', value: filteredData.filter(i => i.status === 'Suspended').length },
                { name: 'Delisted', value: filteredData.filter(i => i.status === 'Delisted').length }
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
            pageKey="instrument-reference"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}