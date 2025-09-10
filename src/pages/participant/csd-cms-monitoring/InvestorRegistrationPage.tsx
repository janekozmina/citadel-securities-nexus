import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2, Plus, UserPlus } from 'lucide-react';
import portalConfig from '@/config/portalConfig';

const InvestorRegistrationPage = () => {
  const investorData = [
    {
      id: 'INV001',
      name: 'Al Rajhi Bank',
      type: 'Institution',
      registrationDate: '2024-12-15',
      status: 'Active',
      country: 'Bahrain',
      contactPerson: 'Ahmed Al-Mansouri',
      email: 'ahmed.almansouri@alrajhi.com',
      phone: '+973 1234 5678',
      totalInvestments: 2500000,
      currency: portalConfig.currencies.primary
    },
    {
      id: 'INV002',
      name: 'National Bank of Kuwait',
      type: 'Institution',
      registrationDate: '2024-11-20',
      status: 'Active',
      country: 'Kuwait',
      contactPerson: 'Sarah Al-Zahra',
      email: 'sarah.alzahra@nbk.com',
      phone: '+965 9876 5432',
      totalInvestments: 1800000,
      currency: portalConfig.currencies.primary
    },
    {
      id: 'INV003',
      name: 'Gulf Investment Corp',
      type: 'Corporate',
      registrationDate: '2024-10-05',
      status: 'Pending',
      country: 'UAE',
      contactPerson: 'Mohammed Hassan',
      email: 'mohammed.hassan@gic.ae',
      phone: '+971 2345 6789',
      totalInvestments: 0,
      currency: portalConfig.currencies.primary
    }
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'suspended':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "text-xs font-medium";
    switch (type.toLowerCase()) {
      case 'institution':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'corporate':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'individual':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Investor Registration</h1>
        <p className="text-muted-foreground">Manage investor registrations and account information</p>
      </div>

      {/* Actions and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search investors..." className="w-64" />
              </div>
              <Button variant="outline">Filter by Status</Button>
              <Button variant="outline">Filter by Type</Button>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Register New Investor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investor Registration Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Registered Investors</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{investorData.length} investors</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Investor ID</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Name</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Registration Date</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Country</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Contact Person</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Email</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Phone</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Total Investments</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investorData.map((investor, index) => (
                  <tr key={investor.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm font-mono">{investor.id}</td>
                    <td className="py-2 px-4 text-sm font-medium">{investor.name}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className={getTypeBadge(investor.type)}>
                        {investor.type}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{investor.registrationDate}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className={getStatusBadge(investor.status)}>
                        {investor.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{investor.country}</td>
                    <td className="py-2 px-4 text-sm">{investor.contactPerson}</td>
                    <td className="py-2 px-4 text-sm">{investor.email}</td>
                    <td className="py-2 px-4 text-sm">{investor.phone}</td>
                    <td className="py-2 px-4 text-sm">
                      {investor.totalInvestments.toLocaleString()} {investor.currency}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">2</div>
            <p className="text-sm text-muted-foreground">Active Investors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">4.3M</div>
            <p className="text-sm text-muted-foreground">Total Investments ({portalConfig.currencies.primary})</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <p className="text-sm text-muted-foreground">Total Registered</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestorRegistrationPage;