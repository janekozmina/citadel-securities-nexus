import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const CSDPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CSD System</h1>
        <p className="text-muted-foreground">Central Securities Depository</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            CSD Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CSD system overview and controls will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSDPage;