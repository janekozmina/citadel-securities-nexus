import { useEffect } from 'react';
import { DataCard } from '@/components/common/DataCard';
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

  const moneyFlowData = currentPhaseData.name === 'Pre-Opening Phase' ? [
    { bank: 'System Setup', amount: currency(0), percentage: 0 },
    { bank: 'Liquidity Provision', amount: currency(0), percentage: 0 },
    { bank: 'Pre-checks Complete', amount: currency(0), percentage: 0 },
    { bank: 'Standing Ready', amount: currency(0), percentage: 0 },
    { bank: 'Awaiting Opening', amount: currency(0), percentage: 0 }
  ] : [
    { bank: 'National Bank of Bahrain (NBB)', amount: currency(125200000, true), percentage: 22.3 },
    { bank: 'Ahli United Bank B.S.C.', amount: currency(98700000, true), percentage: 17.6 },
    { bank: 'Bank of Bahrain and Kuwait (BBK)', amount: currency(87400000, true), percentage: 15.5 },
    { bank: 'Gulf International Bank B.S.C. (GIB)', amount: currency(76100000, true), percentage: 13.5 },
    { bank: 'HSBC Bank Middle East Limited', amount: currency(65800000, true), percentage: 11.7 }
  ];

  const avgMonthlyData = [
    { bank: 'National Bank of Bahrain (NBB)', amount: currency(3800000000, true), growth: '+5.2%' },
    { bank: 'Ahli United Bank B.S.C.', amount: currency(2900000000, true), growth: '+3.8%' },
    { bank: 'Bank of Bahrain and Kuwait (BBK)', amount: currency(2600000000, true), growth: '+2.1%' },
    { bank: 'Gulf International Bank B.S.C. (GIB)', amount: currency(2300000000, true), growth: '+4.3%' },
    { bank: 'HSBC Bank Middle East Limited', amount: currency(2000000000, true), growth: '+1.9%' }
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
        {/* Daily Money Flow Top 5 */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Money Flow Top 5 Banks (Today)</CardTitle>
            <ArrowUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moneyFlowData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{item.bank}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.amount}</div>
                    <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Average Monthly Flow Top 5 */}
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Money Flow Avg Monthly Top 5 Banks</CardTitle>
            <Building2 className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {avgMonthlyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{item.bank}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.amount}</div>
                    <div className="text-xs text-green-600">{item.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}