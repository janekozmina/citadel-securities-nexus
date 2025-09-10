import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, Eye, Download, RefreshCw } from 'lucide-react';

const GCCTransactionsPage = () => {
  const mockGCCTransactions = [
    {
      id: 'GCC001',
      reference: 'GCC20240115001',
      type: 'Multi-Currency Institution Transfer',
      fromCurrency: 'BHD',
      toCurrency: 'SAR',
      amount: 1000000,
      convertedAmount: 10000000,
      counterparty: 'Saudi National Bank',
      status: 'Completed',
      timestamp: '2024-01-15 14:30:25'
    },
    {
      id: 'GCC002',
      reference: 'GCC20240115002',
      type: 'Multi-Currency Customer Transfer',
      fromCurrency: 'BHD',
      toCurrency: 'AED',
      amount: 500000,
      convertedAmount: 4910000,
      counterparty: 'Emirates NBD',
      status: 'Processing',
      timestamp: '2024-01-15 13:45:12'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">GCC Transactions</h1>
        <p className="text-muted-foreground">Cross-border GCC multi-currency transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's GCC Volume</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD 1.5M</div>
            <p className="text-xs text-muted-foreground">Cross-border volume</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Successful transfers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exchange Rate</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 BHD</div>
            <p className="text-xs text-muted-foreground">= 10.0 SAR</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            GCC Transaction History
          </CardTitle>
          <CardDescription>Multi-currency cross-border transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From Currency</TableHead>
                <TableHead>To Currency</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGCCTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.reference}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{txn.fromCurrency}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{txn.toCurrency}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{txn.amount.toLocaleString()} {txn.fromCurrency}</div>
                      <div className="text-sm text-muted-foreground">
                        ≈ {txn.convertedAmount.toLocaleString()} {txn.toCurrency}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{txn.counterparty}</TableCell>
                  <TableCell>
                    <Badge variant={txn.status === 'Completed' ? 'default' : 'secondary'}>
                      {txn.status}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default GCCTransactionsPage;