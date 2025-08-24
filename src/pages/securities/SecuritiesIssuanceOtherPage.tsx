import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Other Securities Issuance
const generateMockOtherSecuritiesData = () => {
  const securityTypes = ['Corporate Bond', 'Municipal Bond', 'Asset-Backed Security', 'Covered Bond', 'Convertible Bond'];
  const issuers = ['Bahrain Petroleum Company', 'Gulf Air', 'Aluminum Bahrain', 'Kingdom of Bahrain', 'Mumtalakat'];
  const statuses = ['Active', 'Matured', 'Defaulted', 'Pending'];
  const currencies = ['BHD', 'USD', 'EUR'];
  
  return Array.from({ length: 70 }, (_, i) => {
    const issueDate = new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityYears = Math.floor(Math.random() * 20) + 1; // 1-20 years
    const maturityDate = new Date(issueDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + maturityYears);
    
    const issuanceAmount = Math.floor(Math.random() * 300000000) + 20000000; // 20M to 320M
    const outstandingAmount = Math.floor(issuanceAmount * (0.6 + Math.random() * 0.4)); // 60-100% of issuance
    
    return {
      id: `OTHER-${String(i + 1).padStart(4, '0')}`,
      securityType: securityTypes[Math.floor(Math.random() * securityTypes.length)],
      issuer: issuers[Math.floor(Math.random() * issuers.length)],
      issuanceAmount: issuanceAmount,
      outstandingAmount: outstandingAmount,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      status: statuses[Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 3) + 1],
      couponRate: parseFloat((1.0 + Math.random() * 6).toFixed(3)), // 1.0% to 7.0%
      frequency: ['Annual', 'Semi-Annual', 'Quarterly'][Math.floor(Math.random() * 3)],
      minDenomination: [1000, 5000, 10000, 50000][Math.floor(Math.random() * 4)],
      creditRating: ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'BBB+'][Math.floor(Math.random() * 7)],
      sector: ['Energy', 'Transportation', 'Real Estate', 'Government', 'Investment'][i % 5],
      listingStatus: ['Listed', 'Unlisted', 'Private'][Math.floor(Math.random() * 3)]
    };
  });
};

const getOtherSecuritiesStats = (data: any[]) => {
  const totalSecurities = data.length;
  const activeSecurities = data.filter(s => s.status === 'Active').length;
  const totalOutstanding = data.reduce((sum, s) => sum + s.outstandingAmount, 0);
  const averageCoupon = data.filter(s => s.status === 'Active').reduce((sum, s) => sum + s.couponRate, 0) / activeSecurities;
  
  // Security type distribution
  const typeStats = data.reduce((acc, s) => {
    acc[s.securityType] = (acc[s.securityType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sector distribution
  const sectorStats = data.reduce((acc, s) => {
    acc[s.sector] = (acc[s.sector] || 0) + s.outstandingAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Currency distribution
  const currencyStats = data.reduce((acc, s) => {
    acc[s.currency] = (acc[s.currency] || 0) + s.outstandingAmount;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalSecurities,
    activeSecurities,
    totalOutstanding,
    averageCoupon,
    typeStats,
    sectorStats,
    currencyStats
  };
};

const otherSecuritiesConfig = {
  defaultView: 'visual' as const,
  searchFields: ['issuer', 'securityType', 'sector'] as (keyof ReturnType<typeof generateMockOtherSecuritiesData>[0])[],
  filters: [
    {
      key: 'securityType' as keyof ReturnType<typeof generateMockOtherSecuritiesData>[0],
      label: 'Security Type',
      options: ['Corporate Bond', 'Municipal Bond', 'Asset-Backed Security', 'Covered Bond', 'Convertible Bond']
    },
    {
      key: 'sector' as keyof ReturnType<typeof generateMockOtherSecuritiesData>[0],
      label: 'Sector',
      options: ['Energy', 'Transportation', 'Real Estate', 'Government', 'Investment']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockOtherSecuritiesData>[0],
      label: 'Status',
      options: ['Active', 'Matured', 'Defaulted', 'Pending']
    }
  ]
};

const otherSecuritiesMetricsConfig = [
  {
    key: 'totalSecurities',
    title: 'Total Other Securities',
    iconName: 'Layers',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'totalOutstanding',
    title: 'Total Outstanding',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'activeSecurities',
    title: 'Active Securities',
    iconName: 'CheckCircle',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'averageCoupon',
    title: 'Average Coupon',
    valueFormatter: (value: number) => `${value.toFixed(2)}%`,
    iconName: 'Target',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function SecuritiesIssuanceOtherPage() {
  const [otherSecurities] = useState(generateMockOtherSecuritiesData());
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
  } = useDashboardFilters(otherSecurities, otherSecuritiesConfig);

  const stats = getOtherSecuritiesStats(filteredData);
  const colors = getChartColors();

  // Security Type Distribution Chart
  const typeData = Object.entries(stats.typeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(5)[index]
    }));

  const typeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: typeData
  };

  // Sector Distribution Chart
  const sectorData = Object.entries(stats.sectorStats)
    .map(([sector, value], index) => ({
      name: sector,
      value: Math.round((value as number) / 1000000), // Convert to millions
      color: colors.getBarColors(5)[index]
    }));

  const sectorChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: sectorData
  };

  useEffect(() => {
    document.title = 'Securities Issuance Other | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Security ID', sortable: true },
    { key: 'securityType', label: 'Type', sortable: true },
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
    { key: 'creditRating', label: 'Rating', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={otherSecuritiesMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Security Type Distribution"
              description="Other securities breakdown by type"
              data={filteredData}
              chartConfig={typeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
              pieChartSize="medium"
            />

            <ConfigurableDashboardSection
              title="Sector Outstanding Value"
              description="Outstanding amount by sector"
              data={filteredData}
              chartConfig={sectorChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Other Securities Registry Table */}
          <ConfigurableDashboardSection
            title="Other Securities Registry"
            description="Complete registry of other securities issuances"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(s => s.status === 'Active').length },
                { name: 'Matured', value: filteredData.filter(s => s.status === 'Matured').length },
                { name: 'Defaulted', value: filteredData.filter(s => s.status === 'Defaulted').length },
                { name: 'Pending', value: filteredData.filter(s => s.status === 'Pending').length }
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
            pageKey="securities-issuance-other"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}
