
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DvPTransferForm from '@/components/forms/DvPTransferForm';
import RepoPledgeForm from '@/components/forms/RepoPledgeForm';
import { 
  Plus, 
  Gavel, 
  TrendingUp, 
  Calendar, 
  Building2,
  DollarSign,
  ArrowUpDown,
  Users,
  PieChart,
  RefreshCw,
  FileText,
  CreditCard,
  Settings,
  Target,
  Briefcase
} from 'lucide-react';

const OperationsPage = () => {
  const [isDvPFormOpen, setIsDvPFormOpen] = useState(false);
  const [isRepoPledgeFormOpen, setIsRepoPledgeFormOpen] = useState(false);

  useEffect(() => {
    document.title = 'Operations | Unified Portal';
  }, []);

  const operationCategories = [
    {
      title: 'Structural Operations',
      description: 'Long-term monetary policy implementation',
      icon: Building2,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      operations: [
        { id: '1.1', name: 'New Issuance', icon: Plus },
        { id: '1.2', name: 'Auction Management', icon: Gavel },
        { id: '1.3', name: 'Yield Curve Analyzer', icon: TrendingUp },
        { id: '1.4', name: 'M-Bills Calendar', icon: Calendar }
      ]
    },
    {
      title: 'Standing Facilities',
      description: 'Permanent liquidity management tools',
      icon: Building2,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      operations: [
        { id: '2.1', name: 'Overnight Deposit Facility (ODF)', icon: DollarSign },
        { id: '2.2', name: 'Intraday Liquidity Facility (ILF)', icon: ArrowUpDown },
        { id: '2.3', name: 'Marginal Lending Facility (MLF)', icon: TrendingUp },
        { id: '2.4', name: 'Collateralized Murabaha Facility (CMF)', icon: Building2 },
        { id: '2.5', name: 'Overnight Murabaha Facility (OMF)', icon: DollarSign },
        { id: '2.6', name: 'Contingent Liquidity Insurance Facility (CLIF)', icon: Settings },
        { id: '2.7', name: 'US Dollar Liquidity Facility', icon: DollarSign }
      ]
    },
    {
      title: 'Fine-Tuning Operations',
      description: 'Short-term market adjustments',
      icon: Target,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      operations: [
        { id: '3.1', name: 'Foreign Exchange Swaps', icon: ArrowUpDown },
        { id: '3.2', name: 'Term Lending Facility (TLF): Repo', icon: RefreshCw },
        { id: '3.3', name: 'Term Lending Facility (TLF): Reverse Repo', icon: RefreshCw },
        { id: '3.4', name: 'Open Lending Facility (TLF): Repo', icon: RefreshCw }
      ]
    },
    {
      title: 'Interbank',
      description: 'Interbank market operations',
      icon: Users,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      operations: [
        { id: '4.1', name: 'Interbank Repo', icon: RefreshCw },
        { id: '4.2', name: 'Repo Pledge', icon: FileText },
        { id: '4.3', name: 'Pledge', icon: FileText },
        { id: '4.4', name: 'Lien', icon: FileText }
      ]
    },
    {
      title: 'Transfers',
      description: 'Securities and cash transfers',
      icon: ArrowUpDown,
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      iconColor: 'text-indigo-600',
      operations: [
        { id: '5.1', name: 'RvF Transfer', icon: ArrowUpDown },
        { id: '5.2', name: 'DvF Transfer', icon: ArrowUpDown },
        { id: '5.3', name: 'RvP Transfer', icon: ArrowUpDown },
        { id: '5.4', name: 'DvP Transfer', icon: ArrowUpDown }
      ]
    },
    {
      title: 'Liquidity Management',
      description: 'Active liquidity management',
      icon: PieChart,
      color: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
      iconColor: 'text-teal-600',
      operations: [
        { id: '6.1', name: 'ILF Partial Buyback', icon: RefreshCw },
        { id: '6.2', name: 'ILF Rollover', icon: RefreshCw },
        { id: '6.3', name: 'MLF Partial Buyback', icon: RefreshCw },
        { id: '6.4', name: 'MLF Rollover', icon: RefreshCw },
        { id: '6.5', name: 'Repo Rollover', icon: RefreshCw },
        { id: '6.6', name: 'Manual Buyback', icon: Settings }
      ]
    },
    {
      title: 'Corporate Actions',
      description: 'Corporate action processing',
      icon: Gavel,
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      operations: [
        { id: '7.1', name: 'New / Edit Corporate Actions', icon: Plus }
      ]
    },
    {
      title: 'SBL Operations',
      description: 'Securities Borrowing and Lending',
      icon: CreditCard,
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      iconColor: 'text-yellow-600',
      operations: [
        { id: '8.1', name: 'New / Edit SBL Operation', icon: Plus }
      ]
    },
    {
      title: 'Investor Management',
      description: 'Investor relationship management',
      icon: Users,
      color: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
      iconColor: 'text-pink-600',
      operations: [
        { id: '9.1', name: 'New / Edit Investor', icon: Plus }
      ]
    }
  ];

  const handleOperationClick = (categoryTitle: string, operationName: string) => {
    if (operationName === 'DvP Transfer') {
      setIsDvPFormOpen(true);
    } else if (operationName === 'Repo Pledge') {
      setIsRepoPledgeFormOpen(true);
    }
    console.log(`Operation clicked: ${categoryTitle} - ${operationName}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Operations</h1>
        <p className="text-muted-foreground">
          Central Bank monetary policy and operational management
        </p>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {operationCategories.map((category) => (
          <Card key={category.title} className={`${category.color} transition-colors`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                <span className="text-lg font-semibold">{category.title}</span>
              </CardTitle>
              <CardDescription className="text-sm">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {category.operations.map((operation) => (
                <Button
                  key={operation.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 font-normal text-left"
                  onClick={() => handleOperationClick(category.title, operation.name)}
                >
                  <operation.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{operation.name}</span>
                    <span className="text-xs text-muted-foreground">{operation.id}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <DvPTransferForm 
        open={isDvPFormOpen} 
        onOpenChange={setIsDvPFormOpen} 
      />
      
      <RepoPledgeForm 
        open={isRepoPledgeFormOpen} 
        onOpenChange={setIsRepoPledgeFormOpen} 
      />
    </div>
  );
};

export default OperationsPage;
