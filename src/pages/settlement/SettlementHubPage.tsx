import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, Users, Clock, AlertCircle, Banknote, FileText, CheckCircle2, CircleSlash, ChevronsUpDown } from 'lucide-react';

const SettlementHubPage = () => {
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');

  const statusCards = [
    {
      title: 'Total Instructions',
      value: '1,250',
      change: '+12% vs last week',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Settled Instructions',
      value: '985',
      change: '+8% vs last week',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      title: 'Pending Instructions',
      value: '225',
      change: '-5% vs last week',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Failed Instructions',
      value: '40',
      change: '+20% vs last week',
      icon: CircleSlash,
      color: 'text-red-600'
    }
  ];

  const settlements = [
    {
      id: 'SET-2024-001',
      instruction: 'DvP Settlement',
      counterparty: 'Bank A',
      security: 'ISIN12345678',
      quantity: 1000,
      amount: 250000,
      currency: 'AED',
      status: 'Pending' as const,
      priority: 'High' as const,
      settlement_date: '2024-01-15'
    },
    {
      id: 'SET-2024-002',
      instruction: 'FOP Transfer',
      counterparty: 'Bank B',
      security: 'ISIN87654321',
      quantity: 500,
      amount: 125000,
      currency: 'USD',
      status: 'Settled' as const,
      priority: 'Medium' as const,
      settlement_date: '2024-01-14'
    },
    {
      id: 'SET-2024-003',
      instruction: 'Triparty Repo',
      counterparty: 'Bank C',
      security: 'ISIN24681357',
      quantity: 2000,
      amount: 500000,
      currency: 'EUR',
      status: 'Failed' as const,
      priority: 'Low' as const,
      settlement_date: '2024-01-13'
    },
    {
      id: 'SET-2024-004',
      instruction: 'Collateral Pledge',
      counterparty: 'Bank D',
      security: 'ISIN98765432',
      quantity: 750,
      amount: 187500,
      currency: 'GBP',
      status: 'Pending' as const,
      priority: 'High' as const,
      settlement_date: '2024-01-12'
    },
    {
      id: 'SET-2024-005',
      instruction: 'Securities Lending',
      counterparty: 'Bank E',
      security: 'ISIN11223344',
      quantity: 1200,
      amount: 300000,
      currency: 'JPY',
      status: 'Settled' as const,
      priority: 'Medium' as const,
      settlement_date: '2024-01-11'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Settled': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'Partial': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Settlement Hub</h1>
          <p className="text-slate-600">Comprehensive settlement management and monitoring</p>
        </div>
      </div>

      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          {/* Status Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusCards.map((card) => (
              <Card key={card.title} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{card.title}</p>
                      <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                      <p className="text-sm text-slate-500 mt-1">{card.change}</p>
                    </div>
                    <card.icon className={`h-8 w-8 ${card.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Settlement Instructions</CardTitle>
              <div className="flex gap-2 mt-2">
                <Select defaultValue="all" onValueChange={setStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="settled">Settled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all" onValueChange={setPriority}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Search..." className="w-48" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-28">ID</TableHead>
                      <TableHead className="w-32">Instruction</TableHead>
                      <TableHead className="w-28">Counterparty</TableHead>
                      <TableHead className="w-28">Security</TableHead>
                      <TableHead className="w-20 text-right">Qty</TableHead>
                      <TableHead className="w-24 text-right">Amount</TableHead>
                      <TableHead className="w-16">Curr</TableHead>
                      <TableHead className="w-20">Status</TableHead>
                      <TableHead className="w-20">Priority</TableHead>
                      <TableHead className="w-24">Settlement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {settlements.map((settlement) => (
                      <TableRow key={settlement.id}>
                        <TableCell className="font-mono text-xs">{settlement.id}</TableCell>
                        <TableCell className="text-sm">{settlement.instruction}</TableCell>
                        <TableCell className="text-sm">{settlement.counterparty}</TableCell>
                        <TableCell className="font-mono text-xs">{settlement.security}</TableCell>
                        <TableCell className="text-right text-sm">{settlement.quantity.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-sm">{settlement.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{settlement.currency}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(settlement.status)}>
                            {settlement.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(settlement.priority)}>
                            {settlement.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{settlement.settlement_date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start">Process Settlements</Button>
              <Button variant="outline" className="w-full justify-start">Generate Report</Button>
              <Button variant="outline" className="w-full justify-start">Export Data</Button>
              <Button variant="outline" className="w-full justify-start">Reconcile</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementHubPage;
