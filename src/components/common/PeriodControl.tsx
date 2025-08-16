import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface PeriodControlProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function PeriodControl({ value, onValueChange, className = "" }: PeriodControlProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm font-medium text-muted-foreground">Period:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[140px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="current-month">Current Month</SelectItem>
          <SelectItem value="previous-month">Previous Month</SelectItem>
          <SelectItem value="last-3-months">Last 3 Months</SelectItem>
          <SelectItem value="last-6-months">Last 6 Months</SelectItem>
          <SelectItem value="current-quarter">Current Quarter</SelectItem>
          <SelectItem value="current-year">Current Year</SelectItem>
          <SelectItem value="ytd">Year to Date</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}