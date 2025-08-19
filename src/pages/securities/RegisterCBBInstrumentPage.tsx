import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for CBB Instruments
const generateMockCBBInstrumentData = () => {
  const instrumentTypes = ['Government Bond', 'Treasury Bill', 'Government Sukuk', 'Central Bank Bill'];
  const maturities = ['3M', '6M', '1Y', '2Y', '3Y', '5Y', '7Y', '10Y'];
  const statuses = ['Active', 'Matured', 'Pending', 'Cancelled'];
  
  return Array.from({ length: 95 }, (_, i) => {
    const issueDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityMonths = [3, 6, 12, 24, 36, 60, 84, 120][Math.floor(Math.random() * 8)];
    const maturityDate = new Date(issueDate);
    maturityDate.setMonth(maturityDate.getMonth() + maturityMonths);
    
    const issuanceValue = Math.floor(Math.random() * 500000000) + 10000000; // 10M to 510M BHD
    const outstandingValue = Math.floor(issuanceValue * (0.7 + Math.random() * 0.3)); // 70-100% of issuance
    
    return {
      id: `CBB-${String(i + 1).padStart(4, '0')}`,
      instrumentType: instrumentTypes[Math.floor(Math.random() * instrumentTypes.length)],
      issuanceValue: issuanceValue,
      outstandingValue: outstandingValue,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      maturity: maturities[Math.floor(maturityMonths / 15)],
      couponRate: parseFloat((1.5 + Math.random() * 4).toFixed(3)), // 1.5% to 5.5%
      currency: 'BHD',
      status: statuses[Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 3) + 1],
      minimumDenomination: [1000, 5000, 10000, 50000][Math.floor(Math.random() * 4)],
      currentYield: parseFloat((2.0 + Math.random() * 3).toFixed(3)),
      settlementDate: new Date(issueDate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  });
};

const getCBBInstrumentStats = (data: any[]) => {
  const totalInstruments = data.length;
  const activeInstruments = data.filter(i => i.status === 'Active').length;
  const totalOutstanding = data.reduce((sum, i) => sum + i.outstandingValue, 0);
  const averageYield = data.filter(i => i.status === 'Active').reduce((sum, i) => sum + i.currentYield, 0) / activeInstruments;
  
  // Instrument type distribution
  const typeStats = data.reduce((acc, i) => {
    acc[i.instrumentType] = (acc[i.instrumentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Maturity profile
  const maturityStats = data.reduce((acc, i) => {
    acc[i.maturity] = (acc[i.maturity] || 0) + i.outstandingValue;
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

const cbbInstrumentConfig = {
  defaultView: 'visual' as const,
  searchFields: ['id', 'instrumentType', 'maturity'] as (keyof ReturnType<typeof generateMockCBBInstrumentData>[0])[],
  filters: [
    {
      key: 'instrumentType' as keyof ReturnType<typeof generateMockCBBInstrumentData>[0],
      label: 'Instrument Type',
      options: ['Government Bond', 'Treasury Bill', 'Government Sukuk', 'Central Bank Bill']
    },
    {
      key: 'maturity' as keyof ReturnType<typeof generateMockCBBInstrumentData>[0],
      label: 'Maturity',
      options: ['3M', '6M', '1Y', '2Y', '3Y', '5Y', '7Y', '10Y']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockCBBInstrumentData>[0],
      label: 'Status',
      options: ['Active', 'Matured', 'Pending', 'Cancelled']
    }
  ]
};

const cbbInstrumentMetricsConfig = [
  {
    key: 'totalInstruments',
    title: 'Total CBB Instruments',
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

export default function RegisterCBBInstrumentPage() {
  const [cbbInstruments] = useState(generateMockCBBInstrumentData());
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
  } = useDashboardFilters(cbbInstruments, cbbInstrumentConfig);

  const stats = getCBBInstrumentStats(filteredData);
  const colors = getChartColors();

  // Instrument Type Distribution Chart
  const typeData = Object.entries(stats.typeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(4)[index]
    }));

  const typeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: typeData
  };

  // Maturity Profile Chart
  const maturityData = Object.entries(stats.maturityStats)
    .sort(([a], [b]) => {
      const order = ['3M', '6M', '1Y', '2Y', '3Y', '5Y', '7Y', '10Y'];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map(([maturity, value], index) => ({
      name: maturity,
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
    document.title = 'Register CBB Instrument | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Instrument ID', sortable: true },
    { key: 'instrumentType', label: 'Type', sortable: true },
    { 
      key: 'outstandingValue', 
      label: 'Outstanding Value', 
      sortable: true,
      render: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'couponRate', 
      label: 'Coupon Rate', 
      sortable: true,
      render: (value: number) => `${value.toFixed(3)}%`
    },
    { key: 'maturity', label: 'Maturity', sortable: true },
    { key: 'issueDate', label: 'Issue Date', sortable: true },
    { key: 'maturityDate', label: 'Maturity Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={cbbInstrumentMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Instrument Type Distribution"
              description="CBB instruments breakdown by type"
              data={filteredData}
              chartConfig={typeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Maturity Profile"
              description="Outstanding value by maturity period"
              data={filteredData}
              chartConfig={maturityChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* CBB Instruments Registry Table */}
          <ConfigurableDashboardSection
            title="CBB Instruments Registry"
            description="Complete registry of CBB issued instruments"
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

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="register-cbb-instrument"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}