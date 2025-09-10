import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Activity, Eye, RefreshCw, AlertCircle } from 'lucide-react';

const TransactionsMonitoringPage = () => {
  const mockTransactions = [
    {
      id: 'MON001',
      reference: 'RT20240115001',
      type: 'Institution Transfer',
      amount: 2500000,
      status: 'Processing',
      startTime: '14:30:25',
      duration: '00:02:15'
    },
    {
      id: 'MON002',
      reference: 'DVP20240115001',
      type: 'DvP Transfer',
      amount: 5000000,
      status: 'Completed',
      startTime: '14:25:10',
      duration: '00:04:32'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions Monitoring</h1>
        <p className="text-muted-foreground">Real-time transaction monitoring and status tracking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed/Stuck</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Transaction Monitor
          </CardTitle>
          <CardDescription>Real-time view of transaction processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Auto Refresh: ON
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.reference}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>BHD {txn.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={txn.status === 'Processing' ? 'secondary' : 'default'}>
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.startTime}</TableCell>
                  <TableCell>{txn.duration}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      Monitor
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

export default TransactionsMonitoringPage;