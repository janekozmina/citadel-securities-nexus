import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/common/DataTable';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import portalConfig from '@/config/portalConfig';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  RefreshCw,
  Download,
  Search,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function FinancialMonitoringPage() {
  useEffect(() => {
    document.title = 'Financial Monitoring | CBB Portal';
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  // Generate financial monitoring data using banks from config
  const bankData = portalConfig.banks.commercial.slice(0, 15).map((bank, index) => {
    const amounts = [
      16136, 220900000, 101.20, 35495130,
      0, 53200000, 152.99, 31274309,
      52092, 255400000, 157.75, 35445359,
      54128, 265750000, 98.86, 27523641,
      56016, 287009000, 60.50, 31517279,
      56425, 240000000, 89.96, 32909496,
      55476, 169100000, 144.29, 32504366,
      0, 0, 0, 0,
      0, 511415000000, 94.88, 0,
      35543, 607691000, 131.88, 35447218,
      1369, 12937460000, 70.15, 440,
      0, 5901375000, 70.59, 0,
      714, 3001120000, 164.50, 0,
      0, 28490509491000, 22.75, 0,
      1, 1200, 329.52, 35446843
    ];

    return {
      id: `00019000441201${String(index + 1).padStart(3, '0')}`,
      bankCode: portalConfig.banks.codes[bank] || `B${String(index + 1).padStart(3, '0')}`,
      bankName: bank,
      participantType: index < 5 ? 'RTGSPRTCP' : index < 10 ? 'SETTLEMENT' : 'BRTGSCRCP',
      paymentsInQueue: amounts[index % amounts.length],
      timeLastSettled: index % 3 === 0 ? '' : `${8 + Math.floor(index / 3)}:${String((index * 17) % 60).padStart(2, '0')}`,
      credit: Math.floor(Math.random() * 1000000000),
      debit: Math.floor(Math.random() * 50000000),
      currentToOpeningBalance: Math.floor(Math.random() * 100),
      timeLastReceived: index % 4 === 0 ? '' : `${9 + Math.floor(index / 4)}:${String((index * 23) % 60).padStart(2, '0')}`,
      plfDebtAmount: amounts[(index + 5) % amounts.length],
      interbankLoansAmount: Math.floor(Math.random() * 10000000),
      status: index % 5 === 0 ? 'Warning' : index % 7 === 0 ? 'Alert' : 'Normal'
    };
  });

  const columns = [
    { key: 'bankCode', label: 'Bank Code', type: 'text' as const },
    { key: 'bankName', label: 'Bank Name', type: 'text' as const },
    { key: 'participantType', label: 'Participant Type', type: 'text' as const },
    { key: 'paymentsInQueue', label: 'Payments in Queue', type: 'number' as const },
    { key: 'timeLastSettled', label: 'Time Last Settled', type: 'text' as const },
    { key: 'credit', label: 'Credit', type: 'currency' as const },
    { key: 'debit', label: 'Debit', type: 'currency' as const },
    { key: 'currentToOpeningBalance', label: '% Current to Opening Balance', type: 'number' as const },
    { key: 'timeLastReceived', label: 'Time Last Received', type: 'text' as const },
    { key: 'plfDebtAmount', label: 'PLF Debt Amount', type: 'currency' as const },
    { key: 'interbankLoansAmount', label: 'Interbank Loans Amount', type: 'currency' as const },
    { key: 'status', label: 'Status', type: 'status' as const }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS — Financial Monitoring</h1>
        <p className="text-muted-foreground">
          Comprehensive financial monitoring and oversight dashboard
        </p>
      </div>

      {/* Quick Actions / Shortcuts */}
      <div className="flex justify-end mb-4">
        <div className="w-64">
          <QuickActionsManager 
            pageKey="financial-monitoring" 
            systemType="rtgs" 
          />
        </div>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Banks</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{bankData.filter(b => b.status === 'Normal').length}</div>
            <p className="text-xs text-muted-foreground">Operating normally</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{bankData.filter(b => b.status === 'Warning').length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{bankData.filter(b => b.status === 'Alert').length}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Monitoring Table */}
      <DataTable
        title="Bank Financial Position Monitoring"
        icon={Activity}
        columns={columns}
        data={bankData}
      />
    </div>
  );
}