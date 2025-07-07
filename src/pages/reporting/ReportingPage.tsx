
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const ReportingPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Reporting & Compliance</h1>
        <Badge variant="outline">All Roles Access</Badge>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="risk-reports">Risk Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Formatted Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Generate CSV Reports</Button>
                <Button variant="outline" className="w-full">Generate XML Reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ESG Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">ESG Reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FATCA/CRS Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Tax Reporting</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Audit Trails</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Immutable logs for all transactions</p>
              <Button className="w-full mt-4">View Audit Trails</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboards" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Real-Time Dashboards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Settlement Fails Dashboard</Button>
                <Button variant="outline" className="w-full">Corporate Action Pipeline</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Liquidity Forecasting AI</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Generate Regulatory Reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Trail Explorer</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Explore Audit Trails</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limit Breach Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Configure Alerts</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk-reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Exposure Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Exposure Reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AML Sentinel</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">AML Reports</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ESG Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full">ESG Score Reports</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingPage;
