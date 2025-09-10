import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText } from 'lucide-react';

const houseTransferSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  settlementDate: z.string().min(1, 'Settlement date is required'),
  tradeDate: z.string().min(1, 'Trade date is required'),
  isin: z.string().min(1, 'ISIN code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  transferFromAccount: z.string().min(1, 'Transfer from account is required'),
  transferToAccount: z.string().min(1, 'Transfer to account is required'),
}).refine((data) => data.transferFromAccount !== data.transferToAccount, {
  message: "Transfer to account must be different from transfer from account",
  path: ["transferToAccount"],
});

type HouseTransferFormData = z.infer<typeof houseTransferSchema>;

interface HouseTransferFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HouseTransferForm({ open, onOpenChange }: HouseTransferFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HouseTransferFormData>({
    resolver: zodResolver(houseTransferSchema),
    defaultValues: {
      reference: `HT-${Date.now()}`,
      settlementDate: new Date().toISOString().split('T')[0],
      tradeDate: new Date().toISOString().split('T')[0],
      isin: '',
      faceAmount: '',
      transferFromAccount: '',
      transferToAccount: '',
    },
  });

  const onSubmit = async (data: HouseTransferFormData) => {
    setIsSubmitting(true);
    try {
      console.log('House Transfer submitted:', data);
      toast({
        title: "Success",
        description: "House transfer instruction has been created successfully.",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create house transfer instruction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            House Transfer Instruction (MT542)
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

          {/* Transfer Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transfer Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transferFromAccount">Transfer From Account *</Label>
                <Input
                  id="transferFromAccount"
                  {...form.register('transferFromAccount')}
                  placeholder="Enter source account code"
                />
                {form.formState.errors.transferFromAccount && (
                  <p className="text-sm text-destructive">{form.formState.errors.transferFromAccount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="transferToAccount">Transfer To Account *</Label>
                <Input
                  id="transferToAccount"
                  {...form.register('transferToAccount')}
                  placeholder="Enter destination account code"
                />
                {form.formState.errors.transferToAccount && (
                  <p className="text-sm text-destructive">{form.formState.errors.transferToAccount.message}</p>
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