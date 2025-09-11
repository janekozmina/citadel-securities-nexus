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

const interbankRepoDvpSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  dealPrice: z.string().min(1, 'Deal price is required'),
  settlementDate: z.date({ required_error: 'Settlement date is required' }),
  tradeDate: z.date({ required_error: 'Trade date is required' }),
  isin: z.string().min(1, 'ISIN is required'),
  account: z.string().min(1, 'Account is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  repurchaseDate: z.date({ required_error: 'Repurchase date is required' }),
  repoRate: z.string().min(1, 'Repo rate is required'),
  repurchaseAmount: z.string().min(1, 'Repurchase amount is required'),
  accruedInterest: z.string().min(1, 'Accrued interest is required'),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
  receivingIdentifierCode: z.string().min(1, 'Receiving identifier code is required'),
  settlementAmount: z.string().min(1, 'Settlement amount is required'),
});

type InterbankRepoDvpFormData = z.infer<typeof interbankRepoDvpSchema>;

interface InterbankRepoDvpFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InterbankRepoDvpForm({ open, onOpenChange }: InterbankRepoDvpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InterbankRepoDvpFormData>({
    resolver: zodResolver(interbankRepoDvpSchema),
    defaultValues: {
      reference: 'FIBHSER10113S010',
      dealPrice: '0.000',
      faceAmount: '0.000',
      repoRate: '0.00',
      repurchaseAmount: '0.000',
      accruedInterest: '0.000',
      settlementAmount: '0.000',
    },
  });

  const generateTransactionId = () => {
    const prefix = 'BOMLAX';
    const suffix = 'B003';
    const middle = Math.random().toString().substr(2, 4);
    return `${prefix}${middle}0817${suffix}`;
  };

  const onSubmit = async (data: InterbankRepoDvpFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Interbank Repo DvP Form Data:', data);
      const transactionId = generateTransactionId();
      toast.success(`Created Transaction ${transactionId}`);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to create Interbank Repo DvP transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New MT543 interbank REPO</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Transaction Details */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="dealPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tradeDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Trade date*</FormLabel>
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
              </CardContent>
            </Card>

            {/* Instrument */}
            <Card>
              <CardHeader>
                <CardTitle>Instrument</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISIN*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="faceAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Face amount*</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="acc1">Account 1</SelectItem>
                          <SelectItem value="acc2">Account 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* REPO Details */}
            <Card>
              <CardHeader>
                <CardTitle>REPO details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="repurchaseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Repurchase date*</FormLabel>
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
                  name="repurchaseAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repurchase amount*</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} className="flex-1" />
                        </FormControl>
                        <Select defaultValue="BHD">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BHD">BHD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repoRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repo rate</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accruedInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Accrued interest</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} className="flex-1" />
                        </FormControl>
                        <Select defaultValue="BHD">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BHD">BHD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Receiving Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Receiving agent</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="receivingAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="acc1">Account 1</SelectItem>
                          <SelectItem value="acc2">Account 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receivingIdentifierCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identifier code*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select identifier code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="code1">Code 1</SelectItem>
                          <SelectItem value="code2">Code 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Amounts */}
            <Card>
              <CardHeader>
                <CardTitle>Amounts</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="settlementAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Settlement amount*</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input {...field} className="flex-1" />
                        </FormControl>
                        <Select defaultValue="BHD">
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BHD">BHD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
              <Button type="button" variant="secondary">
                Save as Draft
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}