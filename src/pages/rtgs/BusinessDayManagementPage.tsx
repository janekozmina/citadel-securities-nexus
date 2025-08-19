import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  AlertCircle,
  CheckCircle,
  Activity,
  TrendingUp,
  BarChart3,
  Edit,
  X,
  Trash
} from 'lucide-react';
import { toast } from 'sonner';
import { useBusinessDayEmulation } from '@/hooks/useBusinessDayEmulation';
import { PageHeader } from '@/components/common/PageHeader';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

interface BusinessPeriod {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'active' | 'completed' | 'paused';
  type: 'rtgs' | 'csd';
  actions: string[];
}

interface PeriodFormData {
  name: string;
  type: 'rtgs' | 'csd';
  startTime: string;
  endTime: string;
  actions: string[];
}

const predefinedActions = {
  rtgs: [
    'All payments',
    'Interbank payments', 
    'Cut-off',
    'Reconciliation, rejection and confirmation',
    'EOD'
  ],
  csd: [
    'All payments',
    'Interbank payments',
    'Cut-off', 
    'Reconciliation, rejection and confirmation',
    'EOD'
  ]
};

const timeSlots = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export default function BusinessDayManagementPage() {
  useEffect(() => {
    document.title = 'Business Day Management | Unified Portal';
  }, []);

  const { 
    emulatedDay, 
    transactionMetrics, 
    liquidityMetrics, 
    currentPhaseData,
    businessPhases,
    toggleSimulation, 
    resetSimulation, 
    formatEmulatedTime,
    getPhaseProgress 
  } = useBusinessDayEmulation();

  const [isAddPeriodOpen, setIsAddPeriodOpen] = useState(false);
  
  // Sync periods with business day emulation phases
  const [periods, setPeriods] = useState<BusinessPeriod[]>(() => 
    businessPhases.map(phase => ({
      id: phase.id.toString(),
      name: phase.name,
      startTime: `${Math.floor(phase.startHour)}:${(phase.startHour % 1 * 60).toString().padStart(2, '0')}`,
      endTime: `${Math.floor(phase.endHour)}:${(phase.endHour % 1 * 60).toString().padStart(2, '0')}`,
      status: phase.id === emulatedDay.currentPhase ? 'active' : 
              phase.id < emulatedDay.currentPhase ? 'completed' : 'scheduled',
      type: 'rtgs',
      actions: phase.activities
    }))
  );

  // Update periods status when emulated phase changes
  useEffect(() => {
    setPeriods(prev => prev.map(period => ({
      ...period,
      status: parseInt(period.id) === emulatedDay.currentPhase ? 'active' : 
              parseInt(period.id) < emulatedDay.currentPhase ? 'completed' : 'scheduled'
    })));
  }, [emulatedDay.currentPhase]);

  const [periodForm, setPeriodForm] = useState<PeriodFormData>({
    name: '',
    type: 'rtgs',
    startTime: '09:00',
    endTime: '17:00',
    actions: []
  });

  const handleAddPeriod = () => {
    if (!periodForm.name || periodForm.actions.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPeriod: BusinessPeriod = {
      id: Date.now().toString(),
      name: periodForm.name,
      startTime: periodForm.startTime,
      endTime: periodForm.endTime,
      status: 'scheduled',
      type: periodForm.type,
      actions: periodForm.actions
    };

    setPeriods(prev => [...prev, newPeriod].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    toast.success('Period added successfully');
    setIsAddPeriodOpen(false);
    setPeriodForm({
      name: '',
      type: 'rtgs',
      startTime: '09:00',
      endTime: '17:00',
      actions: []
    });
  };

  const handleActionToggle = (action: string) => {
    setPeriodForm(prev => ({
      ...prev,
      actions: prev.actions.includes(action)
        ? prev.actions.filter(a => a !== action)
        : [...prev.actions, action]
    }));
  };

  const handlePeriodAction = (periodId: string, action: 'activate' | 'pause' | 'complete') => {
    setPeriods(prev => prev.map(period => {
      if (period.id === periodId) {
        let newStatus: BusinessPeriod['status'];
        switch (action) {
          case 'activate':
            newStatus = 'active';
            break;
          case 'pause':
            newStatus = 'paused';
            break;
          case 'complete':
            newStatus = 'completed';
            break;
          default:
            newStatus = period.status;
        }
        return { ...period, status: newStatus };
      }
      // If activating a period, set all other active periods to completed
      else if (action === 'activate' && period.status === 'active') {
        return { ...period, status: 'completed' };
      }
      return period;
    }));
    
    toast.success(`Period ${action}d successfully`);
  };

  const getStatusColor = (status: BusinessPeriod['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500'; 
      case 'paused': return 'bg-yellow-500';
      case 'scheduled': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: BusinessPeriod['status']) => {
    switch (status) {
      case 'active': return <Play className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      case 'scheduled': return <Clock className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">

          <Dialog open={isAddPeriodOpen} onOpenChange={setIsAddPeriodOpen}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Business Period</DialogTitle>
                <DialogDescription>
                  Configure a new business period with specific actions and timing
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Period Name *</Label>
                  <Input 
                    id="name"
                    value={periodForm.name}
                    onChange={(e) => setPeriodForm(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., Morning Settlement"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">System Type *</Label>
                  <Select value={periodForm.type} onValueChange={(value: 'rtgs' | 'csd') => setPeriodForm(prev => ({...prev, type: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rtgs">RTGS</SelectItem>
                      <SelectItem value="csd">CSD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Select value={periodForm.startTime} onValueChange={(value) => setPeriodForm(prev => ({...prev, startTime: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Select value={periodForm.endTime} onValueChange={(value) => setPeriodForm(prev => ({...prev, endTime: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Actions *</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {predefinedActions[periodForm.type].map((action) => (
                      <div key={action} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={action}
                          checked={periodForm.actions.includes(action)}
                          onChange={() => handleActionToggle(action)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={action} className="text-sm font-normal cursor-pointer">
                          {action}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddPeriodOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPeriod}>
                  Add Period
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Business Day Emulation Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Real-time Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Transaction Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total</p>
                    <p className="font-semibold">{transactionMetrics.totalTransactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Settled</p>
                    <p className="font-semibold text-green-600">{transactionMetrics.settledTransactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Queued</p>
                    <p className="font-semibold text-yellow-600">{transactionMetrics.queuedTransactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rejected</p>
                    <p className="font-semibold text-red-600">{transactionMetrics.rejectedTransactions.toLocaleString()}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-sm">Volume</p>
                  <p className="font-semibold">BHD {(transactionMetrics.totalVolume / 1000000).toFixed(1)}M</p>
                </div>
              </CardContent>
            </Card>

            {/* Current Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Current Phase
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{currentPhaseData.name}</p>
                      <p className="text-sm text-muted-foreground">{currentPhaseData.description}</p>
                    </div>
                    <Badge variant="outline">{getPhaseProgress()}%</Badge>
                  </div>
                  <Progress value={getPhaseProgress()} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Emulated Time:</span>
                  <span className="font-medium">{formatEmulatedTime(emulatedDay.emulatedTime)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Day Schedule */}
          <div className="grid grid-cols-1 gap-6">
            {/* RTGS Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  RTGS Business Day Schedule
                </CardTitle>
                <CardDescription>Real-Time Gross Settlement system periods with emulated timing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                    
                    {businessPhases.map((phase, index) => {
                       const isActive = phase.id === emulatedDay.currentPhase;
                       const isPast = phase.id < emulatedDay.currentPhase;
                       const isFuture = phase.id > emulatedDay.currentPhase;
                       
                       // Update periods status based on current emulated phase
                       const correspondingPeriod = periods.find(p => p.name.includes(phase.name.split(' ')[0]));
                       if (correspondingPeriod) {
                         if (isActive && correspondingPeriod.status !== 'active') {
                           correspondingPeriod.status = 'active';
                         } else if (isPast && correspondingPeriod.status !== 'completed') {
                           correspondingPeriod.status = 'completed';
                         }
                       }
                      
                      return (
                        <div key={phase.id} className="relative flex items-start gap-4 pb-6">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white relative z-10 ${
                            isActive ? 'bg-green-500' : 
                            isPast ? 'bg-blue-500' : 
                            'bg-gray-400'
                          }`}>
                            {isActive ? (
                              <Play className="h-3 w-3" />
                            ) : isPast ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className={`font-medium ${isActive ? 'text-green-600' : ''}`}>
                                  {phase.name}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {String(Math.floor(phase.startHour)).padStart(2, '0')}:
                                  {String(Math.round((phase.startHour % 1) * 60)).padStart(2, '0')} - {' '}
                                  {String(Math.floor(phase.endHour)).padStart(2, '0')}:
                                  {String(Math.round((phase.endHour % 1) * 60)).padStart(2, '0')}
                                  {isActive && ` (${getPhaseProgress()}% complete)`}
                                </p>
                              </div>
                              
                              {isActive && (
                                <Badge variant="default" className="bg-green-500">
                                  Active
                                </Badge>
                              )}
                            </div>
                            
                             <details className="text-sm">
                               <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                 View Actions ({phase.activities.length})
                               </summary>
                               <div className="mt-2 space-y-1 pl-4 border-l-2 border-muted">
                                {phase.activities.map((activity, activityIndex) => (
                                  <div key={activityIndex} className="text-sm text-muted-foreground">
                                    • {activity}
                                  </div>
                                ))}
                              </div>
                            </details>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="business-day-management"
            systemType="rtgs"
            onActionClick={(actionId) => {
              switch (actionId) {
                case 'add-period':
                  setIsAddPeriodOpen(true);
                  break;
                case 'update-period':
                  toast.info('Update functionality coming soon');
                  break;
                case 'activate-period':
                  toast.info('Select a period to activate');
                  break;
                case 'close-period':
                  toast.info('Select a period to close');
                  break;
                case 'delete-period':
                  toast.info('Select a period to delete');
                  break;
                default:
                  break;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}