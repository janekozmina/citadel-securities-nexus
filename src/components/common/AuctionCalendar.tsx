import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Target,
  Eye
} from 'lucide-react';

interface AuctionEvent {
  id: string;
  title: string;
  type: 'Treasury Bill' | 'Government Bond' | 'Islamic Sukuk' | 'Corporate Bond';
  date: string;
  time: string;
  status: 'Upcoming' | 'Active' | 'Closing Soon' | 'Closed';
  targetAmount: number;
  minBid: number;
  maturity: string;
}

const AuctionCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock auction events - in real app this would come from API
  const auctionEvents: AuctionEvent[] = [
    {
      id: 'AUC001',
      title: 'Treasury Bill Auction',
      type: 'Treasury Bill',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Upcoming',
      targetAmount: 50000000,
      minBid: 1000000,
      maturity: '91 Days'
    },
    {
      id: 'AUC002',
      title: 'Government Bond Auction',
      type: 'Government Bond',
      date: '2024-01-16',
      time: '14:00 PM',
      status: 'Upcoming',
      targetAmount: 100000000,
      minBid: 5000000,
      maturity: '5 Years'
    },
    {
      id: 'AUC003',
      title: 'Islamic Sukuk Auction',
      type: 'Islamic Sukuk',
      date: '2024-01-18',
      time: '11:00 AM',
      status: 'Upcoming',
      targetAmount: 75000000,
      minBid: 2000000,
      maturity: '3 Years'
    },
    {
      id: 'AUC004',
      title: 'TB Auction - Short Term',
      type: 'Treasury Bill',
      date: '2024-01-22',
      time: '09:30 AM',
      status: 'Upcoming',
      targetAmount: 30000000,
      minBid: 500000,
      maturity: '182 Days'
    },
    {
      id: 'AUC005',
      title: 'Corporate Bond Auction',
      type: 'Corporate Bond',
      date: '2024-01-25',
      time: '13:00 PM',
      status: 'Upcoming',
      targetAmount: 25000000,
      minBid: 1000000,
      maturity: '7 Years'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `2024-01-${day.toString().padStart(2, '0')}`;
    return auctionEvents.filter(event => event.date === dateStr);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'secondary';
      case 'Active': return 'default';
      case 'Closing Soon': return 'destructive';
      case 'Closed': return 'outline';
      default: return 'secondary';
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {formatMonth(currentMonth)}
              </CardTitle>
              <CardDescription>Auction events calendar for participants</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-sm font-medium text-center text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map(day => (
              <div key={`empty-${day}`} className="p-2 min-h-[80px]" />
            ))}
            
            {daysArray.map(day => {
              const events = getEventsForDate(day);
              return (
                <div key={day} className="p-2 min-h-[80px] border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="font-medium text-sm mb-1">{day}</div>
                  <div className="space-y-1">
                    {events.map(event => (
                      <div
                        key={event.id}
                        className="p-1 text-xs rounded bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                        title={`${event.title} - ${event.time}`}
                      >
                        <div className="truncate">{event.title}</div>
                        <div className="truncate opacity-70">{event.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Upcoming Auction Events
          </CardTitle>
          <CardDescription>Detailed view of upcoming auctions you can participate in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auctionEvents.map(event => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge variant={getStatusColor(event.status)} className="text-xs">
                        {event.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.type} • {event.maturity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString()} • {event.time}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Target Amount</p>
                      <p className="font-medium">BHD {event.targetAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Minimum Bid</p>
                      <p className="font-medium">BHD {event.minBid.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Maturity</p>
                      <p className="font-medium">{event.maturity}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  {event.status === 'Upcoming' && (
                    <Button size="sm">
                      Register Interest
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuctionCalendar;