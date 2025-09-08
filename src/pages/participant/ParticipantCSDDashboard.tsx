import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Wallet,
  Target,
  Briefcase
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const ParticipantCSDDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Mock data for charts
  const transactionData = [
    { time: '09:00', settlements: 5, pending: 2, failed: 0 },
    { time: '10:00', settlements: 12, pending: 3, failed: 1 },
    { time: '11:00', settlements: 18, pending: 1, failed: 0 },
    { time: '12:00', settlements: 25, pending: 4, failed: 2 },
    { time: '13:00', settlements: 32, pending: 2, failed: 1 },
    { time: '14:00', settlements: 28, pending: 5, failed: 0 },
    { time: '15:00', settlements: 22, pending: 3, failed: 1 },
  ];

  const portfolioData = [
    { name: 'Government Bonds', value: 45000000, color: '#8884d8' },
    { name: 'Treasury Bills', value: 30000000, color: '#82ca9d' },
    { name: 'Corporate Bonds', value: 25000000, color: '#ffc658' },
    { name: 'Islamic Sukuk', value: 15000000, color: '#ff7300' },
    { name: 'Other Securities', value: 10750000, color: '#0088fe' }
  ];

  const metrics = {
    totalPortfolioValue: 125750000,
    dayChange: 2.1,
    weekChange: -0.8,
    settledTransactions: 32,
    pendingTransactions: 5,
    failedTransactions: 1,
    availableCredit: 50000000,
    usedCredit: 15000000,
    corporateActions: 3,
    upcomingRedemptions: 2
  };

  const recentTransactions = [
    {
      id: 'TXN001',
      type: 'DvP Settlement',
      instrument: 'GOVT-TB-2024-001',
      amount: 10000000,
      counterparty: 'NBB',
      status: 'Settled',
      time: '14:30:25'
    },
    {
      id: 'TXN002',
      type: 'Repo Operation',
      instrument: 'GOVT-BND-2025-005',
      amount: 25000000,
      counterparty: 'CBB',
      status: 'Processing',
      time: '14:15:10'
    },
    {
      id: 'TXN003',
      type: 'Free Transfer',
      instrument: 'CORP-BD-2026-012',
      amount: 5000000,
      counterparty: 'BBK',
      status: 'Pending',
      time: '13:45:33'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'settled': return 'default';
      case 'processing': return 'secondary';
      case 'pending': return 'outline';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">CSD Dashboard</h1>
          <p className="text-muted-foreground">Central Securities Depository - Participant View</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <Badge variant="secondary" className="px-3 py-1">
            <Building2 className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD {metrics.totalPortfolioValue.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {metrics.dayChange >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={metrics.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {metrics.dayChange > 0 ? '+' : ''}{metrics.dayChange}% today
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settled Transactions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.settledTransactions}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">Awaiting settlement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD {metrics.availableCredit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Used: BHD {metrics.usedCredit.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corporate Actions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.corporateActions}</div>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transaction Activity</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Composition</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Activity</CardTitle>
              <CardDescription>Real-time transaction processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="settlements" stroke="#10b981" strokeWidth={2} name="Settled" />
                    <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
                    <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Failed" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Distribution by instrument type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `BHD ${value.toLocaleString()}`} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Holdings Summary</CardTitle>
                <CardDescription>Detailed breakdown of securities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">BHD {item.value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {((item.value / metrics.totalPortfolioValue) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest settlement activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{transaction.type}</span>
                        <Badge variant={getStatusColor(transaction.status)} className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.instrument}</p>
                      <p className="text-xs text-muted-foreground">vs {transaction.counterparty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">BHD {transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      <p className="text-xs text-muted-foreground">{transaction.id}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantCSDDashboard;