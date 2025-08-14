import portalConfig from '@/config/portalConfig';
import dataConfig from '@/config/dataConfig';

// Currency formatting utilities
export const formatCurrency = (
  amount: number, 
  currency: string = portalConfig.currencies.primary,
  options?: {
    showSymbol?: boolean;
    precision?: number;
    abbreviated?: boolean;
  }
): string => {
  const {
    showSymbol = true,
    precision = portalConfig.currencies.formatting.precision,
    abbreviated = false
  } = options || {};

  if (abbreviated) {
    return dataConfig.formatting.largeNumber(amount) + (showSymbol ? ` ${currency}` : '');
  }

  const formatted = amount.toLocaleString('en-BH', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });

  return showSymbol ? `${currency} ${formatted}` : formatted;
};

// Percentage formatting
export const formatPercentage = (
  value: number, 
  precision: number = 2
): string => {
  return `${value.toFixed(precision)}%`;
};

// Number formatting with abbreviations
export const formatNumber = (
  value: number,
  options?: {
    abbreviated?: boolean;
    precision?: number;
  }
): string => {
  const { abbreviated = false, precision = 0 } = options || {};

  if (abbreviated) {
    return dataConfig.formatting.largeNumber(value);
  }

  return value.toLocaleString('en-BH', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  });
};

// Date formatting utilities
export const formatDate = (
  date: Date | string,
  format: 'short' | 'medium' | 'long' | 'time' = 'medium'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-BH');
    case 'medium':
      return dateObj.toLocaleDateString('en-BH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    case 'long':
      return dateObj.toLocaleDateString('en-BH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    case 'time':
      return dateObj.toLocaleTimeString('en-BH', {
        hour: '2-digit',
        minute: '2-digit'
      });
    default:
      return dateObj.toLocaleDateString('en-BH');
  }
};

// Status formatting
export const formatStatus = (status: string): {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  color: string;
} => {
  const statusMap: Record<string, any> = {
    'operational': {
      label: 'Operational',
      variant: 'default',
      color: 'text-green-600'
    },
    'warning': {
      label: 'Warning',
      variant: 'secondary',
      color: 'text-yellow-600'
    },
    'error': {
      label: 'Error',
      variant: 'destructive',
      color: 'text-red-600'
    },
    'maintenance': {
      label: 'Maintenance',
      variant: 'outline',
      color: 'text-blue-600'
    },
    'settled': {
      label: 'Settled',
      variant: 'default',
      color: 'text-green-600'
    },
    'pending': {
      label: 'Pending',
      variant: 'secondary',
      color: 'text-yellow-600'
    },
    'failed': {
      label: 'Failed',
      variant: 'destructive',
      color: 'text-red-600'
    },
    'cancelled': {
      label: 'Cancelled',
      variant: 'outline',
      color: 'text-gray-600'
    }
  };

  return statusMap[status.toLowerCase()] || {
    label: status,
    variant: 'outline',
    color: 'text-gray-600'
  };
};

// Bank name formatting
export const formatBankName = (bankCode: string): string => {
  const bankName = Object.entries(portalConfig.banks.codes)
    .find(([_, code]) => code === bankCode)?.[0];
  
  return bankName || bankCode;
};

// Account number formatting
export const formatAccountNumber = (accountNumber: string): string => {
  // Format account number with dashes for readability
  if (accountNumber.length >= 8) {
    return accountNumber.replace(/(\d{4})(\d{4})(\d*)/, '$1-$2-$3');
  }
  return accountNumber;
};

// Transaction ID formatting
export const formatTransactionId = (transactionId: string): string => {
  return transactionId.toUpperCase();
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

// Time duration formatting
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

// Export all formatters
export const formatters = {
  currency: formatCurrency,
  percentage: formatPercentage,
  number: formatNumber,
  date: formatDate,
  status: formatStatus,
  bankName: formatBankName,
  accountNumber: formatAccountNumber,
  transactionId: formatTransactionId,
  fileSize: formatFileSize,
  duration: formatDuration
};

export default formatters;