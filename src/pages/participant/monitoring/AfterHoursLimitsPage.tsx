import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Clock, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Edit,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

interface LimitSetting {
  id: string;
  type: string;
  description: string;
  generalLimit: number;
  singleTransactionLimit: number;
  notificationThreshold: number;
  timeStart: string;
  timeEnd: string;
  status: 'active' | 'inactive';
}

const AfterHoursLimitsPage = () => {
  const [limits, setLimits] = useState<LimitSetting[]>([
    {
      id: '1',
      type: 'RTGS Transfer',
      description: 'Real-time gross settlement transfers',
      generalLimit: 5000000,
      singleTransactionLimit: 1000000,
      notificationThreshold: 80,
      timeStart: '17:30',
      timeEnd: '08:00',
      status: 'active'
    },
    {
      id: '2',
      type: 'Institution Transfer',
      description: 'Bank-to-bank transfers',
      generalLimit: 10000000,
      singleTransactionLimit: 2000000,
      notificationThreshold: 75,
      timeStart: '17:30',
      timeEnd: '08:00',
      status: 'active'
    },
    {
      id: '3',
      type: 'Customer Credit Transfer',
      description: 'Customer payment transfers',
      generalLimit: 2000000,
      singleTransactionLimit: 500000,
      notificationThreshold: 85,
      timeStart: '17:30',
      timeEnd: '08:00',
      status: 'active'
    },
    {
      id: '4',
      type: 'GCC Multi Currency',
      description: 'GCC cross-border transfers',
      generalLimit: 3000000,
      singleTransactionLimit: 750000,
      notificationThreshold: 70,
      timeStart: '17:30',
      timeEnd: '08:00',
      status: 'inactive'
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<LimitSetting>>({});

  useEffect(() => {
    document.title = 'After Hours Limits | Participant Portal';
  }, []);

  const handleEdit = (limit: LimitSetting) => {
    setEditingId(limit.id);
    setEditForm(limit);
  };

  const handleSave = () => {
    if (!editingId || !editForm) return;

    setLimits(prev => 
      prev.map(limit => 
        limit.id === editingId 
          ? { ...limit, ...editForm }
          : limit
      )
    );
    
    setEditingId(null);
    setEditForm({});
    toast.success('Limit settings updated successfully');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const toggleStatus = (id: string) => {
    setLimits(prev => 
      prev.map(limit => 
        limit.id === id 
          ? { ...limit, status: limit.status === 'active' ? 'inactive' : 'active' }
          : limit
      )
    );
    toast.success('Limit status updated');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">After Business Hours Limits</h1>
          <p className="text-slate-600">Manage transaction limits for after business hours operations.</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          <Clock className="w-3 h-3 mr-1" />
          After Hours: 17:30 - 08:00
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Limits</CardTitle>
            <Settings className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{limits.filter(l => l.status === 'active').length}</div>
            <p className="text-xs text-slate-600">Transaction types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total General Limit</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              BHD {limits.filter(l => l.status === 'active').reduce((sum, l) => sum + l.generalLimit, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-600">Combined limits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-slate-600">During business hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Until After Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3h 15m</div>
            <p className="text-xs text-slate-600">Business hours remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Limits Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Transaction Limits Configuration
          </CardTitle>
          <CardDescription>
            Set limits for various transaction types during after business hours (17:30 - 08:00 BRT)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {limits.map((limit) => (
              <div key={limit.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{limit.type}</h3>
                    <Badge 
                      variant={limit.status === 'active' ? 'default' : 'secondary'}
                      className={limit.status === 'active' ? 'bg-green-600' : ''}
                    >
                      {limit.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editingId === limit.id ? handleSave() : handleEdit(limit)}
                    >
                      {editingId === limit.id ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={limit.status === 'active' ? 'destructive' : 'default'}
                      onClick={() => toggleStatus(limit.id)}
                    >
                      {limit.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">{limit.description}</p>

                {editingId === limit.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`general-${limit.id}`}>General Limit (BHD)</Label>
                      <Input
                        id={`general-${limit.id}`}
                        type="number"
                        value={editForm.generalLimit || ''}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          generalLimit: parseInt(e.target.value) || 0 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`single-${limit.id}`}>Single Transaction Limit (BHD)</Label>
                      <Input
                        id={`single-${limit.id}`}
                        type="number"
                        value={editForm.singleTransactionLimit || ''}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          singleTransactionLimit: parseInt(e.target.value) || 0 
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`threshold-${limit.id}`}>Notification Threshold (%)</Label>
                      <Input
                        id={`threshold-${limit.id}`}
                        type="number"
                        min="0"
                        max="100"
                        value={editForm.notificationThreshold || ''}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          notificationThreshold: parseInt(e.target.value) || 0 
                        }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>Save</Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">General Limit After Business Hours</p>
                      <p className="font-semibold">BHD {limit.generalLimit.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">Single Transaction Limit After Business Hours</p>
                      <p className="font-semibold">BHD {limit.singleTransactionLimit.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">Threshold at which notification is sent</p>
                      <p className="font-semibold">{limit.notificationThreshold}%</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-xs text-slate-600">Period of the day</p>
                      <p className="font-semibold">{limit.timeStart} - {limit.timeEnd}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Limit Activities
          </CardTitle>
          <CardDescription>Recent changes and notifications related to after hours limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium">Limit Updated: RTGS Transfer</p>
                  <p className="text-sm text-slate-600">General limit increased to BHD 5,000,000 • 2 hours ago</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">Updated</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Threshold Alert: Customer Credit Transfer</p>
                  <p className="text-sm text-slate-600">85% threshold reached • Yesterday 18:30</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">Resolved</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Limit Activated: GCC Multi Currency</p>
                  <p className="text-sm text-slate-600">After hours limit enabled • Yesterday 16:00</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">Activated</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AfterHoursLimitsPage;