
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus, CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';

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
  custodian: string;
  creditor: string;
  debtor: string;
  status: string;
}

const SettlementHubPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const transactions: Transaction[] = [
    {
      reference: 'STL001',
      operation: 'DVP',
      instrument: 'UAE001',
      quantity: 1000,
      faceAmount: 100000,
      valueDate: '2024-01-15',
      settlementDate: '2024-01-17',
      currency: 'AED',
      seller: 'BANK001',
      deliveryCsdAccount: 'CSD001',
      buyer: 'BANK002',
      receiveCsdAccount: 'CSD002',
      custodian: 'CUST001',
      creditor: 'BANK001',
      debtor: 'BANK002',
      status: 'pending'
    },
    {
      reference: 'STL002',
      operation: 'RVP',
      instrument: 'UAE002',
      quantity: 500,
      faceAmount: 50000,
      valueDate: '2024-01-15',
      settlementDate: '2024-01-17',
      currency: 'USD',
      seller: 'BANK003',
      deliveryCsdAccount: 'CSD003',
      buyer: 'BANK004',
      receiveCsdAccount: 'CSD004',
      custodian: 'CUST002',
      creditor: 'BANK003',
      debtor: 'BANK004',
      status: 'confirmed'
    },
    {
      reference: 'STL003',
      operation: 'DVP',
      instrument: 'UAE003',
      quantity: 2000,
      faceAmount: 200000,
      valueDate: '2024-01-16',
      settlementDate: '2024-01-18',
      currency: 'AED',
      seller: 'BANK005',
      deliveryCsdAccount: 'CSD005',
      buyer: 'BANK006',
      receiveCsdAccount: 'CSD006',
      custodian: 'CUST003',
      creditor: 'BANK005',
      debtor: 'BANK006',
      status: 'failed'
    },
    {
      reference: 'STL004',
      operation: 'FOP',
      instrument: 'UAE004',
      quantity: 750,
      faceAmount: 75000,
      valueDate: '2024-01-16',
      settlementDate: '2024-01-18',
      currency: 'EUR',
      seller: 'BANK007',
      deliveryCsdAccount: 'CSD007',
      buyer: 'BANK008',
      receiveCsdAccount: 'CSD008',
      custodian: 'CUST004',
      creditor: 'BANK007',
      debtor: 'BANK008',
      status: 'settled'
    },
    {
      reference: 'STL005',
      operation: 'DVP',
      instrument: 'UAE005',
      quantity: 1250,
      faceAmount: 125000,
      valueDate: '2024-01-17',
      settlementDate: '2024-01-19',
      currency: 'USD',
      seller: 'BANK009',
      deliveryCsdAccount: 'CSD009',
      buyer: 'BANK010',
      receiveCsdAccount: 'CSD010',
      custodian: 'CUST005',
      creditor: 'BANK009',
      debtor: 'BANK010',
      status: 'pending'
    },
    {
      reference: 'STL006',
      operation: 'RVP',
      instrument: 'UAE006',
      quantity: 800,
      faceAmount: 80000,
      valueDate: '2024-01-17',
      settlementDate: '2024-01-19',
      currency: 'AED',
      seller: 'BANK011',
      deliveryCsdAccount: 'CSD011',
      buyer: 'BANK012',
      receiveCsdAccount: 'CSD012',
      custodian: 'CUST006',
      creditor: 'BANK011',
      debtor: 'BANK012',
      status: 'confirmed'
    },
    {
      reference: 'STL007',
      operation: 'DVP',
      instrument: 'UAE007',
      quantity: 1500,
      faceAmount: 150000,
      valueDate: '2024-01-18',
      settlementDate: '2024-01-20',
      currency: 'GBP',
      seller: 'BANK013',
      deliveryCsdAccount: 'CSD013',
      buyer: 'BANK014',
      receiveCsdAccount: 'CSD014',
      custodian: 'CUST007',
      creditor: 'BANK013',
      debtor: 'BANK014',
      status: 'pending'
    },
    {
      reference: 'STL008',
      operation: 'FOP',
      instrument: 'UAE008',
      quantity: 600,
      faceAmount: 60000,
      valueDate: '2024-01-18',
      settlementDate: '2024-01-20',
      currency: 'AED',
      seller: 'BANK015',
      deliveryCsdAccount: 'CSD015',
      buyer: 'BANK016',
      receiveCsdAccount: 'CSD016',
      custodian: 'CUST008',
      creditor: 'BANK015',
      debtor: 'BANK016',
      status: 'failed'
    },
    {
      reference: 'STL009',
      operation: 'DVP',
      instrument: 'UAE009',
      quantity: 1100,
      faceAmount: 110000,
      valueDate: '2024-01-19',
      settlementDate: '2024-01-21',
      currency: 'USD',
      seller: 'BANK017',
      deliveryCsdAccount: 'CSD017',
      buyer: 'BANK018',
      receiveCsdAccount: 'CSD018',
      custodian: 'CUST009',
      creditor: 'BANK017',
      debtor: 'BANK018',
      status: 'settled'
    },
    {
      reference: 'STL010',
      operation: 'RVP',
      instrument: 'UAE010',
      quantity: 900,
      faceAmount: 90000,
      valueDate: '2024-01-19',
      settlementDate: '2024-01-21',
      currency: 'EUR',
      seller: 'BANK019',
      deliveryCsdAccount: 'CSD019',
      buyer: 'BANK020',
      receiveCsdAccount: 'CSD020',
      custodian: 'CUST010',
      creditor: 'BANK019',
      debtor: 'BANK020',
      status: 'confirmed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTransactions(filteredTransactions.map(t => t.reference));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (reference: string, checked: boolean) => {
    if (checked) {
      setSelectedTransactions(prev => [...prev, reference]);
    } else {
      setSelectedTransactions(prev => prev.filter(id => id !== reference));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'settled':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'settled':
        return <Badge className="bg-blue-100 text-blue-800">Settled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Settlement Hub</h1>
          <p className="text-slate-600">Monitor and manage settlement transactions</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
          <Button variant="outline">
            Authorize
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="settled">Settled</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedTransactions.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                {selectedTransactions.length} transaction(s) selected
              </p>
            </div>
          )}

          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>Instrument</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Face Amount</TableHead>
                  <TableHead>Value Date</TableHead>
                  <TableHead>Settlement Date</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Deliver CSD Account</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Receive CSD Account</TableHead>
                  <TableHead>Custodian</TableHead>
                  <TableHead>Creditor</TableHead>
                  <TableHead>Debtor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.reference}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.reference)}
                        onCheckedChange={(checked) => handleSelectTransaction(transaction.reference, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                    <TableCell>{transaction.operation}</TableCell>
                    <TableCell>{transaction.instrument}</TableCell>
                    <TableCell className="text-right">{transaction.quantity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{transaction.faceAmount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.valueDate}</TableCell>
                    <TableCell>{transaction.settlementDate}</TableCell>
                    <TableCell>{transaction.currency}</TableCell>
                    <TableCell>{transaction.seller}</TableCell>
                    <TableCell>{transaction.deliveryCsdAccount}</TableCell>
                    <TableCell>{transaction.buyer}</TableCell>
                    <TableCell>{transaction.receiveCsdAccount}</TableCell>
                    <TableCell>{transaction.custodian}</TableCell>
                    <TableCell>{transaction.creditor}</TableCell>
                    <TableCell>{transaction.debtor}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        {getStatusBadge(transaction.status)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No transactions found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettlementHubPage;
