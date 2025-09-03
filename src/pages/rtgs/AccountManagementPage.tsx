import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { ArrowUpDown, Calculator, Pause, Eye, BarChart3, TableIcon, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import portalConfig from '@/config/portalConfig';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

// Generate account data using config
const generateAccountData = () => {
  const banks = portalConfig.banks.commercial;
  const currencies = portalConfig.currencies.supported;
  const primaryCurrency = portalConfig.currencies.primary;
  
  return banks.slice(0, 15).map((bank, index) => {
    const currency = index < 3 ? primaryCurrency : currencies[index % currencies.length];
    const baseBalance = Math.floor(Math.random() * 100000) + 1000;
    
    // Generate proper 8-character BIC code
    const bankCode = portalConfig.banks.codes[bank];
    let bic: string;
    if (bankCode && bankCode.length >= 6) {
      // Use existing bank code and ensure it's 8 characters
      bic = bankCode.length === 8 ? bankCode : `${bankCode}BH`;
    } else {
      // Generate BIC: 4-letter bank identifier + 2-letter country (BH) + 2-letter location
      const bankName = bank.replace(/[^A-Z]/g, '').substring(0, 4).padEnd(4, 'X');
      bic = `${bankName}BHBM`;
    }

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
      bic: bic
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
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const itemsPerPage = 10;

  const getBalanceColor = (balance: number) => {
    if (balance < 5000) return 'text-red-600';
    if (balance < 20000) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskLevel = (balance: number) => {
    if (balance < 5000) return 'high';
    if (balance < 20000) return 'medium';
    return 'low';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const riskData = useMemo(() => {
    const risks = { low: 0, medium: 0, high: 0 };
    accountsData.forEach(account => {
      const risk = getRiskLevel(account.availableBalance);
      risks[risk as keyof typeof risks]++;
    });
    return risks;
  }, [accountsData]);

  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = accountsData.filter(account => {
      const matchesSearch = account.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.id.includes(searchTerm) ||
                          account.bic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCurrency = filterCurrency === 'all' || account.currency === filterCurrency;
      const matchesAccountType = filterAccountType === 'all' || account.accountType === filterAccountType;
      const matchesRisk = riskFilter === 'all' || getRiskLevel(account.availableBalance) === riskFilter;
      
      return matchesSearch && matchesCurrency && matchesAccountType && matchesRisk;
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
  }, [accountsData, searchTerm, filterCurrency, filterAccountType, riskFilter, sortField, sortDirection]);

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
      <div className="space-y-6 min-h-screen">
        <PageHeader />

        <div className="flex gap-6 min-w-fit">
          <div className="flex-1 min-w-0 max-w-[calc(100vw-320px)] space-y-6">
            {/* Top Metrics Cards */}
            <MetricCardsSection
              metricsConfig={[
                {
                  key: 'totalAccounts',
                  title: 'Total Accounts',
                  iconName: 'Users'
                },
                {
                  key: 'totalBalance',
                  title: 'Total Balance',
                  valueFormatter: (value) => `${currencySymbol} ${value.toLocaleString()}`,
                  iconName: 'DollarSign'
                },
                {
                  key: 'activeAccounts',
                  title: 'Active Accounts',
                  iconName: 'CheckCircle',
                  iconColor: 'text-green-600',
                  textColor: 'text-green-600'
                },
                {
                  key: 'highRiskAccounts',
                  title: 'High Risk Accounts',
                  iconName: 'AlertTriangle',
                  iconColor: 'text-red-600',
                  textColor: 'text-red-600'
                }
              ]}
              data={accountsData}
              stats={{
                totalAccounts: accountsData.length,
                totalBalance: totalBalance,
                activeAccounts: accountsData.filter(a => a.availableBalance > 0).length,
                highRiskAccounts: riskData.high
              }}
            />

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-slate-700">View Mode:</span>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  <TableIcon className="h-4 w-4 mr-2" />
                  Table
                </Button>
                <Button
                  variant={viewMode === 'visual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('visual')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </div>

            {/* Filters Section - Only show for table view */}
            {viewMode === 'table' && (
              <Card className="bg-slate-50">
                <CardContent className="p-4">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm font-medium text-slate-700">Filters:</span>
                    <Select value={filterCurrency} onValueChange={setFilterCurrency}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Currencies</SelectItem>
                        {portalConfig.currencies.supported.map(currency => (
                          <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={filterAccountType} onValueChange={setFilterAccountType}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Account Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="CA">CA</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={riskFilter} onValueChange={(value: 'all' | 'low' | 'medium' | 'high') => setRiskFilter(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Risk Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input 
                      placeholder="Search accounts..." 
                      className="w-48" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {riskFilter !== 'all' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRiskFilter('all')}
                      >
                        Clear Risk Filter
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Risk Dashboard View */}
            {viewMode === 'visual' && (
              <div className="space-y-6">
                {/* Risk Indicator Gauge */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Potential Balance Risk Indicator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* High Risk */}
                      <div 
                        className="cursor-pointer p-4 border rounded-lg hover:shadow-md transition-shadow"
                        onClick={() => {
                          setRiskFilter('high');
                          setViewMode('table');
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="font-medium text-red-700">High Risk</span>
                          </div>
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="text-2xl font-bold text-red-600 mb-1">{riskData.high}</div>
                        <div className="text-sm text-gray-600">Below 5K threshold</div>
                        <Progress 
                          value={(riskData.high / accountsData.length) * 100} 
                          className="mt-2 h-2"
                        />
                      </div>

                      {/* Medium Risk */}
                      <div 
                        className="cursor-pointer p-4 border rounded-lg hover:shadow-md transition-shadow"
                        onClick={() => {
                          setRiskFilter('medium');
                          setViewMode('table');
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="font-medium text-yellow-700">Medium Risk</span>
                          </div>
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-600 mb-1">{riskData.medium}</div>
                        <div className="text-sm text-gray-600">5K-20K range</div>
                        <Progress 
                          value={(riskData.medium / accountsData.length) * 100} 
                          className="mt-2 h-2"
                        />
                      </div>

                      {/* Low Risk */}
                      <div 
                        className="cursor-pointer p-4 border rounded-lg hover:shadow-md transition-shadow"
                        onClick={() => {
                          setRiskFilter('low');
                          setViewMode('table');
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="font-medium text-green-700">Low Risk</span>
                          </div>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold text-green-600 mb-1">{riskData.low}</div>
                        <div className="text-sm text-gray-600">Above 20K threshold</div>
                        <Progress 
                          value={(riskData.low / accountsData.length) * 100} 
                          className="mt-2 h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Accounts Table */}
            {viewMode === 'table' && (
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
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
                          onClick={() => handleSort('bic')}
                        >
                          <div className="flex items-center gap-1">
                            BIC
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
                        <TableHead>Total Debit Queue</TableHead>
                        <TableHead>Total Credit Queue</TableHead>
                        <TableHead>Potential Balance</TableHead>
                        <TableHead>Account Type</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.id}</TableCell>
                          <TableCell className="font-mono text-sm">{account.bic}</TableCell>
                          <TableCell>{account.participantName}</TableCell>
                          <TableCell className={getBalanceColor(account.availableBalance)}>
                            {currencySymbol} {account.availableBalance.toLocaleString()}
                          </TableCell>
                          <TableCell>{account.currency}</TableCell>
                          <TableCell>{currencySymbol} {account.debitTurnover.toLocaleString()}</TableCell>
                          <TableCell>{currencySymbol} {account.creditTurnover.toLocaleString()}</TableCell>
                          <TableCell>{currencySymbol} {account.totalDebitQueue.toLocaleString()}</TableCell>
                          <TableCell>{currencySymbol} {account.totalCreditQueue.toLocaleString()}</TableCell>
                          <TableCell>{currencySymbol} {account.potentialBalance.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={account.accountType === 'SA' ? 'default' : 'secondary'}>
                              {account.accountType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div 
                                className={`w-2 h-2 rounded-full ${getRiskColor(getRiskLevel(account.availableBalance))}`}
                              />
                              <span className="capitalize text-sm">
                                {getRiskLevel(account.availableBalance)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Calculator className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Pause className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      Showing {Math.min(filteredAndSortedAccounts.length, itemsPerPage)} of {filteredAndSortedAccounts.length} accounts
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm flex items-center px-3">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            )}
          </div>

          {/* Right Sidebar with Quick Actions - Always visible */}
          <div className="w-64 shrink-0">
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