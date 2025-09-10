import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2 } from 'lucide-react';
import portalConfig from '@/config/portalConfig';

const MessageAuditPage = () => {
  const messageAuditData = [
    {
      id: 1,
      timestamp: '2025-01-10 14:30:25',
      messageType: 'pacs.008',
      direction: 'Inbound',
      participant: portalConfig.banks.commercial[0] || 'NBB',
      status: 'Success',
      reference: 'TXN2025011045678',
      amount: 15000,
      currency: portalConfig.currencies.primary,
      description: 'Customer credit transfer'
    },
    {
      id: 2,
      timestamp: '2025-01-10 14:28:12',
      messageType: 'camt.053',
      direction: 'Outbound',
      participant: portalConfig.banks.commercial[1] || 'BBK',
      status: 'Success',
      reference: 'STM2025011045679',
      amount: 25000,
      currency: portalConfig.currencies.primary,
      description: 'Bank to customer statement'
    },
    {
      id: 3,
      timestamp: '2025-01-10 14:25:33',
      messageType: 'pacs.002',
      direction: 'Outbound',
      participant: portalConfig.banks.commercial[2] || 'GIB',
      status: 'Failed',
      reference: 'ACK2025011045680',
      amount: 0,
      currency: portalConfig.currencies.primary,
      description: 'Payment status report'
    }
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses = "text-xs font-medium";
    switch (status.toLowerCase()) {
      case 'success':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'failed':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getDirectionBadge = (direction: string) => {
    const baseClasses = "text-xs font-medium";
    switch (direction.toLowerCase()) {
      case 'inbound':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'outbound':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Message Audit</h1>
        <p className="text-muted-foreground">Monitor and audit all system messages and communications</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="w-64" />
            </div>
            <Button variant="outline">Filter by Date</Button>
            <Button variant="outline">Filter by Type</Button>
            <Button variant="outline">Filter by Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Message Audit Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Message Audit Log</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{messageAuditData.length} messages</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 text-sm font-semibold">Timestamp</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Message Type</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Direction</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Participant</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Status</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Reference</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Amount</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Currency</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Description</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messageAuditData.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-4 text-sm">{item.timestamp}</td>
                    <td className="py-2 px-4 text-sm font-mono">{item.messageType}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className={getDirectionBadge(item.direction)}>
                        {item.direction}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm">{item.participant}</td>
                    <td className="py-2 px-4 text-sm">
                      <Badge variant="outline" className={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 text-sm font-mono">{item.reference}</td>
                    <td className="py-2 px-4 text-sm">
                      {item.amount > 0 ? item.amount.toLocaleString() : '-'}
                    </td>
                    <td className="py-2 px-4 text-sm">{item.currency}</td>
                    <td className="py-2 px-4 text-sm">{item.description}</td>
                    <td className="py-2 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">84</div>
            <p className="text-sm text-muted-foreground">Successful Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-sm text-muted-foreground">Failed Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">7</div>
            <p className="text-sm text-muted-foreground">Pending Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">94</div>
            <p className="text-sm text-muted-foreground">Total Messages Today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageAuditPage;