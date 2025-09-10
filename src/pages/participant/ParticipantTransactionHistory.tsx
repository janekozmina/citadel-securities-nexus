import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  History,
  Search,
  Filter,
  Download,
  Eye,
  ArrowUpDown,
  Calendar,
  RefreshCw
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  time: string;
  type: string;
  description: string;
  instrument: string;
  amount: number;
  counterparty: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Cancelled';
  reference: string;
  systemType: 'CSD' | 'RTGS';
}

const ParticipantTransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [systemFilter, setSystemFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30days');

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      date: '2024-01-15',
      time: '14:30:25',
      type: 'DvP Transfer',
      description: 'Delivery vs Payment Settlement',
      instrument: 'GOVT-TB-001',
      amount: 5000000,
      counterparty: 'Bank of Bahrain',
      status: 'Completed',
      reference: 'DVP20240115001',
      systemType: 'CSD'
    },
    {
      id: 'TXN002',
      date: '2024-01-15',
      time: '13:45:12',
      type: 'Institution Transfer',
      description: 'Bank-to-bank transfer',
      instrument: 'BHD',
      amount: 2500000,
      counterparty: 'National Bank of Bahrain',
      status: 'Completed',
      reference: 'RT20240115001',
      systemType: 'RTGS'
    },
    {
      id: 'TXN003',
      date: '2024-01-15',
      time: '12:20:45',
      type: 'Repo Transaction',
      description: 'Repurchase Agreement',
      instrument: 'GOVT-BND-005',
      amount: 10000000,
      counterparty: 'Gulf International Bank',
      status: 'Pending',
      reference: 'REPO20240115001',
      systemType: 'CSD'
    },
    {
      id: 'TXN004',
      date: '2024-01-14',
      time: '16:15:33',
      type: 'Customer Credit Transfer',
      description: 'Customer payment processing',
      instrument: 'BHD',
      amount: 750000,
      counterparty: 'Customer Account',
      status: 'Completed',
      reference: 'CCT20240114001',
      systemType: 'RTGS'
    },
    {
      id: 'TXN005',
      date: '2024-01-14',
      time: '15:30:18',
      type: 'Islamic Repo',
      description: 'Sharia-compliant repo operation',
      instrument: 'SUKUK-ISL-003',
      amount: 3000000,
      counterparty: 'Islamic Investment Bank',
      status: 'Completed',
      reference: 'IREPO20240114001',
      systemType: 'CSD'
    },
    {
      id: 'TXN006',
      date: '2024-01-14',
      time: '11:45:22',
      type: 'General Transfer',
      description: 'General funds transfer',
      instrument: 'BHD',
      amount: 1250000,
      counterparty: 'Ahli United Bank',
      status: 'Failed',
      reference: 'GT20240114001',
      systemType: 'CSD'
    },
    {
      id: 'TXN007',
      date: '2024-01-13',
      time: '14:20:15',
      type: 'House Transfer',
      description: 'Internal house transfer',
      instrument: 'CORP-BD-012',
      amount: 500000,
      counterparty: 'Internal Account',
      status: 'Completed',
      reference: 'HT20240113001',
      systemType: 'CSD'
    },
    {
      id: 'TXN008',
      date: '2024-01-13',
      time: '10:30:44',
      type: 'Cover Transfer',
      description: 'Cover payment instruction',
      instrument: 'BHD',
      amount: 4000000,
      counterparty: 'Central Bank of Bahrain',
      status: 'Completed',
      reference: 'CT20240113001',
      systemType: 'RTGS'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Pending': return 'secondary';
      case 'Failed': return 'destructive';
      case 'Cancelled': return 'outline';
      default: return 'secondary';
    }
  };

  const getSystemBadgeColor = (systemType: string) => {
    return systemType === 'CSD' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || txn.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSystem = systemFilter === 'all' || txn.systemType.toLowerCase() === systemFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesSystem;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">View and manage your CSD & RTGS transaction history</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={systemFilter} onValueChange={setSystemFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                <SelectItem value="csd">CSD</SelectItem>
                <SelectItem value="rtgs">RTGS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            <p className="text-xs text-muted-foreground">In selected period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              BHD {filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Transaction volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((filteredTransactions.filter(t => t.status === 'Completed').length / filteredTransactions.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredTransactions.filter(t => t.status === 'Pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Transaction Details
          </CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Counterparty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>System</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{new Date(transaction.date).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">{transaction.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{transaction.type}</div>
                      <div className="text-sm text-muted-foreground">{transaction.instrument}</div>
                    </TableCell>
                    <TableCell>
                      <div>{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">Ref: {transaction.reference}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      BHD {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{transaction.counterparty}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getSystemBadgeColor(transaction.systemType)}
                      >
                        {transaction.systemType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantTransactionHistory;