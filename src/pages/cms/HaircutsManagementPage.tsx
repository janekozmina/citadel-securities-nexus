import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, Star, TrendingUp, AlertTriangle, DollarSign, Target, Plus, Settings } from 'lucide-react';
import { useState } from 'react';

export default function HaircutsManagementPage() {
  const { toast } = useToast();
  const [setHaircutsOpen, setSetHaircutsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [haircutRate, setHaircutRate] = useState('');

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'add-asset':
        toast({
          title: "Add Asset",
          description: "Opening new asset registration form...",
        });
        break;
      case 'set-haircuts':
        setSetHaircutsOpen(true);
        break;
      case 'update-ratings':
        toast({
          title: "Credit Ratings Update",
          description: "Initiating credit ratings update process...",
        });
        break;
      case 'export-schedule':
        toast({
          title: "Export Started",
          description: "Haircut schedule export has been initiated.",
        });
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const handleSetHaircuts = () => {
    if (selectedAsset && haircutRate) {
      toast({
        title: "Haircuts Updated",
        description: `Haircut rate set to ${haircutRate}% for ${selectedAsset}`,
      });
      setSetHaircutsOpen(false);
      setSelectedAsset('');
      setHaircutRate('');
    }
  };

  const haircutsMetrics = [
    {
      title: 'Eligible Assets',
      value: '2,847',
      change: '+23',
      changeType: 'positive' as const,
      icon: Shield
    },
    {
      title: 'Avg Haircut Rate',
      value: '15.3%',
      change: '-0.5%',
      changeType: 'positive' as const,
      icon: Target
    },
    {
      title: 'AAA Rated Assets',
      value: '1,234',
      change: '+18',
      changeType: 'positive' as const,
      icon: Star
    },
    {
      title: 'Pending Reviews',
      value: '12',
      change: '-3',
      changeType: 'positive' as const,
      icon: AlertTriangle
    }
  ];

  const haircutsData = [
    {
      id: 1,
      instrument: 'Government Bonds - Bahrain',
      instrumentType: 'Sovereign Debt',
      creditRating: 'AA-',
      maturity: '< 1 Year',
      haircut: '2.0%',
      eligibilityRule: 'Minimum BHD 10M',
      lastUpdated: '2025-01-15',
      status: 'Active'
    },
    {
      id: 2,
      instrument: 'Corporate Bonds - ALBA',
      instrumentType: 'Corporate Debt',
      creditRating: 'A+',
      maturity: '1-5 Years',
      haircut: '8.5%',
      eligibilityRule: 'Listed Securities Only',
      lastUpdated: '2025-01-12',
      status: 'Active'
    },
    {
      id: 3,
      instrument: 'Bank Deposits - CBB',
      instrumentType: 'Cash Equivalent',
      creditRating: 'AA',
      maturity: 'On Demand',
      haircut: '0.0%',
      eligibilityRule: 'Central Bank Only',
      lastUpdated: '2025-01-10',
      status: 'Active'
    },
    {
      id: 4,
      instrument: 'Islamic Sukuk - GFH',
      instrumentType: 'Islamic Securities',
      creditRating: 'BBB+',
      maturity: '5-10 Years',
      haircut: '12.0%',
      eligibilityRule: 'Sharia Compliant',
      lastUpdated: '2025-01-08',
      status: 'Under Review'
    },
    {
      id: 5,
      instrument: 'Equities - Batelco',
      instrumentType: 'Equity Securities',
      creditRating: 'A-',
      maturity: 'Perpetual',
      haircut: '25.0%',
      eligibilityRule: 'Market Cap > BHD 100M',
      lastUpdated: '2025-01-05',
      status: 'Active'
    }
  ];

  const haircutScheduleData = [
    {
      id: 1,
      assetClass: 'Government Securities',
      aaa: '1.0%',
      aa: '2.0%',
      a: '3.5%',
      bbb: '8.0%',
      below: 'Not Eligible'
    },
    {
      id: 2,
      assetClass: 'Corporate Bonds',
      aaa: '4.0%',
      aa: '6.0%',
      a: '8.5%',
      bbb: '15.0%',
      below: '25.0%'
    },
    {
      id: 3,
      assetClass: 'Bank Securities',
      aaa: '3.0%',
      aa: '4.0%',
      a: '6.0%',
      bbb: '12.0%',
      below: 'Not Eligible'
    },
    {
      id: 4,
      assetClass: 'Islamic Securities',
      aaa: '5.0%',
      aa: '7.0%',
      a: '12.0%',
      bbb: '18.0%',
      below: '30.0%'
    },
    {
      id: 5,
      assetClass: 'Equity Securities',
      aaa: '20.0%',
      aa: '25.0%',
      a: '30.0%',
      bbb: '40.0%',
      below: '50.0%'
    }
  ];

  const haircutsColumns = [
    { key: 'instrument', label: 'Instrument', type: 'text' as const, sortable: true },
    { key: 'instrumentType', label: 'Type', type: 'text' as const, sortable: true },
    { key: 'creditRating', label: 'Credit Rating', type: 'text' as const, sortable: true },
    { key: 'maturity', label: 'Maturity', type: 'text' as const, sortable: true },
    { key: 'haircut', label: 'Haircut Rate', type: 'text' as const, sortable: true },
    { key: 'eligibilityRule', label: 'Eligibility Rule', type: 'text' as const },
    { key: 'lastUpdated', label: 'Last Updated', type: 'date' as const, sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      type: 'status' as const,
      filterable: true,
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Suspended', label: 'Suspended' }
      ]
    }
  ];

  const scheduleColumns = [
    { key: 'assetClass', label: 'Asset Class', type: 'text' as const, sortable: true },
    { key: 'aaa', label: 'AAA', type: 'text' as const },
    { key: 'aa', label: 'AA', type: 'text' as const },
    { key: 'a', label: 'A', type: 'text' as const },
    { key: 'bbb', label: 'BBB', type: 'text' as const },
    { key: 'below', label: 'Below BBB', type: 'text' as const }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader 
          title="Haircuts Management"
          description="Master list of accepted collateral with eligibility rules and haircut schedules"
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {haircutsMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">
                      <span className={metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                        {metric.change}
                      </span>
                      {' '}vs last month
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <metric.icon className="h-8 w-8 text-primary mb-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Haircut Schedule Matrix */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Haircut Schedule by Asset Class & Credit Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Haircut Matrix"
              columns={scheduleColumns}
              data={haircutScheduleData}
              searchable={false}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>

        {/* Eligible Instruments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Eligible Collateral Instruments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Accepted Collateral"
              columns={haircutsColumns}
              data={haircutsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="haircuts-management" 
          systemType="cms" 
          onActionClick={handleQuickAction}
        />
      </div>

      {/* Set Haircuts Dialog */}
      <Dialog open={setHaircutsOpen} onOpenChange={setSetHaircutsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Haircuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="asset">Asset Class</Label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger>
                  <SelectValue placeholder="Select asset class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government-bonds">Government Bonds</SelectItem>
                  <SelectItem value="corporate-bonds">Corporate Bonds</SelectItem>
                  <SelectItem value="equities">Equities</SelectItem>
                  <SelectItem value="cash-deposits">Cash Deposits</SelectItem>
                  <SelectItem value="islamic-sukuk">Islamic Sukuk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Haircut Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={haircutRate}
                onChange={(e) => setHaircutRate(e.target.value)}
                placeholder="Enter haircut rate"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSetHaircutsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSetHaircuts}>
                Update Haircuts
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}