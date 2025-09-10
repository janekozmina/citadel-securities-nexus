import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Banknote, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  Activity,
  DollarSign,
  CreditCard,
  Wallet,
  ArrowUpDown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ParticipantRTGSDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    document.title = 'RTGS Dashboard | Participant Portal';
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">RTGS Dashboard</h1>
          <p className="text-slate-600">Monitor your real-time gross settlement operations and account positions.</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          System Online
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450,000 BHD</div>
            <p className="text-xs text-slate-600">Available balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Outgoing</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850,000 BHD</div>
            <p className="text-xs text-green-600">+15% vs yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Incoming</CardTitle>
            <TrendingDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,125,000 BHD</div>
            <p className="text-xs text-green-600">Net positive flow</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-slate-600">Awaiting settlement</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Transaction Activity
                </CardTitle>
                <CardDescription>Latest payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                    <div className="flex items-center gap-3">
                      <ArrowUpDown className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium text-sm">Institution Transfer</p>
                        <p className="text-xs text-slate-600">To: BBK - Reference: TX20241210001</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">500,000 BHD</p>
                      <Badge variant="outline" className="text-xs">Settled</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">Customer Credit</p>
                        <p className="text-xs text-slate-600">From: NBB - Reference: TX20241210002</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">250,000 BHD</p>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">Completed</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <div>
                        <p className="font-medium text-sm">Cover Transfer</p>
                        <p className="text-xs text-slate-600">To: GIB - Reference: TX20241210003</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">100,000 BHD</p>
                      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700">Pending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Account Information
                </CardTitle>
                <CardDescription>Current account status and limits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Account Number</p>
                      <p className="text-lg font-bold">ACC001-{user?.name?.split(' ')[0] || 'PARTICIPANT'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Account Type</p>
                      <p className="text-lg font-bold">Settlement</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Daily Limit</p>
                      <p className="text-lg font-bold">5,000,000 BHD</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-600">Used Today</p>
                      <p className="text-lg font-bold text-blue-600">850,000 BHD</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Limit Usage</span>
                      <span className="text-sm text-slate-600">17%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent RTGS transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Banknote className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600">Transaction Management</h3>
                <p className="text-slate-500 mb-4">View and manage your RTGS transactions</p>
                <Button>View All Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RTGS Reports</CardTitle>
              <CardDescription>Generate and download RTGS reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">Daily Statement</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Activity className="h-5 w-5" />
                  <span className="text-sm">Transaction Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm">Balance Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantRTGSDashboard;