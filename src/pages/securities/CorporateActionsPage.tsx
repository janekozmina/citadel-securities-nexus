import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Edit, Settings, Mail, Calendar, TrendingUp, FileText } from 'lucide-react';

const CorporateActionsPage = () => {
  return (
    <TooltipProvider>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Corporate Actions</h1>
            <p className="text-slate-600">Manage corporate actions and automated processing</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Create/Edit Corporate Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Create Dividend Action
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Create Stock Split
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Create Rights Issue
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Existing Action
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Automate Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">Automated Processing</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Entitlement calculations for coupons, dividends, splits, and mergers
                </p>
              </div>
              <Button className="w-full">Configure Automation Rules</Button>
              <Button variant="outline" className="w-full">View Processing Status</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Notify Impacted Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Dashboard Notifications</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Real-time alerts for pending actions
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Email Notifications</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Automated email alerts to stakeholders
                  </p>
                </div>
              </div>
              <Button className="w-full">Configure Notifications</Button>
              <Button variant="outline" className="w-full">Send Test Alert</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CorporateActionsPage;