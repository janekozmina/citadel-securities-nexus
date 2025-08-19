import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Instruments Summary
const generateMockInstrumentsSummaryData = () => {
  const instrumentTypes = ['Government Bond', 'Treasury Bill', 'Corporate Bond', 'Islamic Sukuk', 'Equity', 'ETF', 'Covered Bond'];
  const currencies = ['BHD', 'USD', 'EUR', 'GBP'];
  const statuses = ['Active', 'Suspended', 'Matured', 'Pending'];
  const sectors = ['Government', 'Financial', 'Energy', 'Real Estate', 'Technology'];
  
  return Array.from({ length: 150 }, (_, i) => {
    const issueDate = new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityYears = Math.floor(Math.random() * 25) + 1; // 1-25 years
    const maturityDate = new Date(issueDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + maturityYears);
    
    const issuanceAmount = Math.floor(Math.random() * 1000000000) + 10000000; // 10M to 1.01B
    const outstandingAmount = Math.floor(issuanceAmount * (0.5 + Math.random() * 0.5)); // 50-100% of issuance
    
    return {
      id: `INST-${String(i + 1).padStart(4, '0')}`,
      instrumentName: `${instrumentTypes[i % instrumentTypes.length]} ${String.fromCharCode(65 + (i % 26))}`,
      instrumentType: instrumentTypes[i % instrumentTypes.length],
      isin: `BH${String(i + 1).padStart(8, '0')}${Math.floor(Math.random() * 10)}`,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      status: statuses[Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 3) + 1],
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      issuer: `Issuer ${String.fromCharCode(65 + (i % 20))} Ltd`,
      issuanceAmount: issuanceAmount,
      outstandingAmount: outstandingAmount,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      couponRate: parseFloat((0.5 + Math.random() * 7).toFixed(3)), // 0.5% to 7.5%
      currentPrice: Math.floor(90 + Math.random() * 20), // 90-110% of par
      holders: Math.floor(Math.random() * 5000) + 50,
      tradingVolume: Math.floor(Math.random() * 10000000), // Daily trading volume
      lastTraded: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Last 30 days
    };
  });
};

const getInstrumentsSummaryStats = (data: any[]) => {
  const totalInstruments = data.length;
  const activeInstruments = data.filter(i => i.status === 'Active').length;
  const totalOutstanding = data.reduce((sum, i) => sum + i.outstandingAmount, 0);
  const totalTradingVolume = data.reduce((sum, i) => sum + i.tradingVolume, 0);
  
  // Instrument type distribution
  const typeStats = data.reduce((acc, i) => {
    acc[i.instrumentType] = (acc[i.instrumentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Currency distribution
  const currencyStats = data.reduce((acc, i) => {
    acc[i.currency] = (acc[i.currency] || 0) + i.outstandingAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Sector distribution
  const sectorStats = data.reduce((acc, i) => {
    acc[i.sector] = (acc[i.sector] || 0) + i.outstandingAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Maturity profile
  const currentYear = new Date().getFullYear();
  const maturityProfile = data.reduce((acc, i) => {
    const maturityYear = new Date(i.maturityDate).getFullYear();
    const yearBucket = maturityYear <= currentYear + 2 ? '0-2Y' : 
                      maturityYear <= currentYear + 5 ? '2-5Y' :
                      maturityYear <= currentYear + 10 ? '5-10Y' : '10Y+';
    acc[yearBucket] = (acc[yearBucket] || 0) + i.outstandingAmount;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalInstruments,
    activeInstruments,
    totalOutstanding,
    totalTradingVolume,
    typeStats,
    currencyStats,
    sectorStats,
    maturityProfile
  };
};

const instrumentsSummaryConfig = {
  defaultView: 'visual' as const,
  searchFields: ['instrumentName', 'issuer', 'isin'] as (keyof ReturnType<typeof generateMockInstrumentsSummaryData>[0])[],
  filters: [
    {
      key: 'instrumentType' as keyof ReturnType<typeof generateMockInstrumentsSummaryData>[0],
      label: 'Instrument Type',
      options: ['Government Bond', 'Treasury Bill', 'Corporate Bond', 'Islamic Sukuk', 'Equity', 'ETF', 'Covered Bond']
    },
    {
      key: 'currency' as keyof ReturnType<typeof generateMockInstrumentsSummaryData>[0],
      label: 'Currency',
      options: ['BHD', 'USD', 'EUR', 'GBP']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockInstrumentsSummaryData>[0],
      label: 'Status',
      options: ['Active', 'Suspended', 'Matured', 'Pending']
    }
  ]
};

const instrumentsSummaryMetricsConfig = [
  {
    key: 'totalInstruments',
    title: 'Total Instruments',
    iconName: 'BarChart3',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'totalOutstanding',
    title: 'Total Outstanding Value',
    valueFormatter: (value: number) => `BHD ${(value / 1000000000).toFixed(1)}B`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'activeInstruments',
    title: 'Active Instruments',
    iconName: 'CheckCircle',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'totalTradingVolume',
    title: 'Daily Trading Volume',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
    iconName: 'Activity',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function InstrumentsSummaryPage() {
  const [instrumentsData] = useState(generateMockInstrumentsSummaryData());
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
  } = useDashboardFilters(instrumentsData, instrumentsSummaryConfig);

  const stats = getInstrumentsSummaryStats(filteredData);
  const colors = getChartColors();

  // Instrument Type Distribution Chart
  const typeData = Object.entries(stats.typeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(7)[index]
    }));

  const typeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: typeData
  };

  // Maturity Profile Chart
  const maturityData = Object.entries(stats.maturityProfile)
    .sort(([a], [b]) => {
      const order = ['0-2Y', '2-5Y', '5-10Y', '10Y+'];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map(([maturity, value], index) => ({
      name: maturity,
      value: Math.round((value as number) / 1000000000), // Convert to billions
      color: colors.getBarColors(4)[index]
    }));

  const maturityChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: maturityData
  };

  useEffect(() => {
    document.title = 'Instruments Summary | CBB Portal';
  }, []);

  const columns = [
    { key: 'instrumentName', label: 'Instrument Name', sortable: true },
    { key: 'instrumentType', label: 'Type', sortable: true },
    { key: 'isin', label: 'ISIN', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { 
      key: 'outstandingAmount', 
      label: 'Outstanding', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'couponRate', 
      label: 'Coupon Rate', 
      sortable: true,
      render: (value: number) => `${value.toFixed(3)}%`
    },
    { key: 'sector', label: 'Sector', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'maturityDate', label: 'Maturity Date', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={instrumentsSummaryMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Instrument Type Distribution"
              description="Breakdown of instruments by type"
              data={filteredData}
              chartConfig={typeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Maturity Profile"
              description="Outstanding value by maturity buckets"
              data={filteredData}
              chartConfig={maturityChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Instruments Summary Table */}
          <ConfigurableDashboardSection
            title="Complete Instruments Registry"
            description="Summary of all instruments in the system"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(i => i.status === 'Active').length },
                { name: 'Suspended', value: filteredData.filter(i => i.status === 'Suspended').length },
                { name: 'Matured', value: filteredData.filter(i => i.status === 'Matured').length },
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
            pageKey="instruments-summary"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}