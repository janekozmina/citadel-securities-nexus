import { useState } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/common/DataTable';
import { ConditionalQuickActions } from '@/components/common/ConditionalQuickActions';
import { Button } from '@/components/ui/button';
import AuctionWizardDialog from '@/components/dialogs/AuctionWizardDialog';
import { CreateBidDialog } from '@/components/dialogs/CreateBidDialog';
import { ParticipantSubmissionDialog } from '@/components/dialogs/ParticipantSubmissionDialog';
import SimulateAuctionDialog from '@/components/dialogs/SimulateAuctionDialog';
import { BarChart3, Activity, DollarSign, Users, Plus, TrendingUp, PieChart, X, Play, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import {
  AlertDialog as AlertDialogComponent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const AuctionSummaryPage = () => {
  const [showAuctionWizard, setShowAuctionWizard] = useState(false);
  const [showCreateBid, setShowCreateBid] = useState(false);
  const [showParticipantSubmission, setShowParticipantSubmission] = useState(false);
  const [showSimulateAuction, setShowSimulateAuction] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [auctionToFinish, setAuctionToFinish] = useState<any>(null);
  
  // State for auction data
  const [primaryMarketData, setPrimaryMarketData] = useState([
    { docId: '289', issueCode: 'TESTCBBILL001', auctionCode: 'A03', stepName: 'Closed', status: 'Closed', resultName: 'AC' },
    { docId: '290', issueCode: 'TESTCBBILL002', auctionCode: 'A04', stepName: 'Active', status: 'Active', resultName: 'PD' },
    { docId: '291', issueCode: 'TESTCBBOND001', auctionCode: 'A05', stepName: 'Pending', status: 'Pending', resultName: '-' }
  ]);
  
  const [repoData, setRepoData] = useState([
    { docId: '292', issueCode: 'REPO001', auctionCode: 'R01', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-01-08', cutOffDate: '2024-01-07', announced: 'Yes' },
    { docId: '293', issueCode: 'REPO002', auctionCode: 'R02', stepName: 'Closed', status: 'Closed', resultName: 'AC', settlDate: '2024-01-15', cutOffDate: '2024-01-14', announced: 'Yes' },
    { docId: '294', issueCode: 'REPO003', auctionCode: 'R03', stepName: 'Pending', status: 'Pending', resultName: '-', settlDate: '2024-02-01', cutOffDate: '2024-01-31', announced: 'No' }
  ]);
  
  const [depositData, setDepositData] = useState([
    { docId: '295', issueCode: 'DEP001', auctionCode: 'D01', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-04-01', cutOffDate: '2024-03-31', announced: 'Yes' },
    { docId: '296', issueCode: 'DEP002', auctionCode: 'D02', stepName: 'Closed', status: 'Closed', resultName: 'AC', settlDate: '2024-07-01', cutOffDate: '2024-06-30', announced: 'Yes' },
    { docId: '297', issueCode: 'DEP003', auctionCode: 'D03', stepName: 'Active', status: 'Active', resultName: 'PD', settlDate: '2024-01-02', cutOffDate: '2024-01-01', announced: 'No' }
  ]);
  
  const [fxData, setFxData] = useState([
    { docId: '298', issueCode: 'FX001', auctionCode: 'F01', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-01-03', cutOffDate: '2024-01-02', announced: 'Yes' },
    { docId: '299', issueCode: 'FX002', auctionCode: 'F02', stepName: 'Pending', status: 'Pending', resultName: '-', settlDate: '2024-01-15', cutOffDate: '2024-01-14', announced: 'No' },
    { docId: '300', issueCode: 'FX003', auctionCode: 'F03', stepName: 'Active', status: 'Active', resultName: 'AC', settlDate: '2024-01-10', cutOffDate: '2024-01-09', announced: 'Yes' }
  ]);
  
  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'create-auction':
        setShowAuctionWizard(true);
        break;
      case 'create-bid':
        setShowCreateBid(true);
        break;
      case 'submit-auction-participant':
        setShowParticipantSubmission(true);
        break;
      default:
        console.log(`Action triggered: ${actionId}`);
    }
  };

  const updateAuctionStatus = (auctionCode: string, newStatus: string, newStepName: string) => {
    // Update in all data arrays
    setPrimaryMarketData(prev => 
      prev.map(item => 
        item.auctionCode === auctionCode 
          ? { ...item, status: newStatus, stepName: newStepName }
          : item
      )
    );
    
    setRepoData(prev => 
      prev.map(item => 
        item.auctionCode === auctionCode 
          ? { ...item, status: newStatus, stepName: newStepName }
          : item
      )
    );
    
    setDepositData(prev => 
      prev.map(item => 
        item.auctionCode === auctionCode 
          ? { ...item, status: newStatus, stepName: newStepName }
          : item
      )
    );
    
    setFxData(prev => 
      prev.map(item => 
        item.auctionCode === auctionCode 
          ? { ...item, status: newStatus, stepName: newStepName }
          : item
      )
    );
  };

  const handleAuctionAction = (auction: any, action: string) => {
    switch (action) {
      case 'close':
        updateAuctionStatus(auction.auctionCode, 'Closed', 'Closed');
        toast({
          title: "Auction Closed",
          description: `Auction ${auction.auctionCode} has been closed successfully.`,
        });
        break;
      case 'simulate':
        setSelectedAuction(auction);
        setShowSimulateAuction(true);
        break;
      case 'finish':
        setAuctionToFinish(auction);
        setShowFinishConfirm(true);
        break;
    }
  };

  const confirmFinishAuction = () => {
    if (auctionToFinish) {
      updateAuctionStatus(auctionToFinish.auctionCode, 'Finished', 'Finished');
      toast({
        title: "Auction Finished",
        description: `Auction ${auctionToFinish.auctionCode} has been finished successfully.`,
      });
      setShowFinishConfirm(false);
      setAuctionToFinish(null);
    }
  };

  // Chart data for Bid Distribution
  const bidDistributionData = [
    { range: '5.0-5.2%', bids: 2 },
    { range: '5.2-5.4%', bids: 5 },
    { range: '5.4-5.6%', bids: 8 },
    { range: '5.6-5.8%', bids: 12 },
    { range: '5.8-6.0%', bids: 7 },
    { range: '6.0-6.2%', bids: 3 },
  ];

  // Chart data for Participant Distribution
  const participantDistributionData = [
    { name: 'Banks', value: 45, color: '#0088FE' },
    { name: 'Non-Banks', value: 30, color: '#00C49F' },
    { name: 'International', value: 25, color: '#FFBB28' },
  ];

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

  // Data arrays are now managed by state above

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': { variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'Pending': { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      'Closed': { variant: 'outline' as const, color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
    return <Badge variant={config.variant} className={config.color}>{status}</Badge>;
  };

  const renderActionButtons = (auction: any) => (
    <div className="flex gap-1">
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleAuctionAction(auction, 'close')}
        className="h-7 px-2"
      >
        <X className="h-3 w-3" />
        Close
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleAuctionAction(auction, 'simulate')}
        className="h-7 px-2"
      >
        <Play className="h-3 w-3" />
        Simulate
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleAuctionAction(auction, 'finish')}
        className="h-7 px-2"
      >
        <CheckCircle className="h-3 w-3" />
        Finish
      </Button>
    </div>
  );

  const primaryMarketColumns = [
    { key: 'docId', label: 'DocId' },
    { key: 'issueCode', label: 'IssueCode' },
    { key: 'auctionCode', label: 'AuctionCode' },
    { key: 'stepName', label: 'StepName' },
    { key: 'status', label: 'Status' },
    { key: 'resultName', label: 'ResultName' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value: any, item: any) => renderActionButtons(item)
    }
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
    { key: 'announced', label: 'Announced' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value: any, item: any) => renderActionButtons(item)
    }
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
    { key: 'announced', label: 'Announced' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value: any, item: any) => renderActionButtons(item)
    }
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
    { key: 'announced', label: 'Announced' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value: any, item: any) => renderActionButtons(item)
    }
  ];

  return (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 pr-6">
        <PageHeader
          title="Auction Summary"
          description="Consolidated view of all auction types and market operations"
        />
        
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {metric.change}
                      </div>
                    </div>
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
                <BarChart3 className="h-5 w-5" />
                Bid Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bidDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bids" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Participant Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={participantDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {participantDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Auction Tables */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Market Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                title="Primary Market Auctions"
                data={primaryMarketData}
                columns={primaryMarketColumns}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Repo/Reverse Repo Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                title="Repo/Reverse Repo Auctions"
                data={repoData}
                columns={repoColumns}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deposit Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                title="Deposit Auctions"
                data={depositData}
                columns={depositColumns}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FX Auctions</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                title="FX Auctions"
                data={fxData}
                columns={fxColumns}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions Sidebar - Fixed width mismatch */}
      <div className="w-80 flex-shrink-0">
        <ConditionalQuickActions 
          pageKey="auction-summary"
          systemType="common"
          onActionClick={handleAction}
        />
      </div>
      
      {/* Auction Wizard Dialog */}
      <AuctionWizardDialog 
        open={showAuctionWizard}
        onOpenChange={setShowAuctionWizard}
      />
      
      {/* Create Bid Dialog */}
      <CreateBidDialog 
        open={showCreateBid}
        onOpenChange={setShowCreateBid}
      />
      
      {/* Participant Submission Dialog */}
      <ParticipantSubmissionDialog 
        open={showParticipantSubmission}
        onOpenChange={setShowParticipantSubmission}
      />
      
      {/* Simulate Auction Dialog */}
      <SimulateAuctionDialog 
        open={showSimulateAuction}
        onOpenChange={setShowSimulateAuction}
        auction={selectedAuction}
      />

      {/* Finish Confirmation Dialog */}
      <AlertDialogComponent open={showFinishConfirm} onOpenChange={setShowFinishConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Auction Finish</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to finish auction {auctionToFinish?.auctionCode}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFinishAuction}>
              Finish Auction
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogComponent>
    </div>
  );
};

export default AuctionSummaryPage;