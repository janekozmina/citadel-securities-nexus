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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';

const interbankRepoSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  settlementDate: z.string().min(1, 'Settlement date is required'),
  dealPrice: z.string().min(1, 'Deal price is required'),
  tradeDate: z.string().min(1, 'Trade date is required'),
  isin: z.string().min(1, 'ISIN code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  instrumentAccount: z.string().min(1, 'Instrument account is required'),
  repurchaseDate: z.string().min(1, 'Repurchase date is required'),
  repurchaseAmount: z.string().min(1, 'Repurchase amount is required'),
  repoRate: z.string().min(1, 'Repo rate is required'),
  repoAccruedInterest: z.string().optional(),
  deliveringAgentAccount: z.string().min(1, 'Delivering agent account is required'),
  deliveringIdentifierCode: z.string().min(1, 'Delivering identifier code is required'),
  deliveringNameAddress: z.string().min(1, 'Name and address is required'),
  settlementAmount: z.string().min(1, 'Settlement amount is required'),
  currency: z.string().min(1, 'Currency is required'),
  accruedInterest: z.string().optional(),
  transactionType: z.enum(['receive', 'deliver']),
});

type InterbankRepoFormData = z.infer<typeof interbankRepoSchema>;

interface InterbankRepoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'receive' | 'deliver';
}

export default function InterbankRepoForm({ open, onOpenChange, type = 'receive' }: InterbankRepoFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InterbankRepoFormData>({
    resolver: zodResolver(interbankRepoSchema),
    defaultValues: {
      reference: `IR-${type.toUpperCase()}-${Date.now()}`,
      settlementDate: new Date().toISOString().split('T')[0],
      dealPrice: '',
      tradeDate: new Date().toISOString().split('T')[0],
      isin: '',
      faceAmount: '',
      instrumentAccount: '',
      repurchaseDate: '',
      repurchaseAmount: '',
      repoRate: '',
      repoAccruedInterest: '',
      deliveringAgentAccount: '',
      deliveringIdentifierCode: '',
      deliveringNameAddress: '',
      settlementAmount: '',
      currency: 'BHD',
      accruedInterest: '',
      transactionType: type,
    },
  });

  const onSubmit = async (data: InterbankRepoFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Interbank Repo submitted:', data);
      toast({
        title: "Success",
        description: `Interbank REPO (${type === 'receive' ? 'MT541' : 'MT543'}) instruction has been created successfully.`,
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create interbank REPO instruction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mtCode = type === 'receive' ? 'MT541' : 'MT543';
  const title = type === 'receive' ? 'Receive against Payment (Interbank Repo)' : 'Deliver against Payment (Interbank Repo)';

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

          {/* Delivering Agent (for receive type) or Receiving Agent (for deliver type) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {type === 'receive' ? 'Delivering Agent' : 'Receiving Agent'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deliveringAgentAccount">Account *</Label>
                  <Input
                    id="deliveringAgentAccount"
                    {...form.register('deliveringAgentAccount')}
                    placeholder="Enter account code"
                  />
                  {form.formState.errors.deliveringAgentAccount && (
                    <p className="text-sm text-destructive">{form.formState.errors.deliveringAgentAccount.message}</p>
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