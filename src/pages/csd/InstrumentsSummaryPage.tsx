import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { ConditionalQuickActions } from '@/components/common/ConditionalQuickActions';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, assignColorsToData } from '@/config/chartColors';

// Mock data for all instruments
const generateMockInstrumentData = () => {
  const instrumentTypes = ['Government Bond', 'Treasury Bill', 'Government Sukuk', 'Central Bank Bill', 'Corporate Bond', 'Islamic Sukuk'];
  const statuses = ['Active', 'Matured', 'Pending', 'Cancelled'];
  const currencies = ['BHD', 'USD', 'EUR'];
  
  return Array.from({ length: 150 }, (_, i) => {
    const issueDate = new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityYears = [0.25, 0.5, 1, 2, 3, 5, 7, 10, 15, 20, 30][Math.floor(Math.random() * 11)];
    const maturityDate = new Date(issueDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + Math.floor(maturityYears));
    
    const faceValue = Math.floor(Math.random() * 500000000) + 10000000; // 10M to 510M
    const outstandingValue = Math.floor(faceValue * (0.6 + Math.random() * 0.4));
    
    return {
      id: `INSTR-${String(i + 1).padStart(4, '0')}`,
      instrumentType: instrumentTypes[Math.floor(Math.random() * instrumentTypes.length)],
      faceValue: faceValue,
      outstandingValue: outstandingValue,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      maturityYears: maturityYears,
      yield: parseFloat((1.5 + Math.random() * 6).toFixed(3)), // 1.5% to 7.5%
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      status: statuses[Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 3) + 1],
      issuer: ['Government of Bahrain', 'Central Bank of Bahrain', 'Bahrain Development Bank'][Math.floor(Math.random() * 3)]
    };
  });
};

const getInstrumentStats = (data: any[]) => {
  const totalInstruments = data.length;
  const activeInstruments = data.filter(i => i.status === 'Active').length;
  const totalOutstanding = data.reduce((sum, i) => sum + i.outstandingValue, 0);
  const averageYield = data.filter(i => i.status === 'Active').reduce((sum, i) => sum + i.yield, 0) / activeInstruments;
  
  // Type distribution
  const typeStats = data.reduce((acc, i) => {
    acc[i.instrumentType] = (acc[i.instrumentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Maturity buckets
  const maturityStats = data.reduce((acc, i) => {
    const years = i.maturityYears;
    let bucket = 'Long-term (>5Y)';
    if (years <= 1) bucket = 'Short-term (≤1Y)';
    else if (years <= 5) bucket = 'Medium-term (1-5Y)';
    
    acc[bucket] = (acc[bucket] || 0) + i.outstandingValue;
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
    totalOutstanding,
    averageYield,
    typeStats,
    maturityStats,
    statusStats
  };
};

const instrumentConfig = {
  defaultView: 'visual' as const,
  searchFields: ['id', 'instrumentType', 'issuer'] as (keyof ReturnType<typeof generateMockInstrumentData>[0])[],
  filters: [
    {
      key: 'instrumentType' as keyof ReturnType<typeof generateMockInstrumentData>[0],
      label: 'Instrument Type',
      options: ['Government Bond', 'Treasury Bill', 'Government Sukuk', 'Central Bank Bill', 'Corporate Bond', 'Islamic Sukuk']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockInstrumentData>[0],
      label: 'Status',
      options: ['Active', 'Matured', 'Pending', 'Cancelled']
    },
    {
      key: 'currency' as keyof ReturnType<typeof generateMockInstrumentData>[0],
      label: 'Currency',
      options: ['BHD', 'USD', 'EUR']
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
    key: 'totalOutstanding',
    title: 'Total Outstanding Value',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
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
    key: 'averageYield',
    title: 'Average Yield',
    valueFormatter: (value: number) => `${value.toFixed(2)}%`,
    iconName: 'Target',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function InstrumentsSummaryPage() {
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

  // Instrument Type Distribution
  const typeData = Object.entries(stats.typeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(6)[index]
    }));

  const typeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: typeData
  };

  // Maturity Profile
  const maturityData = Object.entries(stats.maturityStats)
    .map(([bucket, value], index) => ({
      name: bucket,
      value: Math.round((value as number) / 1000000), // Convert to millions
      color: colors.getBarColors(3)[index]
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
    { key: 'id', label: 'Instrument ID', sortable: true },
    { key: 'instrumentType', label: 'Type', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { 
      key: 'outstandingValue', 
      label: 'Outstanding Value', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'yield', 
      label: 'Yield', 
      sortable: true,
      render: (value: number) => `${value.toFixed(3)}%`
    },
    { key: 'maturityDate', label: 'Maturity Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        {/* Top Metrics Cards */}
        <MetricCardsSection
          metricsConfig={instrumentMetricsConfig}
          data={filteredData}
          stats={stats}
          onMetricClick={applyFilterAndSwitchView}
        />

        {/* Dashboard Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConfigurableDashboardSection
            title="Instrument Type Distribution"
            description="Instruments breakdown by type"
            data={filteredData}
            chartConfig={typeChartConfig}
            defaultView="visual"
            showViewSwitcher={false}
            titleFontSize="text-lg font-semibold"
            pieChartSize="medium"
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

        {/* Instruments Registry Table */}
        <ConfigurableDashboardSection
          title="Instruments Registry"
          description="Complete registry of all instruments"
          data={filteredData}
          tableColumns={columns}
          chartConfig={{
            type: 'bar' as const,
            title: '',
            height: 400,
            data: assignColorsToData([
              { name: 'Active', value: filteredData.filter(i => i.status === 'Active').length },
              { name: 'Matured', value: filteredData.filter(i => i.status === 'Matured').length },
              { name: 'Pending', value: filteredData.filter(i => i.status === 'Pending').length },
              { name: 'Cancelled', value: filteredData.filter(i => i.status === 'Cancelled').length }
            ])
          }}
          defaultView={viewMode}
          onChartClick={applyFilterAndSwitchView}
          showViewSwitcher={true}
          titleFontSize="text-lg font-semibold"
        />
      </div>

      {/* Quick Actions Sidebar */}
      <div className="w-64">
        <ConditionalQuickActions 
          pageKey="instruments-summary"
          systemType="csd"
        />
      </div>
    </div>
  );
}