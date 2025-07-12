import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Monitor, BarChart3, DollarSign, Activity, Filter, Download, Search } from 'lucide-react';

const ReportingPage = () => {
  const [filterParticipant, setFilterParticipant] = useState('');
  const [filterAssetType, setFilterAssetType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('participantName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const reportingData = {
    totalReports: 156,
    pendingReports: 8,
    completedReports: 148,
    totalValue: 45600000000,
    positionData: [
      { 
        participantId: 'P001', 
        participantName: 'Goldman Sachs', 
        securitiesAccount: '001-CUST-01', 
        isin: 'AE123456789', 
        securityName: 'UAE Treasury Bond 10Y', 
        assetType: 'Government Bond', 
        quantity: 2500000, 
        settlementStatus: 'Settled', 
        marketValue: 2450000000,
        reportDate: '2024-07-12',
        lastUpdated: '14:30:22'
      },
      { 
        participantId: 'P002', 
        participantName: 'JPMorgan Chase', 
        securitiesAccount: '002-CUST-02', 
        isin: 'AE987654321', 
        securityName: 'ADNOC Corporate Bond 5Y', 
        assetType: 'Corporate Bond', 
        quantity: 1800000, 
        settlementStatus: 'Pending', 
        marketValue: 1890000000,
        reportDate: '2024-07-12',
        lastUpdated: '14:25:15'
      },
      { 
        participantId: 'P003', 
        participantName: 'Bank of America', 
        securitiesAccount: '003-CUST-03', 
        isin: 'AE112233445', 
        securityName: 'Emirates NBD Equity', 
        assetType: 'Equity', 
        quantity: 3200000, 
        settlementStatus: 'Settled', 
        marketValue: 1920000000,
        reportDate: '2024-07-12',
        lastUpdated: '14:28:45'
      },
      { 
        participantId: 'P004', 
        participantName: 'Morgan Stanley', 
        securitiesAccount: '004-CUST-04', 
        isin: 'AE556677889', 
        securityName: 'Dubai Islamic Bank Bond', 
        assetType: 'Islamic Bond', 
        quantity: 1500000, 
        settlementStatus: 'Reconciling', 
        marketValue: 1575000000,
        reportDate: '2024-07-12',
        lastUpdated: '14:22:10'
      },
      { 
        participantId: 'P005', 
        participantName: 'Citigroup', 
        securitiesAccount: '005-CUST-05', 
        isin: 'AE334455667', 
        securityName: 'Abu Dhabi Municipality Bond', 
        assetType: 'Municipal Bond', 
        quantity: 2100000, 
        settlementStatus: 'Settled', 
        marketValue: 2142000000,
        reportDate: '2024-07-12',
        lastUpdated: '14:35:08'
      }
    ],
    reportSummary: [
      { type: 'Account Statements', count: 45, status: 'Completed', lastGenerated: '14:30:00' },
      { type: 'Reconciliation Reports', count: 12, status: 'Pending', lastGenerated: '13:45:00' },
      { type: 'Position Monitoring', count: 89, status: 'Completed', lastGenerated: '14:35:00' },
      { type: 'Regulatory Filings', count: 10, status: 'In Progress', lastGenerated: '12:30:00' }
    ],
    assetBreakdown: [
      { asset: 'Government Bonds', value: 15400000000, percentage: 33.8, count: 45 },
      { asset: 'Corporate Bonds', value: 12800000000, percentage: 28.1, count: 38 },
      { asset: 'Equities', value: 10200000000, percentage: 22.4, count: 52 },
      { asset: 'Islamic Bonds', value: 4800000000, percentage: 10.5, count: 15 },
      { asset: 'Municipal Bonds', value: 2400000000, percentage: 5.2, count: 6 }
    ]
  };

  const chartConfig = {
    value: { label: 'Value', color: '#3b82f6' },
    count: { label: 'Count', color: '#06b6d4' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Settled': return <Badge className="bg-green-100 text-green-800">Settled</Badge>;
      case 'Pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'Reconciling': return <Badge className="bg-blue-100 text-blue-800">Reconciling</Badge>;
      case 'Completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'In Progress': return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredData = reportingData.positionData.filter(item => {
    const matchesParticipant = filterParticipant === '' || item.participantName.toLowerCase().includes(filterParticipant.toLowerCase());
    const matchesAssetType = filterAssetType === '' || item.assetType === filterAssetType;
    const matchesStatus = filterStatus === '' || item.settlementStatus === filterStatus;
    const matchesSearch = searchTerm === '' || 
      item.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.securityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.isin.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesParticipant && matchesAssetType && matchesStatus && matchesSearch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reporting & Compliance</h1>
            <p className="text-slate-600">Comprehensive reporting dashboard with position monitoring and compliance tracking</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Reports</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Generated:</span>
                      <span className="font-medium">{reportingData.totalReports}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Pending:</span>
                      <span className="font-medium">{reportingData.pendingReports}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Total Position Value</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Amount:</span>
                      <span className="font-medium">${(reportingData.totalValue / 1000000000).toFixed(1)}B</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Positions:</span>
                      <span className="font-medium">{reportingData.positionData.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Monitor:</span>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Compliance Status</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Rate:</span>
                      <span className="font-medium">94.9%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Issues:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Status:</span>
                      <Monitor className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-slate-600 mb-2">Active Monitoring</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Live:</span>
                      <span className="font-medium">Real-time</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Updated:</span>
                      <span className="font-medium">14:35</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Activity:</span>
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Summary Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Report Type</th>
                        <th className="text-left p-3 font-semibold">Count</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Last Generated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportingData.reportSummary.map((report, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{report.type}</td>
                          <td className="p-3">{report.count}</td>
                          <td className="p-3">{getStatusBadge(report.status)}</td>
                          <td className="p-3 text-sm">{report.lastGenerated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Asset Class Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Class Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Asset Type</th>
                        <th className="text-left p-3 font-semibold">Count</th>
                        <th className="text-left p-3 font-semibold">Percentage</th>
                        <th className="text-left p-3 font-semibold">Total Value</th>
                        <th className="text-left p-3 font-semibold">Distribution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportingData.assetBreakdown.map((asset, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{asset.asset}</td>
                          <td className="p-3">{asset.count}</td>
                          <td className="p-3">{asset.percentage}%</td>
                          <td className="p-3">${(asset.value / 1000000000).toFixed(1)}B</td>
                          <td className="p-3">
                            <Progress value={asset.percentage} className="w-20 h-2" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Position Monitoring Dashboard with Filters */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Position Monitoring Dashboard</CardTitle>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm text-slate-600">Filters & Search</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search by name, ISIN..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Participant</label>
                    <Input
                      placeholder="Filter by participant"
                      value={filterParticipant}
                      onChange={(e) => setFilterParticipant(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Asset Type</label>
                    <Select value={filterAssetType} onValueChange={setFilterAssetType}>
                      <SelectTrigger className="bg-white z-50">
                        <SelectValue placeholder="All asset types" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="">All asset types</SelectItem>
                        <SelectItem value="Government Bond">Government Bond</SelectItem>
                        <SelectItem value="Corporate Bond">Corporate Bond</SelectItem>
                        <SelectItem value="Equity">Equity</SelectItem>
                        <SelectItem value="Islamic Bond">Islamic Bond</SelectItem>
                        <SelectItem value="Municipal Bond">Municipal Bond</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="bg-white z-50">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="">All statuses</SelectItem>
                        <SelectItem value="Settled">Settled</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Reconciling">Reconciling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold cursor-pointer hover:bg-slate-50" onClick={() => handleSort('participantName')}>
                          Participant {sortField === 'participantName' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left p-3 font-semibold">Account</th>
                        <th className="text-left p-3 font-semibold cursor-pointer hover:bg-slate-50" onClick={() => handleSort('securityName')}>
                          Security {sortField === 'securityName' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left p-3 font-semibold cursor-pointer hover:bg-slate-50" onClick={() => handleSort('assetType')}>
                          Asset Type {sortField === 'assetType' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-right p-3 font-semibold cursor-pointer hover:bg-slate-50" onClick={() => handleSort('quantity')}>
                          Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left p-3 font-semibold cursor-pointer hover:bg-slate-50" onClick={() => handleSort('settlementStatus')}>
                          Status {sortField === 'settlementStatus' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-right p-3 font-semibold cursor-pointer hover:bg-slate-50" onClick={() => handleSort('marketValue')}>
                          Market Value {sortField === 'marketValue' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="text-left p-3 font-semibold">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((position, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{position.participantName}</td>
                          <td className="p-3 font-mono text-sm">{position.securitiesAccount}</td>
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{position.securityName}</div>
                              <div className="text-xs text-slate-500">{position.isin}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{position.assetType}</Badge>
                          </td>
                          <td className="p-3 text-right font-medium">{position.quantity.toLocaleString()}</td>
                          <td className="p-3">{getStatusBadge(position.settlementStatus)}</td>
                          <td className="p-3 text-right font-medium">${(position.marketValue / 1000000).toFixed(1)}M</td>
                          <td className="p-3 text-sm text-slate-600">{position.lastUpdated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {sortedData.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No positions found matching your filters.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Account Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reconciliation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Monitor className="h-4 w-4 mr-2" />
                  Position Monitoring
                </Button>
              </div>
            </div>

            {/* Additional Info Panel */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">Reporting Statistics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Filtered Records:</span>
                  <span className="font-medium">{sortedData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Records:</span>
                  <span className="font-medium">{reportingData.positionData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Refresh:</span>
                  <span className="font-medium">14:35:08</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ReportingPage;