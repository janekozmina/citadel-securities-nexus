import { useEffect } from 'react';
import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { SystemStatus } from '@/components/common/SystemStatus';
import { QuickActions } from '@/components/common/QuickActions';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { 
  Banknote, 
  Building2, 
  Shield, 
  TrendingUp, 
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  CreditCard,
  Users
} from 'lucide-react';

const HomePage = () => {
  const { transactionMetrics, liquidityMetrics, currentPhaseData } = useBusinessDayEmulation();
  
  useEffect(() => {
    document.title = 'Dashboard | CBB Portal';
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
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : `BD ${(transactionMetrics.averageTransactionValue / 1000000).toFixed(1)}M`,
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

  const csdKpiData = [
    {
      title: 'Total Transactions Today',
      value: Math.round(transactionMetrics.totalTransactions * 0.4).toLocaleString(),
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'Pre-opening phase' : '+8% from yesterday',
      icon: Activity,
      trend: currentPhaseData.name !== 'Pre-Opening Phase' ? { value: 8, isPositive: true } : undefined,
      status: 'success' as const
    },
    {
      title: 'Average Processing Time',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'N/A' : '4.1s',
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'System preparation' : 'Settlement processing',
      icon: Clock,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    },
    {
      title: 'Total Securities Hold',
      value: 'BD 12.8B',
      subtitle: 'Under custody',
      icon: Shield,
      status: 'info' as const
    },
    {
      title: 'Total Mbill Hold',
      value: 'BD 2.4B',
      subtitle: 'Government securities',
      icon: Banknote,
      status: 'info' as const
    },
    {
      title: 'Daily Settled',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? 'BD 0' : `BD ${(transactionMetrics.totalVolume / 1000000).toFixed(1)}M`,
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'No settlements yet' : 'Today\'s settled amount',
      icon: CheckCircle,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'warning' as const : 'success' as const
    },
    {
      title: 'Pending Settlement',
      value: currentPhaseData.name === 'Pre-Opening Phase' ? '0' : transactionMetrics.queuedTransactions.toString(),
      subtitle: currentPhaseData.name === 'Pre-Opening Phase' ? 'No pending settlements' : 'Awaiting settlement',
      icon: Clock,
      status: currentPhaseData.name === 'Pre-Opening Phase' ? 'info' as const : transactionMetrics.queuedTransactions > 20 ? 'warning' as const : 'success' as const
    },
    {
      title: 'Corporate Actions',
      value: '12',
      subtitle: 'Active this month',
      icon: Building2,
      status: 'info' as const
    }
  ];

  const recentTransactions = currentPhaseData.name === 'Pre-Opening Phase' ? [
    {
      id: 'SYS001',
      bank: 'System',
      amount: 0,
      type: 'System Check',
      status: 'Completed',
      time: '07:00'
    },
    {
      id: 'SYS002', 
      bank: 'System',
      amount: 0,
      type: 'Liquidity Setup',
      status: 'In Progress',
      time: '07:15'
    }
  ] : [
    {
      id: 'TXN001',
      bank: 'National Bank of Bahrain',
      amount: 1250000,
      type: 'RTGS Transfer',
      status: 'Completed',
      time: '14:32'
    },
    {
      id: 'TXN002', 
      bank: 'Ahli United Bank',
      amount: 875000,
      type: 'Securities Settlement',
      status: 'Processing',
      time: '14:28'
    },
    {
      id: 'TXN003',
      bank: 'Arab Banking Corporation',
      amount: 2100000,
      type: 'Repo Transaction',
      status: 'Completed',
      time: '14:15'
    }
  ];

  const systemStatuses = [
    { 
      name: 'RTGS System', 
      status: 'online' as const, 
      uptime: '99.98%', 
      lastUpdate: '2 mins ago' 
    },
    { 
      name: 'CMS System', 
      status: 'online' as const, 
      uptime: '99.95%', 
      lastUpdate: '1 min ago' 
    },
    { 
      name: 'CSD System', 
      status: 'warning' as const, 
      uptime: '99.87%', 
      lastUpdate: 'Maintenance in 2 hours' 
    },
    { 
      name: 'Data Warehouse', 
      status: 'online' as const, 
      uptime: '99.92%', 
      lastUpdate: '5 mins ago' 
    }
  ];


  const transactionColumns = [
    { key: 'id', label: 'Transaction ID', type: 'text' as const },
    { key: 'bank', label: 'Bank', type: 'text' as const },
    { key: 'amount', label: 'Amount', type: 'currency' as const },
    { key: 'type', label: 'Type', type: 'text' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'time', label: 'Time', type: 'text' as const }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Central Bank Portal</h1>
        <p className="text-muted-foreground">
          Unified dashboard for RTGS, CSD, and CMS operations
        </p>
      </div>

      {/* RTGS KPI Cards */}
      <div className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">RTGS Metrics</h2>
        <p className="text-muted-foreground text-sm">Real-time gross settlement system performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {rtgsKpiData.map((kpi) => (
          <DataCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* CSD KPI Cards */}
      <div className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">CSD Metrics</h2>
        <p className="text-muted-foreground text-sm">Central securities depository operations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {csdKpiData.map((kpi) => (
          <DataCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <DataTable
            title="Recent Transactions"
            icon={TrendingUp}
            columns={transactionColumns}
            data={recentTransactions}
          />
        </div>

        {/* System Status */}
        <div className="space-y-6">
          <SystemStatus systems={systemStatuses} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;