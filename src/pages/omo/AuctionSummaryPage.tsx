import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/DataTable';
import { ConditionalQuickActions } from '@/components/common/ConditionalQuickActions';
import { Button } from '@/components/ui/button';
import AuctionWizardDialog from '@/components/dialogs/AuctionWizardDialog';
import { BarChart3, Activity, DollarSign, Users, Plus } from 'lucide-react';

const AuctionSummaryPage = () => {
  const [showAuctionWizard, setShowAuctionWizard] = useState(false);
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
    { docId: '289', issueCode: 'TESTCBBILL001', auctionCode: 'A03', stepName: 'Closed', status: 'Closed', resultName: 'AC' },
    { docId: '290', issueCode: 'TESTCBBILL002', auctionCode: 'A04', stepName: 'Active', status: 'Active', resultName: 'PD' },
    { docId: '291', issueCode: 'TESTCBBOND001', auctionCode: 'A05', stepName: 'Pending', status: 'Pending', resultName: '-' }
  ];

  // Repo auctions data
  const repoData = [
    { docId: '292', issueCode: 'REPO001', auctionCode: 'R01', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-01-08', cutOffDate: '2024-01-07', announced: 'Yes' },
    { docId: '293', issueCode: 'REPO002', auctionCode: 'R02', stepName: 'Closed', status: 'Closed', resultName: 'AC', settlDate: '2024-01-15', cutOffDate: '2024-01-14', announced: 'Yes' },
    { docId: '294', issueCode: 'REPO003', auctionCode: 'R03', stepName: 'Pending', status: 'Pending', resultName: '-', settlDate: '2024-02-01', cutOffDate: '2024-01-31', announced: 'No' }
  ];

  // Deposit auctions data
  const depositData = [
    { docId: '295', issueCode: 'DEP001', auctionCode: 'D01', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-04-01', cutOffDate: '2024-03-31', announced: 'Yes' },
    { docId: '296', issueCode: 'DEP002', auctionCode: 'D02', stepName: 'Closed', status: 'Closed', resultName: 'AC', settlDate: '2024-07-01', cutOffDate: '2024-06-30', announced: 'Yes' },
    { docId: '297', issueCode: 'DEP003', auctionCode: 'D03', stepName: 'Active', status: 'Active', resultName: 'PD', settlDate: '2024-01-02', cutOffDate: '2024-01-01', announced: 'No' }
  ];

  // FX auctions data
  const fxData = [
    { docId: '298', issueCode: 'FX001', auctionCode: 'F01', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-01-03', cutOffDate: '2024-01-02', announced: 'Yes' },
    { docId: '299', issueCode: 'FX002', auctionCode: 'F02', stepName: 'Pending', status: 'Pending', resultName: '-', settlDate: '2024-01-15', cutOffDate: '2024-01-14', announced: 'No' },
    { docId: '300', issueCode: 'FX003', auctionCode: 'F03', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-01-10', cutOffDate: '2024-01-09', announced: 'Yes' }
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
    { key: 'docId', label: 'DocId' },
    { key: 'issueCode', label: 'IssueCode' },
    { key: 'auctionCode', label: 'AuctionCode' },
    { key: 'stepName', label: 'StepName' },
    { key: 'status', label: 'Status' },
    { key: 'resultName', label: 'ResultName' }
  ];

  const repoColumns = [
    { key: 'docId', label: 'DocId' },
    { key: 'issueCode', label: 'IssueCode' },
    { key: 'auctionCode', label: 'AuctionCode' },
    { key: 'stepName', label: 'StepName' },
    { key: 'status', label: 'Status' },
    { key: 'resultName', label: 'ResultName' },
    { key: 'settlDate', label: 'SettlDate' },
    { key: 'cutOffDate', label: 'CutOffDate' },
    { key: 'announced', label: 'Announced' }
  ];

  const depositColumns = [
    { key: 'docId', label: 'DocId' },
    { key: 'issueCode', label: 'IssueCode' },
    { key: 'auctionCode', label: 'AuctionCode' },
    { key: 'stepName', label: 'StepName' },
    { key: 'status', label: 'Status' },
    { key: 'resultName', label: 'ResultName' },
    { key: 'settlDate', label: 'SettlDate' },
    { key: 'cutOffDate', label: 'CutOffDate' },
    { key: 'announced', label: 'Announced' }
  ];

  const fxColumns = [
    { key: 'docId', label: 'DocId' },
    { key: 'issueCode', label: 'IssueCode' },
    { key: 'auctionCode', label: 'AuctionCode' },
    { key: 'stepName', label: 'StepName' },
    { key: 'status', label: 'Status' },
    { key: 'resultName', label: 'ResultName' },
    { key: 'settlDate', label: 'SettlDate' },
    { key: 'cutOffDate', label: 'CutOffDate' },
    { key: 'announced', label: 'Announced' }
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        <PageHeader
          title="Auction Summary"
          description="Consolidated view of all auction types and market operations"
        />
        
        <div className="flex justify-end mb-6">
          <Button onClick={() => setShowAuctionWizard(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Auction
          </Button>
        </div>
        
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
        <div className="space-y-6">
          {/* Primary Market */}
          <Card>
            <CardContent className="p-6">
              <DataTable
                title="Primary Market Auctions"
                columns={primaryMarketColumns}
                data={primaryMarketData}
                itemsPerPage={5}
              />
            </CardContent>
          </Card>

          {/* Repo Auctions */}
          <Card>
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
            <CardContent className="p-6">
              <DataTable
                title="FX Operations"
                columns={fxColumns}
                data={fxData}
                itemsPerPage={5}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions Sidebar */}
      <div className="w-64">
        <ConditionalQuickActions 
          pageKey="auction-summary"
          systemType="common"
        />
      </div>
      
      {/* Auction Wizard Dialog */}
      <AuctionWizardDialog 
        open={showAuctionWizard}
        onOpenChange={setShowAuctionWizard}
      />
    </div>
  );
};

export default AuctionSummaryPage;