import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSimulateGridlock = () => {
    // Simulate gridlock detection
    const mockResult = {
      gridlockDetected: true,
      affectedTransactions: 8,
      totalAmount: 45000000,
      participants: ['Ahli United Bank', 'NBB', 'BBK'],
      method: formData.method,
      priorityGroup: formData.priorityGroup
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