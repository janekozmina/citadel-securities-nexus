import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InstitutionTransferForm } from '@/components/forms/InstitutionTransferForm';
import { InstitutionCoverTransferForm } from '@/components/forms/InstitutionCoverTransferForm';
import { CustomerCreditTransferForm } from '@/components/forms/CustomerCreditTransferForm';
import { FreeFormatMessageForm } from '@/components/forms/FreeFormatMessageForm';

interface ParticipantRTGSOperationsDialogsProps {
  activeDialog: string | null;
  onClose: () => void;
}

export const ParticipantRTGSOperationsDialogs = ({
  activeDialog,
  onClose
}: ParticipantRTGSOperationsDialogsProps) => {
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    onClose();
  };

  return (
    <>
      {/* Institution Transfer Dialog */}
      <Dialog open={activeDialog === 'institution-transfer'} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Institution Transfer</DialogTitle>
          </DialogHeader>
          <InstitutionTransferForm
            onSubmit={handleFormSubmit}
            onCancel={onClose}
          />
        </DialogContent>
      </Dialog>

      {/* Institution Cover Transfer Dialog */}
      <Dialog open={activeDialog === 'institution-cover-transfer'} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Institution Cover Transfer</DialogTitle>
          </DialogHeader>
          <InstitutionCoverTransferForm
            onSubmit={handleFormSubmit}
            onCancel={onClose}
          />
        </DialogContent>
      </Dialog>

      {/* Customer Credit Transfer Dialog */}
      <Dialog open={activeDialog === 'customer-credit-transfer'} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Single Customer Credit Transfer</DialogTitle>
          </DialogHeader>
          <CustomerCreditTransferForm
            onSubmit={handleFormSubmit}
            onCancel={onClose}
          />
        </DialogContent>
      </Dialog>

      {/* Free Format Message Dialog */}
      <Dialog open={activeDialog === 'free-format-message'} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Free Format Message</DialogTitle>
          </DialogHeader>
          <FreeFormatMessageForm
            onSubmit={handleFormSubmit}
            onCancel={onClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};