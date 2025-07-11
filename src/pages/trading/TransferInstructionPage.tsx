import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';

const TransferInstructionPage = () => {
  const transferInstructionData = {
    pipeline: [
      { type: 'DvP', pending: 45, settled: 1250, failed: 8, cancelled: 12 },
      { type: 'RvP', pending: 32, settled: 890, failed: 5, cancelled: 7 },
      { type: 'DvF', pending: 18, settled: 650, failed: 3, cancelled: 4 },
      { type: 'RvF', pending: 25, settled: 420, failed: 2, cancelled: 6 },
    ],
    recentInstructions: [
      { id: 'TI001', type: 'DvP', instrument: 'AAPL', qty: 1000, value: 175500, status: 'Settled', time: '14:30' },
      { id: 'TI002', type: 'RvP', instrument: 'TSLA', qty: 500, value: 110000, status: 'Pending', time: '14:28' },
      { id: 'TI003', type: 'DvF', instrument: 'GOOGL', qty: 100, value: 275000, status: 'Failed', time: '14:25' },
    ]
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Transfer Instruction</h1>
            <p className="text-slate-600">Manage and monitor transfer instructions</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Instruction Pipeline Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transferInstructionData.pipeline.map((item) => (
                    <div key={item.type} className="p-4 border rounded-lg">
                      <div className="font-semibold text-lg mb-2">{item.type}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-yellow-600">Pending: {item.pending}</span>
                        </div>
                        <div>
                          <span className="text-green-600">Settled: {item.settled}</span>
                        </div>
                        <div>
                          <span className="text-red-600">Failed: {item.failed}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Cancelled: {item.cancelled}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transferInstructionData.recentInstructions.map((instruction) => (
                    <div key={instruction.id} className="p-3 bg-slate-50 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{instruction.id} - {instruction.type}</div>
                          <div className="text-sm text-slate-600">
                            {instruction.instrument} • {instruction.qty} shares • ${instruction.value.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            instruction.status === 'Settled' ? 'text-green-600' :
                            instruction.status === 'Pending' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {instruction.status}
                          </div>
                          <div className="text-xs text-slate-500">{instruction.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start">Create New Instruction</Button>
                  <Button variant="outline" className="w-full justify-start">Batch Upload</Button>
                  <Button variant="outline" className="w-full justify-start">Settlement Report</Button>
                  <Button variant="outline" className="w-full justify-start">Exception Management</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TransferInstructionPage;