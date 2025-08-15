import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { SystemStatus } from '@/components/common/SystemStatus';
import { QuickActions } from '@/components/common/QuickActions';
import { AlertsCard } from '@/components/common/AlertsCard';
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
  const location = useLocation();

  useEffect(() => {
    document.title = 'Dashboard | CBB Portal';
  }, []);

  // Define alerts for different pages
  const getPageAlerts = () => {
    const baseAlerts = [
      {
        id: 2,
        type: 'info' as const,
        message: 'Settlement batch processing complete',
        time: '14:30',
        urgent: false
      },
      {
        id: 3,
        type: 'alert' as const,
        message: 'System maintenance scheduled for tonight',
        time: '14:15',
        urgent: false
      }
    ];

    // Add ILF alert for home page
    if (location.pathname === '/') {
      return [
        {
          id: 1,
          type: 'warning' as const,
          message: 'ILF window closes in 15 minutes',
          time: '14:45',
          urgent: true
        },
        ...baseAlerts
      ];
    }

    return baseAlerts;
  };
  const kpiData = [
    {
      title: 'Total Transactions Today',
      value: '2,847',
      subtitle: '+12% from yesterday',
      icon: Activity,
      trend: { value: 12, isPositive: true },
      status: 'success' as const
    },
    {
      title: 'Settlement Value',
      value: 'BD 847.2M',
      subtitle: 'Today\'s settled amount',
      icon: DollarSign,
      status: 'info' as const
    },
    {
      title: 'System Uptime',
      value: '99.98%',
      subtitle: 'Last 30 days',
      icon: CheckCircle,
      status: 'success' as const
    },
    {
      title: 'Pending Settlements',
      value: '23',
      subtitle: 'Requiring attention',
      icon: Clock,
      status: 'warning' as const
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

  const quickActions = [
    {
      title: 'Process Payment',
      description: 'Initiate new RTGS payment',
      icon: CreditCard,
      path: '/rtgs/payments',
      variant: 'default' as const
    },
    {
      title: 'View Settlements',
      description: 'Check settlement status',
      icon: Building2,
      path: '/csd/settlement'
    },
    {
      title: 'Manage Collateral',
      description: 'Collateral operations',
      icon: Shield,
      path: '/cms/collateral'
    },
    {
      title: 'System Monitoring',
      description: 'Real-time system status',
      icon: Activity,
      path: '/rtgs/monitoring'
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
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

        {/* System Status and Alerts */}
        <div className="space-y-6">
          <SystemStatus systems={systemStatuses} />
          <QuickActions title="Quick Actions" actions={quickActions} />
          <AlertsCard alerts={getPageAlerts()} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;