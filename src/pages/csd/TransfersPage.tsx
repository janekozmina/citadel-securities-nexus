import { useState, useEffect, useMemo } from 'react';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { DataTable } from '@/components/common/DataTable';
import { DashboardViewSwitcher } from '@/components/common/DashboardViewSwitcher';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { TransactionQuickActionsDialogs } from '@/components/dialogs/TransactionQuickActionsDialogs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { MetricConfig } from '@/config/dashboardConfigs';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { TrendingUp, TrendingDown, Clock, CheckCircle, TableIcon, BarChart3, ArrowUpDown, XCircle, AlertTriangle } from 'lucide-react';
import { Bar, BarChart, Cell, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock data for transfer instructions
const generateMockTransferInstructions = (emulatedTime: Date) => {
  const types = ['DvF', 'RvF', 'DvP', 'RvP'];
  const statuses = ['Executed', 'Pending', 'Failed', 'Rejected'];
  const securities = ['CBB-2024-001', 'CBB-2024-002', 'GOVT-TB-2024', 'SUKUK-2024-001', 'CORP-BOND-2024'];
  const counterparties = ['Ahli United Bank', 'BBK', 'National Bank of Bahrain', 'ABC Islamic Bank', 'Gulf International Bank'];
  
  // Activity varies by time of day - emulated business day logic
  const hour = emulatedTime.getHours() + emulatedTime.getMinutes() / 60;
  let activityMultiplier = 1;
  
  if (hour >= 7 && hour < 8.5) {
    activityMultiplier = 0.3; // Pre-opening
  } else if (hour >= 8.5 && hour < 12) {
    activityMultiplier = 0.8 + Math.sin((hour - 8.5) * Math.PI / 7) * 0.4; // Morning ramp-up
  } else if (hour >= 12 && hour < 14.5) {
    activityMultiplier = 1.2 + Math.random() * 0.3; // Peak activity
  } else if (hour >= 14.5 && hour < 16.5) {
    activityMultiplier = 0.9 + Math.random() * 0.2; // Afternoon
  } else if (hour >= 16.5 && hour < 17) {
    activityMultiplier = 0.5 + Math.random() * 0.3; // End-of-day
  } else {
    activityMultiplier = 0.2; // Outside business hours
  }

  const baseCount = Math.round(150 * activityMultiplier);
  
  return Array.from({ length: baseCount }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    
    // Status probability based on time - more executed during peak hours
    let statusWeights = [0.7, 0.15, 0.10, 0.05]; // [Executed, Pending, Failed, Rejected]
    if (hour < 8.5 || hour > 17) {
      statusWeights = [0.3, 0.5, 0.15, 0.05]; // More pending outside business hours
    }
    
    const rand = Math.random();
    let status;
    if (rand < statusWeights[0]) status = 'Executed';
    else if (rand < statusWeights[0] + statusWeights[1]) status = 'Pending';
    else if (rand < statusWeights[0] + statusWeights[1] + statusWeights[2]) status = 'Failed';
    else status = 'Rejected';
    
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
    totalInstructions: data.length, // Use all data, not just today
    dvfExecuted,
    dvpExecuted,
    pendingFailed: pending + failed,
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
  const { emulatedDay } = useBusinessDayEmulation();
  const [transfers, setTransfers] = useState(() => generateMockTransferInstructions(emulatedDay.emulatedTime));
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual'); // Default to visual dashboard
  const [activeTab, setActiveTab] = useState('all');
  
  // Dialog state for quick actions
  const [activeDialog, setActiveDialog] = useState<'general-transfer' | 'check-funds' | 'liquidity-source' | 'manual-gridlock' | 'submit-transfer-instruction' | null>(null);
  
  // Filter states like Account Management
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCounterparty, setFilterCounterparty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Update transfers data when emulated time changes
  useEffect(() => {
    setTransfers(generateMockTransferInstructions(emulatedDay.emulatedTime));
  }, [emulatedDay.emulatedTime]);
  
  useEffect(() => {
    document.title = 'Transfers | CBB Portal';
  }, []);

  const stats = getTransfersStats(transfers);

  // Get unique values for filters
  const uniqueCounterparties = useMemo(() => {
    return Array.from(new Set(transfers.map(t => t.counterparty))).sort();
  }, [transfers]);

  // Filter and sort data like Account Management
  const filteredAndSortedTransfers = useMemo(() => {
    let filtered = transfers.filter(transfer => {
      const matchesSearch = transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transfer.security.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transfer.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transfer.type === filterType;
      const matchesStatus = filterStatus === 'all' || transfer.status === filterStatus;
      const matchesCounterparty = filterCounterparty === 'all' || transfer.counterparty === filterCounterparty;
      
      return matchesSearch && matchesType && matchesStatus && matchesCounterparty;
    });

    // Apply legacy tab filters for backward compatibility
    if (activeTab !== 'all') {
      if (activeTab.startsWith('type-')) {
        const type = activeTab.replace('type-', '').toUpperCase();
        filtered = filtered.filter(t => t.type === type);
      } else if (activeTab.startsWith('status-')) {
        const status = activeTab.replace('status-', '');
        filtered = filtered.filter(t => t.status.toLowerCase() === status);
      }
    }

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof typeof a];
        let bValue = b[sortField as keyof typeof b];
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = (bValue as string).toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [transfers, searchTerm, filterType, filterStatus, filterCounterparty, activeTab, sortField, sortDirection]);

  const paginatedTransfers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTransfers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTransfers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTransfers.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle quick action clicks
  const handleQuickActionClick = (actionId: string) => {
    if (actionId === 'submit-transfer-instruction') {
      setActiveDialog('submit-transfer-instruction');
    } else {
      console.log(`Quick action clicked: ${actionId}`);
    }
  };

  // Chart data for instruction status overview
  const statusChartData = useMemo(() => {
    const statusCounts = transfers.reduce((acc, transfer) => {
      acc[transfer.status] = (acc[transfer.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      fill: status === 'Executed' ? '#10b981' : 
            status === 'Pending' ? '#f59e0b' : 
            status === 'Failed' ? '#ef4444' : '#6b7280'
    }));
  }, [transfers]);

  // Chart data for type breakdown
  const typeBreakdownData = useMemo(() => {
    const typeStatusCounts = transfers.reduce((acc, transfer) => {
      if (!acc[transfer.type]) {
        acc[transfer.type] = { Executed: 0, Pending: 0, Failed: 0, Rejected: 0 };
      }
      acc[transfer.type][transfer.status as keyof typeof acc[typeof transfer.type]]++;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    return Object.entries(typeStatusCounts).map(([type, statuses]) => ({
      type,
      ...statuses
    }));
  }, [transfers]);

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

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 min-h-[40px]">
            <span className="text-sm font-medium text-slate-700">View Mode:</span>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <TableIcon className="h-4 w-4 mr-2" />
                Table
              </Button>
              <Button
                variant={viewMode === 'visual' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('visual')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>

          {/* Filters Section - Only show for table view */}
          {viewMode === 'table' && (
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex gap-2 items-center flex-wrap">
                  <span className="text-sm font-medium text-slate-700">Filters:</span>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="DvF">DvF</SelectItem>
                      <SelectItem value="RvF">RvF</SelectItem>
                      <SelectItem value="DvP">DvP</SelectItem>
                      <SelectItem value="RvP">RvP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Executed">Executed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCounterparty} onValueChange={setFilterCounterparty}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Counterparty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Counterparties</SelectItem>
                      {uniqueCounterparties.map(cp => (
                        <SelectItem key={cp} value={cp}>{cp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Search instructions..." 
                    className="w-48" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {(filterType !== 'all' || filterStatus !== 'all' || filterCounterparty !== 'all') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFilterType('all');
                        setFilterStatus('all');
                        setFilterCounterparty('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dashboard View - Instruction Status Overview */}
          {viewMode === 'visual' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Instruction Status Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Status Distribution Bar Chart */}
                    <div>
                      <h4 className="text-sm font-medium mb-4">Instructions by Status</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={statusChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="status" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Type Breakdown Stacked Bar Chart */}
                    <div>
                      <h4 className="text-sm font-medium mb-4">Status Breakdown by Type</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={typeBreakdownData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="type" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Executed" stackId="a" fill="#10b981" />
                          <Bar dataKey="Pending" stackId="a" fill="#f59e0b" />
                          <Bar dataKey="Failed" stackId="a" fill="#ef4444" />
                          <Bar dataKey="Rejected" stackId="a" fill="#6b7280" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Cards - Interactive */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statusChartData.map(({ status, count, fill }) => (
                  <Card 
                    key={status}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setFilterStatus(status);
                      setViewMode('table');
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium" style={{ color: fill }}>{status}</span>
                        {status === 'Executed' ? <CheckCircle className="h-4 w-4" style={{ color: fill }} /> :
                         status === 'Pending' ? <Clock className="h-4 w-4" style={{ color: fill }} /> :
                         status === 'Failed' ? <XCircle className="h-4 w-4" style={{ color: fill }} /> :
                         <AlertTriangle className="h-4 w-4" style={{ color: fill }} />}
                      </div>
                      <div className="text-2xl font-bold" style={{ color: fill }}>{count}</div>
                      <Progress 
                        value={(count / transfers.length) * 100} 
                        className="mt-2 h-2"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <Card>
              <CardHeader>
                <CardTitle>Transfer Instructions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedTransfers.length} of {transfers.length} instructions
                </p>
              </CardHeader>
              <CardContent>
                <DataTable
                  title=""
                  columns={columns}
                  data={paginatedTransfers}
                  searchable={false} // We have our own search
                />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="transfers"
            systemType="csd"
            onActionClick={handleQuickActionClick}
          />
        </div>
      </div>

      {/* Quick Actions Dialogs */}
      <TransactionQuickActionsDialogs
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
}