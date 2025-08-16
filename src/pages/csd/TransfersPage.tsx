import { useState, useEffect } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { DataTable } from '@/components/common/DataTable';
import { DashboardViewSwitcher } from '@/components/common/DashboardViewSwitcher';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MetricConfig } from '@/config/dashboardConfigs';
import { TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';

// Mock data for transfer instructions
const generateMockTransferInstructions = () => {
  const types = ['DvF', 'RvF', 'DvP', 'RvP'];
  const statuses = ['Executed', 'Pending', 'Failed', 'Rejected'];
  const securities = ['CBB-2024-001', 'CBB-2024-002', 'GOVT-TB-2024', 'SUKUK-2024-001', 'CORP-BOND-2024'];
  const counterparties = ['Ahli United Bank', 'BBK', 'National Bank of Bahrain', 'ABC Islamic Bank', 'Gulf International Bank'];
  
  return Array.from({ length: 150 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 10000000) + 100000;
    const value = type.includes('P') ? amount * (0.95 + Math.random() * 0.1) : amount;
    
    return {
      id: `TI-${String(i + 1).padStart(6, '0')}`,
      type,
      security: securities[Math.floor(Math.random() * securities.length)],
      counterparty: counterparties[Math.floor(Math.random() * counterparties.length)],
      amount,
      value: Math.round(value),
      status,
      settlementDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      submissionTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      currency: 'BHD'
    };
  });
};

const transfersMetricsConfig: MetricConfig[] = [
  {
    key: 'totalInstructions',
    title: 'Total Transfer Instructions',
    subtitleFormatter: () => 'Today',
    iconName: 'TrendingUp',
    iconColor: 'text-blue-600'
  },
  {
    key: 'dvfExecuted',
    title: 'DvF Executed',
    subtitleFormatter: () => 'Delivery vs Free',
    iconName: 'CheckCircle',
    iconColor: 'text-green-600'
  },
  {
    key: 'dvpExecuted',
    title: 'DvP Executed', 
    subtitleFormatter: () => 'Delivery vs Payment',
    iconName: 'TrendingDown',
    iconColor: 'text-purple-600'
  },
  {
    key: 'pendingFailed',
    title: 'Pending / Failed',
    subtitleFormatter: () => 'Unsettled Instructions',
    iconName: 'Clock',
    iconColor: 'text-orange-600'
  }
];

const getTransfersStats = (data: any[]) => {
  const today = new Date().toISOString().split('T')[0];
  const todayInstructions = data.filter(item => item.submissionTime.startsWith(today));
  
  const dvfExecuted = data.filter(item => item.type === 'DvF' && item.status === 'Executed').length;
  const dvpExecuted = data.filter(item => item.type === 'DvP' && item.status === 'Executed').length;
  const pending = data.filter(item => item.status === 'Pending').length;
  const failed = data.filter(item => item.status === 'Failed').length;
  
  const dvfValue = data
    .filter(item => item.type === 'DvF' && item.status === 'Executed')
    .reduce((sum, item) => sum + item.value, 0);
  
  const dvpValue = data
    .filter(item => item.type === 'DvP' && item.status === 'Executed')
    .reduce((sum, item) => sum + item.value, 0);
  
  return {
    totalInstructions: todayInstructions.length,
    dvfExecuted,
    dvpExecuted,
    pending,
    failed,
    dvfValue,
    dvpValue
  };
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Executed': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Rejected': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'DvP': return 'bg-blue-100 text-blue-800';
    case 'DvF': return 'bg-purple-100 text-purple-800';
    case 'RvP': return 'bg-green-100 text-green-800';
    case 'RvF': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function TransfersPage() {
  const [transfers] = useState(generateMockTransferInstructions());
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('table');
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    document.title = 'Transfers | CBB Portal';
  }, []);

  const stats = getTransfersStats(transfers);

  // Filter data based on active tab
  const getFilteredData = () => {
    switch (activeTab) {
      case 'type-dvf': return transfers.filter(t => t.type === 'DvF');
      case 'type-rvf': return transfers.filter(t => t.type === 'RvF');
      case 'type-dvp': return transfers.filter(t => t.type === 'DvP');
      case 'type-rvp': return transfers.filter(t => t.type === 'RvP');
      case 'status-executed': return transfers.filter(t => t.status === 'Executed');
      case 'status-pending': return transfers.filter(t => t.status === 'Pending');
      case 'status-failed': return transfers.filter(t => t.status === 'Failed');
      case 'status-rejected': return transfers.filter(t => t.status === 'Rejected');
      default: return transfers;
    }
  };

  const filteredData = getFilteredData();

  const columns = [
    { key: 'id', label: 'Instruction ID', sortable: true },
    { 
      key: 'type', 
      label: 'Type', 
      sortable: true,
      render: (value: string) => (
        <Badge className={getTypeColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'security', label: 'Security/ISIN', sortable: true },
    { key: 'counterparty', label: 'Counterparty', sortable: true },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${value.toLocaleString()}`
    },
    { 
      key: 'value', 
      label: 'Value', 
      sortable: true,
      render: (value: number, row: any) => `${row.currency} ${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value: string) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    { key: 'settlementDate', label: 'Settlement Date', sortable: true }
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* KPI Cards */}
          <MetricCardsSection
            metricsConfig={transfersMetricsConfig}
            data={transfers}
            stats={stats}
          />

          {/* Dashboard with Switcher */}
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold">Transfer Instructions</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    View and manage transfer instructions by type or status
                  </p>
                </div>
                <DashboardViewSwitcher 
                  viewMode={viewMode} 
                  onViewModeChange={setViewMode}
                />
              </div>
              
              {/* Tabs for filtering */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="by-type">By Instruction Type</TabsTrigger>
                  <TabsTrigger value="by-status">By Status</TabsTrigger>
                </TabsList>
                
                <TabsContent value="by-type" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'all' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      All ({transfers.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('type-dvf')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'type-dvf' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      DvF ({transfers.filter(t => t.type === 'DvF').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('type-rvf')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'type-rvf' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      RvF ({transfers.filter(t => t.type === 'RvF').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('type-dvp')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'type-dvp' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      DvP ({transfers.filter(t => t.type === 'DvP').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('type-rvp')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'type-rvp' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      RvP ({transfers.filter(t => t.type === 'RvP').length})
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="by-status" className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'all' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      All ({transfers.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('status-executed')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'status-executed' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      Executed ({transfers.filter(t => t.status === 'Executed').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('status-pending')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'status-pending' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      Pending ({transfers.filter(t => t.status === 'Pending').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('status-failed')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'status-failed' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      Failed ({transfers.filter(t => t.status === 'Failed').length})
                    </button>
                    <button
                      onClick={() => setActiveTab('status-rejected')}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        activeTab === 'status-rejected' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background hover:bg-accent'
                      }`}
                    >
                      Rejected ({transfers.filter(t => t.status === 'Rejected').length})
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              {viewMode === 'table' ? (
                <DataTable
                  title=""
                  columns={columns}
                  data={filteredData}
                  searchable={true}
                  searchPlaceholder="Search instructions..."
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Visual dashboard view coming soon
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="transfers"
            systemType="csd"
          />
        </div>
      </div>
    </div>
  );
}