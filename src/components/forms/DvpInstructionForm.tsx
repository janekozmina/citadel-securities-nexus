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

const dvpSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  settlementDate: z.string().min(1, 'Settlement date is required'),
  dealPrice: z.string().min(1, 'Deal price is required'),
  tradeDate: z.string().min(1, 'Trade date is required'),
  isin: z.string().min(1, 'ISIN code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  settlementAmount: z.string().min(1, 'Settlement amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  accruedInterest: z.string().optional(),
  deliveringAccount: z.string().min(1, 'Delivering account is required'),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
  receivingIdentifierCode: z.string().min(1, 'Receiving identifier code is required'),
  receivingNameAddress: z.string().min(1, 'Name and address is required'),
});

type DvpFormData = z.infer<typeof dvpSchema>;

interface DvpInstructionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DvpInstructionForm({ open, onOpenChange }: DvpInstructionFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DvpFormData>({
    resolver: zodResolver(dvpSchema),
    defaultValues: {
      reference: `DVP-${Date.now()}`,
      settlementDate: new Date().toISOString().split('T')[0],
      dealPrice: '',
      tradeDate: new Date().toISOString().split('T')[0],
      isin: '',
      faceAmount: '',
      settlementAmount: '',
      currency: 'BHD',
      accruedInterest: '',
      deliveringAccount: '',
      receivingAccount: '',
      receivingIdentifierCode: '',
      receivingNameAddress: '',
    },
  });

  const onSubmit = async (data: DvpFormData) => {
    setIsSubmitting(true);
    try {
      console.log('DvP Instruction submitted:', data);
      toast({
        title: "Success",
        description: "DvP instruction has been created successfully.",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create DvP instruction. Please try again.",
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
            DvP Instruction (MT543) - Deliver against Payment
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <Label htmlFor="settlementDate">Settlement Date *</Label>
                <Input
                  id="settlementDate"
                  type="date"
                  {...form.register('settlementDate')}
                />
                {form.formState.errors.settlementDate && (
                  <p className="text-sm text-destructive">{form.formState.errors.settlementDate.message}</p>
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
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Receiving Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receiving Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="receivingIdentifierCode">Identifier Code *</Label>
                  <Input
                    id="receivingIdentifierCode"
                    {...form.register('receivingIdentifierCode')}
                    placeholder="Enter identifier code"
                  />
                  {form.formState.errors.receivingIdentifierCode && (
                    <p className="text-sm text-destructive">{form.formState.errors.receivingIdentifierCode.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receivingNameAddress">Name and Address *</Label>
                <Textarea
                  id="receivingNameAddress"
                  {...form.register('receivingNameAddress')}
                  placeholder="Enter name and address"
                  rows={3}
                />
                {form.formState.errors.receivingNameAddress && (
                  <p className="text-sm text-destructive">{form.formState.errors.receivingNameAddress.message}</p>
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