import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import portalConfig from '@/config/portalConfig';

const institutionTransferSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  valueDate: z.string().min(1, 'Value date is required'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  receivingInstitution: z.string().min(1, 'Receiving institution is required'),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
  receivingBIC: z.string().optional(),
  debitAccount: z.string().min(1, 'Debit account is required'),
  remittanceInfo: z.string().optional(),
  purpose: z.string().optional(),
});

type InstitutionTransferFormData = z.infer<typeof institutionTransferSchema>;

interface InstitutionTransferFormProps {
  onSubmit: (data: InstitutionTransferFormData) => void;
  onCancel: () => void;
}

export function InstitutionTransferForm({ onSubmit, onCancel }: InstitutionTransferFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InstitutionTransferFormData>({
    resolver: zodResolver(institutionTransferSchema),
    defaultValues: {
      reference: `IT${Date.now().toString().slice(-8)}`,
      valueDate: new Date().toISOString().split('T')[0],
      currency: portalConfig.currencies.primary,
      debitAccount: 'ACC001-MAIN',
    }
  });

  const handleSubmit = async (data: InstitutionTransferFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(data);
      toast.success('Institution transfer instruction created successfully');
    } catch (error) {
      toast.error('Failed to create transfer instruction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Institution Transfer (RTGS)
        </CardTitle>
        <CardDescription>
          Create an inter-bank transfer instruction for real-time gross settlement
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
            </div>

            {/* Creditor Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Creditor Information</h3>
              
              <FormField
                control={form.control}
                name="receivingInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiving Institution *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select receiving institution" />
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="receivingAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiving Account *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Beneficiary account number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="receivingBIC"
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

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              
              <FormField
                control={form.control}
                name="remittanceInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remittance Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Payment purpose or reference information"
                        rows={3}
                      />
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
                    <FormLabel>Transaction Purpose</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CBFF">Central Bank Funding</SelectItem>
                        <SelectItem value="INTC">Interbank Transaction</SelectItem>
                        <SelectItem value="SECU">Securities Transaction</SelectItem>
                        <SelectItem value="TRAD">Trade Settlement</SelectItem>
                        <SelectItem value="TREA">Treasury Operation</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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