import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, ArrowUpDown, Search } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'status' | 'date';
  filterable?: boolean;
  sortable?: boolean;
  sticky?: 'left' | 'right';
  render?: (value: any, item: any) => React.ReactNode;
}

interface FilterOption {
  key: string;
  label: string;
  options: string[];
}

interface DataTableProps {
  title: string;
  icon?: LucideIcon;
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  itemsPerPage?: number;
  filters?: FilterOption[];
}

export const DataTable = ({ 
  title, 
  icon: Icon, 
  columns, 
  data, 
  className,
  searchable = true,
  searchPlaceholder = "Search...",
  itemsPerPage = 10,
  filters = []
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

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
          'Active': 'default',
          'Completed': 'default',
          'Settled': 'default',
          'Available': 'default',
          'Pledged': 'secondary',
          'Pending': 'secondary',
          'Processing': 'secondary',
          'Under Review': 'secondary',
          'Under Evaluation': 'secondary',
          'Failed': 'destructive',
          'Inactive': 'destructive',
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

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: value === 'all' ? '' : value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item => {
      // Apply search filter
      if (searchTerm) {
        const searchMatch = Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (!searchMatch) return false;
      }

      // Apply column filters
      for (const [filterKey, filterValue] of Object.entries(activeFilters)) {
        if (filterValue && item[filterKey] !== filterValue) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [data, searchTerm, activeFilters, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
        
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          )}
          
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={activeFilters[filter.key] || 'all'}
              onValueChange={(value) => handleFilterChange(filter.key, value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead 
                      key={column.key}
                      className={`
                        ${column.sortable !== false ? "cursor-pointer hover:bg-muted/50" : ""}
                        ${column.sticky === 'right' ? "sticky right-0 bg-background shadow-lg z-10 min-w-[120px]" : ""}
                        ${column.sticky === 'left' ? "sticky left-0 bg-background shadow-lg z-10" : ""}
                      `}
                      onClick={() => column.sortable !== false && handleSort(column.key)}
                    >
                      <div className="flex items-center gap-1">
                        {column.label}
                        {column.sortable !== false && (
                          <ArrowUpDown className="h-3 w-3" />
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      {columns.map((column) => (
                        <TableCell 
                          key={column.key}
                          className={`
                            ${column.sticky === 'right' ? "sticky right-0 bg-background shadow-lg z-10" : ""}
                            ${column.sticky === 'left' ? "sticky left-0 bg-background shadow-lg z-10" : ""}
                          `}
                        >
                          {column.render 
                            ? column.render(row[column.key], row)
                            : formatValue(row[column.key], column.type)
                          }
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} records
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-3 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};