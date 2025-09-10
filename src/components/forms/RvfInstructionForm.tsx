import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Calendar, FileText } from 'lucide-react';

const rvfSchema = z.object({
  reference: z.string().min(1, 'Reference is required'),
  settlementDate: z.string().min(1, 'Settlement date is required'),
  tradeDate: z.string().min(1, 'Trade date is required'),
  isin: z.string().min(1, 'ISIN code is required'),
  faceAmount: z.string().min(1, 'Face amount is required'),
  deliveringAccount: z.string().min(1, 'Delivering account is required'),
  deliveringIdentifierCode: z.string().optional(),
  receivingAccount: z.string().min(1, 'Receiving account is required'),
});

type RvfFormData = z.infer<typeof rvfSchema>;

interface RvfInstructionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RvfInstructionForm({ open, onOpenChange }: RvfInstructionFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RvfFormData>({
    resolver: zodResolver(rvfSchema),
    defaultValues: {
      reference: `RVF-${Date.now()}`,
      settlementDate: new Date().toISOString().split('T')[0],
      tradeDate: new Date().toISOString().split('T')[0],
      isin: '',
      faceAmount: '',
      deliveringAccount: '',
      deliveringIdentifierCode: '',
      receivingAccount: '',
    },
  });

  const onSubmit = async (data: RvfFormData) => {
    setIsSubmitting(true);
    try {
      console.log('RvF Instruction submitted:', data);
      toast({
        title: "Success",
        description: "RvF instruction has been created successfully.",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create RvF instruction. Please try again.",
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
            RvF Instruction (MT540) - Receive versus Free
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
                {form.formState.errors.reference && (
                  <p className="text-sm text-destructive">{form.formState.errors.reference.message}</p>
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

          {/* Delivering Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivering Agent</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="deliveringIdentifierCode">Identifier Code (Optional)</Label>
                <Input
                  id="deliveringIdentifierCode"
                  {...form.register('deliveringIdentifierCode')}
                  placeholder="Enter identifier code"
                />
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