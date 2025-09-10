import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { formatCurrency } from '@/config/currencyConfig';
import portalConfig from '@/config/portalConfig';

const PositionAccountsPage = () => {
  const positionAccountsData = [
    {
      accountId: 'POS001',
      accountName: 'NBB Securities Account',
      participant: portalConfig.banks.commercial[0] || 'NBB',
      accountType: 'Securities',
      currency: portalConfig.currencies.primary,
      currentBalance: 15750000,
      availableBalance: 15500000,
      blockedAmount: 250000,
      status: 'Active',
      lastUpdated: '2025-01-10 14:30:25',
      instrumentCode: 'BHD001',
      maturityDate: '2025-12-31'
    },
    {
      accountId: 'POS002',
      accountName: 'BBK Cash Account',
      participant: portalConfig.banks.commercial[1] || 'BBK',
      accountType: 'Cash',
      currency: portalConfig.currencies.primary,
      currentBalance: 8200000,
      availableBalance: 8200000,
      blockedAmount: 0,
      status: 'Active',
      lastUpdated: '2025-01-10 14:25:18',
      instrumentCode: 'CASH',
      maturityDate: 'N/A'
    },
    {
      accountId: 'POS003',
      accountName: 'GIB Investment Account',
      participant: portalConfig.banks.commercial[2] || 'GIB',
      accountType: 'Investment',
      currency: portalConfig.currencies.primary,
      currentBalance: 12300000,
      availableBalance: 11800000,
      blockedAmount: 500000,
      status: 'Restricted',
      lastUpdated: '2025-01-10 13:45:12',
      instrumentCode: 'BHD002',
      maturityDate: '2026-06-15'
    }
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'restricted':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'closed':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-blue-100 text-blue-800`;
    }
  };

  const getAccountTypeBadge = (type: string) => {
    const baseClasses = "text-xs font-medium";
    switch (type.toLowerCase()) {
      case 'securities':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cash':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'investment':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Position Accounts</h1>
        <p className="text-muted-foreground">Monitor and manage participant position accounts and balances</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search accounts..." className="w-64" />
              </div>
              <Button variant="outline">Filter by Type</Button>
              <Button variant="outline">Filter by Status</Button>
              <Button variant="outline">Filter by Participant</Button>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Position Accounts Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Position Accounts</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{positionAccountsData.length} accounts</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Account ID</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Account Name</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Participant</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Current Balance</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Available Balance</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Blocked Amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Last Updated</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Instrument</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Maturity</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positionAccountsData.map((account, index) => (
                  <tr key={account.accountId} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm font-mono">{account.accountId}</td>
                    <td className="py-2 px-4 text-sm font-medium">{account.accountName}</td>
                    <td className="py-2 px-4 text-sm">{account.participant}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className={getAccountTypeBadge(account.accountType)}>
                        {account.accountType}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{account.currency}</td>
                    <td className="py-2 px-4 text-sm font-mono">
                      {formatCurrency(account.currentBalance)}
                    </td>
                    <td className="py-2 px-4 text-sm font-mono">
                      {formatCurrency(account.availableBalance)}
                    </td>
                    <td className="py-2 px-4 text-sm font-mono">
                      {formatCurrency(account.blockedAmount)}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className={getStatusBadge(account.status)}>
                        {account.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{account.lastUpdated}</td>
                    <td className="py-2 px-4 text-sm">{account.instrumentCode}</td>
                    <td className="py-2 px-4 text-sm">{account.maturityDate}</td>
                    <td className="py-2 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(positionAccountsData.reduce((sum, acc) => sum + acc.currentBalance, 0), { compact: true })}
            </div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(positionAccountsData.reduce((sum, acc) => sum + acc.availableBalance, 0), { compact: true })}
            </div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(positionAccountsData.reduce((sum, acc) => sum + acc.blockedAmount, 0), { compact: true })}
            </div>
            <p className="text-sm text-muted-foreground">Blocked Amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">
              {positionAccountsData.filter(acc => acc.status === 'Active').length}
            </div>
            <p className="text-sm text-muted-foreground">Active Accounts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PositionAccountsPage;