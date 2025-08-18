import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Clock, Users, FileText, Wallet } from 'lucide-react';
import { QuickActionsManager } from '@/components/common/QuickActionsManager';

const configParameters = [
  // Securities Management
  { group: 'Securities Management', code: 'CSD_MIN_SETTLEMENT_PERIOD', value: '0', description: 'Minimum settlement period in business days' },
  { group: 'Securities Management', code: 'CSD_MAX_SETTLEMENT_PERIOD', value: '30', description: 'Maximum settlement period in business days' },
  { group: 'Securities Management', code: 'CSD_AUTO_SETTLEMENT_ENABLED', value: 'true', description: 'Enable automatic settlement processing' },
  { group: 'Securities Management', code: 'CSD_DVP_ENABLED', value: 'true', description: 'Enable Delivery vs Payment settlement' },
  { group: 'Securities Management', code: 'CSD_DVF_ENABLED', value: 'true', description: 'Enable Delivery vs Free settlement' },
  
  // Instrument Configuration
  { group: 'Instrument Configuration', code: 'CSD_SUKUK_ENABLED', value: 'true', description: 'Enable Islamic Sukuk instruments' },
  { group: 'Instrument Configuration', code: 'CSD_BOND_ENABLED', value: 'true', description: 'Enable conventional bond instruments' },
  { group: 'Instrument Configuration', code: 'CSD_TBILL_ENABLED', value: 'true', description: 'Enable Treasury Bill instruments' },
  { group: 'Instrument Configuration', code: 'CSD_PRIVATE_PLACEMENT_ENABLED', value: 'true', description: 'Enable private placement securities' },
  { group: 'Instrument Configuration', code: 'CSD_INSTRUMENT_MATURITY_VALIDATION', value: 'true', description: 'Validate instrument maturity dates' },
  
  // Corporate Actions
  { group: 'Corporate Actions', code: 'CSD_COUPON_AUTO_PROCESSING', value: 'true', description: 'Enable automatic coupon processing' },
  { group: 'Corporate Actions', code: 'CSD_REDEMPTION_NOTICE_DAYS', value: '5', description: 'Days before maturity to send redemption notices' },
  { group: 'Corporate Actions', code: 'CSD_EARLY_REDEMPTION_ENABLED', value: 'true', description: 'Enable early redemption processing' },
  { group: 'Corporate Actions', code: 'CSD_DIVIDEND_PROCESSING_ENABLED', value: 'true', description: 'Enable dividend processing' },
  
  // Risk and Limits
  { group: 'Risk and Limits', code: 'CSD_POSITION_LIMIT_CHECK', value: 'true', description: 'Enable position limit checking' },
  { group: 'Risk and Limits', code: 'CSD_CONCENTRATION_LIMIT', value: '25.0', description: 'Maximum concentration limit percentage' },
  { group: 'Risk and Limits', code: 'CSD_EXPOSURE_MONITORING', value: 'true', description: 'Enable exposure monitoring' },
  { group: 'Risk and Limits', code: 'CSD_MARGIN_CALCULATION_METHOD', value: 'STANDARD', description: 'Margin calculation methodology' },
  
  // Operational Settings
  { group: 'Operational Settings', code: 'CSD_BUSINESS_DAY_CUTOFF', value: '16:00', description: 'Daily business operations cutoff time' },
  { group: 'Operational Settings', code: 'CSD_SETTLEMENT_CYCLE', value: 'T+0', description: 'Default settlement cycle' },
  { group: 'Operational Settings', code: 'CSD_BATCH_PROCESSING_ENABLED', value: 'true', description: 'Enable batch processing mode' },
  { group: 'Operational Settings', code: 'CSD_REAL_TIME_SETTLEMENT', value: 'true', description: 'Enable real-time settlement' },
  
  // Reporting and Compliance
  { group: 'Reporting and Compliance', code: 'CSD_REGULATORY_REPORTING', value: 'true', description: 'Enable regulatory reporting' },
  { group: 'Reporting and Compliance', code: 'CSD_AUDIT_TRAIL_RETENTION', value: '2555', description: 'Audit trail retention period in days' },
  { group: 'Reporting and Compliance', code: 'CSD_TRANSACTION_REPORTING', value: 'true', description: 'Enable transaction reporting' },
  { group: 'Reporting and Compliance', code: 'CSD_POSITION_REPORTING', value: 'true', description: 'Enable position reporting' }
];

const groupIcons = {
  'Securities Management': Database,
  'Instrument Configuration': Settings,
  'Corporate Actions': FileText,
  'Risk and Limits': Wallet,
  'Operational Settings': Clock,
  'Reporting and Compliance': Users
};

export default function CSDConfigurationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');

  useEffect(() => {
    document.title = 'CSD Configuration | Unified Portal';
  }, []);

  const filteredParameters = configParameters.filter(param => {
    const matchesSearch = param.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         param.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || param.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const groups = Array.from(new Set(configParameters.map(p => p.group)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CSD Configuration</h1>
          <p className="text-slate-600">
            Configure Central Securities Depository system parameters and operational settings
          </p>
        </div>
      </div>

      <QuickActionsManager
        pageKey="csd-configuration"
        systemType="csd"
        className="mb-6"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CSD System Parameters</CardTitle>
            <CardDescription>
              Configure parameters for securities management, settlement, and operational settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search parameters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Groups</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* Parameters by Group */}
            {groups.map(group => {
              const groupParameters = filteredParameters.filter(p => p.group === group);
              if (groupParameters.length === 0) return null;

              const IconComponent = groupIcons[group] || Settings;

              return (
                <div key={group} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-slate-600" />
                    <h3 className="font-semibold text-slate-900">{group}</h3>
                    <Badge variant="secondary">{groupParameters.length}</Badge>
                  </div>
                  
                  <div className="grid gap-3">
                    {groupParameters.map((param) => (
                      <div key={param.code} className="grid grid-cols-12 gap-4 items-center p-3 bg-slate-50 rounded-lg">
                        <div className="col-span-4">
                          <code className="text-sm font-mono text-slate-800">{param.code}</code>
                        </div>
                        <div className="col-span-2">
                          {param.value === 'true' || param.value === 'false' ? (
                            <Badge variant={param.value === 'true' ? 'default' : 'secondary'}>
                              {param.value}
                            </Badge>
                          ) : (
                            <input
                              type="text"
                              value={param.value}
                              className="w-full px-2 py-1 text-sm border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              readOnly
                            />
                          )}
                        </div>
                        <div className="col-span-6">
                          <span className="text-sm text-slate-600">{param.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredParameters.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-500">No parameters found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}