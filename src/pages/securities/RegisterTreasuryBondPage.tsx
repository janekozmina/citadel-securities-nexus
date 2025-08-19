import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Treasury Bonds
const generateMockTreasuryBondData = () => {
  const maturities = ['2Y', '3Y', '5Y', '7Y', '10Y', '15Y', '20Y', '30Y'];
  const statuses = ['Active', 'Matured', 'Called', 'Pending'];
  const bondTypes = ['Fixed Rate', 'Floating Rate', 'Zero Coupon', 'Inflation Linked'];
  
  return Array.from({ length: 75 }, (_, i) => {
    const issueDate = new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityYears = [2, 3, 5, 7, 10, 15, 20, 30][Math.floor(Math.random() * 8)];
    const maturityDate = new Date(issueDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + maturityYears);
    
    const faceValue = Math.floor(Math.random() * 200000000) + 50000000; // 50M to 250M BHD
    const couponRate = parseFloat((2.0 + Math.random() * 4).toFixed(3)); // 2.0% to 6.0%
    const currentPrice = faceValue * (0.95 + Math.random() * 0.1); // 95-105% of face value
    
    return {
      id: `BOND-${String(i + 1).padStart(4, '0')}`,
      bondType: bondTypes[Math.floor(Math.random() * bondTypes.length)],
      faceValue: faceValue,
      currentPrice: Math.floor(currentPrice),
      couponRate: couponRate,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      maturity: maturities[Math.floor(Math.log2(maturityYears))],
      currency: 'BHD',
      status: statuses[Math.floor(Math.random() * 10) < 7 ? 0 : Math.floor(Math.random() * 3) + 1],
      paymentFrequency: ['Semi-Annual', 'Annual', 'Quarterly'][Math.floor(Math.random() * 3)],
      minimumDenomination: [10000, 50000, 100000][Math.floor(Math.random() * 3)],
      outstandingAmount: Math.floor(faceValue * (0.8 + Math.random() * 0.2)),
      yieldToMaturity: parseFloat((couponRate + (Math.random() - 0.5) * 1).toFixed(3)),
      creditRating: ['AAA', 'AA+', 'AA', 'AA-'][Math.floor(Math.random() * 4)]
    };
  });
};

const getTreasuryBondStats = (data: any[]) => {
  const totalBonds = data.length;
  const activeBonds = data.filter(b => b.status === 'Active').length;
  const totalOutstanding = data.reduce((sum, b) => sum + b.outstandingAmount, 0);
  const averageCoupon = data.filter(b => b.status === 'Active').reduce((sum, b) => sum + b.couponRate, 0) / activeBonds;
  
  // Bond type distribution
  const typeStats = data.reduce((acc, b) => {
    acc[b.bondType] = (acc[b.bondType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Maturity distribution
  const maturityStats = data.reduce((acc, b) => {
    acc[b.maturity] = (acc[b.maturity] || 0) + b.outstandingAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Credit rating distribution
  const ratingStats = data.reduce((acc, b) => {
    acc[b.creditRating] = (acc[b.creditRating] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalBonds,
    activeBonds,
    totalOutstanding,
    averageCoupon,
    typeStats,
    maturityStats,
    ratingStats
  };
};

const treasuryBondConfig = {
  defaultView: 'visual' as const,
  searchFields: ['id', 'bondType', 'maturity'] as (keyof ReturnType<typeof generateMockTreasuryBondData>[0])[],
  filters: [
    {
      key: 'bondType' as keyof ReturnType<typeof generateMockTreasuryBondData>[0],
      label: 'Bond Type',
      options: ['Fixed Rate', 'Floating Rate', 'Zero Coupon', 'Inflation Linked']
    },
    {
      key: 'maturity' as keyof ReturnType<typeof generateMockTreasuryBondData>[0],
      label: 'Maturity',
      options: ['2Y', '3Y', '5Y', '7Y', '10Y', '15Y', '20Y', '30Y']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockTreasuryBondData>[0],
      label: 'Status',
      options: ['Active', 'Matured', 'Called', 'Pending']
    }
  ]
};

const treasuryBondMetricsConfig = [
  {
    key: 'totalBonds',
    title: 'Total Treasury Bonds',
    iconName: 'Award',
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
    key: 'activeBonds',
    title: 'Active Bonds',
    iconName: 'CheckCircle',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'averageCoupon',
    title: 'Average Coupon Rate',
    valueFormatter: (value: number) => `${value.toFixed(2)}%`,
    iconName: 'Target',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function RegisterTreasuryBondPage() {
  const [treasuryBonds] = useState(generateMockTreasuryBondData());
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
  } = useDashboardFilters(treasuryBonds, treasuryBondConfig);

  const stats = getTreasuryBondStats(filteredData);
  const colors = getChartColors();

  // Bond Type Distribution Chart
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
      const order = ['2Y', '3Y', '5Y', '7Y', '10Y', '15Y', '20Y', '30Y'];
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
    document.title = 'Register Treasury Bond | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Bond ID', sortable: true },
    { key: 'bondType', label: 'Type', sortable: true },
    { 
      key: 'outstandingAmount', 
      label: 'Outstanding', 
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
    { key: 'creditRating', label: 'Rating', sortable: true },
    { key: 'issueDate', label: 'Issue Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={treasuryBondMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Bond Type Distribution"
              description="Treasury bonds breakdown by type"
              data={filteredData}
              chartConfig={typeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Maturity Profile"
              description="Outstanding amount by maturity period"
              data={filteredData}
              chartConfig={maturityChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Treasury Bonds Registry Table */}
          <ConfigurableDashboardSection
            title="Treasury Bonds Registry"
            description="Complete registry of treasury bond issuances"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(b => b.status === 'Active').length },
                { name: 'Matured', value: filteredData.filter(b => b.status === 'Matured').length },
                { name: 'Called', value: filteredData.filter(b => b.status === 'Called').length },
                { name: 'Pending', value: filteredData.filter(b => b.status === 'Pending').length }
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
            pageKey="register-treasury-bond"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}