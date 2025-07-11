
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Gavel, 
  TrendingUp, 
  Calendar,
  Vault,
  Clock,
  ArrowLeftRight,
  CreditCard,
  Droplets,
  Banknote,
  FileText,
  Building,
  Users
} from 'lucide-react';

const OperationsPage = () => {
  const operationSections = [
    {
      title: "Structural Operations",
      icon: Building2,
      operations: [
        { name: "New Issuance", icon: FileText },
        { name: "Auction Management", icon: Gavel },
        { name: "Yield Curve Analyzer", icon: TrendingUp },
        { name: "M-Bills Calendar", icon: Calendar }
      ]
    },
    {
      title: "Standing Facilities",
      icon: Vault,
      operations: [
        { name: "Overnight Deposit Facility (ODF)", icon: Clock },
        { name: "Intraday Liquidity Facility (ILF)", icon: Droplets },
        { name: "Marginal Lending Facility (MLF)", icon: Banknote },
        { name: "Collateralized Murabaha Facility (CMF)", icon: CreditCard },
        { name: "Overnight Murabaha Facility (OMF)", icon: Clock },
        { name: "Contingent Liquidity Insurance Facility (CLIF)", icon: Vault },
        { name: "US Dollar Liquidity Facility", icon: Banknote }
      ]
    },
    {
      title: "Fine-Tuning Operations",
      icon: TrendingUp,
      operations: [
        { name: "Foreign Exchange Swaps", icon: ArrowLeftRight },
        { name: "Term Lending Facility (TLF): Repo", icon: CreditCard },
        { name: "Term Lending Facility (TLF): Reverse Repo", icon: CreditCard },
        { name: "Open Lending Facility (TLF): Repo", icon: CreditCard }
      ]
    },
    {
      title: "Interbank",
      icon: Building,
      operations: [
        { name: "Interbank Repo", icon: ArrowLeftRight },
        { name: "Repo Pledge", icon: CreditCard },
        { name: "Pledge", icon: FileText },
        { name: "Lien", icon: FileText }
      ]
    },
    {
      title: "Transfers",
      icon: ArrowLeftRight,
      operations: [
        { name: "RvF Transfer", icon: ArrowLeftRight },
        { name: "DvF Transfer", icon: ArrowLeftRight },
        { name: "RvP Transfer", icon: ArrowLeftRight },
        { name: "DvP Transfer", icon: ArrowLeftRight }
      ]
    },
    {
      title: "Liquidity Management",
      icon: Droplets,
      operations: [
        { name: "ILF Partial Buyback", icon: Droplets },
        { name: "ILF Rollover", icon: Droplets },
        { name: "MLF Partial Buyback", icon: Banknote },
        { name: "MLF Rollover", icon: Banknote },
        { name: "Repo Rollover", icon: CreditCard },
        { name: "Manual Buyback", icon: FileText }
      ]
    },
    {
      title: "Corporate Actions",
      icon: Building2,
      operations: [
        { name: "New / Edit Corporate Actions", icon: FileText }
      ]
    },
    {
      title: "SBL Operations",
      icon: FileText,
      operations: [
        { name: "New / Edit SBL Operation", icon: FileText }
      ]
    },
    {
      title: "Investor Management",
      icon: Users,
      operations: [
        { name: "New / Edit Investor", icon: Users }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Operations</h1>
          <p className="text-slate-600">Central Bank Digital Currency Operations Portal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationSections.map((section, sectionIndex) => (
          <Card key={sectionIndex} className="bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <section.icon className="h-5 w-5 text-blue-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.operations.map((operation, opIndex) => (
                <Button
                  key={opIndex}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300"
                >
                  <operation.icon className="h-4 w-4 mr-3 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {operation.name}
                  </span>
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OperationsPage;
