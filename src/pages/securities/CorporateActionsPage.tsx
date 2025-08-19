import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Corporate Actions
const generateMockCorporateActionsData = () => {
  const securities = ['AAPL', 'GOOGL', 'TSLA', 'MSFT', 'META', 'AMZN', 'NFLX', 'NVDA', 'BOND1', 'BOND2'];
  const issuers = ['Apple Inc.', 'Alphabet Inc.', 'Tesla Inc.', 'Microsoft Corp.', 'Meta Platforms', 'Amazon.com', 'Netflix Inc.', 'NVIDIA Corp.', 'Corporate Bond A', 'Corporate Bond B'];
  const eventTypes = ['Dividend', 'Stock Split', 'Rights Issue', 'Merger', 'Coupon', 'Redemption'];
  const statuses = ['Pending', 'Processed', 'Announced', 'Cancelled'];
  
  return Array.from({ length: 75 }, (_, i) => {
    const security = securities[i % securities.length];
    const issuer = issuers[i % issuers.length];
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const eventDate = new Date(Date.now() + (Math.random() - 0.5) * 365 * 24 * 60 * 60 * 1000); // ±6 months from now
    
    let amount = null;
    let ratio = null;
    let details = null;
    
    if (eventType === 'Dividend' || eventType === 'Coupon') {
      amount = `BHD ${(Math.random() * 2 + 0.1).toFixed(2)}`;
    } else if (eventType === 'Stock Split' || eventType === 'Rights Issue') {
      const ratioA = Math.floor(Math.random() * 20) + 1;
      const ratioB = Math.floor(Math.random() * 10) + 1;
      ratio = `${ratioA}:${ratioB}`;
    } else if (eventType === 'Merger') {
      details = ['Acquisition', 'Merger', 'Spin-off'][Math.floor(Math.random() * 3)];
    } else if (eventType === 'Redemption') {
      amount = `BHD ${(Math.random() * 1000 + 100).toFixed(0)}`;
    }
    
    return {
      id: `CA-${String(i + 1).padStart(4, '0')}`,
      security: security,
      eventType: eventType,
      issuer: issuer,
      eventDate: eventDate.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      amount: amount,
      ratio: ratio,
      details: details,
      recordDate: new Date(eventDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days before
      paymentDate: new Date(eventDate.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days after
      impactedHolders: Math.floor(Math.random() * 10000) + 100
    };
  });
};

const getCorporateActionsStats = (data: any[]) => {
  const totalActions = data.length;
  const pendingActions = data.filter(a => a.status === 'Pending').length;
  const processedActions = data.filter(a => a.status === 'Processed').length;
  const totalImpactedHolders = data.reduce((sum, a) => sum + a.impactedHolders, 0);
  
  // Event type distribution
  const eventTypeStats = data.reduce((acc, a) => {
    acc[a.eventType] = (acc[a.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Status distribution
  const statusStats = data.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Monthly distribution
  const monthlyStats = data.reduce((acc, a) => {
    const month = new Date(a.eventDate).toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalActions,
    pendingActions,
    processedActions,
    totalImpactedHolders,
    eventTypeStats,
    statusStats,
    monthlyStats
  };
};

const corporateActionsConfig = {
  defaultView: 'visual' as const,
  searchFields: ['security', 'issuer', 'eventType'] as (keyof ReturnType<typeof generateMockCorporateActionsData>[0])[],
  filters: [
    {
      key: 'eventType' as keyof ReturnType<typeof generateMockCorporateActionsData>[0],
      label: 'Event Type',
      options: ['Dividend', 'Stock Split', 'Rights Issue', 'Merger', 'Coupon', 'Redemption']
    },
    {
      key: 'status' as keyof ReturnType<typeof generateMockCorporateActionsData>[0],
      label: 'Status',
      options: ['Pending', 'Processed', 'Announced', 'Cancelled']
    }
  ]
};

const corporateActionsMetricsConfig = [
  {
    key: 'totalActions',
    title: 'Total Corporate Actions',
    iconName: 'FileText',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'pendingActions',
    title: 'Pending Actions',
    iconName: 'Clock',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  },
  {
    key: 'processedActions',
    title: 'Processed Actions',
    iconName: 'CheckCircle',
    iconColor: 'text-green-600',
    textColor: 'text-green-600'
  },
  {
    key: 'totalImpactedHolders',
    title: 'Total Impacted Holders',
    valueFormatter: (value: number) => value.toLocaleString(),
    iconName: 'Users',
    iconColor: 'text-purple-600',
    textColor: 'text-purple-600'
  }
];

export default function CorporateActionsPage() {
  const [corporateActions] = useState(generateMockCorporateActionsData());
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
  } = useDashboardFilters(corporateActions, corporateActionsConfig);

  const stats = getCorporateActionsStats(filteredData);
  const colors = getChartColors();

  // Event Type Distribution Chart
  const eventTypeData = Object.entries(stats.eventTypeStats)
    .map(([type, count], index) => ({
      name: type,
      value: count as number,
      color: colors.getPieColors(6)[index]
    }));

  const eventTypeChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: eventTypeData
  };

  // Monthly Distribution Chart
  const monthlyData = Object.entries(stats.monthlyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 6)
    .map(([month, count], index) => ({
      name: month,
      value: count as number,
      color: colors.getBarColors(6)[index]
    }));

  const monthlyChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: monthlyData
  };

  useEffect(() => {
    document.title = 'Corporate Actions | CBB Portal';
  }, []);

  const columns = [
    { key: 'security', label: 'Security', sortable: true },
    { key: 'eventType', label: 'Event Type', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { key: 'eventDate', label: 'Event Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'details', 
      label: 'Details', 
      sortable: false,
      render: (value: any, row: any) => row.amount || row.ratio || row.details || '-'
    },
    { key: 'recordDate', label: 'Record Date', sortable: true },
    { 
      key: 'impactedHolders', 
      label: 'Impacted Holders', 
      sortable: true,
      render: (value: number) => value.toLocaleString()
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={corporateActionsMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Event Type Distribution"
              description="Breakdown of corporate actions by event type"
              data={filteredData}
              chartConfig={eventTypeChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Monthly Action Timeline"
              description="Corporate actions scheduled by month"
              data={filteredData}
              chartConfig={monthlyChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Corporate Actions Table */}
          <ConfigurableDashboardSection
            title="Corporate Actions Registry"
            description="Complete registry of corporate actions and events"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Pending', value: filteredData.filter(a => a.status === 'Pending').length },
                { name: 'Processed', value: filteredData.filter(a => a.status === 'Processed').length },
                { name: 'Announced', value: filteredData.filter(a => a.status === 'Announced').length },
                { name: 'Cancelled', value: filteredData.filter(a => a.status === 'Cancelled').length }
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
            pageKey="corporate-actions"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}