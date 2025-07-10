
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Plus, Edit, Trash2, Settings, Database, Mail, Network, Shield, Users } from 'lucide-react';

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
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);

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
      code: 'portal.integration.balance_report_sms.url',
      value: 'https://localhost:8934/emulator/webservices/rwSms',
      group: 'Integration',
      externalCode: '',
      externalSynchronization: false,
      description: 'URL to balance report web service (SMS)'
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
      code: 'portal.rim.debug_mode.enabled',
      value: 'Yes',
      group: 'RIM parameters',
      externalCode: '',
      externalSynchronization: false,
      description: 'Allows enable additional message audit events for more convenient testing'
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedParameters(filteredParameters.map(param => param.code));
    } else {
      setSelectedParameters([]);
    }
  };

  const handleSelectParameter = (code: string, checked: boolean) => {
    if (checked) {
      setSelectedParameters(prev => [...prev, code]);
    } else {
      setSelectedParameters(prev => prev.filter(id => id !== code));
    }
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

  const getGroupStats = () => {
    const stats = groups.slice(1).map(group => {
      const count = configParameters.filter(param => param.group === group).length;
      const syncCount = configParameters.filter(param => param.group === group && param.externalSynchronization).length;
      return { group, count, syncCount };
    });
    return stats;
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

      {/* Configuration Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getGroupStats().slice(0, 4).map((stat, index) => (
          <Card key={stat.group}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.group}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.count}</p>
                  <p className="text-xs text-slate-500">{stat.syncCount} synchronized</p>
                </div>
                {getGroupIcon(stat.group)}
              </div>
            </CardContent>
          </Card>
        ))}
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

          {selectedParameters.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                {selectedParameters.length} parameter(s) selected
              </p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-1" />
                  Bulk Edit
                </Button>
                <Button size="sm" variant="outline">
                  Export Selected
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedParameters.length === filteredParameters.length && filteredParameters.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>External Code</TableHead>
                  <TableHead>Sync</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParameters.map((param) => (
                  <TableRow key={param.code}>
                    <TableCell>
                      <Checkbox
                        checked={selectedParameters.includes(param.code)}
                        onCheckedChange={(checked) => handleSelectParameter(param.code, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">{param.code}</TableCell>
                    <TableCell>
                      <div className="max-w-32 truncate" title={param.value}>
                        {param.value || <span className="text-slate-400">—</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getGroupIcon(param.group)}
                        <span className="text-sm">{param.group}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {param.externalCode || <span className="text-slate-400">—</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={param.externalSynchronization ? "default" : "secondary"}>
                        {param.externalSynchronization ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-64 truncate" title={param.description}>
                        {param.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

      {/* Group Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getGroupStats().map((stat) => (
          <Card key={stat.group}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                {getGroupIcon(stat.group)}
                {stat.group}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.count}</p>
                  <p className="text-sm text-slate-600">Parameters</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-blue-600">{stat.syncCount}</p>
                  <p className="text-xs text-slate-500">Synchronized</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SystemMonitoringPage;
