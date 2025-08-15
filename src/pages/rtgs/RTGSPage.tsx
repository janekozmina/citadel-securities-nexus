import { DataCard } from '@/components/common/DataCard';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  // Same metrics as home page
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

  // Money flow data for widgets
  const moneyFlowData = [
    { bank: 'National Bank of Bahrain (NBB)', amount: 'BD 125.2M', percentage: 22.3 },
    { bank: 'Ahli United Bank B.S.C.', amount: 'BD 98.7M', percentage: 17.6 },
    { bank: 'Bank of Bahrain and Kuwait (BBK)', amount: 'BD 87.4M', percentage: 15.5 },
    { bank: 'Gulf International Bank B.S.C. (GIB)', amount: 'BD 76.1M', percentage: 13.5 },
    { bank: 'HSBC Bank Middle East Limited', amount: 'BD 65.8M', percentage: 11.7 }
  ];

  const avgMonthlyData = [
    { bank: 'National Bank of Bahrain (NBB)', amount: 'BD 3.8B', growth: '+5.2%' },
    { bank: 'Ahli United Bank B.S.C.', amount: 'BD 2.9B', growth: '+3.8%' },
    { bank: 'Bank of Bahrain and Kuwait (BBK)', amount: 'BD 2.6B', growth: '+2.1%' },
    { bank: 'Gulf International Bank B.S.C. (GIB)', amount: 'BD 2.3B', growth: '+4.3%' },
    { bank: 'HSBC Bank Middle East Limited', amount: 'BD 2.0B', growth: '+1.9%' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS System</h1>
        <p className="text-muted-foreground">
          Real-Time Gross Settlement System - High Value Payment Processing
        </p>
      </div>

      {/* RTGS Metrics - Same as Home Page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rtgsKpiData.map((metric) => (
          <DataCard key={metric.title} {...metric} />
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

      {/* Recent Payments Table */}
      <DataTable
        title="Recent RTGS Payments"
        icon={Banknote}
        columns={paymentColumns}
        data={recentPayments}
      />
    </div>
  );
};

export default RTGSPage;