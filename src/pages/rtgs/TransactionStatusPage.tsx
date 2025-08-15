import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/common/DataTable';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
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
  ArrowUpDown 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import portalConfig from '@/config/portalConfig';

const COLORS = {
  'Settled': '#22c55e',
  'Rejected': '#ef4444', 
  'In Queue': '#f59e0b',
  'ILF/BUYBACK': '#8b5cf6'
};

export default function TransactionStatusPage() {
  const [transactions] = useState<TransactionData[]>(() => generateTransactionData());
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
        <div className="flex-1 space-y-6">
          {/* Transaction Statistics Shortcuts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Transactions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Общее число транзакций</CardTitle>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Сколько засетленных</CardTitle>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Сколько отклоненных</CardTitle>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Сколько в очереди</CardTitle>
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Сколько ILF/BUYBACK</CardTitle>
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

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [value, 'Transactions']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                title="Transactions"
                data={transactions}
                columns={transactionTableColumns}
                searchPlaceholder="Search transactions..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="transaction-status" 
            systemType="rtgs" 
          />
        </div>
      </div>
    </main>
  );
}