import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const CMSCollateralPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CMS Collateral</h1>
        <p className="text-muted-foreground">Collateral management operations</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Collateral Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CMS collateral functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSCollateralPage;