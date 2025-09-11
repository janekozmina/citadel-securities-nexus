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

const intrabankTransferIlfSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  priority1: z.string().min(1, 'Priority is required'),
  priority2: z.string().min(1, 'Priority is required'),
  settlementDate: z.date({ required_error: 'Settlement date is required' }),
  code: z.string().min(1, 'Code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  transferFromAccount: z.string().min(1, 'Transfer from account is required'),
  transferFromSubBalance: z.string().min(1, 'Transfer from sub-balance is required'),
  transferToAccount: z.string().min(1, 'Transfer to account is required'),
  transferToSubBalance: z.string().min(1, 'Transfer to sub-balance is required'),
});

type IntrabankTransferIlfFormData = z.infer<typeof intrabankTransferIlfSchema>;

interface IntrabankTransferIlfFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IntrabankTransferIlfForm({ open, onOpenChange }: IntrabankTransferIlfFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IntrabankTransferIlfFormData>({
    resolver: zodResolver(intrabankTransferIlfSchema),
    defaultValues: {
      reference: 'SHARS00108075001',
      priority1: '1030-1059',
      priority2: '1060',
      faceAmount: '0.00',
      transferFromAccount: 'SHARNGLAS',
      transferFromSubBalance: 'AVAI - Available for sale',
      transferToAccount: 'SHARNGLA/FTS',
      transferToSubBalance: 'RSTR - Restricted for usage',
    },
  });

  const generateTransactionId = () => {
    const prefix = 'BOMLAX';
    const suffix = 'B003';
    const middle = Math.random().toString().substr(2, 4);
    return `${prefix}${middle}0817${suffix}`;
  };

  const onSubmit = async (data: IntrabankTransferIlfFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Intrabank Transfer for ILF Form Data:', data);
      const transactionId = generateTransactionId();
      toast.success(`Created Transaction ${transactionId}`);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to create Intrabank Transfer for ILF transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Intrabank transfer for ILF</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Transaction Details */}
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
                          <SelectItem value="1030-1059">1030-1059</SelectItem>
                          <SelectItem value="1000-1029">1000-1029</SelectItem>
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
                          <SelectItem value="1060">1060</SelectItem>
                          <SelectItem value="1000">1000</SelectItem>
                        </SelectContent>
                      </Select>
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
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="03 - FGN Sovereign Sukuk 2023.09.03 Issue">03 - FGN Sovereign Sukuk 2023.09.03 Issue</SelectItem>
                          <SelectItem value="04 - FGN Sovereign Sukuk 2023.09.04 Issue">04 - FGN Sovereign Sukuk 2023.09.04 Issue</SelectItem>
                        </SelectContent>
                      </Select>
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
              </CardContent>
            </Card>

            {/* Transfer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transfer from */}
              <Card>
                <CardHeader>
                  <CardTitle>Transfer from</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="transferFromAccount"
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
                            <SelectItem value="SHARNGLAS">SHARNGLAS</SelectItem>
                            <SelectItem value="SHARNGLA2">SHARNGLA2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transferFromSubBalance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub-balance code*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sub-balance code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="AVAI - Available for sale">AVAI - Available for sale</SelectItem>
                            <SelectItem value="RSTR - Restricted for usage">RSTR - Restricted for usage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel>AVAI balance</FormLabel>
                    <div className="mt-1 p-2 bg-muted rounded text-muted-foreground">
                      Balance information
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer to */}
              <Card>
                <CardHeader>
                  <CardTitle>Transfer to</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="transferToAccount"
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
                            <SelectItem value="SHARNGLA/FTS">SHARNGLA/FTS</SelectItem>
                            <SelectItem value="SHARNGLA/FTS2">SHARNGLA/FTS2</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transferToSubBalance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub-balance code*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sub-balance code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="RSTR - Restricted for usage">RSTR - Restricted for usage</SelectItem>
                            <SelectItem value="AVAI - Available for sale">AVAI - Available for sale</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel>RSTR balance</FormLabel>
                    <div className="mt-1 p-2 bg-muted rounded text-muted-foreground">
                      Balance information
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-3 pt-4">
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