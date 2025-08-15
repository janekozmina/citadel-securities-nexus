import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const RTGSPaymentsPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS Payments</h1>
        <p className="text-muted-foreground">Payment processing and management</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>RTGS payment processing functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RTGSPaymentsPage;