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

const institutionCoverTransferSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  valueDate: z.string().min(1, 'Value date is required'),
  amount: z.string().min(1, 'Amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  orderingInstitution: z.string().min(1, 'Ordering institution is required'),
  orderingAccount: z.string().min(1, 'Ordering account is required'),
  beneficiaryInstitution: z.string().min(1, 'Beneficiary institution is required'),
  beneficiaryAccount: z.string().min(1, 'Beneficiary account is required'),
  coverReference: z.string().min(1, 'Cover reference is required'),
  originalMessage: z.string().optional(),
  charges: z.string().optional(),
});

type InstitutionCoverTransferFormData = z.infer<typeof institutionCoverTransferSchema>;

interface InstitutionCoverTransferFormProps {
  onSubmit: (data: InstitutionCoverTransferFormData) => void;
  onCancel: () => void;
}

export function InstitutionCoverTransferForm({ onSubmit, onCancel }: InstitutionCoverTransferFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InstitutionCoverTransferFormData>({
    resolver: zodResolver(institutionCoverTransferSchema),
    defaultValues: {
      reference: `CT${Date.now().toString().slice(-8)}`,
      valueDate: new Date().toISOString().split('T')[0],
      currency: portalConfig.currencies.primary,
      charges: 'OUR',
    }
  });

  const handleSubmit = async (data: InstitutionCoverTransferFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSubmit(data);
      toast.success('Institution cover transfer instruction created successfully');
    } catch (error) {
      toast.error('Failed to create cover transfer instruction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Institution Cover Transfer (RTGS)
        </CardTitle>
        <CardDescription>
          Create a cover payment instruction to provide funds for a correspondent banking transaction
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

            {/* Ordering Institution */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ordering Institution</h3>
              
              <FormField
                control={form.control}
                name="orderingInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ordering Institution *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ordering institution" />
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
                name="orderingAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ordering Account *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Account to be debited" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Beneficiary Institution */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Beneficiary Institution</h3>
              
              <FormField
                control={form.control}
                name="beneficiaryInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary Institution *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select beneficiary institution" />
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
                name="beneficiaryAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beneficiary Account *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Account to be credited" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Cover Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cover Details</h3>
              
              <FormField
                control={form.control}
                name="coverReference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Reference *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Original payment reference being covered" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="originalMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Message Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Details of the original payment instruction"
                        rows={3}
                      />
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

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Cover Transfer'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}