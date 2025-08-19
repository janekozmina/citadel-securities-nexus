import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GeneralTransferForm } from '@/components/forms/GeneralTransferForm';
import { CheckFundsForm } from '@/components/forms/CheckFundsForm';
import { LiquiditySourceDialog } from './LiquiditySourceDialog';
import { ManualGridlockDialog } from './ManualGridlockDialog';
import TransferInstructionDialog from './TransferInstructionDialog';
import { toast } from 'sonner';

interface TransactionQuickActionsDialogsProps {
  activeDialog: 'general-transfer' | 'check-funds' | 'liquidity-source' | 'manual-gridlock' | 'submit-transfer-instruction' | null;
  onClose: () => void;
}

export function TransactionQuickActionsDialogs({ 
  activeDialog, 
  onClose 
}: TransactionQuickActionsDialogsProps) {
  const handleGeneralTransferSubmit = (data: any) => {
    console.log('General Transfer submitted:', data);
    toast.success('General transfer submitted successfully');
    onClose();
  };

  const handleCheckFundsSubmit = (data: any) => {
    console.log('Check Funds submitted:', data);
    // Don't close dialog here as CheckFundsForm handles showing results
  };

  const getDialogTitle = () => {
    switch (activeDialog) {
      case 'general-transfer':
        return 'General Transfer';
      case 'check-funds':
        return 'Check Funds';
      case 'liquidity-source':
        return 'Liquidity Sources';
      case 'manual-gridlock':
        return 'Manual Gridlock';
      case 'submit-transfer-instruction':
        return 'Submit Transfer Instruction';
      default:
        return '';
    }
  };

  const renderDialogContent = () => {
    switch (activeDialog) {
      case 'general-transfer':
        return (
          <GeneralTransferForm
            onSubmit={handleGeneralTransferSubmit}
            onCancel={onClose}
          />
        );
      case 'check-funds':
        return (
          <CheckFundsForm
            onSubmit={handleCheckFundsSubmit}
            onCancel={onClose}
          />
        );
      case 'liquidity-source':
        return <LiquiditySourceDialog onClose={onClose} />;
      case 'manual-gridlock':
        return <ManualGridlockDialog onClose={onClose} />;
      case 'submit-transfer-instruction':
        return <TransferInstructionDialog open={!!activeDialog} onOpenChange={onClose} />;
      default:
        return null;
    }
  };

  const isLargeDialog = activeDialog === 'general-transfer' || 
                        activeDialog === 'liquidity-source' || 
                        activeDialog === 'manual-gridlock' ||
                        activeDialog === 'check-funds' ||
                        activeDialog === 'submit-transfer-instruction';

  const getDialogSize = () => {
    if (activeDialog === 'liquidity-source') {
      return 'max-w-7xl'; // Extra wide for liquidity source
    }
    return isLargeDialog ? 'max-w-4xl' : 'max-w-2xl';
  };

  return activeDialog === 'submit-transfer-instruction' ? (
    renderDialogContent()
  ) : (
    <Dialog open={!!activeDialog} onOpenChange={onClose}>
      <DialogContent className={`${getDialogSize()} max-h-[90vh] overflow-y-auto`}>
        {activeDialog !== 'liquidity-source' && activeDialog !== 'manual-gridlock' && (
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
        )}
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}