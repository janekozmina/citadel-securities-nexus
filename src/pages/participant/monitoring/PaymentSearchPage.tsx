import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Eye, Calendar } from 'lucide-react';

const PaymentSearchPage = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    reference: '',
    amount: '',
    counterparty: '',
    dateFrom: '',
    dateTo: '',
    status: 'all'
  });

  const mockPayments = [
    {
      id: 'PAY001',
      reference: 'RT20240115001',
      date: '2024-01-15',
      time: '14:30:25',
      type: 'Institution Transfer',
      amount: 2500000,
      counterparty: 'National Bank of Bahrain',
      status: 'Completed',
      systemType: 'RTGS'
    },
    {
      id: 'PAY002', 
      reference: 'CCT20240114001',
      date: '2024-01-14',
      time: '16:15:33',
      type: 'Customer Credit Transfer',
      amount: 750000,
      counterparty: 'Customer Account',
      status: 'Completed',
      systemType: 'RTGS'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Search</h1>
        <p className="text-muted-foreground">Search and filter payment transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                placeholder="Enter reference"
                value={searchCriteria.reference}
                onChange={(e) => setSearchCriteria(prev => ({...prev, reference: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter amount"
                value={searchCriteria.amount}
                onChange={(e) => setSearchCriteria(prev => ({...prev, amount: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="counterparty">Counterparty</Label>
              <Input
                id="counterparty"
                placeholder="Enter counterparty"
                value={searchCriteria.counterparty}
                onChange={(e) => setSearchCriteria(prev => ({...prev, counterparty: e.target.value}))}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search Payments
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>Found {mockPayments.length} payment(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.reference}</TableCell>
                  <TableCell>
                    <div>{payment.date}</div>
                    <div className="text-sm text-muted-foreground">{payment.time}</div>
                  </TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell>BHD {payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.counterparty}</TableCell>
                  <TableCell>
                    <Badge variant="default">{payment.status}</Badge>
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

export default PaymentSearchPage;