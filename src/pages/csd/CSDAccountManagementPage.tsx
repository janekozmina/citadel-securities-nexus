import { useState, useMemo, useEffect } from 'react';
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
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCardsSection } from '@/components/common/MetricCardsSection';

// Generate CSD account data using config
const generateCSDAccountData = () => {
  const banks = portalConfig.banks.commercial;
  const currencies = portalConfig.currencies.supported;
  const primaryCurrency = portalConfig.currencies.primary;
  const securityTypes = ['Treasury Bill', 'Islamic Sukuk', 'Treasury Bond'];
  
  return Array.from({ length: 9000 }, (_, index) => {
    const bank = banks[index % banks.length];
    const currency = index < 3 ? primaryCurrency : currencies[index % currencies.length];
    const baseHoldings = Math.floor(Math.random() * 50000000) + 5000000; // 5M to 55M
    
    return {
      id: `CSD${String(index + 1).padStart(4, '0')}`,
      securityCode: securityTypes[index % securityTypes.length],
      securityHoldings: baseHoldings,
      currency: currency,
      marketValue: Math.floor(baseHoldings * (0.95 + Math.random() * 0.1)), // ±5% market fluctuation
      pendingSettlements: Math.floor(Math.random() * 10),
      collateralPosted: Math.floor(baseHoldings * (0.1 + Math.random() * 0.2)), // 10-30% collateral
      availableForTrading: Math.floor(baseHoldings * (0.7 + Math.random() * 0.2)), // 70-90% available
      accountType: index % 4 === 0 ? 'CUSTODY' : index % 4 === 1 ? 'TRADING' : index % 4 === 2 ? 'SETTLEMENT' : 'OMNIBUS',
      participantName: bank,
      participantCode: portalConfig.banks.codes[bank] || `BBMEBHBM${String(index + 1).padStart(3, '0')}`
    };
  });
};

export default function CSDAccountManagementPage() {
  const accountsData = useMemo(() => generateCSDAccountData(), []);
  const [filterCurrency, setFilterCurrency] = useState('all');
  const [filterAccountType, setFilterAccountType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = 'CSD Account Management | CBB Portal';
  }, []);

  const getHoldingsColor = (holdings: number) => {
    if (holdings < 10000000) return 'text-red-600'; // Below 10M
    if (holdings < 25000000) return 'text-yellow-600'; // 10M-25M
    return 'text-green-600'; // Above 25M
  };

  const getRiskLevel = (holdings: number) => {
    if (holdings < 10000000) return 'high';
    if (holdings < 25000000) return 'medium';
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
      const risk = getRiskLevel(account.securityHoldings);
      risks[risk as keyof typeof risks]++;
    });
    return risks;
  }, [accountsData]);

  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = accountsData.filter(account => {
      const matchesSearch = account.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          account.id.includes(searchTerm) ||
                          account.participantCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCurrency = filterCurrency === 'all' || account.currency === filterCurrency;
      const matchesAccountType = filterAccountType === 'all' || account.accountType === filterAccountType;
      const matchesRisk = riskFilter === 'all' || getRiskLevel(account.securityHoldings) === riskFilter;
      
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

  const totalHoldings = accountsData.reduce((sum, account) => sum + account.securityHoldings, 0);
  const totalMarketValue = accountsData.reduce((sum, account) => sum + account.marketValue, 0);
  const currencySymbol = portalConfig.currencies.symbol;

  const formatCurrency = (amount: number) => {
    return `${currencySymbol} ${amount.toLocaleString()}`;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <PageHeader />

        {/* Top Metrics Cards */}
        <MetricCardsSection
          metricsConfig={[
            {
              key: 'totalAccounts',
              title: 'Total Accounts',
              iconName: 'Users'
            },
            {
              key: 'totalHoldings',
              title: 'Total Holdings',
              valueFormatter: (value) => formatCurrency(value),
              iconName: 'Building2'
            },
            {
              key: 'totalMarketValue',
              title: 'Total Market Value',
              valueFormatter: (value) => formatCurrency(value),
              iconName: 'TrendingUp',
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
            totalHoldings: totalHoldings,
            totalMarketValue: totalMarketValue,
            highRiskAccounts: riskData.high
          }}
        />

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 min-h-[40px] mb-6">
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

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
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
                        <SelectItem value="CUSTODY">Custody</SelectItem>
                        <SelectItem value="TRADING">Trading</SelectItem>
                        <SelectItem value="SETTLEMENT">Settlement</SelectItem>
                        <SelectItem value="OMNIBUS">Omnibus</SelectItem>
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
                      Securities Holdings Risk Indicator
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
                        <div className="text-sm text-gray-600">Below 10M holdings</div>
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
                        <div className="text-sm text-gray-600">10M-25M range</div>
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
                        <div className="text-sm text-gray-600">Above 25M holdings</div>
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
                <CardTitle>CSD Account Management</CardTitle>
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
                          onClick={() => handleSort('participantCode')}
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
                          onClick={() => handleSort('securityCode')}
                        >
                          <div className="flex items-center gap-1">
                            Security Code
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('securityHoldings')}
                        >
                          <div className="flex items-center gap-1">
                            Security Holdings
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Market Value</TableHead>
                        <TableHead>Pending Settlements</TableHead>
                        <TableHead>Collateral Posted</TableHead>
                        <TableHead>Account Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAccounts.map((account) => (
                        <TableRow key={account.id} className="hover:bg-slate-50">
                          <TableCell className="font-mono text-xs">{account.id}</TableCell>
                          <TableCell className="font-medium text-sm">
                            <Badge variant="outline">{account.participantCode}</Badge>
                          </TableCell>
                          <TableCell className="font-medium text-sm">{account.participantName}</TableCell>
                          <TableCell className="font-medium text-sm">{account.securityCode}</TableCell>
                          <TableCell className={`text-right font-medium ${getHoldingsColor(account.securityHoldings)}`}>
                            {account.securityHoldings.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{account.currency}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{account.marketValue.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={account.pendingSettlements > 5 ? 'destructive' : 'secondary'}>
                              {account.pendingSettlements}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {account.collateralPosted.toLocaleString()}
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
            )}
          </div>

          {/* Quick Actions Sidebar */}
          <div className="w-80 pl-6">
            <QuickActionsManager
              pageKey="account-management"
              systemType="csd"
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}