// Currency Configuration for Central Bank Portal
// This file centralizes currency formatting and display

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  decimalPlaces: number;
  thousandsSeparator: string;
  decimalSeparator: string;
  position: 'before' | 'after'; // Symbol position relative to amount
}

export const CURRENCY_CONFIG: CurrencyConfig = {
  code: 'BHD',
  symbol: 'BHD',
  name: 'Bahraini Dinar',
  decimalPlaces: 3, // BHD typically uses 3 decimal places (fils)
  thousandsSeparator: ',',
  decimalSeparator: '.',
  position: 'before'
};

// Utility function to format currency amounts
export const formatCurrency = (
  amount: number | string, 
  options: {
    showDecimals?: boolean;
    compact?: boolean; // For showing M, B, K suffixes
    showSymbol?: boolean;
  } = {}
): string => {
  const {
    showDecimals = false,
    compact = false,
    showSymbol = true
  } = options;

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return showSymbol ? `${CURRENCY_CONFIG.symbol} 0` : '0';

  let formattedAmount: string;

  if (compact) {
    // Format with K, M, B suffixes
    if (Math.abs(numAmount) >= 1_000_000_000) {
      formattedAmount = (numAmount / 1_000_000_000).toFixed(1) + 'B';
    } else if (Math.abs(numAmount) >= 1_000_000) {
      formattedAmount = (numAmount / 1_000_000).toFixed(1) + 'M';
    } else if (Math.abs(numAmount) >= 1_000) {
      formattedAmount = (numAmount / 1_000).toFixed(1) + 'K';
    } else {
      formattedAmount = numAmount.toFixed(showDecimals ? CURRENCY_CONFIG.decimalPlaces : 0);
    }
  } else {
    // Standard formatting
    const decimals = showDecimals ? CURRENCY_CONFIG.decimalPlaces : 0;
    formattedAmount = numAmount.toLocaleString('en-BH', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  if (!showSymbol) return formattedAmount;

  return CURRENCY_CONFIG.position === 'before' 
    ? `${CURRENCY_CONFIG.symbol} ${formattedAmount}`
    : `${formattedAmount} ${CURRENCY_CONFIG.symbol}`;
};

// Helper function for quick currency formatting (most common use case)
export const currency = (amount: number | string, compact = false): string => {
  return formatCurrency(amount, { compact, showSymbol: true });
};

// Helper function for currency without symbol
export const currencyValue = (amount: number | string, compact = false): string => {
  return formatCurrency(amount, { compact, showSymbol: false });
};

export default CURRENCY_CONFIG;