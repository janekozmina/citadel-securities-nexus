
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Search, Plus, Settings, Database, Mail, Network, Shield, Users } from 'lucide-react';

interface ConfigParameter {
  code: string;
  value: string;
  group: string;
  externalCode: string;
  externalSynchronization: boolean;
  description: string;
}

const SystemMonitoringPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  const configParameters: ConfigParameter[] = [
    {
      code: 'portal.cash_account_servicer_type_codes',
      value: 'RTGS',
      group: 'General',
      externalCode: '',
      externalSynchronization: false,
      description: 'List of available cash account servicer type codes'
    },
    {
      code: 'portal.general.menu_home_label',
      value: 'Portal',
      group: 'General',
      externalCode: '',
      externalSynchronization: false,
      description: 'Menu home label'
    },
    {
      code: 'portal.use_extended_investor_participant_types',
      value: 'Yes',
      group: 'General',
      externalCode: '',
      externalSynchronization: false,
      description: 'Use extended investor participant types'
    },
    {
      code: 'portal.central_node_params.allow_sdf_slf_both',
      value: 'No',
      group: 'Central node parameters',
      externalCode: 'AllowSDFSLFBoth',
      externalSynchronization: true,
      description: 'Both SDF and SLF are allowed to be active simultaneously'
    },
    {
      code: 'portal.central_node_params.collateral.board_not_editable_haircut',
      value: '',
      group: 'Central node parameters',
      externalCode: 'BoardNotEditableHaircut',
      externalSynchronization: true,
      description: 'Boards with not editable haircut'
    },
    {
      code: 'portal.central_node_params.collateral.board_not_editable_market_price',
      value: '',
      group: 'Central node parameters',
      externalCode: 'BoardNotEditableMPrice',
      externalSynchronization: true,
      description: 'Boards with not editable market price'
    },
    {
      code: 'portal.central_node_params.collateral.board_not_editable_mtm',
      value: '',
      group: 'Central node parameters',
      externalCode: 'BoardNotMtmEditable',
      externalSynchronization: true,
      description: 'Boards with not editable market price and haircut'
    },
    {
      code: 'portal.central_node_params.cross_trades_flag',
      value: 'N',
      group: 'Central node parameters',
      externalCode: 'CROSS_TRADES_FLAG',
      externalSynchronization: true,
      description: 'Cross trades flag'
    },
    {
      code: 'portal.central_node_params.default_cash_acctype',
      value: 'CASH',
      group: 'Central node parameters',
      externalCode: 'DEFAULT_CASH_ACCTYPE',
      externalSynchronization: true,
      description: 'Default cash account type'
    },
    {
      code: 'portal.central_node_params.default_priority',
      value: '1050',
      group: 'Central node parameters',
      externalCode: 'DEFAULT_PRIORITY',
      externalSynchronization: true,
      description: 'Default priority'
    },
    {
      code: 'portal.central_node_params.national_currency',
      value: 'AED',
      group: 'Central node parameters',
      externalCode: 'NATIONAL_CURRENCY',
      externalSynchronization: true,
      description: 'National currency'
    },
    {
      code: 'portal.central_node_params.sys_use_acc_hierarchy',
      value: 'Yes',
      group: 'Central node parameters',
      externalCode: 'SYS_USE_ACC_HIERARCHY',
      externalSynchronization: true,
      description: 'Use account hierarchy'
    },
    {
      code: 'portal.email.from',
      value: 'demo-csd@rim.com',
      group: 'Email',
      externalCode: '',
      externalSynchronization: false,
      description: 'Email field "From"'
    },
    {
      code: 'portal.email.host',
      value: 'localhost',
      group: 'Email',
      externalCode: '',
      externalSynchronization: false,
      description: 'Email server host'
    },
    {
      code: 'portal.email.port',
      value: '1024',
      group: 'Email',
      externalCode: '',
      externalSynchronization: false,
      description: 'Email server port'
    },
    {
      code: 'portal.email.protocol',
      value: 'smtp',
      group: 'Email',
      externalCode: '',
      externalSynchronization: false,
      description: 'Email server protocol'
    },
    {
      code: 'portal.gateway.http_url',
      value: 'http://192.168.72.85:5088/SSYSGw/gw',
      group: 'Gateway connection',
      externalCode: '',
      externalSynchronization: false,
      description: 'Comma-separated list of gateway URLs'
    },
    {
      code: 'portal.gateway.ignore_certificate',
      value: 'No',
      group: 'Gateway connection',
      externalCode: '',
      externalSynchronization: false,
      description: 'Ignore server certificate for HTTPS connections'
    },
    {
      code: 'portal.gateway.username',
      value: 'WEBSHAREDPG1',
      group: 'Gateway connection',
      externalCode: '',
      externalSynchronization: false,
      description: 'Gateway user name'
    },
    {
      code: 'portal.integration.balance_report_sms.url',
      value: 'https://localhost:8934/emulator/webservices/rwSms',
      group: 'Integration',
      externalCode: '',
      externalSynchronization: false,
      description: 'URL to balance report web service (SMS)'
    },
    {
      code: 'portal.integration.balance_report_sms.user',
      value: 'CSD',
      group: 'Integration',
      externalCode: '',
      externalSynchronization: false,
      description: 'Username for sending SMS with balance report'
    },
    {
      code: 'portal.interface.check_dvf_dvp_instrument_availability',
      value: 'Yes',
      group: 'Interface',
      externalCode: '',
      externalSynchronization: false,
      description: 'Check instrument availability on dvf dvp forms'
    },
    {
      code: 'portal.interface.check_mmts_cash_bilateral_limit',
      value: 'Yes',
      group: 'Interface',
      externalCode: '',
      externalSynchronization: false,
      description: 'Check MMTS cash bilateral limit'
    },
    {
      code: 'portal.interface.show_recommended_price_non_competitive_bid',
      value: 'Yes',
      group: 'Interface',
      externalCode: '',
      externalSynchronization: false,
      description: 'Show recommended price for non-competitive bid if enabled'
    },
    {
      code: 'portal.rim.debug_mode.enabled',
      value: 'Yes',
      group: 'RIM parameters',
      externalCode: '',
      externalSynchronization: false,
      description: 'Allows enable additional message audit events for more convenient testing'
    },
    {
      code: 'portal.rim.investor_profile_confirm_email.enabled',
      value: 'Yes',
      group: 'RIM parameters',
      externalCode: '',
      externalSynchronization: false,
      description: 'Enables investor profile email confirmation'
    },
    {
      code: 'portal.rim.investor_profile_confirm_phone.enabled',
      value: 'No',
      group: 'RIM parameters',
      externalCode: '',
      externalSynchronization: false,
      description: 'Enables investor profile phone number confirmation'
    },
    {
      code: 'portal.rim.two_factor_authentication.enabled',
      value: 'No',
      group: 'RIM parameters',
      externalCode: '',
      externalSynchronization: false,
      description: 'Enables two factor authentication'
    }
  ];

  const groups = ['all', ...Array.from(new Set(configParameters.map(param => param.group)))];

  const filteredParameters = configParameters.filter(param => {
    const matchesSearch = param.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         param.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         param.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || param.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  // Group parameters by group
  const groupedParameters = filteredParameters.reduce((acc, param) => {
    if (!acc[param.group]) {
      acc[param.group] = [];
    }
    acc[param.group].push(param);
    return acc;
  }, {} as Record<string, ConfigParameter[]>);

  const handleValueChange = (code: string, newValue: string) => {
    setEditingValues(prev => ({
      ...prev,
      [code]: newValue
    }));
  };

  const getCurrentValue = (param: ConfigParameter) => {
    return editingValues[param.code] !== undefined ? editingValues[param.code] : param.value;
  };

  const isYesNoValue = (value: string) => {
    return value.toLowerCase() === 'yes' || value.toLowerCase() === 'no';
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'Central node parameters':
        return <Settings className="h-4 w-4" />;
      case 'Email':
        return <Mail className="h-4 w-4" />;
      case 'Gateway connection':
        return <Network className="h-4 w-4" />;
      case 'Integration':
        return <Database className="h-4 w-4" />;
      case 'Interface':
        return <Shield className="h-4 w-4" />;
      case 'RIM parameters':
        return <Users className="h-4 w-4" />;
      default:
        return <Settings className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">System Configuration</h1>
          <p className="text-slate-600">Manage system parameters and settings</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Parameter
          </Button>
          <Button variant="outline">
            Export Configuration
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search parameters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {groups.slice(1).map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grouped Parameters Tables */}
          <div className="space-y-8">
            {Object.entries(groupedParameters).map(([groupName, parameters]) => (
              <div key={groupName} className="space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  {getGroupIcon(groupName)}
                  <h3 className="text-lg font-semibold text-slate-800">{groupName}</h3>
                  <span className="text-sm text-slate-500">({parameters.length} parameters)</span>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-80">Code</TableHead>
                        <TableHead className="w-48">Value</TableHead>
                        <TableHead className="w-32">External Code</TableHead>
                        <TableHead className="w-24">Sync</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parameters.map((param) => (
                        <TableRow key={param.code}>
                          <TableCell className="font-mono text-xs break-all">{param.code}</TableCell>
                          <TableCell>
                            {isYesNoValue(param.value) ? (
                              <RadioGroup
                                value={getCurrentValue(param)}
                                onValueChange={(value) => handleValueChange(param.code, value)}
                                className="flex flex-row space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="Yes" id={`${param.code}-yes`} />
                                  <Label htmlFor={`${param.code}-yes`} className="text-sm">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="No" id={`${param.code}-no`} />
                                  <Label htmlFor={`${param.code}-no`} className="text-sm">No</Label>
                                </div>
                              </RadioGroup>
                            ) : (
                              <Input
                                value={getCurrentValue(param)}
                                onChange={(e) => handleValueChange(param.code, e.target.value)}
                                className="w-full text-sm"
                                placeholder={param.value || "—"}
                              />
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {param.externalCode || <span className="text-slate-400">—</span>}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              param.externalSynchronization 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {param.externalSynchronization ? 'Yes' : 'No'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-slate-700 break-words whitespace-normal leading-relaxed">
                              {param.description}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>

          {filteredParameters.length === 0 && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No parameters found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemMonitoringPage;
