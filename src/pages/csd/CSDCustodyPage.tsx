import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const CSDCustodyPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CSD Custody</h1>
        <p className="text-muted-foreground">Securities custody services</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Custody Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CSD custody functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSDCustodyPage;