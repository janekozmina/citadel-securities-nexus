import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Grid, List, Search, Filter, Clock, TrendingUp, DollarSign, Users, ChevronLeft, ChevronRight, Eye, Bell, Settings } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import { ConditionalQuickActions } from '@/components/common/ConditionalQuickActions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

// Sample auction data with different types and sources - more events across the month
// Get current date for realistic auction data
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const auctionData = [
  // Current week events
  {
    id: 'A03',
    title: 'Treasury Bill Auction',
    type: 'primary',
    status: 'open',
    startDate: new Date(currentYear, currentMonth, 5, 9, 0),
    endDate: new Date(currentYear, currentMonth, 5, 16, 0),
    bidDeadline: new Date(currentYear, currentMonth, 5, 14, 0),
    settlementDate: new Date(currentYear, currentMonth, 7),
    amount: 'BHD 50M',
    participants: 8,
    source: 'CBB',
    issueCode: 'TESTCBBILL001',
    description: '91-day Treasury Bill offering',
    cutOffRate: '5.50%'
  },
  {
    id: 'R01',
    title: 'Repo Operation',
    type: 'repo',
    status: 'active',
    startDate: new Date(currentYear, currentMonth, 8, 11, 0),
    endDate: new Date(currentYear, currentMonth, 8, 17, 0),
    bidDeadline: new Date(currentYear, currentMonth, 8, 15, 0),
    settlementDate: new Date(currentYear, currentMonth, 10),
    amount: 'BHD 75M',
    participants: 6,
    source: 'CBB',
    issueCode: 'REPO001',
    description: '7-day Reverse Repo',
    cutOffRate: '4.25%'
  },
  
  // Week 2
  {
    id: 'D01',
    title: 'Deposit Facility',
    type: 'deposit',
    status: 'closed',
    startDate: new Date(currentYear, currentMonth, 12, 9, 0),
    endDate: new Date(currentYear, currentMonth, 12, 16, 0),
    bidDeadline: new Date(currentYear, currentMonth, 12, 14, 0),
    settlementDate: new Date(currentYear, currentMonth, 14),
    amount: 'BHD 30M',
    participants: 4,
    source: 'CBB',
    issueCode: 'DEP001',
    description: 'Overnight Deposit',
    cutOffRate: '3.75%'
  },
  {
    id: 'F01',
    title: 'FX Swap Auction',
    type: 'fx',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 13, 8, 0),
    endDate: new Date(currentYear, currentMonth, 13, 12, 0),
    bidDeadline: new Date(currentYear, currentMonth, 13, 11, 0),
    settlementDate: new Date(currentYear, currentMonth, 15),
    amount: 'USD 25M',
    participants: 5,
    source: 'CBB',
    issueCode: 'FX001',
    description: '1-month USD/BHD Swap',
    cutOffRate: '2.15%'
  },
  {
    id: 'A04',
    title: 'Treasury Bond Auction',
    type: 'primary',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 15, 10, 0),
    endDate: new Date(currentYear, currentMonth, 15, 15, 0),
    bidDeadline: new Date(currentYear, currentMonth, 15, 13, 0),
    settlementDate: new Date(currentYear, currentMonth, 17),
    amount: 'BHD 100M',
    participants: 12,
    source: 'MOF',
    issueCode: 'TESTCBBOND001',
    description: '5-year Government Bond',
    cutOffRate: 'TBD'
  },
  
  // Week 3
  {
    id: 'R02',
    title: 'Repo Operation',
    type: 'repo',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 19, 11, 0),
    endDate: new Date(currentYear, currentMonth, 19, 17, 0),
    bidDeadline: new Date(currentYear, currentMonth, 19, 15, 0),
    settlementDate: new Date(currentYear, currentMonth, 21),
    amount: 'BHD 60M',
    participants: 7,
    source: 'CBB',
    issueCode: 'REPO002',
    description: '14-day Reverse Repo',
    cutOffRate: '4.35%'
  },
  {
    id: 'A05',
    title: 'Islamic Sukuk Auction',
    type: 'primary',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 20, 9, 0),
    endDate: new Date(currentYear, currentMonth, 20, 16, 0),
    bidDeadline: new Date(currentYear, currentMonth, 20, 14, 0),
    settlementDate: new Date(currentYear, currentMonth, 22),
    amount: 'BHD 80M',
    participants: 9,
    source: 'MOF',
    issueCode: 'SUKUK001',
    description: '3-year Islamic Sukuk',
    cutOffRate: 'TBD'
  },
  {
    id: 'D02',
    title: 'Term Deposit Auction',
    type: 'deposit',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 21, 10, 0),
    endDate: new Date(currentYear, currentMonth, 21, 15, 0),
    bidDeadline: new Date(currentYear, currentMonth, 21, 13, 0),
    settlementDate: new Date(currentYear, currentMonth, 23),
    amount: 'BHD 45M',
    participants: 6,
    source: 'CBB',
    issueCode: 'TERM001',
    description: '7-day Term Deposit',
    cutOffRate: 'TBD'
  },
  
  // Week 4
  {
    id: 'F02',
    title: 'USD Forward Auction',
    type: 'fx',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 26, 9, 0),
    endDate: new Date(currentYear, currentMonth, 26, 14, 0),
    bidDeadline: new Date(currentYear, currentMonth, 26, 12, 0),
    settlementDate: new Date(currentYear, currentMonth, 28),
    amount: 'USD 40M',
    participants: 8,
    source: 'CBB',
    issueCode: 'FORWARD001',
    description: '3-month USD Forward',
    cutOffRate: 'TBD'
  },
  {
    id: 'A06',
    title: 'Treasury Bill Auction',
    type: 'primary',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 27, 9, 0),
    endDate: new Date(currentYear, currentMonth, 27, 16, 0),
    bidDeadline: new Date(currentYear, currentMonth, 27, 14, 0),
    settlementDate: new Date(currentYear, currentMonth, 29),
    amount: 'BHD 65M',
    participants: 10,
    source: 'CBB',
    issueCode: 'TESTCBBILL002',
    description: '182-day Treasury Bill offering',
    cutOffRate: 'TBD'
  },
  {
    id: 'R03',
    title: 'Repo Operation',
    type: 'repo',
    status: 'pending',
    startDate: new Date(currentYear, currentMonth, 28, 11, 0),
    endDate: new Date(currentYear, currentMonth, 28, 17, 0),
    bidDeadline: new Date(currentYear, currentMonth, 28, 15, 0),
    settlementDate: new Date(currentYear, currentMonth + 1, 1),
    amount: 'BHD 55M',
    participants: 5,
    source: 'CBB',
    issueCode: 'REPO003',
    description: '28-day Reverse Repo',
    cutOffRate: 'TBD'
  }
];

const AuctionCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'all',
    status: 'all',
    source: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  // Get calendar days for current month
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Filter auctions based on selected filters and search
  const filteredAuctions = useMemo(() => {
    return auctionData.filter(auction => {
      // Type filter
      if (selectedFilters.type !== 'all' && auction.type !== selectedFilters.type) {
        return false;
      }
      
      // Status filter
      if (selectedFilters.status !== 'all' && auction.status !== selectedFilters.status) {
        return false;
      }
      
      // Source filter
      if (selectedFilters.source !== 'all' && auction.source !== selectedFilters.source) {
        return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          auction.title.toLowerCase().includes(query) ||
          auction.issueCode.toLowerCase().includes(query) ||
          auction.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [selectedFilters, searchQuery]);

  // Get auctions for a specific date
  const getAuctionsForDate = (date: Date) => {
    return filteredAuctions.filter(auction => {
      const auctionDate = new Date(auction.startDate);
      return (
        auctionDate.getDate() === date.getDate() &&
        auctionDate.getMonth() === date.getMonth() &&
        auctionDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get status color classes
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-blue-500';
      case 'repo':
        return 'bg-green-500';
      case 'deposit':
        return 'bg-purple-500';
      case 'fx':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'primary':
        return 'Primary Market';
      case 'repo':
        return 'Repo/Reverse Repo';
      case 'deposit':
        return 'Deposit Facility';
      case 'fx':
        return 'FX Operations';
      default:
        return type;
    }
  };

  const handleAction = (actionId: string) => {
    console.log(`Calendar action triggered: ${actionId}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auction Calendar"
        description="A comprehensive view of upcoming auctions, bidding periods, and settlement schedules"
      />

      {/* Controls and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'timeline')}>
                <TabsList>
                  <TabsTrigger value="grid" className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Calendar
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Timeline
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Legend */}
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Types:</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs">Primary</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Repo</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs">Deposit</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-xs">FX</span>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search auctions or try 'Auctions this week'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Auctions</h4>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select value={selectedFilters.type} onValueChange={(v) => setSelectedFilters(prev => ({...prev, type: v}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="primary">Primary Market</SelectItem>
                          <SelectItem value="repo">Repo/Reverse Repo</SelectItem>
                          <SelectItem value="deposit">Deposit Facility</SelectItem>
                          <SelectItem value="fx">FX Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select value={selectedFilters.status} onValueChange={(v) => setSelectedFilters(prev => ({...prev, status: v}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Source</label>
                      <Select value={selectedFilters.source} onValueChange={(v) => setSelectedFilters(prev => ({...prev, source: v}))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sources</SelectItem>
                          <SelectItem value="CBB">Central Bank (CBB)</SelectItem>
                          <SelectItem value="MOF">Ministry of Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedFilters({type: 'all', status: 'all', source: 'all'})}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Grid View */}
      {viewMode === 'grid' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {format(currentDate, 'MMMM yyyy')}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayAuctions = getAuctionsForDate(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isCurrentDay = isToday(day);
                
                return (
                  <div
                    key={index}
                    className={`
                      min-h-[100px] p-2 border rounded-lg transition-colors
                      ${isCurrentDay ? 'bg-primary/10 border-primary' : 'border-border hover:bg-muted/50'}
                      ${!isCurrentMonth ? 'opacity-40' : ''}
                    `}
                  >
                    <div className={`text-sm font-medium mb-1 ${isCurrentDay ? 'text-primary' : ''}`}>
                      {format(day, 'd')}
                    </div>
                    
                    <div className="space-y-1">
                      {dayAuctions.slice(0, 2).map(auction => (
                        <Popover key={auction.id}>
                          <PopoverTrigger asChild>
                            <div
                              className={`
                                p-1 rounded text-[10px] cursor-pointer
                                transition-all hover:scale-105
                                ${getStatusColor(auction.status)}
                              `}
                            >
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getTypeColor(auction.type)}`}></div>
                                <span className="truncate font-medium">{auction.id}</span>
                              </div>
                              <div className="truncate opacity-80">{auction.title}</div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-80" align="start">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold">{auction.title}</h4>
                                  <p className="text-sm text-muted-foreground">{auction.issueCode}</p>
                                </div>
                                <Badge className={getStatusColor(auction.status)}>
                                  {auction.status}
                                </Badge>
                              </div>
                              
                              <p className="text-sm">{auction.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Amount:</span>
                                  <p className="font-medium">{auction.amount}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Participants:</span>
                                  <p className="font-medium">{auction.participants}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Cut-off Rate:</span>
                                  <p className="font-medium">{auction.cutOffRate}</p>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Source:</span>
                                  <p className="font-medium">{auction.source}</p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Start:</span>
                                  <span>{format(auction.startDate, 'MMM dd, HH:mm')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Bid Deadline:</span>
                                  <span>{format(auction.bidDeadline, 'MMM dd, HH:mm')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Settlement:</span>
                                  <span>{format(auction.settlementDate, 'MMM dd, yyyy')}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="flex-1">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View Details
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Bell className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      ))}
                      
                      {dayAuctions.length > 2 && (
                        <div className="text-[10px] text-muted-foreground text-center py-1">
                          +{dayAuctions.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Auction Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAuctions.map(auction => (
                <div
                  key={auction.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-4 h-4 rounded-full ${getTypeColor(auction.type)}`}></div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold truncate">{auction.title}</h4>
                      <Badge className={getStatusColor(auction.status)} variant="outline">
                        {auction.status}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(auction.type)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{auction.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>{format(auction.startDate, 'MMM dd, HH:mm')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        <span>{auction.amount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{auction.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span>{auction.cutOffRate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bell className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredAuctions.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No auctions found matching your criteria</p>
                  <p className="text-sm">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuctionCalendarPage;