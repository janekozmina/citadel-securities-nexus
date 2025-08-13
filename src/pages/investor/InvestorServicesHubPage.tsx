import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Users, Globe, Building, TrendingUp, FileText, CheckCircle2, Clock, CircleSlash } from 'lucide-react';

const InvestorServicesHubPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  const statusCards = [
    {
      title: 'Total Investors',
      value: '2,847',
      change: '+15% vs last quarter',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Accounts',
      value: '2,652',
      change: '+8% vs last quarter',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      title: 'Pending KYC',
      value: '127',
      change: '-12% vs last quarter',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Suspended Accounts',
      value: '68',
      change: '+3% vs last quarter',
      icon: CircleSlash,
      color: 'text-red-600'
    }
  ];

  const investorsByRegion = [
    { region: 'Bahrain', count: 1247, percentage: 43.8 },
    { region: 'Saudi Arabia', count: 623, percentage: 21.9 },
    { region: 'Kuwait', count: 312, percentage: 11.0 },
    { region: 'Qatar', count: 289, percentage: 10.1 },
    { region: 'Bahrain', count: 198, percentage: 7.0 },
    { region: 'Oman', count: 178, percentage: 6.2 }
  ];

  const investorsByType = [
    { type: 'Local Individual', count: 1456, percentage: 51.1 },
    { type: 'Foreign Individual', count: 687, percentage: 24.1 },
    { type: 'Local Corporate', count: 423, percentage: 14.9 },
    { type: 'Foreign Corporate', count: 281, percentage: 9.9 }
  ];

  const investorsByVolume = [
    { range: '1-100', count: 1523, percentage: 53.5, value: 'BHD 76.15M' },
    { range: '100-500', count: 892, percentage: 31.3, value: 'BHD 267.6M' },
    { range: '500-10M', count: 432, percentage: 15.2, value: 'BHD 1.89B' }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Investor Services Hub</h1>
            <p className="text-slate-600">Comprehensive investor management and services</p>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Status Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {statusCards.map((card) => (
                <Card key={card.title}>
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-slate-600 mb-2">{card.title}</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Value:</span>
                        <span className="font-medium">{card.value}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Change:</span>
                        <span className="font-medium">{card.change}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-600">Status:</span>
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Investors by Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Investors by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Region</th>
                        <th className="text-left p-3 font-semibold">Count</th>
                        <th className="text-left p-3 font-semibold">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investorsByRegion.map((item) => (
                        <tr key={item.region} className="border-b hover:bg-slate-50">
                          <td className="p-3">{item.region}</td>
                          <td className="p-3 font-mono text-sm">{item.count.toLocaleString()}</td>
                          <td className="p-3">{item.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Investors by Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Investors by Type (Local, Foreign, Legal, Joint)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Type</th>
                        <th className="text-left p-3 font-semibold">Count</th>
                        <th className="text-left p-3 font-semibold">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investorsByType.map((item) => (
                        <tr key={item.type} className="border-b hover:bg-slate-50">
                          <td className="p-3">{item.type}</td>
                          <td className="p-3 font-mono text-sm">{item.count.toLocaleString()}</td>
                          <td className="p-3">{item.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Investors by Volume Holdings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Investors by Volume Holdings (1-100, 100-500, 500-10Mln)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Range (K BHD)</th>
                        <th className="text-left p-3 font-semibold">Investors</th>
                        <th className="text-left p-3 font-semibold">Percentage</th>
                        <th className="text-left p-3 font-semibold">Total Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investorsByVolume.map((item) => (
                        <tr key={item.range} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-mono text-sm">{item.range}</td>
                          <td className="p-3">{item.count.toLocaleString()}</td>
                          <td className="p-3">{item.percentage}%</td>
                          <td className="p-3 font-semibold text-green-600">{item.value}</td>
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
                <Button className="w-full justify-start">New</Button>
                <Button variant="outline" className="w-full justify-start">Manage</Button>
                <Button variant="outline" className="w-full justify-start">Manage HIN</Button>
                <Button variant="outline" className="w-full justify-start">Fiscal Services</Button>
                <Button variant="outline" className="w-full justify-start">Tax Management</Button>
                <Button variant="outline" className="w-full justify-start">Move from Broker</Button>
                <Button variant="outline" className="w-full justify-start">History</Button>
                <Button variant="outline" className="w-full justify-start">KYC / AML</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InvestorServicesHubPage;