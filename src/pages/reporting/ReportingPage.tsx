import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowUpDown, Download, Eye, FileText, CheckCircle } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';

const ReportingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('position');

  const positionData = [
    { 
      account: 'ACC-001', 
      instrument: 'AAPL', 
      position: 1500, 
      marketValue: 262500, 
      unrealizedPL: 12500, 
      status: 'settled',
      lastUpdate: '2024-07-12 09:30'
    },
    { 
      account: 'ACC-002', 
      instrument: 'TSLA', 
      position: -800, 
      marketValue: -175800, 
      unrealizedPL: -8400, 
      status: 'pending',
      lastUpdate: '2024-07-12 09:28'
    },
    { 
      account: 'ACC-003', 
      instrument: 'GOOGL', 
      position: 50, 
      marketValue: 137500, 
      unrealizedPL: 2500, 
      status: 'settled',
      lastUpdate: '2024-07-12 09:25'
    },
    { 
      account: 'ACC-004', 
      instrument: 'MSFT', 
      position: 2000, 
      marketValue: 829600, 
      unrealizedPL: 15600, 
      status: 'reconciling',
      lastUpdate: '2024-07-12 09:20'
    },
  ];

  const filteredData = positionData
    .filter(item => 
      (filterStatus === 'all' || item.status === filterStatus) &&
      (item.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.instrument.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'position':
          return Math.abs(b.position) - Math.abs(a.position);
        case 'value':
          return Math.abs(b.marketValue) - Math.abs(a.marketValue);
        case 'pnl':
          return b.unrealizedPL - a.unrealizedPL;
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'settled': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reconciling': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Reporting & Compliance</h1>
            <p className="text-slate-600">Monitor positions and generate compliance reports</p>
          </div>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters & Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search accounts or instruments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="settled">Settled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reconciling">Reconciling</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="position">Position Size</SelectItem>
                  <SelectItem value="value">Market Value</SelectItem>
                  <SelectItem value="pnl">P&L</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Position Monitoring
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-sm font-normal text-slate-600">
                      {filteredData.length} positions
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Account</th>
                        <th className="text-left p-3 font-semibold">Instrument</th>
                        <th className="text-left p-3 font-semibold">Position</th>
                        <th className="text-left p-3 font-semibold">Market Value</th>
                        <th className="text-left p-3 font-semibold">Unrealized P&L</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Last Update</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((position, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold">{position.account}</td>
                          <td className="p-3 font-medium">{position.instrument}</td>
                          <td className="p-3">
                            <span className={position.position >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {position.position >= 0 ? '+' : ''}{position.position.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 font-medium">
                            ${Math.abs(position.marketValue).toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className={position.unrealizedPL >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {position.unrealizedPL >= 0 ? '+' : ''}${position.unrealizedPL.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusColor(position.status)}>
                              {position.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-slate-600">{position.lastUpdate}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  variant="default"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/StatementsOfAccounts.pdf';
                    link.download = 'StatementsOfAccounts.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Account Statement
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Reconciliation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  Position Monitoring
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total Positions</span>
                  <span className="font-medium">{filteredData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total Market Value</span>
                  <span className="font-medium">
                    ${filteredData.reduce((sum, p) => sum + Math.abs(p.marketValue), 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Total P&L</span>
                  <span className={`font-medium ${
                    filteredData.reduce((sum, p) => sum + p.unrealizedPL, 0) >= 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {filteredData.reduce((sum, p) => sum + p.unrealizedPL, 0) >= 0 ? '+' : ''}
                    ${filteredData.reduce((sum, p) => sum + p.unrealizedPL, 0).toLocaleString()}
                  </span>
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