import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building, 
  AlertTriangle, 
  Shield, 
  MapPin,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Mock data for cash operations
const generateCashData = () => {
  const baseWithdrawals = 45670000;
  const baseDeposits = 52340000;
  const variation = (Math.random() - 0.5) * 0.1; // ±10% variation
  
  return {
    withdrawals: Math.round(baseWithdrawals * (1 + variation)),
    deposits: Math.round(baseDeposits * (1 + variation)),
    withdrawalCount: Math.round(1250 * (1 + variation * 0.5)),
    depositCount: Math.round(980 * (1 + variation * 0.5)),
  };
};

const branchData = [
  { name: 'Central Vault', balance: 125000000, threshold: 100000000, status: 'normal' },
  { name: 'Manama Branch', balance: 45000000, threshold: 50000000, status: 'low' },
  { name: 'Muharraq Branch', balance: 32000000, threshold: 30000000, status: 'normal' },
  { name: 'Riffa Branch', balance: 28000000, threshold: 25000000, status: 'normal' },
  { name: 'Hamad Town', balance: 15000000, threshold: 20000000, status: 'critical' },
];

const highValueTransactions = [
  { id: 'TXN001', participant: 'National Bank of Bahrain', amount: 15000000, type: 'Withdrawal', time: '09:45', status: 'Completed' },
  { id: 'TXN002', participant: 'Ministry of Finance', amount: 25000000, type: 'Deposit', time: '10:20', status: 'Pending' },
  { id: 'TXN003', participant: 'BBK Bank', amount: 12500000, type: 'Withdrawal', time: '11:15', status: 'Completed' },
  { id: 'TXN004', participant: 'Arab Banking Corp', amount: 18000000, type: 'Withdrawal', time: '14:30', status: 'Under Review' },
];

const reconciliationData = [
  { branch: 'Central Vault', status: 'reconciled', discrepancies: 0, value: 0 },
  { branch: 'Manama Branch', status: 'reconciled', discrepancies: 0, value: 0 },
  { branch: 'Muharraq Branch', status: 'unreconciled', discrepancies: 2, value: 5000 },
  { branch: 'Riffa Branch', status: 'reconciled', discrepancies: 0, value: 0 },
  { branch: 'Hamad Town', status: 'unreconciled', discrepancies: 1, value: 2500 },
];

export default function CashOperationsPage() {
  const { transactionMetrics } = useBusinessDayEmulation();
  const [cashData] = useState(() => generateCashData());

  useEffect(() => {
    document.title = 'Cash Operations | CBB Portal';
  }, []);

  const formatCurrency = (amount: number) => {
    return `BHD ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const netPosition = cashData.deposits - cashData.withdrawals;
  const totalNationalStock = branchData.reduce((sum, branch) => sum + branch.balance, 0);

  const handleQuickActionClick = (actionId: string) => {
    console.log(`Quick action clicked: ${actionId}`);
    // Handle quick actions here
  };

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          
          {/* 1. Real-Time Cash Flow Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawals Today</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(cashData.withdrawals)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(cashData.withdrawalCount)} transactions • ↓ 5.2% vs yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(cashData.deposits)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(cashData.depositCount)} transactions • ↑ 8.1% vs yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Cash Position</CardTitle>
              <DollarSign className={`h-4 w-4 ${netPosition >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netPosition >= 0 ? '+' : ''}{formatCurrency(netPosition)}
              </div>
              <p className="text-xs text-muted-foreground">
                {netPosition >= 0 ? 'Net inflow' : 'Net outflow'} for today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">National Cash Stock</CardTitle>
              <Building className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalNationalStock)}</div>
              <p className="text-xs text-muted-foreground">
                Across all vaults and branches
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 2. Intraday Liquidity Position */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Intraday Liquidity Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Regional Vault Status</h4>
                {branchData.map((branch) => (
                  <div key={branch.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{branch.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{formatCurrency(branch.balance)}</span>
                        <Badge variant={
                          branch.status === 'critical' ? 'destructive' : 
                          branch.status === 'low' ? 'secondary' : 'default'
                        }>
                          {branch.status}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(branch.balance / branch.threshold) * 100} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Threshold: {formatCurrency(branch.threshold)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Liquidity Gauge</h4>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-blue-600">{Math.round((totalNationalStock / 300000000) * 100)}%</div>
                  <p className="text-sm text-muted-foreground">of optimal liquidity level</p>
                  <Progress value={(totalNationalStock / 300000000) * 100} className="h-4" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-lg font-semibold">85%</div>
                    <div className="text-xs text-muted-foreground">Vault Utilization</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-lg font-semibold">12hrs</div>
                    <div className="text-xs text-muted-foreground">Avg Settlement Time</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Source & Destination Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Commercial Banks</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Government Agencies</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Foreign Exchange</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Commercial Banks</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                    </div>
                    <span className="text-sm font-medium">55%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ATM Replenishment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Treasury Operations</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. High-Value Transaction Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              High-Value Transaction Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highValueTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium">{txn.id}</TableCell>
                    <TableCell>{txn.participant}</TableCell>
                    <TableCell>
                      <Badge variant={txn.type === 'Deposit' ? 'default' : 'secondary'}>
                        {txn.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(txn.amount)}</TableCell>
                    <TableCell>{txn.time}</TableCell>
                    <TableCell>
                      <Badge variant={
                        txn.status === 'Completed' ? 'default' :
                        txn.status === 'Pending' ? 'secondary' : 'destructive'
                      }>
                        {txn.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 5. Daily Cash Settlement & Reconciliation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Daily Cash Settlement & Reconciliation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Reconciliation Status</h4>
                <div className="space-y-2">
                  {reconciliationData.map((item) => (
                    <div key={item.branch} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        {item.status === 'reconciled' ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> : 
                          <XCircle className="h-4 w-4 text-red-600" />
                        }
                        <span className="text-sm">{item.branch}</span>
                      </div>
                      <div className="text-right">
                        {item.discrepancies > 0 && (
                          <div className="text-xs text-red-600">
                            {item.discrepancies} discrepancy(ies) • {formatCurrency(item.value)}
                          </div>
                        )}
                        <Badge variant={item.status === 'reconciled' ? 'default' : 'destructive'}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Summary Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-xs text-muted-foreground">Reconciled Branches</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-xs text-muted-foreground">Pending Reconciliation</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded">
                    <div className="text-lg font-bold text-orange-600">{formatCurrency(7500)}</div>
                    <div className="text-xs text-muted-foreground">Total Discrepancies</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">95%</div>
                    <div className="text-xs text-muted-foreground">Reconciliation Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Historical Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Historical Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">30-Day Trends</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Daily Withdrawals</span>
                    <span className="text-sm font-medium">{formatCurrency(42500000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Daily Deposits</span>
                    <span className="text-sm font-medium">{formatCurrency(48200000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Peak Volume Day</span>
                    <span className="text-sm font-medium">Tuesday</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Seasonal Patterns</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Ramadan Impact</span>
                    <span className="text-sm font-medium text-green-600">+25% demand</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Month-end Pattern</span>
                    <span className="text-sm font-medium text-blue-600">+15% volume</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weekend Impact</span>
                    <span className="text-sm font-medium text-red-600">-40% activity</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">AI Forecast (Next 7 Days)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Predicted Demand</span>
                    <span className="text-sm font-medium">{formatCurrency(305000000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Confidence Level</span>
                    <span className="text-sm font-medium text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Recommendation</span>
                    <span className="text-sm font-medium text-blue-600">Maintain current levels</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="cash-operations" 
            systemType="rtgs"
            onActionClick={handleQuickActionClick}
          />
        </div>
      </div>
    </div>
  );
}