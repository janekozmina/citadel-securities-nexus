import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AlertsPanel } from '@/components/common/AlertsPanel';
import { ArrowUpDown, Calculator, Pause, Eye } from 'lucide-react';

const accountsData = [
  { id: '0003800040120300062', availableBalance: 65611.992, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 65611.992, potentialBalance: 65611.992, accountType: 'SA', participantName: 'BANQUE CENTRALE' },
  { id: '0003800040120300063', availableBalance: 27074.258, currency: 'TND', debitTurnover: 7584.212, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 27074.258, potentialBalance: 27074.258, accountType: 'SA', participantName: 'BANQUE CENTRALE' },
  { id: '0003800040120300031', availableBalance: 21832.231, currency: 'TND', debitTurnover: 244.813, creditTurnover: 93.170, totalDebitQueue: 0.000, totalCreditQueue: 21832.231, potentialBalance: 21832.231, accountType: 'SA', participantName: 'BANQUE CENTRALE' },
  { id: '0003800040120300002', availableBalance: 3639.321, currency: 'TND', debitTurnover: 0.000, creditTurnover: 284.000, totalDebitQueue: 0.000, totalCreditQueue: 1639.321, potentialBalance: 1639.321, accountType: 'SA', participantName: 'BANQUE TUNISO-LYBIENNE' },
  { id: '0003800040120300029', availableBalance: 140.190, currency: 'TND', debitTurnover: 650.030, creditTurnover: 2056.260, totalDebitQueue: 190.000, totalCreditQueue: 330.230, potentialBalance: 330.230, accountType: 'SA', participantName: 'CITE BANK' },
  { id: '0003800040120300051', availableBalance: 100.000, currency: 'TND', debitTurnover: 101000.000, creditTurnover: 149756.583, totalDebitQueue: 0.000, totalCreditQueue: 100.000, potentialBalance: 100.000, accountType: 'SA', participantName: 'NORTH AFRICA INTERNATIONAL BANK' },
  { id: '0003800040120300035', availableBalance: 99.574, currency: 'TND', debitTurnover: 173904.013, creditTurnover: 152390.000, totalDebitQueue: 0.000, totalCreditQueue: 99.574, potentialBalance: 99.574, accountType: 'TND', participantName: 'BANQUE NATIONALE AGRICOLE' },
  { id: '0003800040120370040', availableBalance: 58.521, currency: 'TND', debitTurnover: 44.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 58.521, potentialBalance: 58.521, accountType: 'SA', participantName: 'TUNIS INTERNATIONAL BANK' },
  { id: '0003800040120378079', availableBalance: 43.141, currency: 'TND', debitTurnover: 0.000, creditTurnover: 0.000, totalDebitQueue: 0.000, totalCreditQueue: 43.141, potentialBalance: 43.141, accountType: 'SA', participantName: 'QATAR NATIONAL BANK-TUNISIE' },
];

export default function AccountManagementPage() {
  const [filterCurrency, setFilterCurrency] = useState('all');
  const [filterAccountType, setFilterAccountType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getBalanceColor = (balance: number) => {
    if (balance < 50) return 'text-red-600';
    if (balance < 100) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = accountsData.filter(account => {
      const matchesSearch = account.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.id.includes(searchTerm);
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
  }, [searchTerm, filterCurrency, filterAccountType, sortField, sortDirection]);

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

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning' as const,
      message: 'Account ABC123 approaching overdraft limit',
      time: '15:23',
      urgent: true,
      category: 'context' as const,
      source: 'RTGS'
    },
    {
      id: 2,
      type: 'info' as const,
      message: '3 new account applications pending approval',
      time: '14:45',
      urgent: false,
      category: 'context' as const,
      source: 'RTGS'
    },
    {
      id: 3,
      type: 'alert' as const,
      message: 'System maintenance scheduled for tonight at 23:00',
      time: '14:15',
      urgent: false,
      category: 'global' as const,
      source: 'System'
    }
  ]);

  const handleDismissAlert = (alertId: number) => {
    console.log('Dismissing alert:', alertId);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">RTGS — Account Management</h1>
            <p className="text-slate-600">Comprehensive account management and balance monitoring</p>
          </div>
        </div>

        {/* Alerts Panel */}
        <AlertsPanel 
          alerts={alerts} 
          onDismissAlert={handleDismissAlert}
          className="mb-6"
        />

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
                  <div className="text-2xl font-bold">BHD {totalBalance.toLocaleString()}</div>
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
                      <SelectItem value="TND">TND</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all" onValueChange={setFilterAccountType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="SA">SA</SelectItem>
                      <SelectItem value="TND">TND</SelectItem>
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
                          <TableCell className="font-medium text-sm">{account.participantName}</TableCell>
                          <TableCell className={`text-right font-medium ${getBalanceColor(account.availableBalance)}`}>
                            BHD {account.availableBalance.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{account.currency}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{account.debitTurnover.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{account.creditTurnover.toLocaleString()}</TableCell>
                          <TableCell className="text-right">BHD {account.potentialBalance.toLocaleString()}</TableCell>
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
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Show Total
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calculator className="h-4 w-4 mr-2" />
                  Set Overdraft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Pause className="h-4 w-4 mr-2" />
                  Suspend Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}