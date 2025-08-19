import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { ConfigurableDashboardSection } from '@/components/common/ConfigurableDashboardSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { getChartColors, chartColorSchemes, assignColorsToData } from '@/config/chartColors';

// Mock data for Status Management
const generateMockStatusData = () => {
  const instrumentTypes = ['Government Bond', 'Treasury Bill', 'Corporate Bond', 'Islamic Sukuk', 'Equity', 'ETF'];
  const statuses = ['Active', 'Suspended', 'Delisted', 'Under Review', 'Pending Activation'];
  const reasons = ['Regulatory Review', 'Market Volatility', 'Issuer Request', 'Compliance Issue', 'System Update'];
  
  return Array.from({ length: 80 }, (_, i) => {
    const changeDate = new Date(2023 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const effectiveDate = new Date(changeDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // Up to 30 days later
    
    return {
      id: `STATUS-${String(i + 1).padStart(4, '0')}`,
      instrumentId: `INST-${String(i + 1).padStart(4, '0')}`,
      instrumentName: `${instrumentTypes[i % instrumentTypes.length]} ${String.fromCharCode(65 + (i % 26))}`,
      instrumentType: instrumentTypes[i % instrumentTypes.length],
      currentStatus: statuses[Math.floor(Math.random() * statuses.length)],
      previousStatus: statuses[Math.floor(Math.random() * statuses.length)],
      changeDate: changeDate.toISOString().split('T')[0],
      effectiveDate: effectiveDate.toISOString().split('T')[0],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      changedBy: ['System Admin', 'Compliance Officer', 'Risk Manager', 'Market Operations'][Math.floor(Math.random() * 4)],
      approvalRequired: Math.random() > 0.5,
      approvedBy: Math.random() > 0.3 ? ['Senior Manager', 'Chief Risk Officer', 'Head of Operations'][Math.floor(Math.random() * 3)] : null,
      impactedHolders: Math.floor(Math.random() * 1000) + 10,
      marketValue: Math.floor(Math.random() * 500000000) + 10000000, // 10M to 510M
      comments: Math.random() > 0.7 ? 'Additional review required' : null
    };
  });
};

const getStatusStats = (data: any[]) => {
  const totalInstruments = data.length;
  const pendingChanges = data.filter(s => s.currentStatus === 'Under Review' || s.currentStatus === 'Pending Activation').length;
  const approvalRequired = data.filter(s => s.approvalRequired && !s.approvedBy).length;
  const totalImpactedHolders = data.reduce((sum, s) => sum + s.impactedHolders, 0);
  
  // Status distribution
  const statusStats = data.reduce((acc, s) => {
    acc[s.currentStatus] = (acc[s.currentStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Instrument type distribution
  const typeStats = data.reduce((acc, s) => {
    acc[s.instrumentType] = (acc[s.instrumentType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Reason distribution
  const reasonStats = data.reduce((acc, s) => {
    acc[s.reason] = (acc[s.reason] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalInstruments,
    pendingChanges,
    approvalRequired,
    totalImpactedHolders,
    statusStats,
    typeStats,
    reasonStats
  };
};

const statusConfig = {
  defaultView: 'visual' as const,
  searchFields: ['instrumentName', 'instrumentType', 'reason'] as (keyof ReturnType<typeof generateMockStatusData>[0])[],
  filters: [
    {
      key: 'currentStatus' as keyof ReturnType<typeof generateMockStatusData>[0],
      label: 'Current Status',
      options: ['Active', 'Suspended', 'Delisted', 'Under Review', 'Pending Activation']
    },
    {
      key: 'instrumentType' as keyof ReturnType<typeof generateMockStatusData>[0],
      label: 'Instrument Type',
      options: ['Government Bond', 'Treasury Bill', 'Corporate Bond', 'Islamic Sukuk', 'Equity', 'ETF']
    },
    {
      key: 'reason' as keyof ReturnType<typeof generateMockStatusData>[0],
      label: 'Reason',
      options: ['Regulatory Review', 'Market Volatility', 'Issuer Request', 'Compliance Issue', 'System Update']
    }
  ]
};

const statusMetricsConfig = [
  {
    key: 'totalInstruments',
    title: 'Total Instruments',
    iconName: 'Flag',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-600'
  },
  {
    key: 'pendingChanges',
    title: 'Pending Status Changes',
    iconName: 'Clock',
    iconColor: 'text-orange-600',
    textColor: 'text-orange-600'
  },
  {
    key: 'approvalRequired',
    title: 'Awaiting Approval',
    iconName: 'AlertTriangle',
    iconColor: 'text-red-600',
    textColor: 'text-red-600'
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

export default function StatusManagementPage() {
  const [statusData] = useState(generateMockStatusData());
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
  } = useDashboardFilters(statusData, statusConfig);

  const stats = getStatusStats(filteredData);
  const colors = getChartColors();

  // Status Distribution Chart
  const statusDistData = Object.entries(stats.statusStats)
    .map(([status, count], index) => ({
      name: status,
      value: count as number,
      color: colors.getPieColors(5)[index]
    }));

  const statusChartConfig = {
    type: 'pie' as const,
    title: '',
    height: 420,
    data: statusDistData
  };

  // Reason Distribution Chart
  const reasonData = Object.entries(stats.reasonStats)
    .map(([reason, count], index) => ({
      name: reason,
      value: count as number,
      color: colors.getBarColors(5)[index]
    }));

  const reasonChartConfig = {
    type: 'bar' as const,
    title: '',
    height: 420,
    data: reasonData
  };

  useEffect(() => {
    document.title = 'Status Management | CBB Portal';
  }, []);

  const columns = [
    { key: 'instrumentName', label: 'Instrument Name', sortable: true },
    { key: 'instrumentType', label: 'Type', sortable: true },
    { key: 'currentStatus', label: 'Current Status', sortable: true },
    { key: 'previousStatus', label: 'Previous Status', sortable: true },
    { key: 'changeDate', label: 'Change Date', sortable: true },
    { key: 'effectiveDate', label: 'Effective Date', sortable: true },
    { key: 'reason', label: 'Reason', sortable: true },
    { key: 'changedBy', label: 'Changed By', sortable: true },
    { 
      key: 'approvalRequired', 
      label: 'Approval Required', 
      sortable: true,
      render: (value: boolean) => value ? 'Yes' : 'No'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Top Metrics Cards */}
          <MetricCardsSection
            metricsConfig={statusMetricsConfig}
            data={filteredData}
            stats={stats}
            onMetricClick={applyFilterAndSwitchView}
          />

          {/* Dashboard Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConfigurableDashboardSection
              title="Status Distribution"
              description="Current instrument status breakdown"
              data={filteredData}
              chartConfig={statusChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />

            <ConfigurableDashboardSection
              title="Change Reason Analysis"
              description="Reasons for status changes"
              data={filteredData}
              chartConfig={reasonChartConfig}
              defaultView="visual"
              showViewSwitcher={false}
              titleFontSize="text-lg font-semibold"
            />
          </div>

          {/* Status Management Table */}
          <ConfigurableDashboardSection
            title="Instrument Status Registry"
            description="Complete history of instrument status changes"
            data={filteredData}
            tableColumns={columns}
            chartConfig={{
              type: 'bar' as const,
              title: '',
              height: 400,
              data: assignColorsToData([
                { name: 'Active', value: filteredData.filter(s => s.currentStatus === 'Active').length },
                { name: 'Suspended', value: filteredData.filter(s => s.currentStatus === 'Suspended').length },
                { name: 'Under Review', value: filteredData.filter(s => s.currentStatus === 'Under Review').length },
                { name: 'Pending Activation', value: filteredData.filter(s => s.currentStatus === 'Pending Activation').length }
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
            pageKey="status-management"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}