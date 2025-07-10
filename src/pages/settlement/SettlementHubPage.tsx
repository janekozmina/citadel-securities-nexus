
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
  reference: string;
  operation: string;
  instrument: string;
  quantity: number;
  faceAmount: number;
  valueDate: string;
  settlementDate: string;
  currency: string;
  seller: string;
  deliveryCsdAccount: string;
  buyer: string;
  receiveCsdAccount: string;
  local: string;
  remote: string;
  priority: number;
  ttc: string;
  via: string;
  debtor: string;
  status: 'Not for send' | 'Wait for send' | 'Sent' | 'Not matched' | 'Confirmed';
}

const mockTransactions: Transaction[] = [
  {
    reference: '11100XXXX80205001',
    operation: 'DvP',
    instrument: 'TESTQTY002',
    quantity: 2000000,
    faceAmount: 0,
    valueDate: '20.08.2024',
    settlementDate: '20.08.2024',
    currency: 'MNT',
    seller: '1100052',
    deliveryCsdAccount: '1100062C1T100',
    buyer: 'CITIPHKK',
    receiveCsdAccount: 'CITIDEPO',
    local: 'Not for send',
    remote: '',
    priority: 1000,
    ttc: 'RIM',
    via: '',
    debtor: ''
  },
  {
    reference: '11100XXXX80185002',
    operation: 'DvP',
    instrument: 'TESTBOND004',
    quantity: 1,
    faceAmount: 100000,
    valueDate: '15.08.2024',
    settlementDate: '16.08.2024',
    currency: 'MNT',
    seller: '1100052',
    deliveryCsdAccount: '1100062C1T100',
    buyer: 'CITIPHKK',
    receiveCsdAccount: 'CITIDEPO',
    local: 'Wait for send',
    remote: '',
    priority: 1000,
    ttc: 'RIM',
    via: '',
    debtor: ''
  },
  {
    reference: '01100XXXX80206001',
    operation: 'RvP',
    instrument: 'TESTBILL001',
    quantity: 100,
    faceAmount: 100,
    valueDate: '21.08.2024',
    settlementDate: '21.08.2024',
    currency: '',
    seller: 'BARBSCSG',
    deliveryCsdAccount: 'BARBDEPO',
    buyer: 'CITIPHKK',
    receiveCsdAccount: 'CITIDEPO',
    local: 'Sent',
    remote: 'Not matched',
    priority: 1000,
    ttc: 'UNFP - Undefined',
    via: 'WEB',
    debtor: ''
  },
  {
    reference: '11100XXXX80155003',
    operation: 'RvP',
    instrument: 'TESTQTY002',
    quantity: 200000,
    faceAmount: 0,
    valueDate: '15.08.2024',
    settlementDate: '15.08.2024',
    currency: 'MNT',
    seller: 'CITIPHKK',
    deliveryCsdAccount: 'CITIDEPO',
    buyer: '1100052',
    receiveCsdAccount: '1100062C1T100',
    local: 'Wait for send',
    remote: '',
    priority: 1000,
    ttc: 'RIM',
    via: '',
    debtor: ''
  },
  {
    reference: '22200XXXX90305004',
    operation: 'DvP',
    instrument: 'TESTEQUITY003',
    quantity: 5000,
    faceAmount: 250000,
    valueDate: '22.08.2024',
    settlementDate: '22.08.2024',
    currency: 'USD',
    seller: '2200073',
    deliveryCsdAccount: '2200073A2B200',
    buyer: 'JPMORGAN',
    receiveCsdAccount: 'JPMODEPO',
    local: 'Confirmed',
    remote: 'Confirmed',
    priority: 2000,
    ttc: 'USD',
    via: 'API',
    debtor: 'CLIENT_A'
  },
  {
    reference: '33300XXXX70405005',
    operation: 'DvP',
    instrument: 'TESTGOV005',
    quantity: 1500,
    faceAmount: 1500000,
    valueDate: '25.08.2024',
    settlementDate: '25.08.2024',
    currency: 'EUR',
    seller: '3300084',
    deliveryCsdAccount: '3300084E3C300',
    buyer: 'DEUTDEDB',
    receiveCsdAccount: 'DEUTDEPO',
    local: 'Not for send',
    remote: '',
    priority: 1500,
    ttc: 'EUR',
    via: 'SWIFT',
    debtor: 'FUND_B'
  },
  {
    reference: '44400XXXX60505006',
    operation: 'RvP',
    instrument: 'TESTCORP007',
    quantity: 750,
    faceAmount: 75000,
    valueDate: '28.08.2024',
    settlementDate: '28.08.2024',
    currency: 'GBP',
    seller: 'BAMLGB2L',
    deliveryCsdAccount: 'BAMLDEPO',
    buyer: '4400095',
    receiveCsdAccount: '4400095G4D400',
    local: 'Sent',
    remote: 'Confirmed',
    priority: 3000,
    ttc: 'GBP',
    via: 'WEB',
    debtor: 'INST_C'
  },
  {
    reference: '55500XXXX50605007',
    operation: 'DvP',
    instrument: 'TESTMUNI008',
    quantity: 300,
    faceAmount: 300000,
    valueDate: '30.08.2024',
    settlementDate: '30.08.2024',
    currency: 'CAD',
    seller: '5500106',
    deliveryCsdAccount: '5500106C5E500',
    buyer: 'RBCCATT2',
    receiveCsdAccount: 'RBCADEPO',
    local: 'Wait for send',
    remote: '',
    priority: 2500,
    ttc: 'CAD',
    via: 'API',
    debtor: 'PENSION_D'
  },
  {
    reference: '66600XXXX40705008',
    operation: 'RvP',
    instrument: 'TESTPRIV009',
    quantity: 1200,
    faceAmount: 1200000,
    valueDate: '02.09.2024',
    settlementDate: '02.09.2024',
    currency: 'JPY',
    seller: 'MHCBJPJT',
    deliveryCsdAccount: 'MHCBDEPO',
    buyer: '6600117',
    receiveCsdAccount: '6600117J6F600',
    local: 'Not matched',
    remote: 'Sent',
    priority: 4000,
    ttc: 'JPY',
    via: 'SWIFT',
    debtor: 'HEDGE_E'
  },
  {
    reference: '77700XXXX30805009',
    operation: 'DvP',
    instrument: 'TESTINFRA010',
    quantity: 800,
    faceAmount: 800000,
    valueDate: '05.09.2024',
    settlementDate: '05.09.2024',
    currency: 'AUD',
    seller: '7700128',
    deliveryCsdAccount: '7700128A7G700',
    buyer: 'ANZBAU3M',
    receiveCsdAccount: 'ANZBDEPO',
    local: 'Confirmed',
    remote: 'Confirmed',
    priority: 1800,
    ttc: 'AUD',
    via: 'WEB',
    debtor: 'SUPER_F'
  }
];

const SettlementHubPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Transaction>('reference');
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
        transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.operation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      case 'Confirmed': return 'default';
      case 'Wait for send': return 'secondary';
      case 'Not for send': return 'outline';
      case 'Sent': return 'default';
      case 'Not matched': return 'destructive';
      default: return 'outline';
    }
  };

  const handleCreate = () => {
    console.log('Create new transaction');
  };

  const handleAuthorize = (transactionId: string) => {
    console.log('Authorize transaction:', transactionId);
  };

  const handleSelectTransaction = (reference: string) => {
    setSelectedTransactions(prev => 
      prev.includes(reference) 
        ? prev.filter(id => id !== reference)
        : [...prev, reference]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredAndSortedTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredAndSortedTransactions.map(t => t.reference));
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
                placeholder="Search transactions, instruments, participants..."
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
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Wait for send">Wait for send</SelectItem>
                  <SelectItem value="Not for send">Not for send</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Not matched">Not matched</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
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
                    className="cursor-pointer hover:bg-gray-50 min-w-[140px]"
                    onClick={() => handleSort('reference')}
                  >
                    <div className="flex items-center gap-1">
                      Reference
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('operation')}
                  >
                    <div className="flex items-center gap-1">
                      Operation
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('instrument')}
                  >
                    <div className="flex items-center gap-1">
                      Instrument
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
                    onClick={() => handleSort('faceAmount')}
                  >
                    <div className="flex items-center gap-1">
                      Face amount
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('valueDate')}
                  >
                    <div className="flex items-center gap-1">
                      Value Date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('settlementDate')}
                  >
                    <div className="flex items-center gap-1">
                      Settlement date
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('currency')}
                  >
                    <div className="flex items-center gap-1">
                      Currency
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
                  <TableHead className="min-w-[120px]">Delivery CSD acc.</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('buyer')}
                  >
                    <div className="flex items-center gap-1">
                      Buyer
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[120px]">Receive CSD acc.</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Remote</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center gap-1">
                      Priority
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>TTC</TableHead>
                  <TableHead>Via</TableHead>
                  <TableHead>Debtor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTransactions.map((transaction) => (
                  <TableRow key={transaction.reference}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.reference)}
                        onCheckedChange={() => handleSelectTransaction(transaction.reference)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-xs">
                      {transaction.reference}
                    </TableCell>
                    <TableCell className="text-xs">{transaction.operation}</TableCell>
                    <TableCell className="text-xs">{transaction.instrument}</TableCell>
                    <TableCell className="text-xs text-right">{transaction.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right">{transaction.faceAmount.toLocaleString()}</TableCell>
                    <TableCell className="text-xs">{transaction.valueDate}</TableCell>
                    <TableCell className="text-xs">{transaction.settlementDate}</TableCell>
                    <TableCell className="text-xs">{transaction.currency}</TableCell>
                    <TableCell className="text-xs">{transaction.seller}</TableCell>
                    <TableCell className="text-xs">{transaction.deliveryCsdAccount}</TableCell>
                    <TableCell className="text-xs">{transaction.buyer}</TableCell>
                    <TableCell className="text-xs">{transaction.receiveCsdAccount}</TableCell>
                    <TableCell>
                      {transaction.local && (
                        <Badge variant={getStatusBadgeVariant(transaction.local)} className="text-xs">
                          {transaction.local}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {transaction.remote && (
                        <Badge variant={getStatusBadgeVariant(transaction.remote)} className="text-xs">
                          {transaction.remote}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs">{transaction.priority}</TableCell>
                    <TableCell className="text-xs">{transaction.ttc}</TableCell>
                    <TableCell className="text-xs">{transaction.via}</TableCell>
                    <TableCell className="text-xs">{transaction.debtor}</TableCell>
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
