import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';

const RTGSMonitoringPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">RTGS Monitoring</h1>
        <p className="text-muted-foreground">Real-time system monitoring</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>RTGS monitoring functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RTGSMonitoringPage;