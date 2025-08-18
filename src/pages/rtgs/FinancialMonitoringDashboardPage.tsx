import { useEffect } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataCard } from '@/components/common/DataCard';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { DataTable } from '@/components/common/DataTable';
import { portalConfig } from '@/config/portalConfig';
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield,
  Activity
} from 'lucide-react';

const FinancialMonitoringDashboardPage = () => {
  useEffect(() => {
    document.title = "Financial Monitoring Dashboard | CBB Portal";
  }, []);

  // Generate bank data based on portal configuration
  const bankData = portalConfig.banks.commercial.map((bank, index) => ({
    bankCode: `${String.fromCharCode(65 + index)}${index + 1}${String.fromCharCode(66 + index)}`,
    bankName: bank,
    status: index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Warning' : 'Critical',
    totalBalance: (Math.random() * 100000000).toFixed(0),
    availableBalance: (Math.random() * 50000000).toFixed(0),
    reserveRequirement: (Math.random() * 10000000).toFixed(0),
    dailyVolume: (Math.random() * 500000000).toFixed(0),
    transactionCount: Math.floor(Math.random() * 1000) + 100,
    lastUpdate: new Date().toLocaleTimeString(),
  }));

  const columns = [
    { key: 'bankCode', label: 'Bank Code', type: 'text' as const },
    { key: 'bankName', label: 'Bank Name', type: 'text' as const },
    { key: 'status', label: 'Status', type: 'status' as const },
    { key: 'totalBalance', label: 'Total Balance (BHD)', type: 'currency' as const },
    { key: 'availableBalance', label: 'Available Balance (BHD)', type: 'currency' as const },
    { key: 'reserveRequirement', label: 'Reserve Requirement (BHD)', type: 'currency' as const },
    { key: 'dailyVolume', label: 'Daily Volume (BHD)', type: 'currency' as const },
    { key: 'transactionCount', label: 'Transactions', type: 'number' as const },
    { key: 'lastUpdate', label: 'Last Update', type: 'text' as const },
  ];

  const metrics = [
    {
      title: 'Total System Liquidity',
      value: 'BHD 2.4B',
      subtitle: 'Across all participants',
      icon: TrendingUp,
      trend: { value: 5.2, isPositive: true },
      status: 'success' as const
    },
    {
      title: 'Active Participants',
      value: `${bankData.filter(bank => bank.status === 'Active').length}`,
      subtitle: 'Currently online',
      icon: Activity,
      status: 'success' as const
    },
    {
      title: 'System Alerts',
      value: `${bankData.filter(bank => bank.status === 'Warning').length}`,
      subtitle: 'Warnings detected',
      icon: AlertTriangle,
      status: 'warning' as const
    },
    {
      title: 'Critical Issues',
      value: `${bankData.filter(bank => bank.status === 'Critical').length}`,
      subtitle: 'Requires attention',
      icon: Shield,
      status: 'error' as const
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial Monitoring Dashboard"
        description="Real-time monitoring of financial institution status and liquidity"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <DataCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <DataTable
          title="Bank Status Overview"
          icon={Activity}
          columns={columns}
          data={bankData}
        />
      </div>

      <QuickActionsManager 
        pageKey="financial-monitoring"
        systemType="rtgs"
      />
    </div>
  );
};

export default FinancialMonitoringDashboardPage;