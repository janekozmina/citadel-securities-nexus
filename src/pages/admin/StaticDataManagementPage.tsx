import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Database, 
  Users, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  Search,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const StaticDataManagementPage = () => {
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'Securities Master': true,
    'Counterparty and Other Management': false,
    'Reference Data': false
  });

  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const staticDataSections = [
    {
      title: 'Securities Master',
      icon: Database,
      color: 'blue',
      items: [
        'Security Master Record', 'Security Identifier Cross-Reference', 'Issuer Profile',
        'Security Classification', 'Listing Venue Registry', 'Currency settlement',
        'Dividend calculation rules', 'Coupon Schedule Master', 'Maturity Profile',
        'Redemption Terms', 'Corporate Action Eligibility Matrix', 'Tax Treatment Profile',
        'Collateral Eligibility Rules', 'Settlement Eligibility Matrix', 'Restricted Securities Register',
        'Security Status History', 'Rating History Log', 'Minimum Tradable Unit Schedule',
        'Underlying Asset Registry', 'Security Document Repository', 'Benchmark Linkage',
        'Volatility Profile', 'Liquidity Tier Classification', 'Short Selling Eligibility',
        'Securities Lending Terms', 'Convertible Features Registry', 'Warrant Exercise Terms',
        'Depository Eligibility', 'Asset-Backed Security', 'Security Audit Trail'
      ]
    },
    {
      title: 'Counterparty and Other Management',
      icon: Users,
      color: 'green',
      items: [
        'Counterparty Master Record', 'Counterparty Hierarchy', 'Legal Entity Identifier (LEI) Registry',
        'BIC Directory', 'Counterparty Type Classification', 'Credit Risk Profile',
        'Netting Agreement Master', 'Account Master Registry', 'Account Type Taxonomy',
        'Signatory Authority Register', 'Documentation Vault', 'Country Risk Rating Schedule',
        'Capital Adequacy', 'Operating Hours Profile', 'Fee Schedule Matrix',
        'Correspondent Banking Network', 'Settlement Preference Profile', 'Regulatory Status Monitor',
        'Contact Directory', 'Counterparty Restriction Matrix', 'Affiliate Exposure',
        'KYC Document Expiry', 'Electronic Communication Network (ECN) Profiles', 'Collateral Agreement Master',
        'Counterparty Audit Log - Change history with approvals'
      ]
    },
    {
      title: 'Reference Data',
      icon: Settings,
      color: 'purple',
      items: [
        'Country Code Master', 'Currency Code Master', 'Language Code Registry',
        'Time Zone Master', 'Calendar Type Taxonomy', 'Business Day Convention Catalogue',
        'Security Type Taxonomy', 'Derivative Type Matrix', 'Settlement Method Catalogue',
        'Corporate Action Type Tree', 'Tax Type Directory', 'Regulatory Body Registry',
        'Document Type Classification', 'Rating Agency Master', 'Corporate Event Reason Codes',
        'Settlement Failure Reason Codes', 'Corporate Action Option Codes', 'Account Status Type Matrix',
        'Counterparty Role Taxonomy', 'Collateral Type Classification', 'Netting Type Directory',
        'Corporate Action Status Codes', 'Holiday Type Classification', 'Fee Type Taxonomy',
        'Message Format Standards', 'Corporate Action Source Codes', 'Currency Pair Type Matrix',
        'Settlement Location Type Directory', 'Tax Authority Registry', 'Regulatory Report Type Catalogue',
        'Risk Rating Scale Matrix', 'Corporate Action Condition Types', 'Dividend Type Classification',
        'Coupon Type Directory', 'Derivative Product Taxonomy', 'Corporate Action Reversal Reason Codes',
        'Security Restriction Type Matrix', 'Entitlement Calculation Methods', 'Proxy Voting Option Codes',
        'Payment Method Directory'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'green':
        return 'bg-green-100 text-green-600 border-green-200';
      case 'purple':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const filteredSections = staticDataSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    section.items.length > 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Static Data Management</h1>
          <p className="text-slate-600">Manage master data, reference data, and system configurations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Record
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search static data items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Static Data Sections */}
      <div className="space-y-4">
        {filteredSections.map((section) => (
          <Card key={section.title}>
            <Collapsible 
              open={openSections[section.title]} 
              onOpenChange={() => toggleSection(section.title)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getColorClasses(section.color)}`}>
                        <section.icon className="h-5 w-5" />
                      </div>
                      {section.title}
                      <Badge variant="secondary">
                        {section.items.length} items
                      </Badge>
                    </CardTitle>
                    {openSections[section.title] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {section.items.map((item, index) => (
                      <div 
                        key={index}
                        className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                            {item}
                          </span>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Database className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No items found</h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StaticDataManagementPage;