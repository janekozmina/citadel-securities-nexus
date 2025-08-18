import { useEffect } from 'react';
import { DataCard } from '@/components/common/DataCard';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { currency } from '@/config/currencyConfig';
import { 
  Activity,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowUpDown,
  Building2
} from 'lucide-react';

export default function RTGSHomePage() {
  const { transactionMetrics, liquidityMetrics, currentPhaseData } = useBusinessDayEmulation();
  
  useEffect(() => {
    document.title = 'RTGS | Unified Portal';
  }, []);

  const rtgsKpiData = [
    {
      title: 'Total Transactions Today',
      value: transactionMetrics.totalTransactions.toLocaleString(),
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'Pre-opening phase' : '+12% from yesterday',
      icon: Activity,
      trend: currentPhaseData.name !== 'Pre-Opening Phase' ? { value: 12, isPositive: true } : undefined,
      status: 'success' as const
    },
    {
      title: 'Average Processing Time',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : '2.3s',
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'System preparation' : 'Real-time processing',
      icon: Clock,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    },
    {
      title: 'Average Transaction Value',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : currency(transactionMetrics.averageTransactionValue, true),
      subtitle: 'Per transaction',
      icon: DollarSign,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'info' as const
    },
    {
      title: 'Processing Delay Share',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : '0.02%',
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'System idle' : 'Minimal delays',
      icon: TrendingUp,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    }
  ];

  // Pie chart data for monthly money flow
  const pieChartData = currentPhaseData.name === 'Pre-Opening Phase' ? [
    { name: 'System Setup', value: 0, color: '#E5E7EB' },
    { name: 'Liquidity Provision', value: 0, color: '#D1D5DB' },
    { name: 'Pre-checks Complete', value: 0, color: '#9CA3AF' },
    { name: 'Standing Ready', value: 0, color: '#6B7280' },
    { name: 'Awaiting Opening', value: 0, color: '#4B5563' }
  ] : [
    { name: 'National Bank of Bahrain', value: 3800, color: '#3B82F6' },
    { name: 'Ahli United Bank', value: 2900, color: '#10B981' },
    { name: 'Bank of Bahrain and Kuwait', value: 2600, color: '#F59E0B' },
    { name: 'Gulf International Bank', value: 2300, color: '#EF4444' },
    { name: 'HSBC Bank Middle East', value: 2000, color: '#8B5CF6' }
  ];

  // Bank-to-bank transaction data
  const bankTransactions = currentPhaseData.name === 'Pre-Opening Phase' ? [
    { fromBank: 'System', toBank: 'Setup', amount: currency(0), id: 'SYS001' },
    { fromBank: 'Pre-opening', toBank: 'Phase', amount: currency(0), id: 'SYS002' },
    { fromBank: 'Awaiting', toBank: 'Launch', amount: currency(0), id: 'SYS003' },
    { fromBank: 'Liquidity', toBank: 'Preparation', amount: currency(0), id: 'SYS004' },
    { fromBank: 'System', toBank: 'Ready', amount: currency(0), id: 'SYS005' }
  ] : [
    { fromBank: 'Gulf International Bank', toBank: 'National Bank of Bahrain', amount: currency(10000000000, true), id: 'TXN001' },
    { fromBank: 'National Bank of Bahrain', toBank: 'Ahli United Bank', amount: currency(9810000000, true), id: 'TXN002' },
    { fromBank: 'Ahli United Bank', toBank: 'Gulf International Bank', amount: currency(6700000000, true), id: 'TXN003' },
    { fromBank: 'Bank of Bahrain and Kuwait', toBank: 'Gulf International Bank', amount: currency(6480000000, true), id: 'TXN004' },
    { fromBank: 'Gulf International Bank', toBank: 'Bank of Bahrain and Kuwait', amount: currency(5180000000, true), id: 'TXN005' },
    { fromBank: 'HSBC Bank Middle East', toBank: 'Ahli United Bank', amount: currency(4900000000, true), id: 'TXN006' },
    { fromBank: 'Ahli United Bank', toBank: 'National Bank of Bahrain', amount: currency(3870000000, true), id: 'TXN007' },
    { fromBank: 'National Bank of Bahrain', toBank: 'HSBC Bank Middle East', amount: currency(3830000000, true), id: 'TXN008' },
    { fromBank: 'Gulf International Bank', toBank: 'HSBC Bank Middle East', amount: currency(2880000000, true), id: 'TXN009' },
    { fromBank: 'Bank of Bahrain and Kuwait', toBank: 'Ahli United Bank', amount: currency(2830000000, true), id: 'TXN010' }
  ];

  const transactionColumns = [
    { key: 'fromBank', label: 'From Bank', type: 'text' as const },
    { key: 'toBank', label: 'To Bank', type: 'text' as const },
    { key: 'amount', label: 'SUM (BHD)', type: 'text' as const }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS Operations</h1>
        <p className="text-muted-foreground">
          Real-Time Gross Settlement system overview and metrics
        </p>
      </div>

      {/* RTGS KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rtgsKpiData.map((kpi) => (
          <DataCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Money Flow Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Money Flow Avg Monthly Top 5 Banks - Pie Chart */}
        <InteractiveChart
          config={{
            type: 'pie',
            title: 'Money Flow Avg Monthly Top 5 Banks',
            data: pieChartData,
            height: 400
          }}
          pieChartSize="medium"
        />

        {/* Bank-to-Bank Transactions Table */}
        <DataTable
          title="Money Flow Top 5 Banks"
          icon={ArrowUpDown}
          columns={transactionColumns}
          data={bankTransactions}
        />
      </div>
    </div>
  );
}