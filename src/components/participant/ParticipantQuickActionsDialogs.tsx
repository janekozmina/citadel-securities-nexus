import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckFundsForm } from '@/components/forms/CheckFundsForm';
import { GeneralTransferForm } from '@/components/forms/GeneralTransferForm';
import DvPTransferForm from '@/components/forms/DvPTransferForm';
import RepoPledgeForm from '@/components/forms/RepoPledgeForm';
import RvfInstructionForm from '@/components/forms/RvfInstructionForm';
import DvfInstructionForm from '@/components/forms/DvfInstructionForm';
import HouseTransferForm from '@/components/forms/HouseTransferForm';
import RvpInstructionForm from '@/components/forms/RvpInstructionForm';
import RvpWhenIssuedForm from '@/components/forms/RvpWhenIssuedForm';
import DvpInstructionForm from '@/components/forms/DvpInstructionForm';
import DvpWhenIssuedForm from '@/components/forms/DvpWhenIssuedForm';
import InterbankRepoForm from '@/components/forms/InterbankRepoForm';
import IslamicRepoForm from '@/components/forms/IslamicRepoForm';
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
      case 'rvf-instruction':
        return 'RvF Instruction';
      case 'dvf-instruction':
        return 'DvF Instruction';
      case 'house-transfer':
        return 'House Transfer';
      case 'rvp-instruction':
        return 'RvP Instruction';
      case 'rvp-when-issued':
        return 'RvP When-Issued';
      case 'dvp-instruction':
        return 'DvP Instruction';
      case 'dvp-when-issued':
        return 'DvP When-Issued';
      case 'interbank-repo-receive':
        return 'Interbank Repo (Receive)';
      case 'interbank-repo-deliver':
        return 'Interbank Repo (Deliver)';
      case 'islamic-repo-receive':
        return 'Islamic Repo (Receive)';
      case 'islamic-repo-deliver':
        return 'Islamic Repo (Deliver)';
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

      case 'rvf-instruction':
        return (
          <RvfInstructionForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'dvf-instruction':
        return (
          <DvfInstructionForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'house-transfer':
        return (
          <HouseTransferForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'rvp-instruction':
        return (
          <RvpInstructionForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'rvp-when-issued':
        return (
          <RvpWhenIssuedForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'dvp-instruction':
        return (
          <DvpInstructionForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'dvp-when-issued':
        return (
          <DvpWhenIssuedForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
          />
        );

      case 'interbank-repo-receive':
        return (
          <InterbankRepoForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
            type="receive"
          />
        );

      case 'interbank-repo-deliver':
        return (
          <InterbankRepoForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
            type="deliver"
          />
        );

      case 'islamic-repo-receive':
        return (
          <IslamicRepoForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
            type="receive"
          />
        );

      case 'islamic-repo-deliver':
        return (
          <IslamicRepoForm
            open={true}
            onOpenChange={(open) => !open && onClose()}
            type="deliver"
          />
        );
      
      default:
        return null;
    }
  };

  if (!activeDialog) return null;

  // For forms that handle their own Dialog wrapper
  const formsWithOwnDialog = [
    'dvp-transfer', 'repo-pledge', 'rvf-instruction', 'dvf-instruction',
    'house-transfer', 'rvp-instruction', 'rvp-when-issued', 'dvp-instruction',
    'dvp-when-issued', 'interbank-repo-receive', 'interbank-repo-deliver',
    'islamic-repo-receive', 'islamic-repo-deliver'
  ];
  
  if (formsWithOwnDialog.includes(activeDialog!)) {
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