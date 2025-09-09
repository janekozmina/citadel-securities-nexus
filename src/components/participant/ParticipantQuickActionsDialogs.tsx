import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckFundsForm } from '@/components/forms/CheckFundsForm';
import { GeneralTransferForm } from '@/components/forms/GeneralTransferForm';
import DvPTransferForm from '@/components/forms/DvPTransferForm';
import RepoPledgeForm from '@/components/forms/RepoPledgeForm';
import { useToast } from '@/hooks/use-toast';

interface ParticipantQuickActionsDialogsProps {
  activeDialog: string | null;
  onClose: () => void;
}

export const ParticipantQuickActionsDialogs = ({ activeDialog, onClose }: ParticipantQuickActionsDialogsProps) => {
  const { toast } = useToast();

  const handleSubmit = (data: any, formType: string) => {
    console.log(`${formType} submitted:`, data);
    toast({
      title: "Form Submitted",
      description: `${formType} has been successfully submitted.`,
    });
    onClose();
  };

  const getDialogTitle = () => {
    switch (activeDialog) {
      case 'check-funds':
        return 'Check Funds';
      case 'general-transfer':
        return 'General Transfer';
      case 'dvp-transfer':
        return 'DvP Transfer';
      case 'repo-pledge':
        return 'Repo Pledge';
      default:
        return '';
    }
  };

  const renderDialogContent = () => {
    switch (activeDialog) {
      case 'check-funds':
        return (
          <CheckFundsForm
            onSubmit={(data) => handleSubmit(data, 'Check Funds')}
            onCancel={onClose}
          />
        );
      
      case 'general-transfer':
        return (
          <GeneralTransferForm
            onSubmit={(data) => handleSubmit(data, 'General Transfer')}
            onCancel={onClose}
          />
        );
      
      case 'dvp-transfer':
        return (
          <DvPTransferForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );
      
      case 'repo-pledge':
        return (
          <RepoPledgeForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );
      
      default:
        return null;
    }
  };

  if (!activeDialog) return null;

  // For forms that handle their own Dialog wrapper
  if (activeDialog === 'dvp-transfer' || activeDialog === 'repo-pledge') {
    return renderDialogContent();
  }

  // For forms that need a Dialog wrapper
  return (
    <Dialog open={!!activeDialog} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
};