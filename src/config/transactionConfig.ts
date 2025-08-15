import portalConfig from './portalConfig';

export interface TransactionData {
  id: string;
  participantId: string;
  participantName: string;
  amount: number;
  currency: string;
  status: 'Settled' | 'Rejected' | 'In Queue' | 'ILF/BUYBACK';
  timestamp: Date;
  type: string;
  reference: string;
}

export const transactionStatuses = {
  settled: 'Settled',
  rejected: 'Rejected', 
  queue: 'In Queue',
  ilf: 'ILF/BUYBACK'
} as const;

// Generate sample transaction data
export const generateTransactionData = (): TransactionData[] => {
  const banks = portalConfig.banks.commercial;
  const statuses = Object.values(transactionStatuses);
  const types = ['Credit Transfer', 'Debit Transfer', 'Liquidity Transfer', 'Settlement Transfer'];
  
  const transactions: TransactionData[] = [];
  
  // Generate 150 transactions with different statuses
  for (let i = 1; i <= 150; i++) {
    const bank = banks[Math.floor(Math.random() * banks.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.floor(Math.random() * 10000000) + 100000; // 100K to 10M
    
    transactions.push({
      id: `TXN${String(i).padStart(6, '0')}`,
      participantId: `${bank.substring(0, 3).toUpperCase()}${String(i).padStart(3, '0')}`,
      participantName: bank,
      amount,
      currency: portalConfig.currencies.primary,
      status: status as TransactionData['status'],
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Last 24 hours
      type: types[Math.floor(Math.random() * types.length)],
      reference: `REF${String(i).padStart(8, '0')}`
    });
  }
  
  return transactions;
};

// Transaction statistics calculation
export const getTransactionStats = (transactions: TransactionData[]) => {
  const stats = {
    total: { count: 0, volume: 0 },
    settled: { count: 0, volume: 0 },
    rejected: { count: 0, volume: 0 },
    queue: { count: 0, volume: 0 },
    ilf: { count: 0, volume: 0 }
  };
  
  transactions.forEach(txn => {
    stats.total.count += 1;
    stats.total.volume += txn.amount;
    
    switch (txn.status) {
      case 'Settled':
        stats.settled.count += 1;
        stats.settled.volume += txn.amount;
        break;
      case 'Rejected':
        stats.rejected.count += 1;
        stats.rejected.volume += txn.amount;
        break;
      case 'In Queue':
        stats.queue.count += 1;
        stats.queue.volume += txn.amount;
        break;
      case 'ILF/BUYBACK':
        stats.ilf.count += 1;
        stats.ilf.volume += txn.amount;
        break;
    }
  });
  
  return stats;
};

export const transactionTableColumns = [
  { key: 'id', label: 'Transaction ID', sortable: true },
  { key: 'participantName', label: 'Participant', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true, type: 'currency' as const },
  { key: 'currency', label: 'Currency', sortable: true },
  { key: 'status', label: 'Status', sortable: true, type: 'status' as const },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'timestamp', label: 'Timestamp', sortable: true, type: 'date' as const },
  { key: 'reference', label: 'Reference', sortable: true }
];