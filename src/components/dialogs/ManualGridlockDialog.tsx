import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ManualGridlockDialogProps {
  onClose: () => void;
}

export function ManualGridlockDialog({ onClose }: ManualGridlockDialogProps) {
  const [formData, setFormData] = useState({
    method: '',
    priorityGroup: ''
  });

  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [isResolving, setIsResolving] = useState(false);

  // Mock transaction data for gridlock analysis
  const mockTransactions = [
    { id: 'TXN001', participant: 'Ahli United Bank', amount: 15000000, status: 'Queued', priority: 'High' },
    { id: 'TXN002', participant: 'NBB', amount: 8500000, status: 'Queued', priority: 'Medium' },
    { id: 'TXN003', participant: 'BBK', amount: 12000000, status: 'Queued', priority: 'High' },
    { id: 'TXN004', participant: 'Ahli United Bank', amount: 6000000, status: 'Queued', priority: 'Low' },
    { id: 'TXN005', participant: 'NBB', amount: 3500000, status: 'Queued', priority: 'Medium' },
    { id: 'TXN006', participant: 'BBK', amount: 9200000, status: 'Queued', priority: 'High' },
    { id: 'TXN007', participant: 'GIB', amount: 4800000, status: 'Queued', priority: 'Low' },
    { id: 'TXN008', participant: 'ABC Bank', amount: 7200000, status: 'Queued', priority: 'Medium' },
    { id: 'TXN009', participant: 'GIB', amount: 2100000, status: 'Queued', priority: 'Low' },
    { id: 'TXN010', participant: 'ABC Bank', amount: 11800000, status: 'Queued', priority: 'High' }
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSimulateGridlock = () => {
    // Determine affected transactions based on method
    let affectedCount;
    let affectedTransactionsList;
    
    switch (formData.method) {
      case 'gradient-descent':
        affectedCount = Math.floor(Math.random() * 4) + 6; // 6-9 transactions
        break;
      case 'linear-programming':
        affectedCount = Math.floor(Math.random() * 3) + 4; // 4-6 transactions
        break;
      case 'graph-algorithm':
        affectedCount = Math.floor(Math.random() * 5) + 7; // 7-11 transactions
        break;
      case 'heuristic':
        affectedCount = Math.floor(Math.random() * 3) + 8; // 8-10 transactions
        break;
      default:
        affectedCount = 8;
    }

    // Select random transactions for the gridlock
    const shuffled = [...mockTransactions].sort(() => 0.5 - Math.random());
    affectedTransactionsList = shuffled.slice(0, affectedCount);
    
    const totalAmount = affectedTransactionsList.reduce((sum, txn) => sum + txn.amount, 0);
    const uniqueParticipants = [...new Set(affectedTransactionsList.map(txn => txn.participant))];

    const mockResult = {
      gridlockDetected: true,
      affectedTransactions: affectedCount,
      totalAmount,
      participants: uniqueParticipants,
      method: formData.method,
      priorityGroup: formData.priorityGroup,
      transactionsList: affectedTransactionsList
    };
    setSimulationResult(mockResult);
  };

  const handleResolveGridlock = () => {
    setIsResolving(true);
    // Simulate resolution process
    setTimeout(() => {
      setSimulationResult(prev => ({ ...prev, resolved: true }));
      setIsResolving(false);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BHD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Manual Gridlock</h3>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Manual Gridlock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="method">Method</Label>
            <Select value={formData.method} onValueChange={(value) => updateField('method', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gradient-descent">Gradient descent, max. sum of transactions</SelectItem>
                <SelectItem value="linear-programming">Linear programming approach</SelectItem>
                <SelectItem value="graph-algorithm">Graph-based algorithm</SelectItem>
                <SelectItem value="heuristic">Heuristic optimization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="priorityGroup">Priority Group</Label>
            <Select value={formData.priorityGroup} onValueChange={(value) => updateField('priorityGroup', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest-priority">Priorité Participant Elevé règlement ou rejet (P_HAUTE_SOR)</SelectItem>
                <SelectItem value="high-priority">High Priority Group</SelectItem>
                <SelectItem value="medium-priority">Medium Priority Group</SelectItem>
                <SelectItem value="low-priority">Low Priority Group</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {simulationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {simulationResult.resolved ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Gridlock Resolved
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Gridlock Analysis
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Affected Transactions</Label>
                <div className="text-2xl font-bold">{simulationResult.affectedTransactions}</div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Total Amount</Label>
                <div className="text-2xl font-bold">{formatCurrency(simulationResult.totalAmount)}</div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-muted-foreground">Affected Participants</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {simulationResult.participants.map((participant: string) => (
                  <Badge key={participant} variant="outline">
                    {participant}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Method</Label>
                <div>{simulationResult.method || 'Not selected'}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Priority Group</Label>
                <div>{simulationResult.priorityGroup || 'Not selected'}</div>
              </div>
            </div>

            {simulationResult.resolved && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-800">
                  Gridlock successfully resolved. {simulationResult.affectedTransactions} transactions have been processed.
                </div>
              </div>
            )}

            {/* Affected Transactions Table */}
            {simulationResult.transactionsList && !simulationResult.resolved && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Affected Transactions</h4>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-orange-50">
                          <TableHead className="text-orange-800">Transaction ID</TableHead>
                          <TableHead className="text-orange-800">Participant</TableHead>
                          <TableHead className="text-orange-800">Amount</TableHead>
                          <TableHead className="text-orange-800">Priority</TableHead>
                          <TableHead className="text-orange-800">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {simulationResult.transactionsList.map((transaction: any, index: number) => (
                          <TableRow key={transaction.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                            <TableCell className="text-sm">{transaction.participant}</TableCell>
                            <TableCell className="font-mono text-sm">{formatCurrency(transaction.amount)}</TableCell>
                            <TableCell>
                              <Badge variant={
                                transaction.priority === 'High' ? 'destructive' : 
                                transaction.priority === 'Medium' ? 'default' : 'outline'
                              }>
                                {transaction.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-orange-600 border-orange-300">
                                {transaction.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={handleSimulateGridlock}
          disabled={!formData.method || !formData.priorityGroup}
        >
          Simulate gridlock resolution
        </Button>
        <Button
          onClick={handleResolveGridlock}
          disabled={!simulationResult || simulationResult.resolved || isResolving}
        >
          {isResolving ? 'Resolving...' : 'Resolve gridlock'}
        </Button>
      </div>
    </div>
  );
}