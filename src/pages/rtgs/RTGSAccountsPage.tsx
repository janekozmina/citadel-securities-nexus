import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

const RTGSAccountsPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS Accounts</h1>
        <p className="text-muted-foreground">Account management and balances</p>
      </div>
      
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
  );
};

export default RTGSAccountsPage;