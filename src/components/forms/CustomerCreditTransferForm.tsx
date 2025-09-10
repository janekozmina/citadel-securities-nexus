import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import portalConfig from '@/config/portalConfig';

const customerCreditTransferSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  valueDate: z.string().min(1, 'Value date is required'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  debitAccount: z.string().min(1, 'Debit account is required'),
  debitAccountName: z.string().min(1, 'Debtor name is required'),
  beneficiaryName: z.string().min(1, 'Beneficiary name is required'),
  beneficiaryAccount: z.string().min(1, 'Beneficiary account is required'),
  beneficiaryBank: z.string().min(1, 'Beneficiary bank is required'),
  beneficiaryBIC: z.string().optional(),
  remittanceInfo: z.string().optional(),
  purpose: z.string().optional(),
  charges: z.string().optional(),
});

type CustomerCreditTransferFormData = z.infer<typeof customerCreditTransferSchema>;

interface CustomerCreditTransferFormProps {
  onSubmit: (data: CustomerCreditTransferFormData) => void;
  onCancel: () => void;
}

export function CustomerCreditTransferForm({ onSubmit, onCancel }: CustomerCreditTransferFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CustomerCreditTransferFormData>({
    resolver: zodResolver(customerCreditTransferSchema),
    defaultValues: {
      reference: `CCT${Date.now().toString().slice(-8)}`,
      valueDate: new Date().toISOString().split('T')[0],
      currency: portalConfig.currencies.primary,
      charges: 'OUR',
    }
  });

  const handleSubmit = async (data: CustomerCreditTransferFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(data);
      toast.success('Customer credit transfer instruction created successfully');
    } catch (error) {
      toast.error('Failed to create credit transfer instruction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Single Customer Credit Transfer (RTGS)
        </CardTitle>
        <CardDescription>
          Create a credit transfer instruction for an individual customer payment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Transaction Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Transaction Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference *</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-slate-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="0.000"
                          type="number"
                          step="0.001"
                          min="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          {portalConfig.currencies.supported.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Debtor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Debtor Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="debitAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Debit Account *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Account to be debited" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="debitAccountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Debtor Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Account holder name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Beneficiary Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Beneficiary Information</h3>
              
              <FormField
                control={form.control}
                name="beneficiaryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full name of the beneficiary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="beneficiaryAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary Account *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Beneficiary account number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="beneficiaryBank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beneficiary Bank *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select beneficiary bank" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {portalConfig.banks.commercial.map((bank) => (
                            <SelectItem key={bank} value={bank}>
                              {bank}
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
                  name="beneficiaryBIC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BIC Code (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Bank Identifier Code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Information</h3>
              
              <FormField
                control={form.control}
                name="remittanceInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remittance Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Payment purpose, invoice reference, or other relevant information"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Purpose</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purpose code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SALA">Salary Payment</SelectItem>
                          <SelectItem value="SUPP">Supplier Payment</SelectItem>
                          <SelectItem value="TRAD">Trade Payment</SelectItem>
                          <SelectItem value="LOAN">Loan Payment</SelectItem>
                          <SelectItem value="GOVT">Government Payment</SelectItem>
                          <SelectItem value="OTHR">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="charges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Charges</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select charge bearer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="OUR">OUR - Ordering party pays</SelectItem>
                          <SelectItem value="BEN">BEN - Beneficiary pays</SelectItem>
                          <SelectItem value="SHA">SHA - Shared charges</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Transfer'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}