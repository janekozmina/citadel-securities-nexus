import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckSquare, AlertTriangle, Download, RefreshCw } from 'lucide-react';

const ReconciliationPage = () => {
  const mockReconciliations = [
    {
      id: 'REC001',
      date: '2024-01-15',
      type: 'Daily Balance',
      status: 'Matched',
      differences: 0,
      totalRecords: 245
    },
    {
      id: 'REC002',
      date: '2024-01-14',
      type: 'Transaction',
      status: 'Unmatched',
      differences: 2,
      totalRecords: 198
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reconciliation</h1>
        <p className="text-muted-foreground">Transaction and balance reconciliation management</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Reconciliation Status
          </CardTitle>
          <CardDescription>Current reconciliation status and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button>
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Reconciliation
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Records</TableHead>
                <TableHead>Differences</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReconciliations.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>{rec.date}</TableCell>
                  <TableCell>{rec.type}</TableCell>
                  <TableCell>
                    <Badge variant={rec.status === 'Matched' ? 'default' : 'destructive'}>
                      {rec.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{rec.totalRecords}</TableCell>
                  <TableCell>
                    {rec.differences > 0 ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        {rec.differences}
                      </div>
                    ) : (
                      <div className="text-green-600">✓ No differences</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View Details</Button>
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

export default ReconciliationPage;