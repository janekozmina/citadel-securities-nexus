import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TrendingUp, AlertTriangle, Clock, DollarSign, Users, Activity, RefreshCw, ArrowUpDown, Send, AlertCircle, FileText } from 'lucide-react';
import { useBusinessDaySimulation } from '@/hooks/useBusinessDaySimulation';

const participantBalances = [
  { id: '0003800040120300', name: 'BNTENTINT', queue: 0, payments: 17316, turnover: -182000.00, current: 98.98, opening: 9572553, amount: 0.00, debt: 0.00 },
  { id: '0003800040120270', name: 'TUSOINTST', queue: 0, payments: 16196, turnover: -200000.00, current: 101.02, opening: 35495130, amount: 0.00, debt: 0.00 },
  { id: '0003800040120210', name: 'TSIDINTST', queue: 0, payments: 0, turnover: 25700.00, current: 105.19, opening: 31774303, amount: 0.00, debt: 0.00 },
  { id: '0003800040120050', name: 'BTWNTINTVQM', queue: 0, payments: 52002, turnover: 2254300.00, current: 157.72, opening: 35445359, amount: 0.00, debt: 3500000.00 },
  { id: '0003800040120140', name: 'BHBINTINT', queue: 0, payments: 53178, turnover: -203250.00, current: 98.87, opening: 27932681, amount: 0.00, debt: 1500000.00 },
  { id: '0003800040120320', name: 'BEITINTNT', queue: 0, payments: 6, turnover: -663000.00, current: 87.28, opening: 35446750, amount: 0.00, debt: 550000.00 },
  { id: '0003800040120410', name: 'CBBINTMN', queue: 2, payments: 8924, turnover: 125000.00, current: 112.45, opening: 42381726, amount: 0.00, debt: 0.00 },
  { id: '0003800040120520', name: 'NBKINTBN', queue: 1, payments: 23456, turnover: -89000.00, current: 95.67, opening: 18495032, amount: 0.00, debt: 750000.00 },
  { id: '0003800040120630', name: 'ABCINTAB', queue: 0, payments: 12789, turnover: 345000.00, current: 108.23, opening: 29836471, amount: 0.00, debt: 0.00 },
  { id: '0003800040120740', name: 'GBRINTGB', queue: 3, payments: 7652, turnover: -156000.00, current: 89.12, opening: 33729548, amount: 0.00, debt: 1200000.00 },
];

export default function FinancialMonitoringPage() {
  const [filterParticipant, setFilterParticipant] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { rtgsMetrics, liquidityTrend, paymentFlow, lastUpdated, isBusinessHours } = useBusinessDaySimulation();

  useEffect(() => {
    document.title = 'RTGS Financial Monitoring | Unified Portal';
  }, []);

  const getStatusColor = (value: number) => {
    if (value < 90) return 'text-red-600';
    if (value < 100) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getQueueStatusColor = (queue: number) => {
    if (queue === 0) return 'bg-green-100 text-green-800 border-green-200';
    if (queue <= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  // Filtering and sorting logic
  const filteredAndSortedBalances = useMemo(() => {
    let filtered = participantBalances.filter(participant => {
      const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          participant.id.includes(searchTerm);
      const matchesParticipant = filterParticipant === 'all' || participant.name === filterParticipant;
      const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && participant.queue === 0) ||
                          (filterStatus === 'queued' && participant.queue > 0);
      
      return matchesSearch && matchesParticipant && matchesStatus;
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
  }, [searchTerm, filterParticipant, filterStatus, sortField, sortDirection]);

  const paginatedBalances = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedBalances.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedBalances, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBalances.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };


  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">RTGS — Financial Monitoring</h1>
            <div className="flex items-center gap-2 text-slate-600">
              <span>Real-time monitoring of financial flows and liquidity metrics</span>
              <div className="flex items-center gap-1 text-xs">
                <RefreshCw className={`h-3 w-3 ${isBusinessHours ? 'animate-spin' : ''}`} />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Key Metrics Icons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="animate-fade-in">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Total Liquidity</p>
                      <p className="text-2xl font-bold transition-all duration-500">BHD {rtgsMetrics.totalLiquidity / 1000}B</p>
                    </div>
                    <TrendingUp className={`h-8 w-8 transition-colors duration-300 ${rtgsMetrics.totalLiquidity > 7000 ? 'text-green-600' : 'text-orange-600'}`} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Utilization Rate</p>
                      <p className="text-2xl font-bold transition-all duration-500">{rtgsMetrics.utilizationRate}%</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Queued Payments</p>
                      <p className="text-2xl font-bold transition-all duration-500">{rtgsMetrics.queuedPayments}</p>
                    </div>
                    <Clock className={`h-8 w-8 transition-colors duration-300 ${rtgsMetrics.queuedPayments > 50 ? 'text-red-600' : 'text-orange-600'}`} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Active Alerts</p>
                      <p className="text-2xl font-bold transition-all duration-500">{rtgsMetrics.activeAlerts}</p>
                    </div>
                    <AlertTriangle className={`h-8 w-8 transition-colors duration-300 ${rtgsMetrics.activeAlerts > 5 ? 'text-red-600' : 'text-red-600'}`} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Balances & Liquidity Table */}
            <Card>
              <CardHeader>
                <CardTitle>Participant Balances & Liquidity</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Select defaultValue="all" onValueChange={setFilterParticipant}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Participants</SelectItem>
                      {Array.from(new Set(participantBalances.map(p => p.name))).map(name => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all" onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="queued">Queued</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Search participants..." 
                    className="w-48" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
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
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center gap-1">
                            Participant
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('queue')}
                        >
                          <div className="flex items-center gap-1">
                            Queue
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('payments')}
                        >
                          <div className="flex items-center gap-1">
                            Total Transactions
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('turnover')}
                        >
                          <div className="flex items-center gap-1">
                            Turnover (BHD)
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-slate-50"
                          onClick={() => handleSort('current')}
                        >
                          <div className="flex items-center gap-1">
                            % Current to Opening
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Opening Balance (BHD)</TableHead>
                        <TableHead>ILF Debt (BHD)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBalances.map((participant, index) => (
                        <TableRow key={participant.id} className="hover:bg-slate-50">
                          <TableCell className="font-mono text-sm">{participant.id}</TableCell>
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>
                            <Badge className={getQueueStatusColor(participant.queue)}>
                              {participant.queue} queued
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{participant.payments.toLocaleString()}</TableCell>
                          <TableCell className={`text-right ${participant.turnover < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {participant.turnover.toLocaleString()}
                          </TableCell>
                          <TableCell className={`text-right ${getStatusColor(participant.current)}`}>
                            {participant.current.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right">{participant.opening.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{participant.debt.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedBalances.length)} of {filteredAndSortedBalances.length} participants
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
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Queue Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Send Alert to Participant
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Incident Ticket
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
