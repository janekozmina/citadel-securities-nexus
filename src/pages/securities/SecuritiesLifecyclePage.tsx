import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SecuritiesLifecyclePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Securities Lifecycle Management</h1>
      </div>

      <Tabs defaultValue="issuance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="issuance">Issuance</TabsTrigger>
          <TabsTrigger value="corporate-actions">Corporate Actions</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Market Data</TabsTrigger>
        </TabsList>

        <TabsContent value="issuance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Instrument Master</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Create and manage digital securities with ISIN generation</p>
                <Button className="w-full">Create New Security</Button>
                <Button variant="outline" className="w-full">View All Securities</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Upload prospectus and documents (PDF/XML)</p>
                <Button className="w-full">Upload Documents</Button>
                <Button variant="outline" className="w-full">Document Library</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Issuance Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Debt Issuance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Manage Debt Securities</Button>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Equity Issuance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Manage Equity Securities</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="corporate-actions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Actions Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Create Corporate Action</Button>
                <Button variant="outline" className="w-full">Edit Existing Actions</Button>
                <Button variant="outline" className="w-full">View Action History</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automated Processing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">Automate coupons, dividends, splits, and mergers</p>
                <Button className="w-full">Configure Automation</Button>
                <Button variant="outline" className="w-full">Entitlement Calculator</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reconciliation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Center</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Reconcile positions and transactions across systems</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Button>Daily Reconciliation</Button>
                <Button variant="outline">Exception Reports</Button>
                <Button variant="outline">Reconciliation History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing and Market Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">Manage pricing data and market information</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Button>Price Updates</Button>
                <Button variant="outline">Market Data Feeds</Button>
                <Button variant="outline">Historical Pricing</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritiesLifecyclePage;
