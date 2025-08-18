import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  FileText,
  Download,
  Search,
  Filter,
  Eye,
  Calendar as CalendarIcon,
  ArrowUpDown
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
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredData = mockBillingData.filter(record => {
    const matchesSearch = record.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.account.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
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

  // Paginate data
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Calculate summary statistics
  const totalInterest = sortedData.reduce((sum, record) => sum + record.interestEarned, 0);
  const totalFees = sortedData.reduce((sum, record) => sum + record.fees, 0);
  const totalCharges = sortedData.reduce((sum, record) => sum + record.charges, 0);
  const netTotal = sortedData.reduce((sum, record) => sum + record.netAmount, 0);

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

              {/* Date Range Picker */}
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Details */}
        <Card>
          <CardHeader>
            <CardTitle>Billing Summary</CardTitle>
            <CardDescription>
              Overview of interest, fees, and charges for each participant account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('account')}
                    >
                      <div className="flex items-center gap-1">
                        Account
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('bank')}
                    >
                      <div className="flex items-center gap-1">
                        Bank
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('period')}
                    >
                      <div className="flex items-center gap-1">
                        Period
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('interestEarned')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Interest Earned
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('fees')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Fees
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('charges')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Charges
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('netAmount')}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Net Amount
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((record) => (
                    <TableRow key={record.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-xs">{record.account}</TableCell>
                      <TableCell className="font-medium text-sm">{record.bank}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.period}</Badge>
                      </TableCell>
                      <TableCell className="text-right text-green-600 font-medium">
                        {record.interestEarned > 0 ? formatCurrency(record.interestEarned) : '-'}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-medium">
                        {record.fees > 0 ? formatCurrency(record.fees) : '-'}
                      </TableCell>
                      <TableCell className="text-right text-orange-600 font-medium">
                        {record.charges > 0 ? formatCurrency(record.charges) : '-'}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${record.netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(record.netAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          record.status === 'processed' ? 'default' :
                          record.status === 'pending' ? 'secondary' : 'destructive'
                        }>
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
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-slate-600">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} records
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
      </section>
    </main>
  );
}