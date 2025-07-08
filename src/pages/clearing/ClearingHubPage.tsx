
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ClearingHubPage = () => {
  return (
    <div className="space-y-6 bg-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Clearing Hub</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Trade Matching & Validation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Match Trades</Button>
            <Button variant="outline" className="w-full">Validation Queue</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Netting Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Calculate Net Positions</Button>
            <Button variant="outline" className="w-full">Netting Reports</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Risk Analysis</Button>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Settlement Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Generate Instructions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClearingHubPage;
