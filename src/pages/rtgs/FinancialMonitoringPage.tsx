import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Clock, DollarSign, Users, Activity, ArrowLeft } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const liquidityTrendData = [
  { time: '09:00', total: 12500, cash: 8500, collateral: 4000 },
  { time: '10:00', total: 11800, cash: 7800, collateral: 4000 },
  { time: '11:00', total: 10200, cash: 6200, collateral: 4000 },
  { time: '12:00', total: 9800, cash: 5800, collateral: 4000 },
  { time: '13:00', total: 8900, cash: 4900, collateral: 4000 },
  { time: '14:00', total: 8200, cash: 4200, collateral: 4000 },
  { time: '15:00', total: 7500, cash: 3500, collateral: 4000 },
];

const paymentFlowData = [
  { hour: '09:00', settled: 2800, queued: 450 },
  { hour: '10:00', settled: 3200, queued: 520 },
  { hour: '11:00', settled: 2900, queued: 380 },
  { hour: '12:00', settled: 3500, queued: 680 },
  { hour: '13:00', settled: 3100, queued: 420 },
  { hour: '14:00', settled: 2700, queued: 590 },
  { hour: '15:00', settled: 2400, queued: 720 },
];

const participantBalances = [
  { id: '0003800040120300', name: 'BNTENTINT', queue: 0, payments: 17316, turnover: -182000.00, current: 98.98, opening: 9572553, amount: 0.00, debt: 0.00 },
  { id: '0003800040120270', name: 'TUSOINTST', queue: 0, payments: 16196, turnover: -200000.00, current: 101.02, opening: 35495130, amount: 0.00, debt: 0.00 },
  { id: '0003800040120210', name: 'TSIDINTST', queue: 0, payments: 0, turnover: 25700.00, current: 105.19, opening: 31774303, amount: 0.00, debt: 0.00 },
  { id: '0003800040120050', name: 'BTWNTINTVQM', queue: 0, payments: 52002, turnover: 2254300.00, current: 157.72, opening: 35445359, amount: 0.00, debt: 3500000.00 },
  { id: '0003800040120140', name: 'BHBINTINT', queue: 0, payments: 53178, turnover: -203250.00, current: 98.87, opening: 27932681, amount: 0.00, debt: 1500000.00 },
  { id: '0003800040120320', name: 'BEITINTNT', queue: 0, payments: 6, turnover: -663000.00, current: 87.28, opening: 35446750, amount: 0.00, debt: 550000.00 },
];

const queuedPayments = [
  { id: 'PAY001', participant: 'BNTENTINT', amount: 15000000, age: '2h 15m', priority: 'High' },
  { id: 'PAY002', participant: 'TUSOINTST', amount: 12500000, age: '1h 45m', priority: 'Normal' },
  { id: 'PAY003', participant: 'BTWNTINTVQM', amount: 8750000, age: '3h 20m', priority: 'High' },
  { id: 'PAY004', participant: 'BHBINTINT', amount: 6200000, age: '45m', priority: 'Low' },
];

const chartConfig = {
  total: { label: 'Total Liquidity', color: 'hsl(var(--primary))' },
  cash: { label: 'Cash', color: 'hsl(var(--chart-1))' },
  collateral: { label: 'Collateral', color: 'hsl(var(--chart-2))' },
  settled: { label: 'Settled', color: 'hsl(var(--chart-3))' },
  queued: { label: 'Queued', color: 'hsl(var(--chart-4))' },
};

export default function FinancialMonitoringPage() {
  const [showBalancesTable, setShowBalancesTable] = useState(false);

  useEffect(() => {
    document.title = 'RTGS Financial Monitoring | Unified Portal';
  }, []);

  const getStatusColor = (value: number) => {
    if (value < 90) return 'text-red-600';
    if (value < 100) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'High': 'destructive',
      'Normal': 'default',
      'Low': 'secondary'
    } as const;
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  if (showBalancesTable) {
    return (
      <main className="space-y-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/rtgs/home">RTGS</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/rtgs/financial-monitoring">Financial Monitoring</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Balances & Liquidity</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">RTGS — Balances & Liquidity</h1>
            <p className="text-muted-foreground">Real-time participant balances and liquidity positions</p>
          </div>
          <Button onClick={() => setShowBalancesTable(false)} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Participant Balances & Liquidity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Code</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Payments in Queue</TableHead>
                  <TableHead>Total Transactions</TableHead>
                  <TableHead>Credit/Debit Turnover</TableHead>
                  <TableHead>% Current to Opening</TableHead>
                  <TableHead>Time Since Last Received</TableHead>
                  <TableHead>ILF Debt Amount</TableHead>
                  <TableHead>Intrabank Loans</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participantBalances.map((participant, index) => (
                  <TableRow key={participant.id} className={index % 2 === 0 ? 'bg-green-50' : ''}>
                    <TableCell className="font-mono text-sm">{participant.id}</TableCell>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell className="text-center">{participant.queue}</TableCell>
                    <TableCell className="text-right">{participant.payments.toLocaleString()}</TableCell>
                    <TableCell className={`text-right ${participant.turnover < 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {participant.turnover.toLocaleString()}
                    </TableCell>
                    <TableCell className={`text-right ${getStatusColor(participant.current)}`}>
                      {participant.current.toFixed(2)}%
                    </TableCell>
                    <TableCell className="text-right">{participant.opening.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{participant.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{participant.debt.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">RTGS — Financial Monitoring</h1>
        <p className="text-muted-foreground">Real-time monitoring of financial flows and liquidity metrics</p>
      </div>


      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Liquidity</p>
                <p className="text-2xl font-bold">BD 7.5B</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Utilization Rate</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
              <Progress value={68} className="w-12" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Queued Payments</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Focused Dashboards Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Liquidity & Balances Overview */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>Liquidity & Balances Overview</CardTitle>
            <CardDescription>Real-time liquidity composition and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Cash Liquidity</p>
                  <p className="text-xl font-bold text-blue-600">BD 3.5B</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Pledged Collateral</p>
                  <p className="text-xl font-bold text-purple-600">BD 4.0B</p>
                </div>
              </div>
              
              <ChartContainer config={chartConfig} className="h-[200px]">
                <AreaChart data={liquidityTrendData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="cash" 
                    stackId="1" 
                    stroke="var(--color-cash)" 
                    fill="var(--color-cash)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="collateral" 
                    stackId="1" 
                    stroke="var(--color-collateral)" 
                    fill="var(--color-collateral)" 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
          <Button 
            size="sm" 
            variant="outline"
            className="absolute bottom-4 right-4"
            onClick={() => setShowBalancesTable(true)}
          >
            View Details
          </Button>
        </Card>

        {/* Right: Payment Flow & Queue */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>Payment Flow & Queue</CardTitle>
            <CardDescription>Hourly settlement patterns and queue analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ChartContainer config={chartConfig} className="h-[150px]">
                <BarChart data={paymentFlowData}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="settled" fill="var(--color-settled)" />
                  <Bar dataKey="queued" fill="var(--color-queued)" />
                </BarChart>
              </ChartContainer>
              
              <div>
                <h4 className="font-medium mb-3">Top Queued Payments</h4>
                <div className="space-y-2">
                  {queuedPayments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{payment.participant}</p>
                        <p className="text-xs text-muted-foreground">BD {(payment.amount / 1000000).toFixed(1)}M • {payment.age}</p>
                      </div>
                      {getPriorityBadge(payment.priority)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <Button 
            size="sm" 
            variant="outline"
            className="absolute bottom-4 right-4"
          >
            View Details
          </Button>
        </Card>
      </div>
    </main>
  );
}
