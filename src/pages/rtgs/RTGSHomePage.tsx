import { useEffect } from 'react';
import { DataCard } from '@/components/common/DataCard';
import { SankeyChart } from '@/components/charts/SankeyChart';
import { DataTable } from '@/components/common/DataTable';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { currency } from '@/config/currencyConfig';
import { dashboardStyleConfig } from '@/config/dashboardStyleConfig';
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
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : `${transactionMetrics.processingTime.toFixed(1)}s`,
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
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : `${(transactionMetrics.delayShare * 100).toFixed(3)}%`,
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'System idle' : 'Minimal delays',
      icon: TrendingUp,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    }
  ];

  // Sankey chart data for liquidity and settlement overview
  const sankeyNodes = currentPhaseData.name === 'Pre-Opening Phase' ? [
    { id: 'cbb', name: 'CBB Reserve', category: 'source' as const, value: 0 },
    { id: 'deposits', name: 'Bank Deposits', category: 'source' as const, value: 0 },
    { id: 'repo', name: 'Repo Operations', category: 'source' as const, value: 0 },
    { id: 'rtgs', name: 'RTGS Settlement', category: 'settlement' as const },
    { id: 'nbb', name: 'NBB', category: 'participant' as const },
    { id: 'aub', name: 'AUB', category: 'participant' as const },
    { id: 'bbk', name: 'BBK', category: 'participant' as const }
  ] : [
    { id: 'cbb', name: 'CBB Reserve', category: 'source' as const, value: 15000000000 },
    { id: 'deposits', name: 'Bank Deposits', category: 'source' as const, value: 8500000000 },
    { id: 'repo', name: 'Repo Operations', category: 'source' as const, value: 5200000000 },
    { id: 'rtgs', name: 'RTGS Settlement', category: 'settlement' as const },
    { id: 'nbb', name: 'NBB', category: 'participant' as const },
    { id: 'aub', name: 'AUB', category: 'participant' as const },
    { id: 'bbk', name: 'BBK', category: 'participant' as const },
    { id: 'gib', name: 'GIB', category: 'participant' as const },
    { id: 'hsbc', name: 'HSBC', category: 'participant' as const }
  ];

  const sankeyLinks = currentPhaseData.name === 'Pre-Opening Phase' ? [
    { source: 'cbb', target: 'rtgs', value: 0 },
    { source: 'deposits', target: 'rtgs', value: 0 },
    { source: 'repo', target: 'rtgs', value: 0 }
  ] : [
    { source: 'cbb', target: 'rtgs', value: 15000000000 },
    { source: 'deposits', target: 'rtgs', value: 8500000000 },
    { source: 'repo', target: 'rtgs', value: 5200000000 },
    { source: 'rtgs', target: 'nbb', value: 9800000000 },
    { source: 'rtgs', target: 'aub', value: 7200000000 },
    { source: 'rtgs', target: 'bbk', value: 5900000000 },
    { source: 'rtgs', target: 'gib', value: 3400000000 },
    { source: 'rtgs', target: 'hsbc', value: 2400000000 }
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
    <div className={dashboardStyleConfig.pageHeader.wrapper.className}>
      <div className={dashboardStyleConfig.pageHeader.container.className}>
        <h1 className={dashboardStyleConfig.pageHeader.title.className}>RTGS Operations</h1>
        <p className={dashboardStyleConfig.pageHeader.subtitle.className}>
          Real-Time Gross Settlement system overview and metrics
        </p>
      </div>

      {/* RTGS KPI Cards */}
      <div className={dashboardStyleConfig.grid.kpiCards}>
        {rtgsKpiData.map((kpi) => (
          <DataCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Liquidity & Settlement Overview */}
      <div className={dashboardStyleConfig.grid.charts}>
        {/* Liquidity & Settlement Flow - Sankey Chart */}
        <SankeyChart
          title="Liquidity & Settlement Overview"
          nodes={sankeyNodes}
          links={sankeyLinks}
          height={dashboardStyleConfig.card.defaultHeight}
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