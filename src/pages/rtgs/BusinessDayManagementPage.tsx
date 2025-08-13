import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Clock, 
  Calendar, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

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

  const [currentTime, setCurrentTime] = useState('15:00');
  const [isAddPeriodOpen, setIsAddPeriodOpen] = useState(false);
  const [periods, setPeriods] = useState<BusinessPeriod[]>([
    {
      id: '1',
      name: 'Start of business day',
      startTime: '09:00',
      endTime: '11:00',
      status: 'completed',
      type: 'rtgs',
      actions: ['All payments']
    },
    {
      id: '2', 
      name: 'Start of business day',
      startTime: '09:00',
      endTime: '13:00',
      status: 'active',
      type: 'csd',
      actions: ['All payments', 'Interbank payments']
    },
    {
      id: '3',
      name: 'Interbank payments',
      startTime: '13:00',
      endTime: '15:00',
      status: 'active', 
      type: 'rtgs',
      actions: ['Interbank payments']
    },
    {
      id: '4',
      name: 'Interbank payments',
      startTime: '13:00',
      endTime: '16:00',
      status: 'scheduled',
      type: 'csd',
      actions: ['Interbank payments', 'Cut-off']
    },
    {
      id: '5',
      name: 'EOD',
      startTime: '16:00',
      endTime: '18:00',
      status: 'scheduled',
      type: 'rtgs',
      actions: ['Cut-off', 'Reconciliation, rejection and confirmation', 'EOD']
    },
    {
      id: '6',
      name: 'EOD', 
      startTime: '16:00',
      endTime: '19:00',
      status: 'scheduled',
      type: 'csd',
      actions: ['Reconciliation, rejection and confirmation', 'EOD']
    }
  ]);

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
    <main className="space-y-6">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Business Day Management</h1>
            <p className="text-muted-foreground">Configure and monitor business day periods and schedules</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Current Time: <span className="font-medium text-foreground">{currentTime}</span>
            </div>
            
            <Dialog open={isAddPeriodOpen} onOpenChange={setIsAddPeriodOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Period
                </Button>
              </DialogTrigger>
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
          </div>
        </div>

        {/* Business Day Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RTGS Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                RTGS Schedule
              </CardTitle>
              <CardDescription>Real-Time Gross Settlement system periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  {periods
                    .filter(period => period.type === 'rtgs')
                    .map((period, index) => (
                      <div key={period.id} className="relative flex items-start gap-4 pb-4">
                        <div className={`w-6 h-6 rounded-full ${getStatusColor(period.status)} flex items-center justify-center text-white relative z-10`}>
                          {getStatusIcon(period.status)}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{period.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {period.startTime} - {period.endTime}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {period.status === 'scheduled' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePeriodAction(period.id, 'activate')}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                              {period.status === 'active' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handlePeriodAction(period.id, 'pause')}
                                  >
                                    <Pause className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handlePeriodAction(period.id, 'complete')}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                              {period.status === 'paused' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePeriodAction(period.id, 'activate')}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {period.actions.map((action, actionIndex) => (
                              <Badge key={actionIndex} variant="secondary" className="text-xs">
                                {action}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CSD Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                CSD Schedule
              </CardTitle>
              <CardDescription>Central Securities Depository system periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  {periods
                    .filter(period => period.type === 'csd')
                    .map((period, index) => (
                      <div key={period.id} className="relative flex items-start gap-4 pb-4">
                        <div className={`w-6 h-6 rounded-full ${getStatusColor(period.status)} flex items-center justify-center text-white relative z-10`}>
                          {getStatusIcon(period.status)}
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{period.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {period.startTime} - {period.endTime}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {period.status === 'scheduled' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePeriodAction(period.id, 'activate')}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                              {period.status === 'active' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handlePeriodAction(period.id, 'pause')}
                                  >
                                    <Pause className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handlePeriodAction(period.id, 'complete')}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                              {period.status === 'paused' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePeriodAction(period.id, 'activate')}
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {period.actions.map((action, actionIndex) => (
                              <Badge key={actionIndex} variant="secondary" className="text-xs">
                                {action}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Current Status & Actions
            </CardTitle>
            <CardDescription>Actions that appear when clicking on periods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Actions on period click:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Actions or period activation</li>
                    <li>• Open options</li>
                    <li>• Set business limit</li>
                    <li>• Actions on period activation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Actions on period deactivation:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Cut-off</li>
                    <li>• Cancel customer payments from intraday queue</li>
                    <li>• GL reporting for the period</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}