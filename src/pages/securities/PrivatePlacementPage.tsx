import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Private Placement
const generateMockPrivatePlacementData = () => {
  const placementTypes = ['Debt Private Placement', 'Equity Private Placement', 'Hybrid Securities', 'Structured Products'];
  const investorTypes = ['Institutional', 'High Net Worth', 'Qualified Investor', 'Accredited Investor'];
  const sectors = ['Financial Services', 'Real Estate', 'Technology', 'Healthcare', 'Energy'];
  const statuses = ['Active', 'Completed', 'Cancelled', 'Under Review'];
  
  return Array.from({ length: 65 }, (_, i) => {
    const placementDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const maturityYears = Math.floor(Math.random() * 10) + 1; // 1-10 years
    const maturityDate = new Date(placementDate);
    maturityDate.setFullYear(maturityDate.getFullYear() + maturityYears);
    
    const targetAmount = Math.floor(Math.random() * 100000000) + 5000000; // 5M to 105M
    const raisedAmount = Math.floor(targetAmount * (0.3 + Math.random() * 0.7)); // 30-100% of target
    
    return {
      id: `PP-${String(i + 1).padStart(4, '0')}`,
      placementType: placementTypes[Math.floor(Math.random() * placementTypes.length)],
      issuer: `Company ${String.fromCharCode(65 + (i % 26))} Ltd`,
      targetAmount: targetAmount,
      raisedAmount: raisedAmount,
      placementDate: placementDate.toISOString().split('T')[0],
      maturityDate: maturityDate.toISOString().split('T')[0],
      currency: ['BHD', 'USD'][Math.floor(Math.random() * 2)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      investorType: investorTypes[Math.floor(Math.random() * investorTypes.length)],
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      minimumInvestment: [100000, 250000, 500000, 1000000][Math.floor(Math.random() * 4)],
      numberOfInvestors: Math.floor(Math.random() * 50) + 5,
      offerPrice: Math.floor(Math.random() * 1000) + 100, // 100-1100 per unit
      yieldRate: parseFloat((3.0 + Math.random() * 5).toFixed(3)), // 3.0% to 8.0%
      lockupPeriod: [6, 12, 24, 36][Math.floor(Math.random() * 4)] // months
    };
  });
};

const getPrivatePlacementStats = (data: any[]) => {
  const totalPlacements = data.length;
  const activePlacements = data.filter(p => p.status === 'Active').length;
  const totalRaised = data.reduce((sum, p) => sum + p.raisedAmount, 0);
  const averageYield = data.filter(p => p.status === 'Active').reduce((sum, p) => sum + p.yieldRate, 0) / activePlacements;
  
  // Placement type distribution
  const typeStats = data.reduce((acc, p) => {
    acc[p.placementType] = (acc[p.placementType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sector distribution
  const sectorStats = data.reduce((acc, p) => {
    acc[p.sector] = (acc[p.sector] || 0) + p.raisedAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Investor type distribution
  const investorStats = data.reduce((acc, p) => {
    acc[p.investorType] = (acc[p.investorType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalPlacements,
    activePlacements,
    totalRaised,
    averageYield,
    typeStats,
    sectorStats,
    investorStats
  };
};

const privatePlacementConfig = {
  defaultView: 'visual' as const,
  searchFields: ['issuer', 'placementType', 'sector'] as (keyof ReturnType<typeof generateMockPrivatePlacementData>[0])[],
  filters: [
    {
      key: 'placementType' as keyof ReturnType<typeof generateMockPrivatePlacementData>[0],
      label: 'Placement Type',
      options: ['Debt Private Placement', 'Equity Private Placement', 'Hybrid Securities', 'Structured Products']
    },
    {
      key: 'sector' as keyof ReturnType<typeof generateMockPrivatePlacementData>[0],
      label: 'Sector',
      options: ['Financial Services', 'Real Estate', 'Technology', 'Healthcare', 'Energy']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockPrivatePlacementData>[0],
      label: 'Status',
      options: ['Active', 'Completed', 'Cancelled', 'Under Review']
    }
  ]
};

const privatePlacementMetricsConfig = [
  {
    key: 'totalPlacements',
    title: 'Total Private Placements',
    iconName: 'UserPlus',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'totalRaised',
    title: 'Total Amount Raised',
    valueFormatter: (value: number) => `BHD ${(value / 1000000).toFixed(1)}M`,
    iconName: 'TrendingUp',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'activePlacements',
    title: 'Active Placements',
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

export default function PrivatePlacementPage() {
  const [privatePlacements] = useState(generateMockPrivatePlacementData());
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
  } = useDashboardFilters(privatePlacements, privatePlacementConfig);

  const stats = getPrivatePlacementStats(filteredData);
  const colors = getChartColors();

  // Placement Type Distribution Chart
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
    document.title = 'Private Placement | CBB Portal';
  }, []);

  const columns = [
    { key: 'id', label: 'Placement ID', sortable: true },
    { key: 'placementType', label: 'Type', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { 
      key: 'raisedAmount', 
      label: 'Amount Raised', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${(value / 1000000).toFixed(1)}M`
    },
    { 
      key: 'yieldRate', 
      label: 'Yield Rate', 
      sortable: true,
      render: (value: number) => `${value.toFixed(3)}%`
    },
    { key: 'sector', label: 'Sector', sortable: true },
    { key: 'investorType', label: 'Investor Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={privatePlacementMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Placement Type Distribution"
              description="Private placements breakdown by type"
              data={filteredData}
              chartConfig={typeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
              pieChartSize="medium"
            />

            <ConfigurableDashboardSection
              title="Sector Amount Raised"
              description="Capital raised by sector"
              data={filteredData}
              chartConfig={sectorChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Private Placement Registry Table */}
          <ConfigurableDashboardSection
            title="Private Placement Registry"
            description="Complete registry of private placement offerings"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(p => p.status === 'Active').length },
                { name: 'Completed', value: filteredData.filter(p => p.status === 'Completed').length },
                { name: 'Cancelled', value: filteredData.filter(p => p.status === 'Cancelled').length },
                { name: 'Under Review', value: filteredData.filter(p => p.status === 'Under Review').length }
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
            pageKey="private-placement"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}