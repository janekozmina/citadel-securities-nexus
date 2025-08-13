import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowUpDown, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

const balancesData = [
  { id: '0003800040124240088', participant: 'BANQUE DE TUNISIE ET DES EMIRATS', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 4439.726, currency: 'TND', debitTurnover: 100.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 4439.726 },
  { id: '0003800040124300078', participant: 'BANQUE NATIONALE AGRICOLE', accountCode: 'SA', accountType: 'BANQTFTT25', reservedAmount: 4434.569, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 4434.569 },
  { id: '0003800040120300031', participant: 'NORTH AFRICA INTERNATIONAL BANK', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 1569.996, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 1569.996 },
  { id: '0003800040120300064', participant: 'Union Internationale de Banques', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 1200.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 1000.000, totalDebitQueue: 0.000, totalCreditQueue: 1200.000, balance: 1200.000 },
  { id: '0003800040120700025', participant: 'CITE BANK S.A', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 258.370, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 258.370 },
  { id: '0003800040120700083', participant: 'QNBANK BANK', accountCode: 'SA', accountType: 'BCTNTTNT25', reservedAmount: 134.750, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 134.750 },
  { id: '0003800040120300070', participant: 'BANQUE DE TUNISIE', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 80.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 80.000 },
  { id: '0003800040120300049', participant: 'BANQUE DE TUNISIE', accountCode: 'SA', accountType: 'BCTNTTNTSA', reservedAmount: 75.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 75.000 },
  { id: '0003800040120300076', participant: 'BANQUE NATIONALE AGRICOLE', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 30.600, currency: 'TND', debitTurnover: 630.000, creditTurnover: 700.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 30.600 },
  { id: '0003800040124120001', participant: 'Union Internationale de Banques', accountCode: 'SA', accountType: 'RTSE', reservedAmount: 22.000, currency: 'TND', debitTurnover: 0.000, creditTurnover: 22.000, totalDebitQueue: 0.000, totalCreditQueue: 0.000, balance: 22.000 },
];

export default function BalancesLiquidityPage() {
  const [filterAccountType, setFilterAccountType] = useState('all');
  const [filterCurrency, setFilterCurrency] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getReserveStatusColor = (amount: number) => {
    if (amount < 100) return 'bg-red-100 text-red-800 border-red-200';
    if (amount < 500) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const filteredAndSortedBalances = useMemo(() => {
    let filtered = balancesData.filter(balance => {
      const matchesSearch = balance.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          balance.id.includes(searchTerm) ||
                          balance.accountType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAccountType = filterAccountType === 'all' || balance.accountType === filterAccountType;
      const matchesCurrency = filterCurrency === 'all' || balance.currency === filterCurrency;
      
      return matchesSearch && matchesAccountType && matchesCurrency;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof typeof a];
        let bValue = b[sortField as keyof typeof b];
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = (bValue as string).toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [searchTerm, filterAccountType, filterCurrency, sortField, sortDirection]);

  const paginatedBalances = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBalances.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedBalances, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBalances.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const totalReserved = balancesData.reduce((sum, balance) => sum + balance.reservedAmount, 0);
  const totalBalance = balancesData.reduce((sum, balance) => sum + balance.balance, 0);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">RTGS — Balances & Liquidity</h1>
            <p className="text-slate-600">Real-time participant balances and reserved amounts monitoring</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Reserves</div>
                  <div className="text-2xl font-bold">BHD {totalReserved.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Balance</div>
                  <div className="text-2xl font-bold">BHD {totalBalance.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Reserves</div>
                  <div className="text-2xl font-bold text-green-600">{balancesData.filter(b => b.reservedAmount > 0).length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Low Reserves</div>
                  <div className="text-2xl font-bold text-red-600">{balancesData.filter(b => b.reservedAmount < 100).length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Balances Table */}
            <Card>
              <CardHeader>
                <CardTitle>Balances & Liquidity</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Select defaultValue="all" onValueChange={setFilterAccountType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Account Types</SelectItem>
                      <SelectItem value="RTSE">RTSE</SelectItem>
                      <SelectItem value="BCTNTTNTSA">BCTNTTNTSA</SelectItem>
                      <SelectItem value="BANQTFTT25">BANQTFTT25</SelectItem>
                      <SelectItem value="BCTNTTNT25">BCTNTTNT25</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all" onValueChange={setFilterCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Currencies</SelectItem>
                      <SelectItem value="TND">TND</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Search participants..." 
                    className="w-48" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('participant')}
                        >
                          <div className="flex items-center gap-1">
                            Participant
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Account Code</TableHead>
                        <TableHead>Account Type</TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('reservedAmount')}
                        >
                          <div className="flex items-center gap-1">
                            Reserved Amount
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Debit Turnover</TableHead>
                        <TableHead>Credit Turnover</TableHead>
                        <TableHead>Total in Debit Queue</TableHead>
                        <TableHead>Total in Credit Queue</TableHead>
                        <TableHead>Personal Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBalances.map((balance) => (
                        <TableRow key={balance.id} className="hover:bg-slate-50">
                          <TableCell className="font-medium text-sm">{balance.participant}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{balance.accountCode}</Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{balance.accountType}</TableCell>
                          <TableCell>
                            <Badge className={getReserveStatusColor(balance.reservedAmount)}>
                              BHD {balance.reservedAmount.toLocaleString()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{balance.currency}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{balance.debitTurnover.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{balance.creditTurnover.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{balance.totalDebitQueue.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{balance.totalCreditQueue.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium">BHD {balance.balance.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedBalances.length)} of {filteredAndSortedBalances.length} records
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-3 text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Liquidity Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Reserve Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Balance Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}