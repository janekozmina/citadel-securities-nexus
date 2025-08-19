import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Treasury Bills
const generateMockTreasuryBillData = () => {
  const maturities = ['3M', '6M', '9M', '12M'];
  const statuses = ['Active', 'Matured', 'Auctioning', 'Cancelled'];
  const auctionTypes = ['Competitive', 'Non-Competitive', 'Primary Dealer'];
  
  return Array.from({ length: 85 }, (_, i) => {
    const issueDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityMonths = [3, 6, 9, 12][Math.floor(Math.random() * 4)];
    const maturityDate = new Date(issueDate);
    maturityDate.setMonth(maturityDate.getMonth() + maturityMonths);
    
    const faceValue = Math.floor(Math.random() * 100000000) + 10000000; // 10M to 110M BHD
    const discountRate = parseFloat((0.5 + Math.random() * 3).toFixed(3)); // 0.5% to 3.5%
    const issuePrice = faceValue * (1 - (discountRate / 100) * (maturityMonths / 12));
    
    return {
      id: `TB-${String(i + 1).padStart(4, '0')}`,
      faceValue: faceValue,
      issuePrice: Math.floor(issuePrice),
      discountRate: discountRate,
      issueDate: issueDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      maturity: maturities[Math.floor(maturityMonths / 3) - 1],
      currency: 'BHD',
      status: statuses[Math.floor(Math.random() * 10) < 6 ? 0 : Math.floor(Math.random() * 3) + 1],
      auctionType: auctionTypes[Math.floor(Math.random() * auctionTypes.length)],
      minimumBid: [1000, 5000, 10000][Math.floor(Math.random() * 3)],
      totalBids: Math.floor(Math.random() * 500) + 50,
      allottedAmount: Math.floor(faceValue * (0.7 + Math.random() * 0.3)),
      yieldToMaturity: parseFloat((discountRate + Math.random() * 0.5).toFixed(3))
    };
  });
};

const getTreasuryBillStats = (data: any[]) => {
  const totalBills = data.length;
  const activeBills = data.filter(b => b.status === 'Active').length;
  const totalFaceValue = data.reduce((sum, b) => sum + b.faceValue, 0);
  const averageDiscount = data.filter(b => b.status === 'Active').reduce((sum, b) => sum + b.discountRate, 0) / activeBills;
  
  // Maturity distribution
  const maturityStats = data.reduce((acc, b) => {
    acc[b.maturity] = (acc[b.maturity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Auction type distribution
  const auctionStats = data.reduce((acc, b) => {
    acc[b.auctionType] = (acc[b.auctionType] || 0) + b.faceValue;
    return acc;
  }, {} as Record<string, number>);
  
  // Status distribution
  const statusStats = data.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalBills,
    activeBills,
    totalFaceValue,
    averageDiscount,
    maturityStats,
    auctionStats,
    statusStats
  };
};

const treasuryBillConfig = {
  defaultView: 'visual' as const,
  searchFields: ['id', 'maturity', 'auctionType'] as (keyof ReturnType<typeof generateMockTreasuryBillData>[0])[],
  filters: [
    {
      key: 'maturity' as keyof ReturnType<typeof generateMockTreasuryBillData>[0],
      label: 'Maturity',
      options: ['3M', '6M', '9M', '12M']
    },
    {
      key: 'auctionType' as keyof ReturnType<typeof generateMockTreasuryBillData>[0],
      label: 'Auction Type',
      options: ['Competitive', 'Non-Competitive', 'Primary Dealer']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockTreasuryBillData>[0],
      label: 'Status',
      options: ['Active', 'Matured', 'Auctioning', 'Cancelled']
    }
  ]
};

const treasuryBillMetricsConfig = [
  {
    key: 'totalBills',
    title: 'Total Treasury Bills',
    iconName: 'Receipt',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'totalFaceValue',
    title: 'Total Face Value',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'activeBills',
    title: 'Active Bills',
    iconName: 'CheckCircle',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  },
  {
    key: 'averageDiscount',
    title: 'Average Discount Rate',
    valueFormatter: (value: number) => `${value.toFixed(2)}%`,
    iconName: 'Target',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  }
];

export default function RegisterTreasuryBillPage() {
  const [treasuryBills] = useState(generateMockTreasuryBillData());
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
  } = useDashboardFilters(treasuryBills, treasuryBillConfig);

  const stats = getTreasuryBillStats(filteredData);
  const colors = getChartColors();

  // Maturity Distribution Chart
  const maturityData = Object.entries(stats.maturityStats)
    .sort(([a], [b]) => {
      const order = ['3M', '6M', '9M', '12M'];
      return order.indexOf(a) - order.indexOf(b);
    })
    .map(([maturity, count], index) => ({
      name: maturity,
      value: count as number,
      color: colors.getPieColors(4)[index]
    }));

  const maturityChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: maturityData
  };

  // Auction Type Value Chart
  const auctionData = Object.entries(stats.auctionStats)
    .map(([type, value], index) => ({
      name: type,
      value: Math.round((value as number) / 1000000), // Convert to millions
      color: colors.getBarColors(3)[index]
    }));

  const auctionChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: auctionData
  };

  useEffect(() => {
    document.title = 'Register Treasury Bill | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Bill ID', sortable: true },
    { 
      key: 'faceValue', 
      label: 'Face Value', 
      sortable: true,
      render: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'issuePrice', 
      label: 'Issue Price', 
      sortable: true,
      render: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'discountRate', 
      label: 'Discount Rate', 
      sortable: true,
      render: (value: number) => `${value.toFixed(3)}%`
    },
    { key: 'maturity', label: 'Maturity', sortable: true },
    { key: 'auctionType', label: 'Auction Type', sortable: true },
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
            metricsConfig={treasuryBillMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Maturity Distribution"
              description="Treasury bills breakdown by maturity period"
              data={filteredData}
              chartConfig={maturityChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Auction Type Value"
              description="Face value distribution by auction type"
              data={filteredData}
              chartConfig={auctionChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Treasury Bills Registry Table */}
          <ConfigurableDashboardSection
            title="Treasury Bills Registry"
            description="Complete registry of treasury bill issuances"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(b => b.status === 'Active').length },
                { name: 'Matured', value: filteredData.filter(b => b.status === 'Matured').length },
                { name: 'Auctioning', value: filteredData.filter(b => b.status === 'Auctioning').length },
                { name: 'Cancelled', value: filteredData.filter(b => b.status === 'Cancelled').length }
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
            pageKey="register-treasury-bill"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}