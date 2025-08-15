import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { QuickActions } from '@/components/common/QuickActions';
import { 
  Banknote, 
  DollarSign, 
  Clock, 
  TrendingUp,
  CreditCard,
  Search,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const RTGSPage = () => {
  const rtgsMetrics = [
    {
      title: 'Daily Transaction Volume',
      value: 'BD 2.4B',
      subtitle: '+8% from yesterday',
      icon: DollarSign,
      trend: { value: 8, isPositive: true },
      status: 'success' as const
    },
    {
      title: 'Transactions Count',
      value: '1,247',
      subtitle: 'Processed today',
      icon: Activity,
      status: 'info' as const
    },
    {
      title: 'Average Processing Time',
      value: '2.3s',
      subtitle: 'Real-time processing',
      icon: Clock,
      status: 'success' as const
    },
    {
      title: 'Queue Length',
      value: '12',
      subtitle: 'Pending transactions',
      icon: AlertTriangle,
      status: 'warning' as const
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

  const quickActions = [
    {
      title: 'Initiate Payment',
      description: 'Create new RTGS payment instruction',
      icon: CreditCard,
      path: '/rtgs/payments',
      variant: 'default' as const
    },
    {
      title: 'Search Transactions',
      description: 'Find and track payment status',
      icon: Search,
      path: '/rtgs/payments/status'
    },
    {
      title: 'Account Balances',
      description: 'View real-time account positions',
      icon: DollarSign,
      path: '/rtgs/accounts'
    },
    {
      title: 'System Monitoring',
      description: 'Monitor RTGS system performance',
      icon: Activity,
      path: '/rtgs/monitoring'
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS System</h1>
        <p className="text-muted-foreground">
          Real-Time Gross Settlement System - High Value Payment Processing
        </p>
      </div>

      {/* RTGS Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rtgsMetrics.map((metric) => (
          <DataCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="Recent RTGS Payments"
            icon={Banknote}
            columns={paymentColumns}
            data={recentPayments}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions title="RTGS Operations" actions={quickActions} />
      </div>
    </div>
  );
};

export default RTGSPage;