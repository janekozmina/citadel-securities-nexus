import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBusinessDaySimulation } from '@/hooks/useBusinessDaySimulation';
import { TrendingUp, CheckCircle2, XCircle, Clock, DollarSign, Activity, BarChart3, RefreshCw, Send, Search, PieChart } from 'lucide-react';
import { GeneralTransferForm } from '@/components/forms/GeneralTransferForm';
import { CheckFundsForm } from '@/components/forms/CheckFundsForm';
import { LiquiditySourceDashboard } from '@/components/dashboards/LiquiditySourceDashboard';
import { toast } from 'sonner';

export default function TransactionStatusPage() {
  const { rtgsMetrics, lastUpdated, isBusinessHours } = useBusinessDaySimulation();
  const [activeDialog, setActiveDialog] = useState<'transfer' | 'checkFunds' | 'liquidity' | null>(null);

  // Simulated transaction data
  const transactionMetrics = {
    total: {
      amount: 45670000,
      volume: 2847
    },
    settled: {
      amount: 42340000,
      volume: 2654
    },
    declined: {
      amount: 890000,
      volume: 67
    },
    queued: {
      amount: 2440000,
      volume: 126
    },
    ilf: {
      amount: 1250000,
      volume: 23
    },
    buyback: {
      amount: 780000,
      volume: 15
    }
  };

  const MetricCard = ({ title, amount, volume, icon: Icon, color, bgColor }: {
    title: string;
    amount: number;
    volume: number;
    icon: any;
    color: string;
    bgColor: string;
  }) => (
    <Card className={`${bgColor} border-l-4 ${color.replace('text-', 'border-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <Icon className={`h-8 w-8 ${color}`} />
        </div>
        <div className="space-y-2">
          <div>
            <div className="text-sm text-slate-600">Amount</div>
            <div className="text-2xl font-bold">BD {(amount / 1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-sm text-slate-600">Volume</div>
            <div className="text-xl font-semibold">{volume.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">RTGS — Transaction Status</h1>
            <div className="flex items-center gap-2 text-slate-600">
              <span>Real-time transaction amount and volume monitoring</span>
              <div className="flex items-center gap-1 text-xs">
                <RefreshCw className={`h-3 w-3 ${isBusinessHours ? 'animate-spin' : ''}`} />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          <div className="flex-1 space-y-6 pr-6">
            {/* Transaction Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Total Transactions"
                amount={transactionMetrics.total.amount}
                volume={transactionMetrics.total.volume}
                icon={BarChart3}
                color="text-blue-600"
                bgColor="bg-blue-50"
              />
              
              <MetricCard
                title="Settled Transactions"
                amount={transactionMetrics.settled.amount}
                volume={transactionMetrics.settled.volume}
                icon={CheckCircle2}
                color="text-green-600"
                bgColor="bg-green-50"
              />
              
              <MetricCard
                title="Declined Transactions"
                amount={transactionMetrics.declined.amount}
                volume={transactionMetrics.declined.volume}
                icon={XCircle}
                color="text-red-600"
                bgColor="bg-red-50"
              />
              
              <MetricCard
                title="Queued Transactions"
                amount={transactionMetrics.queued.amount}
                volume={transactionMetrics.queued.volume}
                icon={Clock}
                color="text-yellow-600"
                bgColor="bg-yellow-50"
              />
              
              <MetricCard
                title="ILF Amount/Volume"
                amount={transactionMetrics.ilf.amount}
                volume={transactionMetrics.ilf.volume}
                icon={DollarSign}
                color="text-purple-600"
                bgColor="bg-purple-50"
              />
              
              <MetricCard
                title="BUYBACK Amount/Volume"
                amount={transactionMetrics.buyback.amount}
                volume={transactionMetrics.buyback.volume}
                icon={TrendingUp}
                color="text-orange-600"
                bgColor="bg-orange-50"
              />
            </div>

            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settlement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">By Volume</span>
                      <span className="text-2xl font-bold text-green-600">
                        {((transactionMetrics.settled.volume / transactionMetrics.total.volume) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">By Amount</span>
                      <span className="text-2xl font-bold text-green-600">
                        {((transactionMetrics.settled.amount / transactionMetrics.total.amount) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(transactionMetrics.settled.amount / transactionMetrics.total.amount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Queue Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Queue Rate</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        {((transactionMetrics.queued.volume / transactionMetrics.total.volume) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Decline Rate</span>
                      <span className="text-2xl font-bold text-red-600">
                        {((transactionMetrics.declined.volume / transactionMetrics.total.volume) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(transactionMetrics.queued.volume / transactionMetrics.total.volume) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar with Quick Actions */}
          <div className="w-64 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start"
                  onClick={() => setActiveDialog('transfer')}
                >
                  <Send className="h-4 w-4 mr-2" />
                  General Transfer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveDialog('checkFunds')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Check Funds
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveDialog('liquidity')}
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Liquidity Source
                </Button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">RTGS System</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Settlement Engine</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Queue Manager</span>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialogs */}
        <Dialog open={activeDialog === 'transfer'} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>General Transfer</DialogTitle>
            </DialogHeader>
            <GeneralTransferForm 
              onSubmit={(data) => {
                toast.success('Transfer submitted successfully');
                setActiveDialog(null);
              }}
              onCancel={() => setActiveDialog(null)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={activeDialog === 'checkFunds'} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Check Funds</DialogTitle>
            </DialogHeader>
            <CheckFundsForm 
              onSubmit={(data) => {
                // Results are shown within the form component
              }}
              onCancel={() => setActiveDialog(null)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={activeDialog === 'liquidity'} onOpenChange={() => setActiveDialog(null)}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <LiquiditySourceDashboard 
              onClose={() => setActiveDialog(null)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}