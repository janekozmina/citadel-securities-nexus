import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';

const dvpWhenIssuedSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  tradeDate: z.string().min(1, 'Trade date is required'),
  dealPrice: z.string().min(1, 'Deal price is required'),
  isin: z.string().min(1, 'ISIN code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  settlementAmount: z.string().min(1, 'Settlement amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  accruedInterest: z.string().optional(),
  deliveringAccount: z.string().min(1, 'Delivering account is required'),
  deliveringIdentifierCode: z.string().min(1, 'Delivering identifier code is required'),
  deliveringNameAddress: z.string().min(1, 'Name and address is required'),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
});

type DvpWhenIssuedFormData = z.infer<typeof dvpWhenIssuedSchema>;

interface DvpWhenIssuedFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DvpWhenIssuedForm({ open, onOpenChange }: DvpWhenIssuedFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DvpWhenIssuedFormData>({
    resolver: zodResolver(dvpWhenIssuedSchema),
    defaultValues: {
      reference: `DVPWI-${Date.now()}`,
      tradeDate: new Date().toISOString().split('T')[0],
      dealPrice: '',
      isin: '',
      faceAmount: '',
      settlementAmount: '',
      currency: 'BHD',
      accruedInterest: '',
      deliveringAccount: '',
      deliveringIdentifierCode: '',
      deliveringNameAddress: '',
      receivingAccount: '',
    },
  });

  const onSubmit = async (data: DvpWhenIssuedFormData) => {
    setIsSubmitting(true);
    try {
      console.log('DvP When-Issued Instruction submitted:', data);
      toast({
        title: "Success",
        description: "DvP (When-Issued) instruction has been created successfully.",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create DvP (When-Issued) instruction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            DvP When-Issued (MT543) - Deliver against Payment (When Issue)
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reference">Reference *</Label>
                <Input
                  id="reference"
                  {...form.register('reference')}
                  readOnly
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradeDate">Trade Date *</Label>
                <Input
                  id="tradeDate"
                  type="date"
                  {...form.register('tradeDate')}
                />
                {form.formState.errors.tradeDate && (
                  <p className="text-sm text-destructive">{form.formState.errors.tradeDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealPrice">Deal Price *</Label>
                <Input
                  id="dealPrice"
                  {...form.register('dealPrice')}
                  placeholder="Enter deal price"
                />
                {form.formState.errors.dealPrice && (
                  <p className="text-sm text-destructive">{form.formState.errors.dealPrice.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Instrument */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instrument</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="isin">ISIN *</Label>
                <Input
                  id="isin"
                  {...form.register('isin')}
                  placeholder="Enter ISIN code"
                />
                {form.formState.errors.isin && (
                  <p className="text-sm text-destructive">{form.formState.errors.isin.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="faceAmount">Face Amount *</Label>
                <Input
                  id="faceAmount"
                  {...form.register('faceAmount')}
                  placeholder="Enter face amount"
                />
                {form.formState.errors.faceAmount && (
                  <p className="text-sm text-destructive">{form.formState.errors.faceAmount.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Settlement Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Settlement Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="settlementAmount">Settlement Amount *</Label>
                <Input
                  id="settlementAmount"
                  {...form.register('settlementAmount')}
                  placeholder="Enter settlement amount"
                />
                {form.formState.errors.settlementAmount && (
                  <p className="text-sm text-destructive">{form.formState.errors.settlementAmount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency *</Label>
                <Input
                  id="currency"
                  {...form.register('currency')}
                  placeholder="Enter currency code"
                />
                {form.formState.errors.currency && (
                  <p className="text-sm text-destructive">{form.formState.errors.currency.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accruedInterest">Accrued Interest (Optional)</Label>
                <Input
                  id="accruedInterest"
                  {...form.register('accruedInterest')}
                  placeholder="Enter accrued interest"
                />
              </div>
            </CardContent>
          </Card>

          {/* Delivering Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivering Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveringAccount">Account *</Label>
                  <Input
                    id="deliveringAccount"
                    {...form.register('deliveringAccount')}
                    placeholder="Enter delivering account code"
                  />
                  {form.formState.errors.deliveringAccount && (
                    <p className="text-sm text-destructive">{form.formState.errors.deliveringAccount.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveringIdentifierCode">Identifier Code *</Label>
                  <Input
                    id="deliveringIdentifierCode"
                    {...form.register('deliveringIdentifierCode')}
                    placeholder="Enter identifier code"
                  />
                  {form.formState.errors.deliveringIdentifierCode && (
                    <p className="text-sm text-destructive">{form.formState.errors.deliveringIdentifierCode.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveringNameAddress">Name and Address *</Label>
                <Textarea
                  id="deliveringNameAddress"
                  {...form.register('deliveringNameAddress')}
                  placeholder="Enter name and address"
                  rows={3}
                />
                {form.formState.errors.deliveringNameAddress && (
                  <p className="text-sm text-destructive">{form.formState.errors.deliveringNameAddress.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Receiving Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receiving Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="receivingAccount">Account *</Label>
                <Input
                  id="receivingAccount"
                  {...form.register('receivingAccount')}
                  placeholder="Enter receiving account code"
                />
                {form.formState.errors.receivingAccount && (
                  <p className="text-sm text-destructive">{form.formState.errors.receivingAccount.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}