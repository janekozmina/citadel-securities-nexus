import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowUpDown, Calculator, Pause, Eye } from 'lucide-react';
import portalConfig from '@/config/portalConfig';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

// Generate account data using config
const generateAccountData = () => {
  const banks = portalConfig.banks.commercial;
  const currencies = portalConfig.currencies.supported;
  const primaryCurrency = portalConfig.currencies.primary;
  
  return banks.slice(0, 15).map((bank, index) => {
    const currency = index < 3 ? primaryCurrency : currencies[index % currencies.length];
    const baseBalance = Math.floor(Math.random() * 100000) + 1000;
    
    return {
      id: `000380004012030${String(index + 1).padStart(4, '0')}`,
      availableBalance: baseBalance,
      currency: currency,
      debitTurnover: Math.floor(Math.random() * 50000),
      creditTurnover: Math.floor(Math.random() * 75000),
      totalDebitQueue: Math.floor(Math.random() * 1000),
      totalCreditQueue: baseBalance + Math.floor(Math.random() * 5000),
      potentialBalance: baseBalance + Math.floor(Math.random() * 2000),
      accountType: index % 3 === 0 ? 'SA' : 'CA',
      participantName: bank,
      bankCode: portalConfig.banks.codes[bank] || `B${String(index + 1).padStart(3, '0')}`
    };
  });
};

export default function AccountManagementPage() {
  const accountsData = useMemo(() => generateAccountData(), []);
  const [filterCurrency, setFilterCurrency] = useState('all');
  const [filterAccountType, setFilterAccountType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getBalanceColor = (balance: number) => {
    if (balance < 5000) return 'text-red-600';
    if (balance < 20000) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = accountsData.filter(account => {
      const matchesSearch = account.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.id.includes(searchTerm) ||
                          account.bankCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCurrency = filterCurrency === 'all' || account.currency === filterCurrency;
      const matchesAccountType = filterAccountType === 'all' || account.accountType === filterAccountType;
      
      return matchesSearch && matchesCurrency && matchesAccountType;
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
  }, [accountsData, searchTerm, filterCurrency, filterAccountType, sortField, sortDirection]);

  const paginatedAccounts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedAccounts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedAccounts, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedAccounts.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const totalBalance = accountsData.reduce((sum, account) => sum + account.availableBalance, 0);
  const currencySymbol = portalConfig.currencies.symbol;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">RTGS — Account Management</h1>
            <p className="text-slate-600">Comprehensive account management and balance monitoring</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Accounts</div>
                  <div className="text-2xl font-bold">{accountsData.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Balance</div>
                  <div className="text-2xl font-bold">{currencySymbol} {totalBalance.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Accounts</div>
                  <div className="text-2xl font-bold text-green-600">{accountsData.filter(a => a.availableBalance > 0).length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Accounts Table */}
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Select defaultValue="all" onValueChange={setFilterCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Currencies</SelectItem>
                      {portalConfig.currencies.supported.map(currency => (
                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all" onValueChange={setFilterAccountType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="CA">CA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Search accounts..." 
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
                          onClick={() => handleSort('id')}
                        >
                          <div className="flex items-center gap-1">
                            Account Code
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('bankCode')}
                        >
                          <div className="flex items-center gap-1">
                            Bank Code
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('participantName')}
                        >
                          <div className="flex items-center gap-1">
                            Participant
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('availableBalance')}
                        >
                          <div className="flex items-center gap-1">
                            Available Balance
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Debit Turnover</TableHead>
                        <TableHead>Credit Turnover</TableHead>
                        <TableHead>Potential Balance</TableHead>
                        <TableHead>Account Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAccounts.map((account) => (
                        <TableRow key={account.id} className="hover:bg-slate-50">
                          <TableCell className="font-mono text-xs">{account.id}</TableCell>
                          <TableCell className="font-medium text-sm">
                            <Badge variant="outline">{account.bankCode}</Badge>
                          </TableCell>
                          <TableCell className="font-medium text-sm">{account.participantName}</TableCell>
                          <TableCell className={`text-right font-medium ${getBalanceColor(account.availableBalance)}`}>
                            {account.currency === portalConfig.currencies.primary ? currencySymbol : account.currency} {account.availableBalance.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{account.currency}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{account.debitTurnover.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{account.creditTurnover.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {account.currency === portalConfig.currencies.primary ? currencySymbol : account.currency} {account.potentialBalance.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{account.accountType}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedAccounts.length)} of {filteredAndSortedAccounts.length} accounts
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
            <QuickActionsManager 
              pageKey="account-management" 
              systemType="rtgs" 
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}