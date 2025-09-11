import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const operationIlfPoolSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  commonReference: z.string().min(1, 'Common reference is required'),
  settlementDate: z.date({ required_error: 'Settlement date is required' }),
  priority1: z.string().min(1, 'Priority is required'),
  priority2: z.string().min(1, 'Priority is required'),
  lenderParticipant: z.string().min(1, 'Lender participant is required'),
  lenderCashAccount: z.string().min(1, 'Lender cash account is required'),
  borrowerParticipant: z.string().min(1, 'Borrower participant is required'),
  borrowerCashAccount: z.string().min(1, 'Borrower cash account is required'),
  borrowerPaymentAgent: z.string().min(1, 'Borrower payment agent is required'),
  loanValue: z.string().min(1, 'Loan value is required'),
  currency: z.string().min(1, 'Currency is required'),
});

type OperationIlfPoolFormData = z.infer<typeof operationIlfPoolSchema>;

interface OperationIlfPoolFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OperationIlfPoolForm({ open, onOpenChange }: OperationIlfPoolFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OperationIlfPoolFormData>({
    resolver: zodResolver(operationIlfPoolSchema),
    defaultValues: {
      reference: 'CITIAXXX09045005',
      commonReference: 'CITIAXXX09045005',
      lenderParticipant: 'CBALAEAB',
      lenderCashAccount: 'CB-AED',
      borrowerParticipant: 'CITIIPHMX',
      borrowerCashAccount: 'CITICASH',
      borrowerPaymentAgent: 'CITIIPHMX',
      loanValue: '2,500.00',
      currency: 'AED',
    },
  });

  const generateTransactionId = () => {
    const prefix = 'BOMLAX';
    const suffix = 'B003';
    const middle = Math.random().toString().substr(2, 4);
    return `${prefix}${middle}0817${suffix}`;
  };

  const onSubmit = async (data: OperationIlfPoolFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Operation ILF Pool Form Data:', data);
      const transactionId = generateTransactionId();
      toast.success(`Created Transaction ${transactionId}`);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to create Operation ILF Pool transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Intraday liquidity facility instruction (pool)</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Header Details */}
            <Card>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="settlementDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Settlement date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "dd.MM.yyyy") : "Pick a date"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="commonReference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Common reference*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="priority1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1000-1029">1000-1029</SelectItem>
                            <SelectItem value="1030-1059">1030-1059</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1000">1000</SelectItem>
                            <SelectItem value="1060">1060</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lender party */}
              <Card>
                <CardHeader>
                  <CardTitle>Lender party</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="lenderParticipant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participant</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lenderCashAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cash account*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cash account" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CB-AED">CB-AED</SelectItem>
                            <SelectItem value="CB-USD">CB-USD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Borrower party */}
              <Card>
                <CardHeader>
                  <CardTitle>Borrower party</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="borrowerParticipant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Participant</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="borrowerCashAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cash account*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cash account" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CITICASH">CITICASH</SelectItem>
                            <SelectItem value="CITICASH2">CITICASH2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="borrowerPaymentAgent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment agent*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment agent" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="CITIIPHMX">CITIIPHMX</SelectItem>
                            <SelectItem value="CITIIPHMX2">CITIIPHMX2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Cash details */}
            <Card>
              <CardHeader>
                <CardTitle>Cash details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="loanValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan value*</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} className="flex-1" />
                          </FormControl>
                          <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AED">AED</SelectItem>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="BHD">BHD</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" className="bg-amber-600 hover:bg-amber-700 text-white">
                Create another
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}