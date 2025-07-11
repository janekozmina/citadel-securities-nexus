import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DefaultManagementPage = () => {
  const defaultProcessStages = [
    {
      stage: "1. Default Declaration",
      description: "Formal identification and declaration of defaulted participant.",
      keyParticipants: "Risk Manager, Compliance Officer",
      timeframe: "T+0",
      systemActions: "Triggered by margin shortfall or failure to settle."
    },
    {
      stage: "2. Position Segmentation",
      description: "Identification and segmentation of defaulted positions (e.g. by asset class).",
      keyParticipants: "Risk Team, Back Office",
      timeframe: "T+0 to T+1",
      systemActions: "Prepare positions for auction (eligible vs ineligible)."
    },
    {
      stage: "3. Auction Notification",
      description: "Notify eligible participants about upcoming auction(s).",
      keyParticipants: "Clearing Members, CSD Participants",
      timeframe: "T+1",
      systemActions: "Via internal portal, SWIFT messages, email alerts."
    },
    {
      stage: "4. Auction Design & Setup",
      description: "Define auction type (e.g. sealed bid, Dutch), timing, lot size, min bid increment.",
      keyParticipants: "Auction Committee, Ops Team",
      timeframe: "T+1",
      systemActions: "System config with auction rules and position data."
    },
    {
      stage: "5. Bid Submission Window",
      description: "Open period for participants to submit bids.",
      keyParticipants: "Participants (Buy-side)",
      timeframe: "T+2",
      systemActions: "System captures all bids with timestamping and validation."
    },
    {
      stage: "6. Auction Execution",
      description: "Evaluate bids based on protocol (highest price wins, etc.).",
      keyParticipants: "Auction Engine, Risk Review",
      timeframe: "T+2",
      systemActions: "Can involve manual review for large exposures."
    },
    {
      stage: "7. Allocation & Notification",
      description: "Allocate positions to winning bids and notify participants.",
      keyParticipants: "Ops, Risk, Legal Teams",
      timeframe: "T+2 or T+3",
      systemActions: "Settlement instructions are generated."
    },
    {
      stage: "8. Settlement",
      description: "Settle the transfer of positions and cash between parties.",
      keyParticipants: "CSD, Settlement Banks",
      timeframe: "T+3 to T+5",
      systemActions: "Typically DvP, monitored closely by clearing ops."
    },
    {
      stage: "9. Reporting & Audit",
      description: "Provide full auction results, compliance reports, and audit logs.",
      keyParticipants: "Compliance, Audit, Regulators",
      timeframe: "Post-auction",
      systemActions: "Includes bid logs, price curve, participant involvement."
    }
  ];

  const getTimeframeBadge = (timeframe: string) => {
    if (timeframe === 'T+0') return <Badge className="bg-red-100 text-red-800">Immediate</Badge>;
    if (timeframe.includes('T+1')) return <Badge className="bg-orange-100 text-orange-800">Next Day</Badge>;
    if (timeframe.includes('T+2')) return <Badge className="bg-yellow-100 text-yellow-800">T+2</Badge>;
    if (timeframe.includes('T+3')) return <Badge className="bg-blue-100 text-blue-800">T+3+</Badge>;
    return <Badge variant="secondary">{timeframe}</Badge>;
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Default Management</h1>
            <p className="text-slate-600">Default Resolution Process & Auction Procedures</p>
          </div>
        </div>

        {/* Default Process Stages Table */}
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Stage</th>
                      <th className="text-left p-3 font-semibold">Description</th>
                      <th className="text-left p-3 font-semibold">Key Participants</th>
                      <th className="text-left p-3 font-semibold">Timeframe</th>
                      <th className="text-left p-3 font-semibold">System Actions / Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {defaultProcessStages.map((stage, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="p-3">{stage.stage}</td>
                        <td className="p-3">{stage.description}</td>
                        <td className="p-3">{stage.keyParticipants}</td>
                        <td className="p-3">{stage.timeframe}</td>
                        <td className="p-3">{stage.systemActions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Right Sidebar with Quick Actions */}
      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">Initiate Default Process</Button>
            <Button variant="outline" className="w-full justify-start">Review Default Fund</Button>
            <Button variant="outline" className="w-full justify-start">Configure Auction Rules</Button>
            <Button variant="outline" className="w-full justify-start">Generate Default Report</Button>
            <Button variant="outline" className="w-full justify-start">Monitor Auction Status</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultManagementPage;