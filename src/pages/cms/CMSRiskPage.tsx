import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const CMSRiskPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CMS Risk</h1>
        <p className="text-muted-foreground">Risk management operations</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CMS risk management functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSRiskPage;