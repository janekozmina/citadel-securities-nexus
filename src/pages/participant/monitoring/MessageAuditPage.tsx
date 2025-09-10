import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare, Search, Download, Eye } from 'lucide-react';

const MessageAuditPage = () => {
  const mockMessages = [
    {
      id: 'MSG001',
      timestamp: '2024-01-15 14:30:25',
      messageType: 'MT103',
      direction: 'Outgoing',
      status: 'Sent',
      reference: 'RT20240115001'
    },
    {
      id: 'MSG002',
      timestamp: '2024-01-15 13:45:12',
      messageType: 'MT202',
      direction: 'Incoming',
      status: 'Processed',
      reference: 'RT20240115002'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Message Audit</h1>
        <p className="text-muted-foreground">Audit trail of system messages and communications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message Audit Trail
          </CardTitle>
          <CardDescription>Complete history of messages processed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search Messages
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Audit Log
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Message Type</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.timestamp}</TableCell>
                  <TableCell>{message.messageType}</TableCell>
                  <TableCell>
                    <Badge variant={message.direction === 'Outgoing' ? 'secondary' : 'outline'}>
                      {message.direction}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{message.status}</Badge>
                  </TableCell>
                  <TableCell>{message.reference}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageAuditPage;