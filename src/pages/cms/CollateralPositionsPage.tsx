import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { DataTable } from '@/components/common/DataTable';
import { InteractiveChart } from '@/components/common/InteractiveChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Building2, DollarSign, TrendingUp, AlertCircle, Activity, Search, BarChart3 } from 'lucide-react';

export default function CollateralPositionsPage() {
  const { toast } = useToast();

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'query-positions':
        toast({
          title: "Position Query",
          description: "Opening advanced position query interface...",
        });
        break;
      case 'analyze-exposures':
        toast({
          title: "Exposure Analysis",
          description: "Launching comprehensive exposure analysis tool...",
        });
        break;
      case 'collateral-valuation':
        toast({
          title: "Valuation Started",
          description: "Real-time collateral valuation process initiated...",
        });
        break;
      case 'export-positions':
        toast({
          title: "Export Started",
          description: "Collateral positions export has been initiated.",
        });
        break;
      default:
        console.log(`Quick action clicked: ${actionId}`);
        break;
    }
  };

  const positionsMetrics = [
    {
      title: 'Total Collateral Value',
      value: 'BHD 8.4B',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Post-Haircut Value',
      value: 'BHD 7.1B',
      change: '+1.8%',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Active Counterparties',
      value: '127',
      change: '+5',
      changeType: 'positive' as const,
      icon: Building2
    },
    {
      title: 'Positions at Risk',
      value: '8',
      change: '-2',
      changeType: 'positive' as const,
      icon: AlertCircle
    }
  ];

  const collateralByCounterparty = [
    { name: 'Bank of Bahrain', value: 1250000000, color: 'hsl(var(--chart-1))' },
    { name: 'Emirates NBD', value: 980000000, color: 'hsl(var(--chart-2))' },
    { name: 'Arab Banking Corp', value: 750000000, color: 'hsl(var(--chart-3))' },
    { name: 'ADCB Bank', value: 680000000, color: 'hsl(var(--chart-4))' },
    { name: 'Others', value: 4340000000, color: 'hsl(var(--chart-5))' }
  ];

  const collateralByAssetType = [
    { name: 'Government Bonds', value: 3200000000, color: 'hsl(var(--chart-1))' },
    { name: 'Corporate Bonds', value: 2100000000, color: 'hsl(var(--chart-2))' },
    { name: 'Bank Securities', value: 1800000000, color: 'hsl(var(--chart-3))' },
    { name: 'Cash Equivalents', value: 1000000000, color: 'hsl(var(--chart-4))' },
    { name: 'Islamic Securities', value: 900000000, color: 'hsl(var(--chart-5))' }
  ];

  const positionsData = [
    {
      id: 1,
      counterparty: 'Bank of Bahrain',
      assetType: 'Government Bonds',
      instrument: 'BHR Treasury Bond 2030',
      nominalValue: 500000000,
      marketValue: 485000000,
      haircut: '2.0%',
      postHaircutValue: 475300000,
      pledgeDate: '2025-01-10',
      maturityDate: '2030-12-15',
      status: 'Active',
      creditRating: 'AA-'
    },
    {
      id: 2,
      counterparty: 'Emirates NBD Bank',
      assetType: 'Corporate Bonds',
      instrument: 'ALBA Corporate Bond 2028',
      nominalValue: 300000000,
      marketValue: 295000000,
      haircut: '8.5%',
      postHaircutValue: 269925000,
      pledgeDate: '2025-01-08',
      maturityDate: '2028-06-30',
      status: 'Active',
      creditRating: 'A+'
    },
    {
      id: 3,
      counterparty: 'Arab Banking Corporation',
      assetType: 'Islamic Securities',
      instrument: 'GFH Sukuk 2027',
      nominalValue: 200000000,
      marketValue: 198000000,
      haircut: '12.0%',
      postHaircutValue: 174240000,
      pledgeDate: '2025-01-05',
      maturityDate: '2027-03-15',
      status: 'Under Review',
      creditRating: 'BBB+'
    },
    {
      id: 4,
      counterparty: 'ADCB Bank',
      assetType: 'Bank Securities',
      instrument: 'BBK Preferred Shares',
      nominalValue: 150000000,
      marketValue: 148000000,
      haircut: '15.0%',
      postHaircutValue: 125800000,
      pledgeDate: '2025-01-03',
      maturityDate: '2026-12-31',
      status: 'Active',
      creditRating: 'A-'
    },
    {
      id: 5,
      counterparty: 'National Bank of Kuwait',
      assetType: 'Cash Equivalents',
      instrument: 'CBB Deposit Certificate',
      nominalValue: 100000000,
      marketValue: 100000000,
      haircut: '0.0%',
      postHaircutValue: 100000000,
      pledgeDate: '2025-01-15',
      maturityDate: '2025-07-15',
      status: 'Active',
      creditRating: 'AA'
    }
  ];

  const positionsColumns = [
    { key: 'counterparty', label: 'Counterparty', type: 'text' as const, sortable: true },
    { key: 'assetType', label: 'Asset Type', type: 'text' as const, sortable: true },
    { key: 'instrument', label: 'Instrument', type: 'text' as const, sortable: true },
    { key: 'nominalValue', label: 'Nominal Value', type: 'currency' as const, sortable: true },
    { key: 'marketValue', label: 'Market Value', type: 'currency' as const, sortable: true },
    { key: 'haircut', label: 'Haircut', type: 'text' as const, sortable: true },
    { key: 'postHaircutValue', label: 'Post-Haircut Value', type: 'currency' as const, sortable: true },
    { key: 'pledgeDate', label: 'Pledge Date', type: 'date' as const, sortable: true },
    { key: 'creditRating', label: 'Rating', type: 'text' as const, sortable: true },
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

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3 space-y-6">
        <PageHeader 
          title="Collateral Positions"
          description="View all pledged collateral by counterparty, asset type, and current valuation"
        />

        {/* Visible Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => handleQuickAction('query-positions')}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Query Positions
              </Button>
              <Button 
                onClick={() => handleQuickAction('analyze-exposures')}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analyze Exposures
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {positionsMetrics.map((metric, index) => (
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Collateral by Counterparty (BHD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                config={{
                  type: "pie",
                  title: "",
                  data: collateralByCounterparty,
                  height: 280
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Collateral by Asset Type (BHD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InteractiveChart
                config={{
                  type: "pie",
                  title: "",
                  data: collateralByAssetType,
                  height: 280
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Positions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Current Collateral Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="All Pledged Collateral"
              columns={positionsColumns}
              data={positionsData}
              searchable={true}
              itemsPerPage={10}
            />
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <QuickActionsManager 
          pageKey="collateral-positions" 
          systemType="cms" 
          onActionClick={handleQuickAction}
        />
      </div>
    </div>
  );
}