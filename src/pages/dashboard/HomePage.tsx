import { useEffect } from 'react';
import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { SystemStatus } from '@/components/common/SystemStatus';
import { QuickActions } from '@/components/common/QuickActions';
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
  useEffect(() => {
    document.title = 'Dashboard | CBB Portal';
  }, []);
  const rtgsKpiData = [
    {
      title: 'Total Transactions Today',
      value: '2,847',
      subtitle: '+12% from yesterday',
      icon: Activity,
      trend: { value: 12, isPositive: true },
      status: 'success' as const
    },
    {
      title: 'Average Processing Time',
      value: '2.3s',
      subtitle: 'Real-time processing',
      icon: Clock,
      status: 'success' as const
    },
    {
      title: 'Average Transaction Value',
      value: 'BD 1.2M',
      subtitle: 'Per transaction',
      icon: DollarSign,
      status: 'info' as const
    },
    {
      title: 'Processing Delay Share',
      value: '0.02%',
      subtitle: 'Minimal delays',
      icon: TrendingUp,
      status: 'success' as const
    }
  ];

  const csdKpiData = [
    {
      title: 'Total Transactions Today',
      value: '1,247',
      subtitle: '+8% from yesterday',
      icon: Activity,
      trend: { value: 8, isPositive: true },
      status: 'success' as const
    },
    {
      title: 'Average Processing Time',
      value: '4.1s',
      subtitle: 'Settlement processing',
      icon: Clock,
      status: 'success' as const
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
      value: 'BD 847.2M',
      subtitle: 'Today\'s settled amount',
      icon: CheckCircle,
      status: 'success' as const
    },
    {
      title: 'Pending Settlement',
      value: '23',
      subtitle: 'Awaiting settlement',
      icon: Clock,
      status: 'warning' as const
    },
    {
      title: 'Corporate Actions',
      value: '12',
      subtitle: 'Active this month',
      icon: Building2,
      status: 'info' as const
    }
  ];

  const recentTransactions = [
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
      name: 'CSD Platform', 
      status: 'online' as const, 
      uptime: '99.95%', 
      lastUpdate: '1 min ago' 
    },
    { 
      name: 'CMS Engine', 
      status: 'warning' as const, 
      uptime: '99.87%', 
      lastUpdate: 'Maintenance in 2 hours' 
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