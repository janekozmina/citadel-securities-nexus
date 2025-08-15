import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/common/DataTable';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { TransactionQuickActionsDialogs } from '@/components/dialogs/TransactionQuickActionsDialogs';
import { 
  generateTransactionData, 
  getTransactionStats, 
  transactionTableColumns,
  type TransactionData 
} from '@/config/transactionConfig';
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowUpDown,
  TableIcon,
  BarChart3
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { transactionStatusChartConfig } from '@/config/dashboardConfigs';
import { updateChartDataWithStats } from '@/utils/chartUtils';
import portalConfig from '@/config/portalConfig';

const COLORS = {
  'Settled': '#22c55e',
  'Rejected': '#ef4444', 
  'In Queue': '#f59e0b',
  'ILF/BUYBACK': '#8b5cf6'
};

export default function TransactionStatusPage() {
  const [transactions] = useState<TransactionData[]>(() => generateTransactionData());
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Settled' | 'Rejected' | 'In Queue' | 'ILF/BUYBACK'>('all');
  const [activeDialog, setActiveDialog] = useState<'general-transfer' | 'check-funds' | 'liquidity-source' | 'manual-gridlock' | null>(null);
  const stats = getTransactionStats(transactions);

  useEffect(() => {
    document.title = 'Transaction Status Amount / Volume | CBB Portal';
  }, []);

  const formatCurrency = (amount: number) => {
    return `${portalConfig.currencies.primary} ${amount.toLocaleString('en-BH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const formatVolume = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  const pieData = [
    { name: 'Settled', value: stats.settled.count, color: COLORS['Settled'] },
    { name: 'Rejected', value: stats.rejected.count, color: COLORS['Rejected'] },
    { name: 'In Queue', value: stats.queue.count, color: COLORS['In Queue'] },
    { name: 'ILF/BUYBACK', value: stats.ilf.count, color: COLORS['ILF/BUYBACK'] }
  ];

  return (
    <main>
      <section className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">RTGS — Transaction Status Amount / Volume</h1>
        <p className="text-muted-foreground">Monitor transaction status, amounts, and volumes in real-time.</p>
      </section>

      <div className="flex gap-6">
        {/* View Mode Toggle - Fixed positioning */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-2 min-h-[40px] mb-6">
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
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {/* Controls Section - Only show for table view */}
          {viewMode === 'table' && (
            <Card className="bg-slate-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Transaction Monitoring Controls</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Refresh Data
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dashboard View */}
          {viewMode === 'visual' && (
            <div className="space-y-6">
              {/* Transaction Statistics Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total Transactions */}
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setStatusFilter('all');
                    setViewMode('table');
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.total.count.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(stats.total.volume)}
                    </p>
                  </CardContent>
                </Card>

                {/* Settled */}
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setStatusFilter('Settled');
                    setViewMode('table');
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Settled Transactions</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{stats.settled.count.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(stats.settled.volume)}
                    </p>
                  </CardContent>
                </Card>

                {/* Rejected */}
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setStatusFilter('Rejected');
                    setViewMode('table');
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Rejected Transactions</CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{stats.rejected.count.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(stats.rejected.volume)}
                    </p>
                  </CardContent>
                </Card>

                {/* In Queue */}
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setStatusFilter('In Queue');
                    setViewMode('table');
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Queued Transactions</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{stats.queue.count.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(stats.queue.volume)}
                    </p>
                  </CardContent>
                </Card>

                {/* ILF/BUYBACK */}
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setStatusFilter('ILF/BUYBACK');
                    setViewMode('table');
                  }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ILF/BUYBACK Transactions</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{stats.ilf.count.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(stats.ilf.volume)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Interactive Pie Chart */}
              <InteractiveChart
                config={{
                  ...updateChartDataWithStats(transactionStatusChartConfig, stats),
                  onSegmentClick: (filterKey, filterValue) => {
                    if (filterKey && filterValue) {
                      setStatusFilter(filterValue as any);
                      setViewMode('table');
                    }
                  }
                }}
              />
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  All Transactions
                  {statusFilter !== 'all' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatusFilter('all')}
                    >
                      Clear Status Filter
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  title="Transactions"
                  data={statusFilter === 'all' ? transactions : transactions.filter(t => t.status === statusFilter)}
                  columns={transactionTableColumns}
                  searchPlaceholder="Search transactions..."
                  filters={[
                    {
                      key: 'status',
                      label: 'Status',
                      options: ['Settled', 'Rejected', 'In Queue', 'ILF/BUYBACK']
                    },
                    {
                      key: 'type',
                      label: 'Type',
                      options: ['Customer Transfer', 'Bank Transfer', 'Government Payment', 'Interbank Transfer']
                    }
                  ]}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="transaction-status"
            systemType="rtgs"
            className="lg:col-span-1"
            onActionClick={(actionId) => {
              if (['general-transfer', 'check-funds', 'liquidity-source', 'manual-gridlock'].includes(actionId)) {
                setActiveDialog(actionId as any);
              }
            }}
          />
        </div>
      </div>

      <TransactionQuickActionsDialogs
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </main>
  );
}