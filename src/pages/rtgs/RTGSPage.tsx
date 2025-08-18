import { DataCard } from '@/components/common/DataCard';
import { LiquidityHeatmap } from '@/components/charts/LiquidityHeatmap';
import { DataTable } from '@/components/common/DataTable';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { currency } from '@/config/currencyConfig';
import { dashboardStyleConfig } from '@/config/dashboardStyleConfig';
import { 
  Banknote, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Activity,
  ArrowUpDown,
  Building2
} from 'lucide-react';

const RTGSPage = () => {
  const { transactionMetrics, liquidityMetrics, currentPhaseData } = useBusinessDayEmulation();
  // Same metrics as home page with business day emulation
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

  const recentPayments = [
    {
      messageId: 'FT24001247',
      sender: 'National Bank of Bahrain',
      receiver: 'Ahli United Bank',
      amount: 2500000,
      status: 'Settled',
      timestamp: '14:45:32'
    },
    {
      messageId: 'FT24001246',
      sender: 'Arab Banking Corporation',
      receiver: 'BBK Bank',
      amount: 1750000,
      status: 'Processing',
      timestamp: '14:44:15'
    },
    {
      messageId: 'FT24001245',
      sender: 'HSBC Bank Middle East',
      receiver: 'Citibank N.A.',
      amount: 890000,
      status: 'Settled',
      timestamp: '14:42:08'
    },
    {
      messageId: 'FT24001244',
      sender: 'Standard Chartered Bank',
      receiver: 'Future Bank',
      amount: 3200000,
      status: 'Failed',
      timestamp: '14:40:22'
    }
  ];

  const paymentColumns = [
    { key: 'messageId', label: 'Message ID', type: 'text' as const },
    { key: 'sender', label: 'Sender', type: 'text' as const },
    { key: 'receiver', label: 'Receiver', type: 'text' as const },
    { key: 'amount', label: 'Amount', type: 'currency' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'timestamp', label: 'Time', type: 'text' as const }
  ];

  // Heatmap data for liquidity visualization
  const heatmapParticipants = currentPhaseData.name === 'Pre-Opening Phase' ? [
    { id: 'nbb', name: 'National Bank of Bahrain', shortName: 'NBB', settlementValue: 0, liquidityStatus: 'medium' as const },
    { id: 'aub', name: 'Ahli United Bank', shortName: 'AUB', settlementValue: 0, liquidityStatus: 'medium' as const },
    { id: 'bbk', name: 'Bank of Bahrain and Kuwait', shortName: 'BBK', settlementValue: 0, liquidityStatus: 'medium' as const },
    { id: 'gib', name: 'Gulf International Bank', shortName: 'GIB', settlementValue: 0, liquidityStatus: 'medium' as const },
    { id: 'hsbc', name: 'HSBC Bank Middle East', shortName: 'HSBC', settlementValue: 0, liquidityStatus: 'medium' as const },
    { id: 'citi', name: 'Citibank N.A.', shortName: 'CITI', settlementValue: 0, liquidityStatus: 'medium' as const }
  ] : [
    { id: 'nbb', name: 'National Bank of Bahrain', shortName: 'NBB', settlementValue: 9800000000, liquidityStatus: 'high' as const },
    { id: 'aub', name: 'Ahli United Bank', shortName: 'AUB', settlementValue: 7200000000, liquidityStatus: 'high' as const },
    { id: 'bbk', name: 'Bank of Bahrain and Kuwait', shortName: 'BBK', settlementValue: 5900000000, liquidityStatus: 'medium' as const },
    { id: 'gib', name: 'Gulf International Bank', shortName: 'GIB', settlementValue: 3400000000, liquidityStatus: 'low' as const },
    { id: 'hsbc', name: 'HSBC Bank Middle East', shortName: 'HSBC', settlementValue: 2400000000, liquidityStatus: 'critical' as const },
    { id: 'citi', name: 'Citibank N.A.', shortName: 'CITI', settlementValue: 1800000000, liquidityStatus: 'low' as const },
    { id: 'abc', name: 'Arab Banking Corporation', shortName: 'ABC', settlementValue: 2100000000, liquidityStatus: 'medium' as const },
    { id: 'scb', name: 'Standard Chartered Bank', shortName: 'SCB', settlementValue: 1600000000, liquidityStatus: 'critical' as const }
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
        {/* Liquidity Heatmap */}
        <LiquidityHeatmap
          title="Liquidity & Settlement Overview"
          participants={heatmapParticipants}
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
};

export default RTGSPage;