import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Reports and analytics</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reporting Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Reporting functionality will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;