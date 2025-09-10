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
        { id: 'ilf-pool', name: 'ILF (Pool)', description: 'Intraday Liquidity Facility pool' },
        { id: 'specific-ilf', name: 'Specific ILF borrowing back', description: 'Targeted ILF operations' }
      ]
    },
    {
      title: 'Repo Operations',
      icon: RefreshCw,
      operations: [
        { id: 'repo-transaction', name: 'Repo Transaction', description: 'Repurchase agreement operations' },
        { id: 'reverse-repo', name: 'Reverse Repo', description: 'Reverse repurchase operations' },
        { id: 'tri-party-repo', name: 'Tri-party Repo', description: 'Three-party repo arrangements' },
        { id: 'islamic-repo', name: 'Islamic Repo Operations', description: 'Sharia-compliant repo operations' }
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
      title: 'Other Operations',
      icon: Briefcase,
      operations: [
        { id: 'overnight-facility', name: 'Overnight facility (by instrument)', description: 'Overnight facility operations by instrument type' },
        { id: 'overnight-lending', name: 'Overnight facility for instrument', description: 'Overnight instrument-specific facility' },
        { id: 'islamic-overnight', name: 'Islamic overnight facility (by instrument)', description: 'Sharia-compliant overnight facility' },
        { id: 'islamic-instrument', name: 'Islamic overnight facility for instrument', description: 'Islamic overnight facility for specific instruments' },
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
        <Badge variant="secondary" className="px-3 py-1">
          <Target className="w-3 h-3 mr-1" />
          Participant Portal
        </Badge>
      </div>

      <Tabs defaultValue="operations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operations">Available Operations</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="quick">Quick Actions</TabsTrigger>
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

        <TabsContent value="quick">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Quick DvP Transfer
                </CardTitle>
                <CardDescription>Initiate a delivery vs payment transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('dvp-transfer')}>
                  <Send className="w-4 h-4 mr-2" />
                  Open DvP Transfer Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Quick Repo
                </CardTitle>
                <CardDescription>Initiate a repurchase agreement</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('repo-pledge')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Open Repo Pledge Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  General Transfer
                </CardTitle>
                <CardDescription>Initiate a general funds transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('general-transfer')}>
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Open Transfer Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Check Funds
                </CardTitle>
                <CardDescription>Check available funds and balances</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('check-funds')}>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Check Funds
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Position Calculator
                </CardTitle>
                <CardDescription>Calculate position requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selection Dialog */}
      {selectedOperation && ![
        'dvp-transfer', 'repo-pledge', 'general-transfer', 'check-funds',
        'rvf-instruction', 'dvf-instruction', 'house-transfer', 'rvp-instruction', 
        'rvp-when-issued', 'dvp-instruction', 'dvp-when-issued',
        'interbank-repo-receive', 'interbank-repo-deliver', 
        'islamic-repo-receive', 'islamic-repo-deliver'
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
          'islamic-repo-receive', 'islamic-repo-deliver'
        ].includes(selectedOperation) ? selectedOperation : null}
        onClose={() => setSelectedOperation('')}
      />
    </div>
  );
};

export default ParticipantOperationsHub;