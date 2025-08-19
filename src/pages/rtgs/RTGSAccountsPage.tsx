import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

const RTGSAccountsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader />

      <div className="flex h-full">
        <div className="flex-1 space-y-6 pr-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Account Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>RTGS account management functionality will be displayed here.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar with Quick Actions */}
        <div className="w-64 space-y-4">
          <QuickActionsManager 
            pageKey="account-management" 
            systemType="rtgs"
          />
        </div>
      </div>
    </div>
  );
};

export default RTGSAccountsPage;