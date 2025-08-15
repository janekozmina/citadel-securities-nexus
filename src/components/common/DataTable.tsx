import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'status' | 'date';
}

interface DataTableProps {
  title: string;
  icon?: LucideIcon;
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
}

export const DataTable = ({ title, icon: Icon, columns, data, className }: DataTableProps) => {
  const formatValue = (value: any, type?: string) => {
    switch (type) {
      case 'currency':
        return new Intl.NumberFormat('en-BH', {
          style: 'currency',
          currency: 'BHD',
          minimumFractionDigits: 3
        }).format(value);
      case 'number':
        return new Intl.NumberFormat('en-BH').format(value);
      case 'date':
        return new Date(value).toLocaleDateString('en-BH');
      case 'status':
        const statusColors: Record<string, string> = {
          'Completed': 'default',
          'Settled': 'default',
          'Pending': 'secondary',
          'Processing': 'secondary',
          'Failed': 'destructive',
        };
        return (
          <Badge variant={statusColors[value] as any || 'outline'}>
            {value}
          </Badge>
        );
      default:
        return value;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {formatValue(row[column.key], column.type)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};