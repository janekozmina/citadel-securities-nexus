import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Send, 
  CreditCard, 
  Building2,
  ArrowUpDown,
  Clock,
  CheckCircle,
  FileText,
  Calculator,
  Banknote
} from 'lucide-react';
import { ParticipantGCCOperationsDialogs } from '@/components/participant/ParticipantGCCOperationsDialogs';

const ParticipantGCCOperations = () => {
  const [selectedOperation, setSelectedOperation] = useState('');

  const operationsCategories = [
    {
      title: 'GCC Transfer Operations',
      icon: Globe,
      operations: [
        { id: 'gcc-institution-transfer', name: 'GCC Multi Currency Institution Transfer', description: 'Inter-bank GCC transfer operations' },
        { id: 'gcc-customer-transfer', name: 'GCC Multi Currency Customer Transfer', description: 'Customer cross-border payments within GCC' },
        { id: 'gcc-status-inquiry', name: 'GCC Transfer Status Inquiry', description: 'Check status of GCC transfers' }
      ]
    },
    {
      title: 'Currency Exchange Operations',
      icon: ArrowUpDown,
      operations: [
        { id: 'fx-rate-inquiry', name: 'FX Rate Inquiry', description: 'Check current exchange rates' }
      ]
    },
    {
      title: 'Monitoring & Reports',
      icon: FileText,
      operations: [
        { id: 'gcc-balance-report', name: 'Multi-Currency Balance Report', description: 'Balances across all GCC currencies' },
        { id: 'gcc-transaction-history', name: 'GCC Transaction History', description: 'Historical GCC transaction records' },
        { id: 'gcc-settlement-report', name: 'GCC Settlement Report', description: 'Cross-border settlement analytics' },
        { id: 'gcc-compliance-report', name: 'GCC Compliance Report', description: 'Regulatory compliance reporting' }
      ]
    }
  ];

  const recentOperations = [
    { id: 'GCC001', type: 'Institution Transfer', currency: 'SAR', recipient: 'SABB', amount: 1875000, status: 'Completed', time: '14:30' },
    { id: 'GCC002', type: 'Customer Transfer', currency: 'KWD', recipient: 'NBK', amount: 75000, status: 'Processing', time: '13:45' },
    { id: 'GCC003', type: 'Institution Transfer', currency: 'AED', recipient: 'ADCB', amount: 920000, status: 'Pending', time: '12:20' },
    { id: 'GCC004', type: 'Customer Transfer', currency: 'QAR', recipient: 'QNB', amount: 550000, status: 'Completed', time: '11:15' }
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
          <h1 className="text-3xl font-bold">GCC Operations Hub</h1>
          <p className="text-muted-foreground">Gulf Cooperation Council Multi-Currency Operations Center</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          GCC Network Online
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
                Recent GCC Operations
              </CardTitle>
              <CardDescription>Your latest GCC multi-currency activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOperations.map((operation) => (
                  <div key={operation.id} className="flex justify-between items-center p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{operation.type}</span>
                        <Badge variant="outline" className="text-xs">{operation.currency}</Badge>
                        <Badge variant={getStatusColor(operation.status)} className="text-xs">
                          {operation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">To: {operation.recipient}</p>
                      <p className="text-xs text-muted-foreground">Ref: {operation.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{operation.currency} {operation.amount.toLocaleString()}</p>
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
                  <Globe className="h-5 w-5" />
                  Quick GCC Institution Transfer
                </CardTitle>
                <CardDescription>Fast inter-bank GCC transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('gcc-institution-transfer')}>
                  <Globe className="w-4 h-4 mr-2" />
                  Open Transfer Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  GCC Customer Transfer
                </CardTitle>
                <CardDescription>Cross-border customer payment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('gcc-customer-transfer')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Open Payment Form
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  GCC Balance Report
                </CardTitle>
                <CardDescription>Multi-currency balance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setSelectedOperation('gcc-balance-report')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  FX Rate Calculator
                </CardTitle>
                <CardDescription>Calculate exchange rates</CardDescription>
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
        'gcc-institution-transfer', 'gcc-customer-transfer', 'gcc-balance-report'
      ].includes(selectedOperation) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Operation Details: {selectedOperation}</CardTitle>
            <CardDescription>Configure and execute the selected GCC operation</CardDescription>
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
      
      {/* GCC Operations Dialogs */}
      <ParticipantGCCOperationsDialogs 
        activeDialog={[
          'gcc-institution-transfer', 'gcc-customer-transfer', 'gcc-balance-report'
        ].includes(selectedOperation) ? selectedOperation : null}
        onClose={() => setSelectedOperation('')}
      />
    </div>
  );
};

export default ParticipantGCCOperations;