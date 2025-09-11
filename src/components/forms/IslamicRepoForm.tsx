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

const islamicRepoSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  dealReference: z.string().optional(),
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
  deliveringAccount: z.string().min(1, 'Delivering account is required'),
  deliveringIdentifierCode: z.string().min(1, 'Delivering identifier code is required'),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
  receivingIdentifierCode: z.string().min(1, 'Receiving identifier code is required'),
  settlementAmount: z.string().min(1, 'Settlement amount is required'),
  tradeRegulator: z.string().min(1, 'Trade regulator is required'),
});

type IslamicRepoFormData = z.infer<typeof islamicRepoSchema>;

interface IslamicRepoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IslamicRepoForm({ open, onOpenChange }: IslamicRepoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IslamicRepoFormData>({
    resolver: zodResolver(islamicRepoSchema),
    defaultValues: {
      reference: 'FIBHSER10113S012',
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

  const onSubmit = async (data: IslamicRepoFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Islamic Repo Form Data:', data);
      const transactionId = generateTransactionId();
      toast.success(`Created Transaction ${transactionId}`);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to create Islamic Repo transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New MT541 islamic REPO</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="grid grid-cols-2 gap-4 pt-6">
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
                    <FormItem>
                      <FormLabel>Settlement date*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full justify-start">
                              {field.value ? format(field.value, "dd.MM.yyyy") : "Pick a date"}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} className="pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
              <Button type="button" variant="secondary">Save as Draft</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}