import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, Plus, Edit, Trash, Search } from 'lucide-react';

const BillingConfigurationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockBillingConfigs = [
    {
      id: 'BILL001',
      code: 'RTGS_INST_TXN',
      name: 'RTGS Institution Transaction Fee',
      category: 'Transaction Fees',
      feeType: 'Per Transaction',
      amount: 50.000,
      currency: 'BHD',
      minAmount: 10.000,
      maxAmount: 500.000,
      status: 'Active'
    },
    {
      id: 'BILL002',
      code: 'CSD_DVP_SETTLE',
      name: 'CSD DvP Settlement Fee',
      category: 'Settlement Fees',
      feeType: 'Percentage',
      amount: 0.025,
      currency: '%',
      minAmount: 25.000,
      maxAmount: 1000.000,
      status: 'Active'
    },
    {
      id: 'BILL003',
      code: 'MONTHLY_SERVICE',
      name: 'Monthly Service Fee',
      category: 'Service Fees',
      feeType: 'Fixed Monthly',
      amount: 2000.000,
      currency: 'BHD',
      minAmount: 2000.000,
      maxAmount: 2000.000,
      status: 'Active'
    },
    {
      id: 'BILL004',
      code: 'OVERDRAFT_PENALTY',
      name: 'Overdraft Penalty Fee',
      category: 'Penalty Fees',
      feeType: 'Daily Rate',
      amount: 0.50,
      currency: '% per day',
      minAmount: 100.000,
      maxAmount: 10000.000,
      status: 'Active'
    },
    {
      id: 'BILL005',
      code: 'REPO_PROCESSING',
      name: 'Repo Processing Fee',
      category: 'Transaction Fees',
      feeType: 'Per Transaction',
      amount: 100.000,
      currency: 'BHD',
      minAmount: 50.000,
      maxAmount: 1000.000,
      status: 'Active'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Transaction Fees': return 'default';
      case 'Settlement Fees': return 'secondary';
      case 'Service Fees': return 'outline';
      case 'Penalty Fees': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing Configurations</h1>
        <p className="text-muted-foreground">Manage billing rules, fee structures, and pricing configurations</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search billing configurations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Billing Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Fees</CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingConfigs.filter(config => config.category === 'Transaction Fees').length}
            </div>
            <p className="text-xs text-muted-foreground">Per-transaction charges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settlement Fees</CardTitle>
            <Calculator className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingConfigs.filter(config => config.category === 'Settlement Fees').length}
            </div>
            <p className="text-xs text-muted-foreground">Settlement-based charges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Fees</CardTitle>
            <Calculator className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingConfigs.filter(config => config.category === 'Service Fees').length}
            </div>
            <p className="text-xs text-muted-foreground">Recurring service fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penalty Fees</CardTitle>
            <Calculator className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingConfigs.filter(config => config.category === 'Penalty Fees').length}
            </div>
            <p className="text-xs text-muted-foreground">Penalty and late charges</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Billing Configuration Rules
          </CardTitle>
          <CardDescription>Configure fee structures, rates, and billing rules for various operations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Code</TableHead>
                <TableHead>Fee Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount/Rate</TableHead>
                <TableHead>Min Amount</TableHead>
                <TableHead>Max Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBillingConfigs.map((config) => (
                <TableRow key={config.id}>
                  <TableCell className="font-mono">{config.code}</TableCell>
                  <TableCell className="font-medium">{config.name}</TableCell>
                  <TableCell>
                    <Badge variant={getCategoryColor(config.category)}>
                      {config.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{config.feeType}</TableCell>
                  <TableCell className="font-mono">
                    {config.amount.toFixed(3)} {config.currency}
                  </TableCell>
                  <TableCell className="font-mono">
                    {config.minAmount.toFixed(3)} BHD
                  </TableCell>
                  <TableCell className="font-mono">
                    {config.maxAmount.toFixed(3)} BHD
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{config.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="w-3 h-3" />
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

export default BillingConfigurationsPage;