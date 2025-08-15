import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const CSDTradingPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">CSD Trading</h1>
        <p className="text-muted-foreground">Securities trading operations</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trading Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>CSD trading functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSDTradingPage;