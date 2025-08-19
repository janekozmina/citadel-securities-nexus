import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface AuthHistoryItem {
  authStep: string;
  actionName: string;
  status: string;
  authorizer: string;
  approvers: string;
  tstamp: string;
}

interface AuthHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  docId: string;
}

export function AuthHistoryDialog({ open, onOpenChange, docId }: AuthHistoryDialogProps) {
  const authHistoryData: AuthHistoryItem[] = [
    {
      authStep: 'CSDApprover Step1',
      actionName: 'CSD Approver - Step1',
      status: 'A',
      authorizer: 'DepositUser3',
      approvers: 'Common approver (depends on user and/or participant type) (T)= Depository Company (CSD)',
      tstamp: ''
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Document Auth History (DocId: {docId})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>AuthStep</TableHead>
                <TableHead>ActionName</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Authorizer</TableHead>
                <TableHead>Approvers</TableHead>
                <TableHead>Tstamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authHistoryData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.authStep}</TableCell>
                  <TableCell>{item.actionName}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.authorizer}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.approvers}</TableCell>
                  <TableCell>{item.tstamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}