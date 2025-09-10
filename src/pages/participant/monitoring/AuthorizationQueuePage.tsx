import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Check, X, Eye, Clock } from 'lucide-react';

const AuthorizationQueuePage = () => {
  const mockAuthorizations = [
    {
      id: 'AUTH001',
      type: 'Institution Transfer',
      amount: 500000,
      requestedBy: 'John Smith',
      requestTime: '2024-01-15 14:30:25',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 'AUTH002',
      type: 'DvP Settlement',
      amount: 2500000,
      requestedBy: 'Sarah Johnson',
      requestTime: '2024-01-15 13:45:12',
      status: 'Pending',
      priority: 'Medium'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Authorization Queue</h1>
        <p className="text-muted-foreground">Manage pending transaction authorizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Authorizations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Badge variant="destructive" className="text-xs">!</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Urgent items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authorized Today</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Approved transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Today</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Declined transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Authorization Queue
          </CardTitle>
          <CardDescription>Pending transactions requiring authorization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Request Time</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuthorizations.map((auth) => (
                <TableRow key={auth.id}>
                  <TableCell className="font-medium">{auth.type}</TableCell>
                  <TableCell>BHD {auth.amount.toLocaleString()}</TableCell>
                  <TableCell>{auth.requestedBy}</TableCell>
                  <TableCell>{auth.requestTime}</TableCell>
                  <TableCell>
                    <Badge variant={auth.priority === 'High' ? 'destructive' : 'secondary'}>
                      {auth.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{auth.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                      <Button variant="default" size="sm">
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
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

export default AuthorizationQueuePage;