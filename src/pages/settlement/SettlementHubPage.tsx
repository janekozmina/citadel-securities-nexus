
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, ArrowUpDown, Plus, CheckCircle } from 'lucide-react';

interface Transaction {
  transactionId: string;
  isinCode: string;
  securityName: string;
  tradeDate: string;
  settlementDate: string;
  buyer: string;
  seller: string;
  quantity: number;
  status: 'Settled' | 'Pending' | 'Failed' | 'In Progress' | 'Authorized' | 'Created';
}

const mockTransactions: Transaction[] = [
  {
    transactionId: 'TXN-20250701-001',
    isinCode: 'AE0001234567',
    securityName: 'ABC Corp Bonds 2029',
    tradeDate: '2025-07-01',
    settlementDate: '2025-07-03',
    buyer: 'Bank A',
    seller: 'Bank B',
    quantity: 10000,
    status: 'Settled'
  },
  {
    transactionId: 'TXN-20250702-005',
    isinCode: 'AE0009876543',
    securityName: 'DEF Equity',
    tradeDate: '2025-07-02',
    settlementDate: '2025-07-02',
    buyer: 'Broker X',
    seller: 'Custodian Y',
    quantity: 5000,
    status: 'Pending'
  },
  {
    transactionId: 'TXN-20250703-012',
    isinCode: 'AE0001928374',
    securityName: 'GHI Gov Bond 2035',
    tradeDate: '2025-07-03',
    settlementDate: '2025-07-05',
    buyer: 'Bank Z',
    seller: 'Broker A',
    quantity: 1000,
    status: 'Failed'
  },
  {
    transactionId: 'TXN-20250704-018',
    isinCode: 'AE0008765432',
    securityName: 'JKL Sukuk 2030',
    tradeDate: '2025-07-04',
    settlementDate: '2025-07-06',
    buyer: 'Custodian C',
    seller: 'Broker B',
    quantity: 7500,
    status: 'In Progress'
  },
  {
    transactionId: 'TXN-20250705-025',
    isinCode: 'AE0005432167',
    securityName: 'MNO Real Estate Fund',
    tradeDate: '2025-07-05',
    settlementDate: '2025-07-07',
    buyer: 'Fund Manager A',
    seller: 'Bank C',
    quantity: 2500,
    status: 'Authorized'
  },
  {
    transactionId: 'TXN-20250706-032',
    isinCode: 'AE0003456789',
    securityName: 'PQR Islamic Bond',
    tradeDate: '2025-07-06',
    settlementDate: '2025-07-08',
    buyer: 'Islamic Bank A',
    seller: 'Investment Co B',
    quantity: 15000,
    status: 'Created'
  },
  {
    transactionId: 'TXN-20250707-039',
    isinCode: 'AE0007891234',
    securityName: 'STU Tech Stock',
    tradeDate: '2025-07-07',
    settlementDate: '2025-07-09',
    buyer: 'Tech Fund X',
    seller: 'Pension Fund Y',
    quantity: 3000,
    status: 'Pending'
  },
  {
    transactionId: 'TXN-20250708-046',
    isinCode: 'AE0002468135',
    securityName: 'VWX Energy Bond',
    tradeDate: '2025-07-08',
    settlementDate: '2025-07-10',
    buyer: 'Energy Fund A',
    seller: 'Sovereign Fund B',
    quantity: 8000,
    status: 'Settled'
  },
  {
    transactionId: 'TXN-20250709-053',
    isinCode: 'AE0008642097',
    securityName: 'YZA Infrastructure Fund',
    tradeDate: '2025-07-09',
    settlementDate: '2025-07-11',
    buyer: 'Infrastructure Co',
    seller: 'Private Bank C',
    quantity: 4500,
    status: 'In Progress'
  },
  {
    transactionId: 'TXN-20250710-060',
    isinCode: 'AE0001357924',
    securityName: 'BCD Healthcare ETF',
    tradeDate: '2025-07-10',
    settlementDate: '2025-07-12',
    buyer: 'Healthcare Fund',
    seller: 'Retail Broker D',
    quantity: 6000,
    status: 'Failed'
  }
];

const SettlementHubPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Transaction>('transactionId');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      const matchesSearch = 
        transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.isinCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.securityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.seller.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Settled': return 'default';
      case 'Pending': return 'secondary';
      case 'Failed': return 'destructive';
      case 'In Progress': return 'outline';
      case 'Authorized': return 'default';
      case 'Created': return 'secondary';
      default: return 'outline';
    }
  };

  const handleCreate = () => {
    console.log('Create new transaction');
  };

  const handleAuthorize = (transactionId: string) => {
    console.log('Authorize transaction:', transactionId);
  };

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredAndSortedTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredAndSortedTransactions.map(t => t.transactionId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Transaction Monitoring</h1>
        <div className="flex gap-2">
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Authorize
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAuthorize('bulk')}>
                Authorize Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAuthorize('all-pending')}>
                Authorize All Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions, ISIN, security name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Settled">Settled</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Authorized">Authorized</SelectItem>
                  <SelectItem value="Created">Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedTransactions.length === filteredAndSortedTransactions.length && filteredAndSortedTransactions.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('transactionId')}
                  >
                    <div className="flex items-center gap-1">
                      Transaction ID
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('isinCode')}
                  >
                    <div className="flex items-center gap-1">
                      ISIN Code
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('securityName')}
                  >
                    <div className="flex items-center gap-1">
                      Security Name
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('tradeDate')}
                  >
                    <div className="flex items-center gap-1">
                      Trade Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('settlementDate')}
                  >
                    <div className="flex items-center gap-1">
                      Settlement Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('buyer')}
                  >
                    <div className="flex items-center gap-1">
                      Buyer
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('seller')}
                  >
                    <div className="flex items-center gap-1">
                      Seller
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('quantity')}
                  >
                    <div className="flex items-center gap-1">
                      Quantity
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.transactionId)}
                        onCheckedChange={() => handleSelectTransaction(transaction.transactionId)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell>{transaction.isinCode}</TableCell>
                    <TableCell>{transaction.securityName}</TableCell>
                    <TableCell>{transaction.tradeDate}</TableCell>
                    <TableCell>{transaction.settlementDate}</TableCell>
                    <TableCell>{transaction.buyer}</TableCell>
                    <TableCell>{transaction.seller}</TableCell>
                    <TableCell>{transaction.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredAndSortedTransactions.length} of {transactions.length} transactions
            {selectedTransactions.length > 0 && (
              <span className="ml-4 font-medium">
                {selectedTransactions.length} selected
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettlementHubPage;
