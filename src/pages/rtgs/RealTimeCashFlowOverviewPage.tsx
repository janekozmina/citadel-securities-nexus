import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUp, 
  ArrowDown,
  DollarSign,
  Building2,
  MapPin,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Eye,
  Filter
} from 'lucide-react';
import { useBusinessDaySimulation } from '@/hooks/useBusinessDaySimulation';

interface CashFlowMetrics {
  totalWithdrawals: {
    value: number;
    count: number;
    trend: number;
  };
  totalDeposits: {
    value: number;
    count: number;
    trend: number;
  };
  netPosition: {
    value: number;
    trend: number;
  };
}

interface LiquidityPosition {
  nationalStock: {
    vault: number;
    inTransit: number;
    inBranches: number;
    total: number;
    threshold: number;
  };
  regionalVaults: Array<{
    region: string;
    balance: number;
    activity: number;
    status: 'normal' | 'low' | 'critical';
  }>;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'withdrawal' | 'deposit';
  participant: string;
  time: string;
  status: 'completed' | 'pending' | 'flagged';
  riskScore: number;
}

interface SourceDestination {
  deposits: Array<{
    source: string;
    amount: number;
    percentage: number;
  }>;
  withdrawals: Array<{
    destination: string;
    amount: number;
    percentage: number;
  }>;
}

export default function RealTimeCashFlowOverviewPage() {
  useEffect(() => {
    document.title = 'Real-Time Cash Flow Overview | Unified Portal';
  }, []);

  const { currentTime, isBusinessHours } = useBusinessDaySimulation();
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  // Mock data
  const [cashFlowMetrics] = useState<CashFlowMetrics>({
    totalWithdrawals: {
      value: 145620000,
      count: 2847,
      trend: -5.2
    },
    totalDeposits: {
      value: 178450000,
      count: 3621,
      trend: 8.7
    },
    netPosition: {
      value: 32830000,
      trend: 15.3
    }
  });

  const [liquidityPosition] = useState<LiquidityPosition>({
    nationalStock: {
      vault: 2450000000,
      inTransit: 185000000,
      inBranches: 890000000,
      total: 3525000000,
      threshold: 2000000000
    },
    regionalVaults: [
      { region: 'Manama Central', balance: 850000000, activity: 125000000, status: 'normal' },
      { region: 'Muharraq', balance: 420000000, activity: 65000000, status: 'normal' },
      { region: 'Riffa', balance: 380000000, activity: 58000000, status: 'low' },
      { region: 'Hamad Town', balance: 290000000, activity: 42000000, status: 'normal' },
      { region: 'Isa Town', balance: 185000000, activity: 28000000, status: 'critical' }
    ]
  });

  const [sourceDestination] = useState<SourceDestination>({
    deposits: [
      { source: 'Commercial Banks', amount: 125620000, percentage: 70.4 },
      { source: 'Government Agencies', amount: 35480000, percentage: 19.9 },
      { source: 'Foreign Exchange', amount: 17350000, percentage: 9.7 }
    ],
    withdrawals: [
      { destination: 'Commercial Banks', amount: 98750000, percentage: 67.8 },
      { destination: 'ATM Replenishment', amount: 28920000, percentage: 19.9 },
      { destination: 'Treasury Operations', amount: 17950000, percentage: 12.3 }
    ]
  });

  const [highValueTransactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      amount: 15500000,
      type: 'withdrawal',
      participant: 'National Bank of Bahrain (NBB)',
      time: '14:35',
      status: 'completed',
      riskScore: 2
    },
    {
      id: 'TXN-002',
      amount: 12750000,
      type: 'deposit',
      participant: 'Bank of Bahrain and Kuwait (BBK)',
      time: '14:28',
      status: 'completed',
      riskScore: 1
    },
    {
      id: 'TXN-003',
      amount: 8900000,
      type: 'withdrawal',
      participant: 'Arab Banking Corporation (Bank ABC)',
      time: '14:15',
      status: 'flagged',
      riskScore: 8
    },
    {
      id: 'TXN-004',
      amount: 22000000,
      type: 'withdrawal',
      participant: 'Gulf International Bank (GIB)',
      time: '13:45',
      status: 'completed',
      riskScore: 3
    },
    {
      id: 'TXN-005',
      amount: 18250000,
      type: 'deposit',
      participant: 'Ahli United Bank',
      time: '13:22',
      status: 'pending',
      riskScore: 2
    }
  ]);

  const formatCurrency = (amount: number) => {
    return `BHD ${(amount / 1000000).toFixed(1)}M`;
  };

  const formatLargeCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `BHD ${(amount / 1000000000).toFixed(2)}B`;
    }
    return `BHD ${(amount / 1000000).toFixed(0)}M`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Real-Time Cash Flow Overview</h1>
            <p className="text-muted-foreground">
              Central Bank cash position monitoring and analysis • Current Time: {currentTime instanceof Date ? currentTime.toLocaleTimeString() : currentTime}
              {isBusinessHours && <Badge className="ml-2 bg-green-100 text-green-800">Business Hours</Badge>}
            </p>
          </div>
        </div>

        {/* 1. Real-Time Cash Flow Overview - KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawals Today</CardTitle>
              <ArrowDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-700">{formatLargeCurrency(cashFlowMetrics.totalWithdrawals.value)}</div>
              <div className="text-sm text-red-600 mb-2">{cashFlowMetrics.totalWithdrawals.count.toLocaleString()} transactions</div>
              <div className="flex items-center text-xs">
                {cashFlowMetrics.totalWithdrawals.trend > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                )}
                <span className={cashFlowMetrics.totalWithdrawals.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                  {Math.abs(cashFlowMetrics.totalWithdrawals.trend)}% vs yesterday
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deposits Today</CardTitle>
              <ArrowUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{formatLargeCurrency(cashFlowMetrics.totalDeposits.value)}</div>
              <div className="text-sm text-green-600 mb-2">{cashFlowMetrics.totalDeposits.count.toLocaleString()} transactions</div>
              <div className="flex items-center text-xs">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">
                  +{cashFlowMetrics.totalDeposits.trend}% vs yesterday
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Cash Position</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{formatLargeCurrency(cashFlowMetrics.netPosition.value)}</div>
              <div className="text-sm text-blue-600 mb-2">Deposits - Withdrawals</div>
              <div className="flex items-center text-xs">
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-green-600">
                  +{cashFlowMetrics.netPosition.trend}% vs yesterday
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. Intraday Liquidity Position */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                National Cash Stock
              </CardTitle>
              <CardDescription>Current vault position and distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Stock</span>
                  <span className="text-lg font-bold">{formatLargeCurrency(liquidityPosition.nationalStock.total)}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>vs. Threshold</span>
                    <span className="font-medium">{((liquidityPosition.nationalStock.total / liquidityPosition.nationalStock.threshold) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={(liquidityPosition.nationalStock.total / liquidityPosition.nationalStock.threshold) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{formatLargeCurrency(liquidityPosition.nationalStock.vault)}</div>
                    <div className="text-xs text-muted-foreground">Vault</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-600">{formatLargeCurrency(liquidityPosition.nationalStock.inTransit)}</div>
                    <div className="text-xs text-muted-foreground">In Transit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{formatLargeCurrency(liquidityPosition.nationalStock.inBranches)}</div>
                    <div className="text-xs text-muted-foreground">Branches</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Regional Vault Status
              </CardTitle>
              <CardDescription>Regional vault balances and activity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liquidityPosition.regionalVaults.map((vault, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{vault.region}</div>
                      <div className="text-sm text-muted-foreground">
                        Balance: {formatLargeCurrency(vault.balance)} • Activity: {formatCurrency(vault.activity)}
                      </div>
                    </div>
                    <Badge className={getStatusColor(vault.status)}>
                      {vault.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. Source & Destination Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Source & Destination Analysis
            </CardTitle>
            <CardDescription>Cash flow sources and destinations breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-700">Deposit Sources</h3>
                <div className="space-y-2">
                  {sourceDestination.deposits.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">{item.source}</span>
                        </div>
                        <div className="ml-5">
                          <Progress value={item.percentage} className="h-1 mt-1" />
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-bold">{formatCurrency(item.amount)}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-red-700">Withdrawal Destinations</h3>
                <div className="space-y-2">
                  {sourceDestination.withdrawals.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium">{item.destination}</span>
                        </div>
                        <div className="ml-5">
                          <Progress value={item.percentage} className="h-1 mt-1" />
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-bold">{formatCurrency(item.amount)}</div>
                        <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. High-Value Transaction Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              High-Value Transaction Monitor
            </CardTitle>
            <CardDescription>Transactions above regulatory reporting thresholds with AML monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highValueTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {transaction.type === 'withdrawal' ? (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        ) : (
                          <ArrowUp className="h-3 w-3 text-green-500" />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.participant}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getRiskScoreColor(transaction.riskScore)}`}>
                        {transaction.riskScore}/10
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Eye className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                        {transaction.status === 'flagged' && (
                          <AlertTriangle className="h-4 w-4 cursor-pointer text-red-500" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 5. Daily Cash Settlement & Reconciliation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Settlement Status
              </CardTitle>
              <CardDescription>End-of-day reconciliation and settlement status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">2,847</div>
                    <div className="text-sm text-green-600">Reconciled</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-700">23</div>
                    <div className="text-sm text-red-600">Unreconciled</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Settlement Progress</span>
                    <span className="font-medium">99.2%</span>
                  </div>
                  <Progress value={99.2} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Discrepancies Summary
              </CardTitle>
              <CardDescription>Outstanding mismatches requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div>
                    <div className="font-medium">Amount Discrepancies</div>
                    <div className="text-sm text-muted-foreground">8 transactions • BHD 125K total variance</div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <div className="font-medium">Timing Mismatches</div>
                    <div className="text-sm text-muted-foreground">15 transactions • Cross-day processing</div>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Action Required</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 6. Historical Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historical Trend Analysis
            </CardTitle>
            <CardDescription>Cash flow patterns and forecasting for operational planning</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="30days" className="space-y-4">
              <TabsList>
                <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
                <TabsTrigger value="90days">Last 90 Days</TabsTrigger>
                <TabsTrigger value="seasonal">Seasonal Patterns</TabsTrigger>
                <TabsTrigger value="forecast">AI Forecast</TabsTrigger>
              </TabsList>
              
              <TabsContent value="30days">
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>30-day cash flow trend chart would be rendered here</p>
                    <p className="text-sm">Interactive time series showing daily withdrawals/deposits</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="90days">
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>90-day trend analysis would be rendered here</p>
                    <p className="text-sm">Extended historical view with weekly aggregations</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="seasonal">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Seasonal patterns by month</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Key Seasonal Insights</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Ramadan Peak Demand:</span>
                        <span className="font-medium">+35% vs average</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End-of-Quarter Surge:</span>
                        <span className="font-medium">+28% vs average</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Summer Holiday Impact:</span>
                        <span className="font-medium">-15% vs average</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="forecast">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">AI-driven 7-day forecast</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Next 7 Days Forecast</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Expected Daily Withdrawals:</span>
                        <span className="font-medium">BHD 145-160M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Daily Deposits:</span>
                        <span className="font-medium">BHD 170-185M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidence Level:</span>
                        <span className="font-medium text-green-600">87%</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Based on historical patterns, seasonal trends, and economic indicators
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}