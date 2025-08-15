import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { QuickActions } from '@/components/common/QuickActions';
import { 
  Shield, 
  DollarSign, 
  PieChart, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calculator,
  BarChart3
} from 'lucide-react';

const CMSPage = () => {
  const collateralMetrics = [
    {
      title: 'Total Collateral Value',
      value: 'BD 8.7B',
      subtitle: 'Across all participants',
      icon: DollarSign,
      status: 'info' as const
    },
    {
      title: 'Utilization Rate',
      value: '68%',
      subtitle: 'Of total available collateral',
      icon: PieChart,
      trend: { value: 5, isPositive: true },
      status: 'success' as const
    },
    {
      title: 'Margin Deficit',
      value: 'BD 24.5M',
      subtitle: 'Requires immediate attention',
      icon: AlertTriangle,
      status: 'warning' as const
    },
    {
      title: 'Risk Score',
      value: '7.2',
      subtitle: 'Portfolio risk assessment',
      icon: BarChart3,
      trend: { value: 3, isPositive: false },
      status: 'warning' as const
    }
  ];

  const collateralPositions = [
    {
      participant: 'National Bank of Bahrain',
      assetType: 'Government Bonds',
      value: 1250000000,
      haircut: '2%',
      eligibleValue: 1225000000,
      utilizationRate: '75%'
    },
    {
      participant: 'Ahli United Bank',
      assetType: 'Corporate Bonds',
      value: 890000000,
      haircut: '5%',
      eligibleValue: 845500000,
      utilizationRate: '82%'
    },
    {
      participant: 'Arab Banking Corporation',
      assetType: 'Equities',
      value: 567000000,
      haircut: '15%',
      eligibleValue: 481950000,
      utilizationRate: '68%'
    },
    {
      participant: 'BBK Bank',
      assetType: 'Cash Deposits',
      value: 345000000,
      haircut: '0%',
      eligibleValue: 345000000,
      utilizationRate: '45%'
    }
  ];

  const quickActions = [
    {
      title: 'Margin Call',
      description: 'Process margin call notifications',
      icon: AlertTriangle,
      path: '/cms/risk',
      variant: 'default' as const
    },
    {
      title: 'Collateral Valuation',
      description: 'Update asset valuations',
      icon: Calculator,
      path: '/cms/collateral'
    },
    {
      title: 'Risk Assessment',
      description: 'Run portfolio risk analysis',
      icon: BarChart3,
      path: '/cms/risk'
    },
    {
      title: 'Compliance Check',
      description: 'Verify regulatory compliance',
      icon: CheckCircle,
      path: '/cms/risk'
    }
  ];

  const collateralColumns = [
    { key: 'participant', label: 'Participant', type: 'text' as const },
    { key: 'assetType', label: 'Asset Type', type: 'text' as const },
    { key: 'value', label: 'Market Value', type: 'currency' as const },
    { key: 'haircut', label: 'Haircut', type: 'text' as const },
    { key: 'eligibleValue', label: 'Eligible Value', type: 'currency' as const },
    { key: 'utilizationRate', label: 'Utilization', type: 'text' as const }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Collateral Management</h1>
        <p className="text-muted-foreground">
          Central Bank Collateral Management System - Risk and Asset Management
        </p>
      </div>

      {/* CMS Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collateralMetrics.map((metric) => (
          <DataCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collateral Positions Table */}
        <div className="lg:col-span-2">
          <DataTable
            title="Collateral Positions by Participant"
            icon={Shield}
            columns={collateralColumns}
            data={collateralPositions}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions title="Risk Management" actions={quickActions} />
      </div>
    </div>
  );
};

export default CMSPage;