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

const islamicRepoSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  dealReference: z.string().min(1, 'Deal reference is required'),
  dealPrice: z.string().min(1, 'Deal price is required'),
  settlementDate: z.string().min(1, 'Settlement date is required'),
  tradeDate: z.string().min(1, 'Trade date is required'),
  isin: z.string().min(1, 'ISIN code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  instrumentAccount: z.string().min(1, 'Instrument account is required'),
  repurchaseDate: z.string().min(1, 'Repurchase date is required'),
  repurchaseAmount: z.string().min(1, 'Repurchase amount is required'),
  repoRate: z.string().min(1, 'Repo rate is required'),
  repoAccruedInterest: z.string().optional(),
  deliveringIdentifierCode: z.string().min(1, 'Delivering identifier code is required'),
  deliveringAccount: z.string().min(1, 'Delivering account is required'),
  deliveringNameAddress: z.string().min(1, 'Delivering name and address is required'),
  receivingIdentifierCode: z.string().min(1, 'Receiving identifier code is required'),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
  receivingNameAddress: z.string().optional(),
  settlementAmount: z.string().min(1, 'Settlement amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  accruedInterest: z.string().optional(),
  tradeRegulator: z.string().min(1, 'Trade regulator is required'),
  transactionType: z.enum(['receive', 'deliver']),
});

type IslamicRepoFormData = z.infer<typeof islamicRepoSchema>;

interface IslamicRepoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'receive' | 'deliver';
}

export default function IslamicRepoForm({ open, onOpenChange, type = 'receive' }: IslamicRepoFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IslamicRepoFormData>({
    resolver: zodResolver(islamicRepoSchema),
    defaultValues: {
      reference: `IR-${type.toUpperCase()}-${Date.now()}`,
      dealReference: '',
      dealPrice: '',
      settlementDate: new Date().toISOString().split('T')[0],
      tradeDate: new Date().toISOString().split('T')[0],
      isin: '',
      faceAmount: '',
      instrumentAccount: '',
      repurchaseDate: '',
      repurchaseAmount: '',
      repoRate: '',
      repoAccruedInterest: '',
      deliveringIdentifierCode: '',
      deliveringAccount: '',
      deliveringNameAddress: '',
      receivingIdentifierCode: '',
      receivingAccount: '',
      receivingNameAddress: '',
      settlementAmount: '',
      currency: 'BHD',
      accruedInterest: '',
      tradeRegulator: '',
      transactionType: type,
    },
  });

  const onSubmit = async (data: IslamicRepoFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Islamic Repo submitted:', data);
      toast({
        title: "Success",
        description: `Islamic REPO (${type === 'receive' ? 'MT541' : 'MT543'}) instruction has been created successfully.`,
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create Islamic REPO instruction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mtCode = type === 'receive' ? 'MT541' : 'MT543';
  const title = type === 'receive' ? 'Receive against Payment (Islamic Repo)' : 'Deliver against Payment (Islamic Repo)';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {title} ({mtCode})
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                <Label htmlFor="dealReference">Deal Reference *</Label>
                <Input
                  id="dealReference"
                  {...form.register('dealReference')}
                  placeholder="Enter deal reference"
                />
                {form.formState.errors.dealReference && (
                  <p className="text-sm text-destructive">{form.formState.errors.dealReference.message}</p>
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
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="instrumentAccount">Account *</Label>
                <Input
                  id="instrumentAccount"
                  {...form.register('instrumentAccount')}
                  placeholder="Enter instrument account"
                />
                {form.formState.errors.instrumentAccount && (
                  <p className="text-sm text-destructive">{form.formState.errors.instrumentAccount.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* REPO Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">REPO Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repurchaseDate">Repurchase Date *</Label>
                <Input
                  id="repurchaseDate"
                  type="date"
                  {...form.register('repurchaseDate')}
                />
                {form.formState.errors.repurchaseDate && (
                  <p className="text-sm text-destructive">{form.formState.errors.repurchaseDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repurchaseAmount">Repurchase Amount *</Label>
                <Input
                  id="repurchaseAmount"
                  {...form.register('repurchaseAmount')}
                  placeholder="Enter repurchase amount"
                />
                {form.formState.errors.repurchaseAmount && (
                  <p className="text-sm text-destructive">{form.formState.errors.repurchaseAmount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoRate">Repo Rate *</Label>
                <Input
                  id="repoRate"
                  {...form.register('repoRate')}
                  placeholder="Enter repo rate (%)"
                />
                {form.formState.errors.repoRate && (
                  <p className="text-sm text-destructive">{form.formState.errors.repoRate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="repoAccruedInterest">Accrued Interest (Optional)</Label>
                <Input
                  id="repoAccruedInterest"
                  {...form.register('repoAccruedInterest')}
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

                <div className="space-y-2">
                  <Label htmlFor="deliveringAccount">Account *</Label>
                  <Input
                    id="deliveringAccount"
                    {...form.register('deliveringAccount')}
                    placeholder="Enter account code"
                  />
                  {form.formState.errors.deliveringAccount && (
                    <p className="text-sm text-destructive">{form.formState.errors.deliveringAccount.message}</p>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="receivingAccount">Account *</Label>
                  <Input
                    id="receivingAccount"
                    {...form.register('receivingAccount')}
                    placeholder="Enter account code"
                  />
                  {form.formState.errors.receivingAccount && (
                    <p className="text-sm text-destructive">{form.formState.errors.receivingAccount.message}</p>
                  )}
                </div>
              </div>

              {type === 'deliver' && (
                <div className="space-y-2">
                  <Label htmlFor="receivingNameAddress">Name and Address</Label>
                  <Textarea
                    id="receivingNameAddress"
                    {...form.register('receivingNameAddress')}
                    placeholder="Enter name and address"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Amounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Amounts</CardTitle>
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

          {/* Other Parties */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Other Parties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="tradeRegulator">Trade Regulator *</Label>
                <Input
                  id="tradeRegulator"
                  {...form.register('tradeRegulator')}
                  placeholder="Enter trade regulator code"
                />
                {form.formState.errors.tradeRegulator && (
                  <p className="text-sm text-destructive">{form.formState.errors.tradeRegulator.message}</p>
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
