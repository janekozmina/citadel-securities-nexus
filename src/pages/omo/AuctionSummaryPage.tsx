import { PageHeader } from '@/components/common/PageHeader';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/DataTable';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';
import { BarChart3, Activity, DollarSign, Users } from 'lucide-react';

const AuctionSummaryPage = () => {
  // Summary metrics for auctions
  const summaryMetrics = [
    {
      title: 'Active Auctions',
      value: '12',
      change: '+3',
      icon: Activity,
      trend: 'up'
    },
    {
      title: 'Total Volume',
      value: 'BHD 2.5B',
      change: '+12%',
      icon: BarChart3,
      trend: 'up'
    },
    {
      title: 'Participants',
      value: '28',
      change: '+2',
      icon: Users,
      trend: 'up'
    },
    {
      title: 'Avg Coverage',
      value: '2.8x',
      change: '+0.3x',
      icon: DollarSign,
      trend: 'up'
    }
  ];

  // Primary Market auctions data
  const primaryMarketData = [
    { id: 'PM001', instrument: 'Treasury Bill 91D', amount: 'BHD 50M', coverage: '2.1x', status: 'Active', maturity: '2024-03-15' },
    { id: 'PM002', instrument: 'Treasury Bond 5Y', amount: 'BHD 100M', coverage: '2.8x', status: 'Pending', maturity: '2029-01-20' },
    { id: 'PM003', instrument: 'Islamic Sukuk 3Y', amount: 'BHD 75M', coverage: '3.2x', status: 'Closed', maturity: '2027-06-10' }
  ];

  // Repo auctions data
  const repoData = [
    { id: 'RP001', type: 'Repo 7D', amount: 'BHD 25M', rate: '3.25%', status: 'Active', maturity: '2024-01-08' },
    { id: 'RP002', type: 'Reverse Repo 14D', amount: 'BHD 40M', rate: '3.15%', status: 'Active', maturity: '2024-01-15' },
    { id: 'RP003', type: 'Repo 1M', amount: 'BHD 60M', rate: '3.35%', status: 'Pending', maturity: '2024-02-01' }
  ];

  // Deposit auctions data
  const depositData = [
    { id: 'DP001', type: 'Term Deposit 3M', amount: 'BHD 30M', rate: '3.75%', status: 'Active', maturity: '2024-04-01' },
    { id: 'DP002', type: 'Islamic Deposit 6M', amount: 'BHD 45M', rate: '3.85%', status: 'Closed', maturity: '2024-07-01' },
    { id: 'DP003', type: 'Overnight Deposit', amount: 'BHD 20M', rate: '3.00%', status: 'Active', maturity: '2024-01-02' }
  ];

  // FX auctions data
  const fxData = [
    { id: 'FX001', type: 'USD/BHD Spot', amount: 'USD 10M', rate: '0.377', status: 'Active', settlement: '2024-01-03' },
    { id: 'FX002', type: 'EUR/BHD Forward', amount: 'EUR 5M', rate: '0.345', status: 'Pending', settlement: '2024-01-15' },
    { id: 'FX003', type: 'USD/BHD Swap', amount: 'USD 15M', rate: '0.378', status: 'Active', settlement: '2024-01-10' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'Pending': { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      'Closed': { variant: 'outline' as const, color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
    return <Badge variant={config.variant} className={config.color}>{status}</Badge>;
  };

  const primaryMarketColumns = [
    { key: 'id', label: 'Auction ID' },
    { key: 'instrument', label: 'Instrument' },
    { key: 'amount', label: 'Amount' },
    { key: 'coverage', label: 'Coverage' },
    { key: 'status', label: 'Status' },
    { key: 'maturity', label: 'Maturity' }
  ];

  const repoColumns = [
    { key: 'id', label: 'Auction ID' },
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Amount' },
    { key: 'rate', label: 'Rate' },
    { key: 'status', label: 'Status' },
    { key: 'maturity', label: 'Maturity' }
  ];

  const depositColumns = [
    { key: 'id', label: 'Auction ID' },
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Amount' },
    { key: 'rate', label: 'Rate' },
    { key: 'status', label: 'Status' },
    { key: 'maturity', label: 'Maturity' }
  ];

  const fxColumns = [
    { key: 'id', label: 'Auction ID' },
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Amount' },
    { key: 'rate', label: 'Rate' },
    { key: 'status', label: 'Status' },
    { key: 'settlement', label: 'Settlement' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auction Summary"
        description="Consolidated view of all auction types and market operations"
      />
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </p>
                  </div>
                  <IconComponent className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Consolidated Auction Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Market */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Market Auctions</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Primary Market"
              columns={primaryMarketColumns}
              data={primaryMarketData}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>

        {/* Repo Auctions */}
        <Card>
          <CardHeader>
            <CardTitle>Repo Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Repo Operations"
              columns={repoColumns}
              data={repoData}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>

        {/* Deposit Auctions */}
        <Card>
          <CardHeader>
            <CardTitle>Deposit Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="Deposit Facilities"
              columns={depositColumns}
              data={depositData}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>

        {/* FX Auctions */}
        <Card>
          <CardHeader>
            <CardTitle>FX Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              title="FX Operations"
              columns={fxColumns}
              data={fxData}
              itemsPerPage={5}
            />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <QuickActionsManager pageKey="auction-summary" systemType="common" />
    </div>
  );
};

export default AuctionSummaryPage;