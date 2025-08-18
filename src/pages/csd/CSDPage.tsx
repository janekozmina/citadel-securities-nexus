import { useEffect } from 'react';
import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { currency } from '@/config/currencyConfig';
import { 
  Building2, 
  Shield, 
  TrendingUp, 
  Activity,
  Clock,
  CheckCircle,
  FileText,
  Users,
  Banknote,
  AlertTriangle,
  Layers,
  CreditCard
} from 'lucide-react';

const CSDPage = () => {
  const { transactionMetrics, currentPhaseData } = useBusinessDayEmulation();
  
  useEffect(() => {
    document.title = 'CSD Dashboard | CBB Portal';
  }, []);

  const csdKpiData = [
    {
      title: 'Settlement Instructions Today',
      value: Math.round(transactionMetrics.totalTransactions * 0.4).toLocaleString(),
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'Pre-opening phase' : '+8% from yesterday',
      icon: Activity,
      trend: currentPhaseData.name !== 'Pre-Opening Phase' ? { value: 8, isPositive: true } : undefined,
      status: 'success' as const
    },
    {
      title: 'Average Settlement Time',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : '4.2s',
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'System preparation' : 'DvP settlement time',
      icon: Clock,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    },
    {
      title: 'Total Securities Under Custody',
      value: currency(12800000000, true),
      subtitle: 'Market value',
      icon: Shield,
      status: 'info' as const
    },
    {
      title: 'Government Securities (MBills)',
      value: currency(2400000000, true),
      subtitle: 'Outstanding amount',
      icon: Banknote,
      status: 'info' as const
    },
    {
      title: 'Daily Settlement Volume',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? currency(0) : currency(transactionMetrics.totalVolume * 0.6, true),
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'No settlements yet' : 'Today\'s settled value',
      icon: CheckCircle,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    },
    {
      title: 'Pending Settlements',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? '0' : Math.round(transactionMetrics.queuedTransactions * 0.3).toString(),
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'No pending settlements' : 'Awaiting settlement',
      icon: Clock,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'info' as const : transactionMetrics.queuedTransactions > 20 ? 'warning' as const : 'success' as const
    },
    {
      title: 'Active Corporate Actions',
      value: '12',
      subtitle: 'Current month',
      icon: Building2,
      status: 'info' as const
    },
    {
      title: 'Participant Accounts',
      value: '48',
      subtitle: 'Active accounts',
      icon: Users,
      status: 'success' as const
    }
  ];

  const recentSettlements = currentPhaseData.name === 'Pre-Opening Phase' ? [
    {
      id: 'SYS001',
      participant: 'System',
      amount: 0,
      type: 'System Check',
      status: 'Completed',
      time: '07:00'
    },
    {
      id: 'SYS002', 
      participant: 'System',
      amount: 0,
      type: 'Custody Setup',
      status: 'In Progress',
      time: '07:15'
    }
  ] : [
    {
      id: 'STL001',
      participant: 'National Bank of Bahrain',
      amount: 2850000,
      type: 'DvP Settlement',
      status: 'Completed',
      time: '14:32'
    },
    {
      id: 'STL002', 
      participant: 'BBK Bank',
      amount: 1675000,
      type: 'Securities Transfer',
      status: 'Processing',
      time: '14:28'
    },
    {
      id: 'STL003',
      participant: 'Arab Banking Corporation',
      amount: 3200000,
      type: 'Repo Settlement',
      status: 'Completed',
      time: '14:15'
    },
    {
      id: 'STL004',
      participant: 'Ahli United Bank',
      amount: 920000,
      type: 'Corporate Action',
      status: 'Pending',
      time: '14:10'
    },
    {
      id: 'STL005',
      participant: 'Gulf International Bank',
      amount: 1450000,
      type: 'DvF Settlement',
      status: 'Completed',
      time: '14:05'
    }
  ];

  const settlementColumns = [
    { key: 'id', label: 'Settlement ID', type: 'text' as const },
    { key: 'participant', label: 'Participant', type: 'text' as const },
    { key: 'amount', label: 'Amount', type: 'currency' as const },
    { key: 'type', label: 'Type', type: 'text' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'time', label: 'Time', type: 'text' as const }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CSD System</h1>
        <p className="text-muted-foreground">
          Central Securities Depository operations and settlement monitoring
        </p>
      </div>

      {/* CSD KPI Cards */}
      <div className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">CSD Metrics</h2>
        <p className="text-muted-foreground text-sm">Central securities depository performance indicators</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {csdKpiData.map((kpi) => (
          <DataCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Recent Settlements - Full Width */}
      <div className="w-full">
        <DataTable
          title="Recent Settlement Instructions"
          icon={TrendingUp}
          columns={settlementColumns}
          data={recentSettlements}
        />
      </div>
    </div>
  );
};

export default CSDPage;