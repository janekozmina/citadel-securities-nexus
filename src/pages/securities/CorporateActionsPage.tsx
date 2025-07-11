import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Edit, Settings, Mail, Calendar, TrendingUp, FileText, Filter } from 'lucide-react';

const CorporateActionsPage = () => {
  const upcomingEvents = [
    { id: 1, security: "AAPL", event: "Dividend", date: "2024-08-15", issuer: "Apple Inc.", type: "🟡", amount: "$0.25" },
    { id: 2, security: "GOOGL", event: "Stock Split", date: "2024-08-20", issuer: "Alphabet Inc.", type: "🔵", ratio: "20:1" },
    { id: 3, security: "TSLA", event: "Rights Issue", date: "2024-08-25", issuer: "Tesla Inc.", type: "🟠", ratio: "1:10" },
    { id: 4, security: "MSFT", event: "Merger", date: "2024-09-01", issuer: "Microsoft Corp.", type: "🔴", details: "Acquisition" },
    { id: 5, security: "META", event: "Dividend", date: "2024-09-10", issuer: "Meta Platforms", type: "🟡", amount: "$0.50" },
  ];

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Corporate Actions</h1>
              <p className="text-slate-600">Manage corporate actions and automated processing</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Upcoming Events Timeline */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Legend */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">Event Types Legend:</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🟡</span>
                        <span>Dividend</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔵</span>
                        <span>Stock Split</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🟠</span>
                        <span>Rights Issue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔴</span>
                        <span>Merger</span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Type</th>
                          <th className="text-left p-3 font-semibold">Security</th>
                          <th className="text-left p-3 font-semibold">Event</th>
                          <th className="text-left p-3 font-semibold">Date</th>
                          <th className="text-left p-3 font-semibold">Issuer</th>
                          <th className="text-left p-3 font-semibold">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingEvents.map((event) => (
                          <tr key={event.id} className="border-b hover:bg-slate-50">
                            <td className="p-3 text-lg">{event.type}</td>
                            <td className="p-3 font-mono text-sm">{event.security}</td>
                            <td className="p-3">{event.event}</td>
                            <td className="p-3">{event.date}</td>
                            <td className="p-3">{event.issuer}</td>
                            <td className="p-3">{event.amount || event.ratio || event.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Create Dividend Action
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Create Stock Split
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Create Rights Issue
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Existing Action
                    </Button>
                    <Button variant="outline" className="w-full justify-start">Configure Automation Rules</Button>
                    <Button variant="outline" className="w-full justify-start">View Processing Status</Button>
                    <Button variant="outline" className="w-full justify-start">Configure Notifications</Button>
                    <Button variant="outline" className="w-full justify-start">Send Test Alert</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CorporateActionsPage;