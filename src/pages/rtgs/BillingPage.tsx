import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Date picker will be implemented as needed
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Calendar
} from 'lucide-react';

interface BillingRecord {
  id: string;
  account: string;
  bank: string;
  period: string;
  interestEarned: number;
  fees: number;
  charges: number;
  netAmount: number;
  status: 'pending' | 'processed' | 'disputed';
  type: 'interest' | 'fee' | 'charge';
}

const mockBillingData: BillingRecord[] = [
  {
    id: 'B001',
    account: 'ACC-NBB-001',
    bank: 'National Bank of Bahrain (NBB)',
    period: '2024-01',
    interestEarned: 15420.50,
    fees: 2350.00,
    charges: 180.25,
    netAmount: 12890.25,
    status: 'processed',
    type: 'interest'
  },
  {
    id: 'B002', 
    account: 'ACC-BBK-002',
    bank: 'Bank of Bahrain and Kuwait (BBK)',
    period: '2024-01',
    interestEarned: 8920.75,
    fees: 1820.00,
    charges: 95.50,
    netAmount: 7005.25,
    status: 'processed',
    type: 'interest'
  },
  {
    id: 'B003',
    account: 'ACC-ABC-003', 
    bank: 'Arab Banking Corporation (Bank ABC)',
    period: '2024-01',
    interestEarned: 12650.00,
    fees: 1950.00,
    charges: 125.75,
    netAmount: 10574.25,
    status: 'pending',
    type: 'interest'
  },
  {
    id: 'B004',
    account: 'ACC-AUB-004',
    bank: 'Ahli United Bank',
    period: '2024-01',
    interestEarned: 18750.25,
    fees: 2850.00,
    charges: 215.50,
    netAmount: 15684.75,
    status: 'processed',
    type: 'interest'
  },
  {
    id: 'B005',
    account: 'ACC-GIB-005',
    bank: 'Gulf International Bank (GIB)',
    period: '2024-01',
    interestEarned: 6480.50,
    fees: 1250.00,
    charges: 85.25,
    netAmount: 5145.25,
    status: 'disputed',
    type: 'interest'
  },
  {
    id: 'F001',
    account: 'ACC-NBB-001',
    bank: 'National Bank of Bahrain (NBB)',
    period: '2024-01',
    interestEarned: 0,
    fees: 450.00,
    charges: 0,
    netAmount: -450.00,
    status: 'processed',
    type: 'fee'
  },
  {
    id: 'F002',
    account: 'ACC-BBK-002',
    bank: 'Bank of Bahrain and Kuwait (BBK)',
    period: '2024-01',
    interestEarned: 0,
    fees: 350.00,
    charges: 0,
    netAmount: -350.00,
    status: 'processed',
    type: 'fee'
  },
  {
    id: 'C001',
    account: 'ACC-ABC-003',
    bank: 'Arab Banking Corporation (Bank ABC)',
    period: '2024-01',
    interestEarned: 0,
    fees: 0,
    charges: 175.50,
    netAmount: -175.50,
    status: 'pending',
    type: 'charge'
  }
];

export default function BillingPage() {
  useEffect(() => {
    document.title = 'Billing | Unified Portal';
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const filteredData = mockBillingData.filter(record => {
    const matchesSearch = record.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.account.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate summary statistics
  const totalInterest = filteredData.reduce((sum, record) => sum + record.interestEarned, 0);
  const totalFees = filteredData.reduce((sum, record) => sum + record.fees, 0);
  const totalCharges = filteredData.reduce((sum, record) => sum + record.charges, 0);
  const netTotal = filteredData.reduce((sum, record) => sum + record.netAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return `BHD ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <main className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Billing Management</h1>
            <p className="text-muted-foreground">Interest, Fees, and Charges Summary for participant accounts</p>
          </div>
          
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interest Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalInterest)}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalFees)}</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Charges</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalCharges)}</div>
              <p className="text-xs text-muted-foreground">
                -3.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(netTotal)}</div>
              <p className="text-xs text-muted-foreground">
                {netTotal > 0 ? '+' : ''}15.8% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by bank or account..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="interest">Interest</SelectItem>
                  <SelectItem value="fee">Fees</SelectItem>
                  <SelectItem value="charge">Charges</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Details */}
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">Summary View</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Breakdown</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Billing Summary</CardTitle>
                <CardDescription>
                  Overview of interest, fees, and charges for each participant account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Bank</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">Interest Earned</TableHead>
                      <TableHead className="text-right">Fees</TableHead>
                      <TableHead className="text-right">Charges</TableHead>
                      <TableHead className="text-right">Net Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.account}</TableCell>
                        <TableCell>{record.bank}</TableCell>
                        <TableCell>{record.period}</TableCell>
                        <TableCell className="text-right text-green-600">
                          {record.interestEarned > 0 ? formatCurrency(record.interestEarned) : '-'}
                        </TableCell>
                        <TableCell className="text-right text-blue-600">
                          {record.fees > 0 ? formatCurrency(record.fees) : '-'}
                        </TableCell>
                        <TableCell className="text-right text-orange-600">
                          {record.charges > 0 ? formatCurrency(record.charges) : '-'}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${record.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(record.netAmount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Breakdown</CardTitle>
                <CardDescription>
                  Detailed breakdown of each billing component with transaction-level information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Interest Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Interest Calculations
                    </h3>
                    <div className="bg-green-50 p-4 rounded-lg space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Base Rate:</span> 4.25%
                        </div>
                        <div>
                          <span className="font-medium">Calculation Method:</span> Daily Balance
                        </div>
                        <div>
                          <span className="font-medium">Accrual Frequency:</span> Daily
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee Structure */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      Fee Structure
                    </h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fee Type</TableHead>
                            <TableHead>Rate/Amount</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Account Maintenance</TableCell>
                            <TableCell>BHD 150/month</TableCell>
                            <TableCell>Monthly</TableCell>
                            <TableCell>Basic account maintenance fee</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Transaction Fee</TableCell>
                            <TableCell>BHD 0.50 per transaction</TableCell>
                            <TableCell>Per Transaction</TableCell>
                            <TableCell>Processing fee for each transaction</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Liquidity Management</TableCell>
                            <TableCell>0.15% of daily average</TableCell>
                            <TableCell>Monthly</TableCell>
                            <TableCell>Liquidity facility usage fee</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Charges Breakdown */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-orange-600" />
                      Additional Charges
                    </h3>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Charge Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Late Payment Penalty</TableCell>
                            <TableCell>BHD 50.00</TableCell>
                            <TableCell>Settlement delay &gt; 2 hours</TableCell>
                            <TableCell>2024-01-15</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>System Override Fee</TableCell>
                            <TableCell>BHD 25.50</TableCell>
                            <TableCell>Manual intervention required</TableCell>
                            <TableCell>2024-01-22</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Compliance Check</TableCell>
                            <TableCell>BHD 75.00</TableCell>
                            <TableCell>Enhanced due diligence</TableCell>
                            <TableCell>2024-01-28</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="disputes">
            <Card>
              <CardHeader>
                <CardTitle>Disputed Items</CardTitle>
                <CardDescription>
                  Review and manage billing disputes from participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData.filter(record => record.status === 'disputed').map((record) => (
                    <div key={record.id} className="border border-red-200 bg-red-50 p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{record.bank}</h4>
                          <p className="text-sm text-muted-foreground">Account: {record.account}</p>
                          <p className="text-sm">
                            <span className="font-medium">Disputed Amount:</span> {formatCurrency(record.netAmount)}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Reason:</span> Incorrect interest calculation on overnight balances
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button size="sm">
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredData.filter(record => record.status === 'disputed').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No disputed items found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}