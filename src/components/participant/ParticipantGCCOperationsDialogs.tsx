import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GCCInstitutionTransferForm } from '@/components/forms/GCCInstitutionTransferForm';
import { GCCCustomerTransferForm } from '@/components/forms/GCCCustomerTransferForm';

interface ParticipantGCCOperationsDialogsProps {
  activeDialog: string | null;
  onClose: () => void;
}

export const ParticipantGCCOperationsDialogs = ({ activeDialog, onClose }: ParticipantGCCOperationsDialogsProps) => {
  return (
    <>
      <Dialog open={activeDialog === 'gcc-institution-transfer'} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>GCC Multi Currency Institution Transfer</DialogTitle>
          </DialogHeader>
          <GCCInstitutionTransferForm onSubmit={onClose} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === 'gcc-customer-transfer'} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>GCC Multi Currency Customer Transfer</DialogTitle>
          </DialogHeader>
          <GCCCustomerTransferForm onSubmit={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};