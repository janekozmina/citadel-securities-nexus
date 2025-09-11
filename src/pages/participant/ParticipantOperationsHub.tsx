import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowUpDown,
  ArrowRightLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  Briefcase,
  Target,
  RefreshCw,
  Send,
  FileText,
  Calculator,
  Building2,
  Layers,
  CreditCard
} from 'lucide-react';
import { ParticipantQuickActionsDialogs } from '@/components/participant/ParticipantQuickActionsDialogs';

const ParticipantOperationsHub = () => {
  const [selectedOperation, setSelectedOperation] = useState('');

  const operationsCategories = [
    {
      title: 'Transfer Operations',
      icon: ArrowUpDown,
      operations: [
        { id: 'dvp-instruction', name: 'DvP Instruction', description: 'Delivery vs Payment instruction' },
        { id: 'dvf-instruction', name: 'DvF Instruction', description: 'Delivery vs Fund instruction' },
        { id: 'rvp-when-issued', name: 'RVP (When-Issued)', description: 'Receipt versus payment for when-issued securities' },
        { id: 'dvp-when-issued', name: 'DVP (When-Issued)', description: 'Delivery versus payment for when-issued securities' },
        { id: 'free-instruction', name: 'Free Instruction', description: 'Free delivery instruction' },
        { id: 'intrabank-dvp', name: 'Intrabank DvP', description: 'Internal DvP operations' },
        { id: 'multiple-dvp', name: 'Multiple directions DvP', description: 'Multi-party DvP transactions' }
      ]
    },
    {
      title: 'Liquidity Operations',
      icon: DollarSign,
      operations: [
        { id: 'ilf-facility', name: 'ILF (Intraday Liquidity Facility)', description: 'Intraday liquidity management facility' },
        { id: 'overnight-liquidity', name: 'Overnight Liquidity Facility', description: 'Overnight liquidity facility operations' },
        { id: 'intrabank-facility', name: 'Intrabank borrowing facility (by instrument)', description: 'Internal borrowing by instrument' },
        { id: 'unallocated-facility', name: 'Unallocated borrowing facility', description: 'General purpose borrowing' },
        { id: 'ilf-pool', name: 'Operation ILF by pool', description: 'Intraday Liquidity Facility pool operations' },
        { id: 'specific-ilf', name: 'Specific ILF borrowing back', description: 'Targeted ILF operations' },
        { id: 'intrabank-transfer-ilf', name: 'Intrabank transfer for ILF', description: 'Internal transfers for ILF operations' },
        { id: 'intraday-liquidity-instrument', name: 'Intraday Liquidity facility by Instrument', description: 'Intraday liquidity with collateral allocation' },
        { id: 'ilf-buyback', name: 'ILF buyback', description: 'ILF buyback operations' }
      ]
    },
    {
      title: 'Repo Operations',
      icon: RefreshCw,
      operations: [
        { id: 'repo-transaction', name: 'Repo Transaction', description: 'Repurchase agreement operations' },
        { id: 'reverse-repo', name: 'Reverse Repo', description: 'Reverse repurchase operations' },
        { id: 'tri-party-repo', name: 'Tri-party Repo', description: 'Three-party repo arrangements' },
        { id: 'islamic-repo', name: 'Islamic Repo', description: 'Sharia-compliant repo operations' },
        { id: 'interbank-repo-rvp', name: 'Interbank REPO (RvP)', description: 'Interbank repurchase agreement with receipt vs payment' },
        { id: 'interbank-repo-dvp', name: 'Interbank REPO (DvP)', description: 'Interbank repo with delivery vs payment' },
        { id: 'islamic-repo-dvp', name: 'Islamic Repo (DvP)', description: 'Islamic repo with delivery vs payment' }
      ]
    },
    {
      title: 'Facility Operations',
      icon: Building2,
      operations: [
        { id: 'deposit-facility', name: 'Deposit Facility Operations', description: 'Central bank deposit facility' },
        { id: 'floor-facility', name: 'Floor Facility for Conventional Banks', description: 'Conventional banking floor facility' },
        { id: 'floor-islamic', name: 'Floor Facility for Islamic Banks', description: 'Islamic banking floor facility' },
        { id: 'lending-facility', name: 'Lending Facility Operations', description: 'Central bank lending operations' },
        { id: 'islamic-deposits', name: 'Islamic Deposits', description: 'Sharia-compliant deposit operations' },
        { id: 'islamic-lending', name: 'Islamic Lending Securities', description: 'Islamic securities lending' }
      ]
    },
    {
      title: 'Overnight & Islamic Operations',
      icon: Briefcase,
      operations: [
        { id: 'islamic-overnight-instrument', name: 'Islamic Overnight facility by Instrument', description: 'Islamic overnight facility for instruments' },
        { id: 'conventional-overnight-instrument', name: 'Conventional Overnight facility by Instrument', description: 'Conventional overnight with collateral allocation' },
        { id: 'interbank-money-placement', name: 'Interbank Money Placement', description: 'Interbank money market operations' },
        { id: 'sharia-deposit-wadiah', name: 'Sharia deposit (wadiah)', description: 'Islamic deposit operations' },
        { id: 'interbank-rollover', name: 'Interbank Rollover', description: 'Interbank rollover operations' }
      ]
    },
    {
      title: 'Other Operations',
      icon: Layers,
      operations: [
        { id: 'pledge-lien-initiation', name: 'Pledge/Lien Initiation', description: 'Initiate pledge or lien operations' },
        { id: 'lien-release', name: 'Lien Release', description: 'Release lien operations' },
        { id: 'auto-generated-reports', name: 'Auto Generated Reports', description: 'Generate automated reports' },
        { id: 'rtgs-settlement', name: 'RTGS settlement limit (JO)', description: 'RTGS settlement limitations' },
        { id: 'rtgs-securities', name: 'RTGS settlement limit (by securities)', description: 'Securities-based RTGS limits' },
        { id: 'rtgs-issuer', name: 'RTGS settlement limit (by issuer)', description: 'Issuer-based RTGS limits' },
        { id: 'yellowcard', name: 'Yellowcard BH170 portal view/monitoring/input', description: 'Yellowcard monitoring system' }
      ]
    }
  ];

  const recentOperations = [
    { id: '001', type: 'DvP Instruction', instrument: 'GOVT-TB-001', amount: 10000000, status: 'Completed', time: '14:30' },
    { id: '002', type: 'Repo Transaction', instrument: 'GOVT-BND-005', amount: 25000000, status: 'Processing', time: '13:45' },
    { id: '003', type: 'ILF Pool', instrument: 'CORP-BD-012', amount: 5000000, status: 'Pending', time: '12:20' },
    { id: '004', type: 'Islamic Repo', instrument: 'SUKUK-003', amount: 15000000, status: 'Completed', time: '11:15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'default';
      case 'processing': return 'secondary';
      case 'pending': return 'outline';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleOperationSelect = (operationId: string) => {
    setSelectedOperation(operationId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Operations Hub</h1>
          <p className="text-muted-foreground">Central Securities Depository Operations Center</p>
        </div>
      </div>

      <Tabs defaultValue="operations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="operations">Available Operations</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="operations">
          <div className="grid gap-6">
            {operationsCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    Available operations for {category.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.operations.map((operation) => (
                      <div
                        key={operation.id}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => handleOperationSelect(operation.id)}
                      >
                        <h4 className="font-medium mb-2">{operation.name}</h4>
                        <p className="text-sm text-muted-foreground">{operation.description}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3 w-full"
                          onClick={() => handleOperationSelect(operation.id)}
                        >
                          Initiate Operation
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Operations
              </CardTitle>
              <CardDescription>Your latest operational activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOperations.map((operation) => (
                  <div key={operation.id} className="flex justify-between items-center p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{operation.type}</span>
                        <Badge variant={getStatusColor(operation.status)} className="text-xs">
                          {operation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{operation.instrument}</p>
                      <p className="text-xs text-muted-foreground">ID: {operation.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">BHD {operation.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{operation.time}</p>
                      <Button variant="outline" size="sm" className="mt-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Selection Dialog */}
      {selectedOperation && ![
        'dvp-transfer', 'repo-pledge', 'general-transfer', 'check-funds',
        'rvf-instruction', 'dvf-instruction', 'house-transfer', 'rvp-instruction', 
        'rvp-when-issued', 'dvp-instruction', 'dvp-when-issued',
        'interbank-repo-receive', 'interbank-repo-deliver', 
        'islamic-repo-receive', 'islamic-repo-deliver', 'interbank-repo-rvp',
        'islamic-repo', 'interbank-repo-dvp', 'islamic-repo-dvp',
        'intrabank-transfer-ilf', 'ilf-pool', 'intraday-liquidity-instrument',
        'islamic-overnight-instrument', 'conventional-overnight-instrument',
        'interbank-money-placement', 'sharia-deposit-wadiah', 'ilf-buyback',
        'interbank-rollover', 'pledge-lien-initiation', 'lien-release',
        'auto-generated-reports'
      ].includes(selectedOperation) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Operation Details: {selectedOperation}</CardTitle>
            <CardDescription>Configure and execute the selected operation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Selected operation: <span className="font-medium">{selectedOperation}</span>
              </p>
              <div className="flex gap-2">
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Configure Operation
                </Button>
                <Button variant="outline" onClick={() => setSelectedOperation('')}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Quick Actions Dialogs */}
      <ParticipantQuickActionsDialogs 
        activeDialog={[
          'dvp-transfer', 'repo-pledge', 'general-transfer', 'check-funds',
          'rvf-instruction', 'dvf-instruction', 'house-transfer', 'rvp-instruction', 
          'rvp-when-issued', 'dvp-instruction', 'dvp-when-issued',
          'interbank-repo-receive', 'interbank-repo-deliver', 
          'islamic-repo-receive', 'islamic-repo-deliver', 'interbank-repo-rvp',
          'islamic-repo', 'interbank-repo-dvp', 'islamic-repo-dvp',
          'intrabank-transfer-ilf', 'ilf-pool', 'intraday-liquidity-instrument',
          'islamic-overnight-instrument', 'conventional-overnight-instrument',
          'interbank-money-placement', 'sharia-deposit-wadiah', 'ilf-buyback',
          'interbank-rollover', 'pledge-lien-initiation', 'lien-release',
          'auto-generated-reports'
        ].includes(selectedOperation) ? selectedOperation : null}
        onClose={() => setSelectedOperation('')}
      />
    </div>
  );
};

export default ParticipantOperationsHub;