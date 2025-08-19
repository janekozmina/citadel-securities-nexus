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

interface DocumentHistoryItem {
  docId: string;
  step: string;
  stepName: string;
  docType: string;
  linkId: string;
  period: string;
  startDate: string;
  linkType: string;
  description: string;
}

interface DocumentHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  docId: string;
}

export function DocumentHistoryDialog({ open, onOpenChange, docId }: DocumentHistoryDialogProps) {
  const documentHistoryData: DocumentHistoryItem[] = [
    {
      docId: '4,494',
      step: 'M',
      stepName: 'INIT',
      docType: 'DvPHeartTrade',
      linkId: 'n/a',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:09 PM',
      linkType: '',
      description: ''
    },
    {
      docId: '4,494',
      step: 'CHV',
      stepName: 'Validation',
      docType: 'DvPHeartTrade',
      linkId: 'n/a',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:09 PM',
      linkType: '',
      description: ''
    },
    {
      docId: '4,494',
      step: 'OMC',
      stepName: 'OMCopy',
      docType: 'DvPHeartTrade',
      linkId: 'n/a',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:09 PM',
      linkType: '',
      description: ''
    },
    {
      docId: '4,494',
      step: 'WA',
      stepName: 'Authorization',
      docType: 'DvPHeartTrade',
      linkId: '801,239.2',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:09 PM',
      linkType: 'Participant who authorized docum...',
      description: ''
    },
    {
      docId: '4,494',
      step: 'WA#',
      stepName: 'Authorization',
      docType: 'DvPHeartTrade',
      linkId: 'n/a',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:11 PM',
      linkType: '',
      description: ''
    },
    {
      docId: '4,494',
      step: 'TP',
      stepName: 'TradePrepare',
      docType: 'DvPHeartTrade',
      linkId: '4,502',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:11 PM',
      linkType: 'Trade',
      description: ''
    },
    {
      docId: '4,494',
      step: 'PT',
      stepName: 'InvokeTrade',
      docType: 'DvPHeartTrade',
      linkId: 'n/a',
      period: 'CB standing facilities su...',
      startDate: '8/18/25, 5:11 PM',
      linkType: '',
      description: ''
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Document History (DocId: {docId})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DocId</TableHead>
                <TableHead>Step</TableHead>
                <TableHead>StepName</TableHead>
                <TableHead>DocType</TableHead>
                <TableHead>LinkId</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>StartDate</TableHead>
                <TableHead>LinkType</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentHistoryData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.docId}</TableCell>
                  <TableCell>{item.step}</TableCell>
                  <TableCell>{item.stepName}</TableCell>
                  <TableCell>{item.docType}</TableCell>
                  <TableCell>{item.linkId}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.period}</TableCell>
                  <TableCell>{item.startDate}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.linkType}</TableCell>
                  <TableCell>{item.description}</TableCell>
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