import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const gccCustomerTransferSchema = z.object({
  beneficiaryName: z.string().min(1, 'Beneficiary name is required'),
  beneficiaryAccount: z.string().min(1, 'Beneficiary account is required'),
  beneficiaryBank: z.string().min(1, 'Beneficiary bank is required'),
  beneficiaryAddress: z.string().min(1, 'Beneficiary address is required'),
  currency: z.string().min(1, 'Currency is required'),
  amount: z.string().min(1, 'Amount is required'),
  exchangeRate: z.string().optional(),
  valueDate: z.string().min(1, 'Value date is required'),
  reference: z.string().min(1, 'Reference is required'),
  purpose: z.string().min(1, 'Purpose is required'),
  charges: z.string().min(1, 'Charges option is required'),
  intermediaryBank: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type GCCCustomerTransferFormData = z.infer<typeof gccCustomerTransferSchema>;

interface GCCCustomerTransferFormProps {
  onSubmit: () => void;
}

export const GCCCustomerTransferForm = ({ onSubmit }: GCCCustomerTransferFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GCCCustomerTransferFormData>({
    resolver: zodResolver(gccCustomerTransferSchema),
    defaultValues: {
      beneficiaryName: '',
      beneficiaryAccount: '',
      beneficiaryBank: '',
      beneficiaryAddress: '',
      currency: '',
      amount: '',
      exchangeRate: '',
      valueDate: '',
      reference: '',
      purpose: '',
      charges: '',
      intermediaryBank: '',
      additionalInfo: '',
    },
  });

  const handleSubmit = async (data: GCCCustomerTransferFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('GCC Customer Transfer submitted successfully');
      onSubmit();
    } catch (error) {
      toast.error('Failed to submit transfer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const gccBanks = [
    { value: 'sabb', label: 'SABB - Saudi Arabia' },
    { value: 'adcb', label: 'ADCB - UAE' },
    { value: 'nbk', label: 'NBK - Kuwait' },
    { value: 'qnb', label: 'QNB - Qatar' },
    { value: 'rak', label: 'RAK Bank - UAE' },
    { value: 'ahb', label: 'Al Hilal Bank - UAE' },
    { value: 'scb', label: 'Standard Chartered - UAE' },
    { value: 'hsbc-gcc', label: 'HSBC - GCC Region' },
  ];

  const currencies = [
    { value: 'BHD', label: 'BHD - Bahraini Dinar' },
    { value: 'SAR', label: 'SAR - Saudi Riyal' },
    { value: 'AED', label: 'AED - UAE Dirham' },
    { value: 'KWD', label: 'KWD - Kuwaiti Dinar' },
    { value: 'QAR', label: 'QAR - Qatari Riyal' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>GCC Multi Currency Customer Transfer</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Beneficiary Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Beneficiary Details</h3>
              
              <FormField
                control={form.control}
                name="beneficiaryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter beneficiary name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="beneficiaryAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiary Account *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account number/IBAN" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="beneficiaryBank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiary Bank *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select beneficiary bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gccBanks.map((bank) => (
                            <SelectItem key={bank.value} value={bank.value}>
                              {bank.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="beneficiaryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary Address *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter beneficiary address"
                        rows={2}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Transaction Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter amount" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="exchangeRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exchange Rate (if applicable)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter rate" type="number" step="0.0001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="valueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="charges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Charges *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select charges option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="OUR">OUR - All charges borne by sender</SelectItem>
                          <SelectItem value="BEN">BEN - All charges borne by beneficiary</SelectItem>
                          <SelectItem value="SHA">SHA - Charges shared</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter transfer reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter purpose of transfer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="intermediaryBank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intermediary Bank (if required)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter intermediary bank details" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter any additional information or special instructions"
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onSubmit}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Transfer'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};