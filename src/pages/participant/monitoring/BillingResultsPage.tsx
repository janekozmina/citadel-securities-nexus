import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, FileText, Download, Eye, Calculator } from 'lucide-react';

const BillingResultsPage = () => {
  const mockBillingData = [
    {
      id: 'BILL001',
      period: 'January 2024',
      totalFees: 12500.00,
      transactionFees: 8500.00,
      serviceFees: 2000.00,
      overdraftFees: 2000.00,
      status: 'Processed',
      dueDate: '2024-02-15',
      isPaid: false
    },
    {
      id: 'BILL002',
      period: 'December 2023',
      totalFees: 15750.00,
      transactionFees: 11250.00,
      serviceFees: 2500.00,
      overdraftFees: 2000.00,
      status: 'Paid',
      dueDate: '2024-01-15',
      isPaid: true
    }
  ];

  const feeBreakdown = [
    { category: 'RTGS Transaction Fees', amount: 5500.00, count: 110 },
    { category: 'CSD Settlement Fees', amount: 3000.00, count: 45 },
    { category: 'DvP Processing Fees', amount: 2500.00, count: 25 },
    { category: 'Repo Transaction Fees', amount: 1500.00, count: 15 },
    { category: 'Monthly Service Fee', amount: 2000.00, count: 1 },
    { category: 'Overdraft Fees', amount: 2000.00, count: 8 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing Results</h1>
        <p className="text-muted-foreground">Transaction fees and billing statements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD 12,500</div>
            <p className="text-xs text-muted-foreground">January 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD 12,500</div>
            <p className="text-xs text-muted-foreground">Due Feb 15, 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Total Fees</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD 28,250</div>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD 14,125</div>
            <p className="text-xs text-muted-foreground">Monthly average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Fee Breakdown - Current Month
            </CardTitle>
            <CardDescription>Detailed breakdown of charges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeBreakdown.map((fee, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{fee.category}</div>
                    <div className="text-sm text-muted-foreground">{fee.count} transactions</div>
                  </div>
                  <div className="font-medium">BHD {fee.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Billing History
            </CardTitle>
            <CardDescription>Previous billing statements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Total Fees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBillingData.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.period}</TableCell>
                    <TableCell>BHD {bill.totalFees.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={bill.isPaid ? 'default' : 'secondary'}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          PDF
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
    </div>
  );
};

export default BillingResultsPage;