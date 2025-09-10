import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign,
  BarChart3,
  Target,
  Bell,
  Calendar,
  Activity,
  ArrowUpDown,
  FileText,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ParticipantQuickActionsDialogs } from '@/components/participant/ParticipantQuickActionsDialogs';

const ParticipantHomePage = () => {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for participant dashboard
  const accountSummary = {
    totalHoldings: 125750000,
    activeInstruments: 15,
    pendingTransactions: 3,
    settledToday: 12,
    availableCredit: 50000000
  };

  const recentActivities = [
    { id: 1, type: 'Settlement', instrument: 'GOVT-TB-001', amount: 10000000, status: 'Completed', time: '14:30' },
    { id: 2, type: 'DvP Transfer', instrument: 'CORP-BD-045', amount: 5000000, status: 'Pending', time: '13:45' },
    { id: 3, type: 'Repo Operation', instrument: 'GOVT-BND-012', amount: 25000000, status: 'Completed', time: '11:20' },
    { id: 4, type: 'Corporate Action', instrument: 'SUKUK-ISL-003', amount: 2500000, status: 'Processing', time: '10:15' }
  ];

  const upcomingEvents = [
    { id: 1, event: 'Treasury Bill Auction', date: '2024-01-15', time: '10:00 AM' },
    { id: 2, event: 'Interbank Repo TRN RR4343 / CITI Maturity 15 000 000 BHD', date: '2024-01-16', time: '09:00 AM' },
    { id: 3, event: 'Bond Redemption', date: '2024-01-20', time: '02:00 PM' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'processing': return 'outline';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Participant Portal - CSD & RTGS Operations</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Holdings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD {accountSummary.totalHoldings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Market value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Instruments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountSummary.activeInstruments}</div>
            <p className="text-xs text-muted-foreground">Securities held</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountSummary.pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">Awaiting settlement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settled Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountSummary.settledToday}</div>
            <p className="text-xs text-muted-foreground">Transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BHD {accountSummary.availableCredit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Credit facility</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Recent Activities */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest CSD & RTGS operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.type}</span>
                      <Badge variant={getStatusColor(activity.status)} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.instrument}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">BHD {activity.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Business Day Schedule */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Business Day Schedule
            </CardTitle>
            <CardDescription>Current system phases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-200">
                <div>
                  <p className="font-medium">CSD Operations</p>
                  <p className="text-sm text-muted-foreground">Active Phase</p>
                </div>
                <Badge variant="default" className="bg-green-600">Online</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div>
                  <p className="font-medium">RTGS System</p>
                  <p className="text-sm text-muted-foreground">Settlement Phase</p>
                </div>
                <Badge variant="default" className="bg-blue-600">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50 border border-amber-200">
                <div>
                  <p className="font-medium">End of Day</p>
                  <p className="text-sm text-muted-foreground">17:30 BRT</p>
                </div>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts and Notifications */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alerts & Notifications
            </CardTitle>
            <CardDescription>Recent alerts and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Limit Alert</p>
                  <p className="text-xs text-muted-foreground">Daily limit usage: 67%</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Settlement Complete</p>
                  <p className="text-xs text-muted-foreground">RTGS batch settled</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <Bell className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Auction Reminder</p>
                  <p className="text-xs text-muted-foreground">TB auction in 2 hours</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Authorizations Requested */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Authorizations Requested
            </CardTitle>
            <CardDescription>Pending approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg border">
                <div>
                  <p className="font-medium text-sm">Institution Transfer</p>
                  <p className="text-xs text-muted-foreground">BHD 500,000</p>
                </div>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border">
                <div>
                  <p className="font-medium text-sm">DvP Settlement</p>
                  <p className="text-xs text-muted-foreground">GOVT-TB-001</p>
                </div>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg border">
                <div>
                  <p className="font-medium text-sm">Repo Operation</p>
                  <p className="text-xs text-muted-foreground">BHD 250,000</p>
                </div>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Authorization Queue
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common operations and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('general-transfer')}
            >
              <ArrowUpDown className="h-5 w-5" />
              <span className="text-sm">General Transfer</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('dvp-transfer')}
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">DvP Transfer</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('check-funds')}
            >
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">Check Funds</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('house-transfer')}
            >
              <Building2 className="h-5 w-5" />
              <span className="text-sm">House Transfer</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('rvp-instruction')}
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm">RvP Instruction</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('dvp-instruction')}
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm">DvP Instruction</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('interbank-repo-receive')}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm">Interbank Repo</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveDialog('islamic-repo-receive')}
            >
              <Clock className="h-5 w-5" />
              <span className="text-sm">Islamic Repo</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Dialogs */}
      <ParticipantQuickActionsDialogs 
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
};

export default ParticipantHomePage;