import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Send, 
  CreditCard, 
  Building2,
  ArrowUpDown,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ParticipantGCCOperationsDialogs } from '@/components/participant/ParticipantGCCOperationsDialogs';

const ParticipantGCCOperations = () => {
  const { user } = useAuth();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'GCC Operations | Participant Portal';
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">GCC Operations</h1>
          <p className="text-slate-600">Gulf Cooperation Council multi-currency operations and transfers.</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          GCC Network Online
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance (Multi-Currency)</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Currencies</div>
            <p className="text-xs text-slate-600">BHD, SAR, AED, KWD, QAR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GCC Transactions Today</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600">6 completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Operations</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-slate-600">Multi-currency pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Globe className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-slate-600">All GCC banks connected</p>
          </CardContent>
        </Card>
      </div>

      {/* GCC Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            GCC Multi-Currency Operations
          </CardTitle>
          <CardDescription>Execute cross-border multi-currency transactions within GCC</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => setActiveDialog('gcc-institution-transfer')}
            >
              <Building2 className="h-6 w-6 text-blue-600" />
              <div className="text-center">
                <div className="font-medium text-sm">GCC Multi Currency Institution Transfer</div>
                <div className="text-xs text-slate-600">Inter-bank GCC transfer</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2"
              onClick={() => setActiveDialog('gcc-customer-transfer')}
            >
              <CreditCard className="h-6 w-6 text-green-600" />
              <div className="text-center">
                <div className="font-medium text-sm">GCC Multi Currency Customer Transfer</div>
                <div className="text-xs text-slate-600">Customer cross-border payment</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent GCC Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent GCC Activity
          </CardTitle>
          <CardDescription>Latest GCC multi-currency operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Institution Transfer to SABB (SAR)</p>
                  <p className="text-sm text-slate-600">Reference: GCC20241210001 • 1,875,000 SAR</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Customer Transfer to NBK (KWD)</p>
                  <p className="text-sm text-slate-600">Reference: GCC20241210002 • 75,000 KWD</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">Processing</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Institution Transfer to ADCB (AED)</p>
                  <p className="text-sm text-slate-600">Reference: GCC20241210003 • 920,000 AED</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">Sent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currency Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Available Currencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Bahraini Dinar (BHD):</span>
                <span className="font-medium">2,450,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Saudi Riyal (SAR):</span>
                <span className="font-medium">9,225,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">UAE Dirham (AED):</span>
                <span className="font-medium">9,775,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Kuwaiti Dinar (KWD):</span>
                <span className="font-medium">810,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Qatari Riyal (QAR):</span>
                <span className="font-medium">9,680,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Operating Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">GCC Network Hours:</span>
                <span className="font-medium">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Peak Hours:</span>
                <span className="font-medium">08:00 - 17:00 GST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Current Status:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GCC Operations Dialogs */}
      <ParticipantGCCOperationsDialogs 
        activeDialog={activeDialog}
        onClose={() => setActiveDialog(null)}
      />
    </div>
  );
};

export default ParticipantGCCOperations;