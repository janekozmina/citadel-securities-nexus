import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const CMSPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CMS System</h1>
        <p className="text-muted-foreground">Collateral Management System</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            CMS Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CMS system overview and controls will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSPage;