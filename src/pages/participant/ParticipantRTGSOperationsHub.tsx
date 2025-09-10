import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Send, 
  CreditCard, 
  MessageSquare,
  ArrowUpDown,
  Banknote,
  Users,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ParticipantRTGSOperationsDialogs } from '@/components/participant/ParticipantRTGSOperationsDialogs';

const ParticipantRTGSOperationsHub = () => {
  const { user } = useAuth();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'RTGS Operations Hub | Participant Portal';
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">RTGS Operations Hub</h1>
          <p className="text-slate-600">Execute RTGS transactions and manage payment operations.</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Banknote className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450,000 BHD</div>
            <p className="text-xs text-slate-600">Ready for transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions Today</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-600">8 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Operations</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-slate-600">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Limit Usage</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17%</div>
            <p className="text-xs text-slate-600">4,150,000 BHD available</p>
          </CardContent>
        </Card>
      </div>

      {/* RTGS Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            RTGS Operations
          </CardTitle>
          <CardDescription>Execute real-time gross settlement transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => setActiveDialog('institution-transfer')}
            >
              <Building2 className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <div className="font-medium text-sm">Institution Transfer</div>
                <div className="text-xs text-muted-foreground">Bank-to-bank transfer</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => setActiveDialog('institution-cover-transfer')}
            >
              <Send className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <div className="font-medium text-sm">Institution Cover Transfer</div>
                <div className="text-xs text-muted-foreground">Cover payment instruction</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => setActiveDialog('customer-credit-transfer')}
            >
              <CreditCard className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <div className="font-medium text-sm">Single Customer Credit Transfer</div>
                <div className="text-xs text-muted-foreground">Customer payment</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => setActiveDialog('free-format-message')}
            >
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
              <div className="text-center">
                <div className="font-medium text-sm">Free Format Message</div>
                <div className="text-xs text-slate-600">General communication</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest RTGS operations and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Institution Transfer to BBK</p>
                  <p className="text-sm text-slate-600">Reference: RT20241210001 • 500,000 BHD</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Customer Credit Transfer</p>
                  <p className="text-sm text-slate-600">Reference: RT20241210002 • 250,000 BHD</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">Processing</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Send className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Cover Transfer to GIB</p>
                  <p className="text-sm text-slate-600">Reference: RT20241210003 • 100,000 BHD</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">Sent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Business Hours:</span>
                <span className="font-medium">08:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Cut-off Time:</span>
                <span className="font-medium">16:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Current Status:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Open</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                View Transaction History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Check Pending Operations
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Banknote className="h-4 w-4 mr-2" />
                Account Balance Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RTGS Operations Dialogs */}
      <ParticipantRTGSOperationsDialogs 
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
};

export default ParticipantRTGSOperationsHub;