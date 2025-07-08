
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const SecuritiesLifecyclePage = () => {
  return (
    <TooltipProvider>
      <div className="space-y-6 bg-white">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Securities Lifecycle</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Issuance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Button className="flex-1">Instrument Master</Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Digitally create securities (equities, bonds, ETFs) with ISIN generation</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1">Upload Prospectus/Docs</Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>PDF/XML</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <Button variant="outline" className="w-full">Issuance Hub</Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Corporate Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Corporate Actions</Button>
              <Button variant="outline" className="w-full">Automate coupons, dividends, splits, mergers</Button>
              <Button variant="outline" className="w-full">Notify impacted parties via dashboard/email</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Redemption & Maturity</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Redemptions</Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Securities Registry</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Securities Registry</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SecuritiesLifecyclePage;
