
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ChevronRight, ChevronDown, FileText, TrendingUp, Calendar, Edit, Settings, Mail } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useSidebar } from '@/components/ui/sidebar';

const SecuritiesLifecyclePage = () => {
  const [activeSection, setActiveSection] = useState<string>('instrument-reference');
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const instrumentData = [
    { isin: "US0378331005", name: "Apple Inc.", issuer: "Apple Inc.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "APPLE", issueDate: "1980-12-12", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US30303M1027", name: "Meta Platforms Inc.", issuer: "Meta Platforms", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "META", issueDate: "2012-05-18", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US88160R1014", name: "Tesla Inc.", issuer: "Tesla Inc.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "TESLA", issueDate: "2010-06-29", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US02079K3059", name: "Alphabet Inc.", issuer: "Alphabet Inc.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "GOOGL", issueDate: "2004-08-19", maturity: "N/A", exCoupon: "N/A" },
    { isin: "US5949181045", name: "Microsoft Corp.", issuer: "Microsoft Corp.", assetType: "Equity", currency: "USD", status: "Active", cfi: "ESVUFR", fisn: "MSFT", issueDate: "1986-03-13", maturity: "N/A", exCoupon: "N/A" },
  ];

  const issuanceData = {
    volumeValue: [
      { period: "Q1 2024", volume: 245, value: 12.5 },
      { period: "Q2 2024", volume: 312, value: 18.2 },
      { period: "Q3 2024", volume: 289, value: 15.8 },
      { period: "Q4 2024", volume: 356, value: 22.1 },
    ],
    issuersByType: [
      { type: "Corporate", count: 156, percentage: 65 },
      { type: "Government", count: 45, percentage: 19 },
      { type: "Municipal", count: 28, percentage: 12 },
      { type: "Supranational", count: 11, percentage: 4 },
    ],
    assetClasses: [
      { class: "Bonds", volume: 1850, percentage: 68 },
      { class: "Equities", volume: 580, percentage: 21 },
      { class: "ETFs", volume: 210, percentage: 8 },
      { class: "Others", volume: 82, percentage: 3 },
    ]
  };

  const renderInstrumentReference = () => (
    <div className="flex h-full">
      {/* Center Content */}
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Instrument Reference</h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">ISIN</th>
                    <th className="text-left p-3 font-semibold">Name</th>
                    <th className="text-left p-3 font-semibold">Issuer</th>
                    <th className="text-left p-3 font-semibold">Asset Type</th>
                    <th className="text-left p-3 font-semibold">Currency</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                    <th className="text-left p-3 font-semibold">CFI</th>
                    <th className="text-left p-3 font-semibold">FISN</th>
                    <th className="text-left p-3 font-semibold">Issue Date</th>
                    <th className="text-left p-3 font-semibold">Maturity</th>
                    <th className="text-left p-3 font-semibold">Ex-Coupon</th>
                  </tr>
                </thead>
                <tbody>
                  {instrumentData.map((instrument, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-mono text-sm">{instrument.isin}</td>
                      <td className="p-3">{instrument.name}</td>
                      <td className="p-3">{instrument.issuer}</td>
                      <td className="p-3">{instrument.assetType}</td>
                      <td className="p-3">{instrument.currency}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {instrument.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-sm">{instrument.cfi}</td>
                      <td className="p-3">{instrument.fisn}</td>
                      <td className="p-3">{instrument.issueDate}</td>
                      <td className="p-3">{instrument.maturity}</td>
                      <td className="p-3">{instrument.exCoupon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar with Action Buttons */}
      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">Add New Instrument</Button>
            <Button variant="outline" className="w-full justify-start">Import Instruments</Button>
            <Button variant="outline" className="w-full justify-start">Export Data</Button>
            <Button variant="outline" className="w-full justify-start">Bulk Update</Button>
            <Button variant="outline" className="w-full justify-start">Generate Report</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIssuance = () => (
    <div className="flex h-full">
      {/* Center Content */}
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Issuance Dashboard</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Volume & Value Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issuanceData.volumeValue.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-semibold">{item.period}</span>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">{item.volume} issues</div>
                      <div className="text-lg font-bold">${item.value}B</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issuers by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {issuanceData.issuersByType.map((issuer, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{issuer.type}</span>
                      <span className="font-semibold">{issuer.count}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${issuer.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset Classes Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {issuanceData.assetClasses.map((asset, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{asset.class}</span>
                      <span className="font-semibold">{asset.volume}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${asset.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Sidebar with Action Buttons */}
      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">Create New Issue</Button>
            <Button variant="outline" className="w-full justify-start">Schedule Issuance</Button>
            <Button variant="outline" className="w-full justify-start">View Calendar</Button>
            <Button variant="outline" className="w-full justify-start">Analytics Report</Button>
            <Button variant="outline" className="w-full justify-start">Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCorporateActions = () => (
    <div className="flex h-full">
      {/* Center Content */}
      <div className="flex-1 space-y-6 pr-6">
        <h2 className="text-2xl font-bold text-slate-900">Corporate Actions</h2>
        
        <Tabs defaultValue="create-edit" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create-edit" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Create/Edit
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="create-edit" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    Create/Edit Corporate Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create Dividend Action
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Create Stock Split
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Rights Issue
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Existing Action
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="automation" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Automation & Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Automated Calculations</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Entitlement calculations for coupons, dividends, splits, and mergers
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Processing Status</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Real-time processing of corporate actions
                  </p>
                </div>
                <Button className="w-full">Configure Automation Rules</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Notifications & Communications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Dashboard Notifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="text-sm">AAPL Dividend - Ex-Date Tomorrow</span>
                        <span className="text-xs text-yellow-600">Pending</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm">TSLA Stock Split - Processed</span>
                        <span className="text-xs text-green-600">Complete</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Email Notifications</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Configure Email Templates
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Manage Recipient Lists
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Send Test Notifications
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Sidebar with Action Buttons */}
      <div className="w-64 space-y-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-4">Actions</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start">New Corporate Action</Button>
            <Button variant="outline" className="w-full justify-start">Batch Process</Button>
            <Button variant="outline" className="w-full justify-start">View History</Button>
            <Button variant="outline" className="w-full justify-start">Send Notifications</Button>
            <Button variant="outline" className="w-full justify-start">Generate Reports</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const getSidebarWidth = () => {
    if (isCollapsed) return 'w-12';
    return 'w-48';
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-white">
        {/* Left Sidebar Menu - Narrower */}
        <div className={`${getSidebarWidth()} transition-all duration-200 border-r border-slate-200 bg-white`}>
          <div className="p-2 border-b border-slate-200">
            {!isCollapsed && (
              <h1 className="text-sm font-bold text-slate-900">Securities</h1>
            )}
          </div>
          
          <div className="p-2 space-y-1">
            {/* Instrument Reference */}
            <Button
              variant={activeSection === 'instrument-reference' ? 'default' : 'ghost'}
              className={`${isCollapsed ? 'w-8 h-8 p-0' : 'w-full'} justify-start text-sm`}
              onClick={() => setActiveSection('instrument-reference')}
            >
              <FileText className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Instrument Reference</span>}
            </Button>

            {/* Issuance */}
            <Button
              variant={activeSection === 'issuance' ? 'default' : 'ghost'}
              className={`${isCollapsed ? 'w-8 h-8 p-0' : 'w-full'} justify-start text-sm`}
              onClick={() => setActiveSection('issuance')}
            >
              <TrendingUp className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Issuance</span>}
            </Button>

            {/* Corporate Actions */}
            <Button
              variant={activeSection === 'corporate-actions' ? 'default' : 'ghost'}
              className={`${isCollapsed ? 'w-8 h-8 p-0' : 'w-full'} justify-start text-sm`}
              onClick={() => setActiveSection('corporate-actions')}
            >
              <Calendar className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Corporate Actions</span>}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeSection === 'instrument-reference' && renderInstrumentReference()}
          {activeSection === 'issuance' && renderIssuance()}
          {activeSection === 'corporate-actions' && renderCorporateActions()}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SecuritiesLifecyclePage;
