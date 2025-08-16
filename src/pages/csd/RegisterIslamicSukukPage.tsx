import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';
import portalConfig from '@/config/portalConfig';

// Mock data for Islamic Sukuk
const generateMockSukukData = () => {
  const issuers = [
    'Government of Bahrain', 'Bahrain Development Bank', 'Gulf Finance House',
    'Arcapita Bank', 'Al Baraka Banking Group', 'Ithmaar Bank',
    'National Bank of Bahrain', 'Bahrain Islamic Bank', 'Al Salam Bank'
  ];
  
  const investorTypes = ['Banks', 'Islamic Funds', 'Pension Funds', 'Retail'];
  const sukukTypes = ['Ijara', 'Murabaha', 'Musharaka', 'Wakala', 'Mudaraba'];
  
  return Array.from({ length: 85 }, (_, i) => {
    const issuer = issuers[i % issuers.length];
    const issueDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const tenor = [1, 2, 3, 5, 7, 10, 15][Math.floor(Math.random() * 7)];
    const maturityDate = new Date(issueDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + tenor);
    
    const issuanceValue = Math.floor(Math.random() * 500000000) + 10000000; // 10M to 510M
    const outstandingValue = Math.floor(issuanceValue * (0.6 + Math.random() * 0.4)); // 60-100% of issuance
    
    return {
      id: `SUKUK-${String(i + 1).padStart(4, '0')}`,
      issuer: issuer,
      sukukType: sukukTypes[Math.floor(Math.random() * sukukTypes.length)],
      issuanceValue: issuanceValue,
      outstandingValue: outstandingValue,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      tenor: tenor,
      profit_rate: 3.5 + Math.random() * 4, // 3.5% to 7.5%
      currency: i < 60 ? 'BHD' : ['USD', 'EUR'][Math.floor(Math.random() * 2)],
      status: ['Active', 'Matured', 'Called'][Math.floor(Math.random() * 10) < 8 ? 0 : Math.floor(Math.random() * 2) + 1],
      investorDistribution: {
        Banks: Math.floor(Math.random() * 40) + 10,
        'Islamic Funds': Math.floor(Math.random() * 35) + 15,
        'Pension Funds': Math.floor(Math.random() * 30) + 10,
        Retail: Math.floor(Math.random() * 25) + 5
      }
    };
  });
};

const getSukukStats = (data: any[]) => {
  const activeSukuk = data.filter(s => s.status === 'Active');
  const totalIssued = data.length;
  const outstandingValue = activeSukuk.reduce((sum, s) => sum + s.outstandingValue, 0);
  const activeIssuers = new Set(activeSukuk.map(s => s.issuer)).size;
  
  const currentYear = new Date().getFullYear();
  const maturityThisYear = activeSukuk
    .filter(s => new Date(s.maturityDate).getFullYear() === currentYear)
    .reduce((sum, s) => sum + s.outstandingValue, 0);
  
  // Calculate weighted average tenor
  const totalOutstanding = activeSukuk.reduce((sum, s) => sum + s.outstandingValue, 0);
  const weightedTenorSum = activeSukuk.reduce((sum, s) => sum + (s.tenor * s.outstandingValue), 0);
  const averageTenor = totalOutstanding > 0 ? weightedTenorSum / totalOutstanding : 0;
  
  // Issuer concentration
  const issuerStats = activeSukuk.reduce((acc, s) => {
    acc[s.issuer] = (acc[s.issuer] || 0) + s.outstandingValue;
    return acc;
  }, {} as Record<string, number>);
  
  // Maturity profile by year
  const maturityProfile = activeSukuk.reduce((acc, s) => {
    const year = new Date(s.maturityDate).getFullYear();
    acc[year] = (acc[year] || 0) + s.outstandingValue;
    return acc;
  }, {} as Record<number, number>);
  
  // Investor base aggregation
  const investorBase = activeSukuk.reduce((acc, s) => {
    Object.entries(s.investorDistribution).forEach(([type, percentage]) => {
      acc[type] = (acc[type] || 0) + (s.outstandingValue * (percentage as number) / 100);
    });
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalIssued,
    outstandingValue,
    activeIssuers,
    maturityThisYear,
    averageTenor,
    issuerStats,
    maturityProfile,
    investorBase
  };
};

const sukukConfig = {
  defaultView: 'visual' as const,
  searchFields: ['issuer', 'sukukType', 'id'] as (keyof ReturnType<typeof generateMockSukukData>[0])[],
  filters: [
    {
      key: 'issuer' as keyof ReturnType<typeof generateMockSukukData>[0],
      label: 'Issuer',
      options: ['Government of Bahrain', 'Bahrain Development Bank', 'Gulf Finance House', 'Arcapita Bank']
    },
    {
      key: 'sukukType' as keyof ReturnType<typeof generateMockSukukData>[0],
      label: 'Sukuk Type',
      options: ['Ijara', 'Murabaha', 'Musharaka', 'Wakala', 'Mudaraba']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockSukukData>[0],
      label: 'Status',
      options: ['Active', 'Matured', 'Called']
    }
  ]
};

const sukukMetricsConfig = [
  {
    key: 'totalIssued',
    title: 'Total Sukuk Issued',
    iconName: 'FileText',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'outstandingValue',
    title: 'Outstanding Sukuk Value',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'activeIssuers',
    title: 'Active Issuers',
    iconName: 'Building2',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'maturityThisYear',
    title: 'Maturity Due This Year',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
    iconName: 'Calendar',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  },
  {
    key: 'averageTenor',
    title: 'Average Tenor',
    valueFormatter: (value: number) => `${value.toFixed(1)} years`,
    iconName: 'Clock',
    iconColor: 'text-indigo-600',
    textColor: 'text-indigo-600'
  }
];

export default function RegisterIslamicSukukPage() {
  const [sukuk] = useState(generateMockSukukData());
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
  } = useDashboardFilters(sukuk, sukukConfig);

  const stats = getSukukStats(filteredData);
  const colors = getChartColors();

  // Issuer Concentration Chart
  const issuerData = Object.entries(stats.issuerStats)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 6)
    .map(([issuer, value], index) => ({
      name: issuer,
      value: Math.round((value as number) / 1000000), // Convert to millions
      color: colors.getPieColors(6)[index]
    }));

  const issuerChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: issuerData
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

  // Investor Base Chart
  const investorData = Object.entries(stats.investorBase)
    .map(([type, value], index) => ({
      name: type,
      value: Math.round((value as number) / 1000000), // Convert to millions
      color: colors.getBarColors(4)[index]
    }));

  const investorChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: investorData
  };

  useEffect(() => {
    document.title = 'Register Islamic Sukuk | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Sukuk ID', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { key: 'sukukType', label: 'Sukuk Type', sortable: true },
    { 
      key: 'outstandingValue', 
      label: 'Outstanding Value', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'profit_rate', 
      label: 'Profit Rate', 
      sortable: true,
      render: (value: number) => `${value.toFixed(2)}%`
    },
    { key: 'maturityDate', label: 'Maturity Date', sortable: true },
    { 
      key: 'tenor', 
      label: 'Tenor', 
      sortable: true,
      render: (value: number) => `${value} years`
    },
    { key: 'status', label: 'Status', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={sukukMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Maturity Profile Dashboard"
              description="Outstanding Sukuk value by maturity year"
              data={filteredData}
              chartConfig={maturityChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Investor Base Dashboard"
              description="Holdings distribution by investor type"
              data={filteredData}
              chartConfig={investorChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Sukuk Registry Table */}
          <ConfigurableDashboardSection
            title="Islamic Sukuk Registry"
            description="Complete registry of issued Islamic Sukuk instruments"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(s => s.status === 'Active').length },
                { name: 'Matured', value: filteredData.filter(s => s.status === 'Matured').length },
                { name: 'Called', value: filteredData.filter(s => s.status === 'Called').length }
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
            pageKey="islamic-sukuk"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}