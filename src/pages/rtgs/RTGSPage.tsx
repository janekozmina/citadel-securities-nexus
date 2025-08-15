import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Banknote } from 'lucide-react';

const RTGSPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS System</h1>
        <p className="text-muted-foreground">Real-Time Gross Settlement System</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5" />
            RTGS Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>RTGS system overview and controls will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RTGSPage;