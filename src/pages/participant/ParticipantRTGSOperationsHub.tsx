import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Send, 
  CreditCard, 
  MessageSquare,
  ArrowUpDown,
  Banknote,
  Users,
  FileText,
  Clock,
  CheckCircle,
  Calculator,
  RefreshCw
} from 'lucide-react';
import { ParticipantRTGSOperationsDialogs } from '@/components/participant/ParticipantRTGSOperationsDialogs';

const ParticipantRTGSOperationsHub = () => {
  const [selectedOperation, setSelectedOperation] = useState('');

  const operationsCategories = [
    {
      title: 'Payment Operations',
      icon: Send,
      operations: [
        { id: 'institution-transfer', name: 'Institution Transfer', description: 'Bank-to-bank transfer operations' },
        { id: 'institution-cover-transfer', name: 'Institution Cover Transfer', description: 'Cover payment instructions' },
        { id: 'customer-credit-transfer', name: 'Single Customer Credit Transfer', description: 'Direct customer payments' },
        { id: 'free-format-message', name: 'Free Format Message', description: 'General communication messages' }
      ]
    },
    {
      title: 'Liquidity Management',
      icon: Banknote,
      operations: [
        { id: 'liquidity-check', name: 'Check Available Liquidity', description: 'Review current liquidity positions' },
        { id: 'intraday-facility', name: 'Intraday Liquidity Facility', description: 'Access intraday credit facilities' },
        { id: 'settlement-limits', name: 'Settlement Limit Management', description: 'Manage RTGS settlement limits' },
        { id: 'queue-management', name: 'Queue Management', description: 'Manage queued transactions' }
      ]
    },
    {
      title: 'Monitoring & Reports',
      icon: FileText,
      operations: [
        { id: 'transaction-status', name: 'Transaction Status Inquiry', description: 'Check payment status and history' },
        { id: 'balance-report', name: 'Balance & Position Report', description: 'Current balances and positions' },
        { id: 'daily-statements', name: 'Daily Account Statements', description: 'Comprehensive daily reports' },
        { id: 'operational-reports', name: 'Operational Reports', description: 'System and operational insights' }
      ]
    }
  ];

  const recentOperations = [
    { id: 'RT001', type: 'Institution Transfer', recipient: 'BBK', amount: 500000, status: 'Completed', time: '14:30' },
    { id: 'RT002', type: 'Customer Credit Transfer', recipient: 'Individual', amount: 250000, status: 'Processing', time: '13:45' },
    { id: 'RT003', type: 'Cover Transfer', recipient: 'GIB', amount: 100000, status: 'Pending', time: '12:20' },
    { id: 'RT004', type: 'Institution Transfer', recipient: 'AHLI', amount: 750000, status: 'Completed', time: '11:15' }
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
          <h1 className="text-3xl font-bold">RTGS Operations Hub</h1>
          <p className="text-muted-foreground">Real-Time Gross Settlement System Operations Center</p>
        </div>
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
                Recent RTGS Operations
              </CardTitle>
              <CardDescription>Your latest RTGS operational activities</CardDescription>
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
                      <p className="text-sm text-muted-foreground">To: {operation.recipient}</p>
                      <p className="text-xs text-muted-foreground">Ref: {operation.id}</p>
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
                  Quick Institution Transfer
                </CardTitle>
                <CardDescription>Fast bank-to-bank transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('institution-transfer')}>
                  <Send className="w-4 h-4 mr-2" />
                  Open Transfer Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Customer Payment
                </CardTitle>
                <CardDescription>Process customer credit transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('customer-credit-transfer')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Open Payment Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  Check Liquidity
                </CardTitle>
                <CardDescription>Review available liquidity</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('liquidity-check')}>
                  <Banknote className="w-4 h-4 mr-2" />
                  Check Liquidity
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Transaction Status
                </CardTitle>
                <CardDescription>Check payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('transaction-status')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Check Status
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Balance Report
                </CardTitle>
                <CardDescription>Generate balance report</CardDescription>
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
        'institution-transfer', 'customer-credit-transfer', 'liquidity-check', 'transaction-status',
        'institution-cover-transfer', 'free-format-message'
      ].includes(selectedOperation) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Operation Details: {selectedOperation}</CardTitle>
            <CardDescription>Configure and execute the selected RTGS operation</CardDescription>
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
      
      {/* RTGS Operations Dialogs */}
      <ParticipantRTGSOperationsDialogs 
        activeDialog={[
          'institution-transfer', 'customer-credit-transfer', 'liquidity-check', 'transaction-status',
          'institution-cover-transfer', 'free-format-message'
        ].includes(selectedOperation) ? selectedOperation : null}
        onClose={() => setSelectedOperation('')}
      />
    </div>
  );
};

export default ParticipantRTGSOperationsHub;