// Business Day Simulation Configuration

export interface SimulationConfig {
  rtgs: {
    transactionCounts: number[];
    currencies: {
      BHD: number[];
      USD: number[];
      EUR: number[];
      SAR: number[];
    };
  };
  csd: {
    transactionCounts: number[];
    settlementValues: number[];
    securities: {
      Government: number[];
      Corporate: number[];
      Sukuk: number[];
    };
  };
}

// RTGS Transaction counts per hour (cumulative)
export const RTGS_TRANSACTION_COUNTS = [
  5745, 10537, 16508, 23792, 28440, 33088, 40456, 46607, 50902, 56715,
  61019, 65320, 70682, 72812, 75224, 79380, 82860, 88331, 91968, 94849,
  102047, 106708, 111809, 114671, 118854, 124020, 127293, 132856, 136955, 141517,
  145614, 153392, 158371, 161784, 168017, 171185, 176498, 178558, 181565, 186860,
  192967, 198224, 203050, 207598, 210380, 214300, 218609, 225194, 230709, 233064,
  238550, 242972, 246956, 252873, 259419, 265815, 269556, 274092, 279588, 286051
];

// CSD Transaction counts per hour (typically lower than RTGS)
export const CSD_TRANSACTION_COUNTS = [
  2850, 5200, 8150, 11750, 14050, 16350, 19950, 23000, 25150, 28000,
  30150, 32250, 34900, 35950, 37150, 39200, 40900, 43650, 45400, 46850,
  50400, 52650, 55200, 56650, 58700, 61200, 62850, 65650, 67650, 69900,
  71900, 75800, 78250, 79850, 82950, 84550, 87150, 88200, 89650, 92300,
  95350, 97850, 100200, 102400, 103900, 105800, 107900, 111200, 113850, 115100,
  117650, 119850, 121850, 124850, 128050, 131200, 133100, 135300, 137950, 141200
];

// Currency distribution percentages for RTGS
export const RTGS_CURRENCY_DISTRIBUTION = {
  BHD: 0.65, // 65% Bahraini Dinar
  USD: 0.25, // 25% US Dollar
  EUR: 0.07, // 7% Euro
  SAR: 0.03  // 3% Saudi Riyal
};

// Securities distribution percentages for CSD
export const CSD_SECURITIES_DISTRIBUTION = {
  Government: 0.60, // 60% Government securities
  Corporate: 0.25,  // 25% Corporate bonds
  Sukuk: 0.15       // 15% Islamic securities
};

// Generate cumulative sums with normal distribution
export const generateCumulativePattern = (
  baseCounts: number[], 
  distributionFactor: number = 1,
  variance: number = 0.1
): number[] => {
  return baseCounts.map((baseCount, index) => {
    // Apply normal distribution variance
    const normalVariance = 1 + (Math.random() - 0.5) * variance * 2;
    return Math.round(baseCount * distributionFactor * normalVariance);
  });
};

// Get transaction count for specific hour
export const getTransactionCountForHour = (
  hour: number, 
  counts: number[], 
  isBusinessDay: boolean = true
): number => {
  if (!isBusinessDay || hour < 8 || hour > 17) {
    return 0;
  }
  
  const hourIndex = Math.min(Math.max(hour - 8, 0), counts.length - 1);
  const prevIndex = Math.max(hourIndex - 1, 0);
  
  // Return incremental count for this hour (not cumulative)
  return counts[hourIndex] - (hourIndex > 0 ? counts[prevIndex] : 0);
};

// Get current hour transaction progress based on minutes
export const getHourlyProgress = (
  hour: number, 
  minute: number, 
  counts: number[]
): number => {
  const hourlyCount = getTransactionCountForHour(hour, counts);
  const progress = minute / 60; // 0 to 1
  return Math.round(hourlyCount * progress);
};

export const simulationConfig: SimulationConfig = {
  rtgs: {
    transactionCounts: RTGS_TRANSACTION_COUNTS,
    currencies: {
      BHD: generateCumulativePattern(RTGS_TRANSACTION_COUNTS, RTGS_CURRENCY_DISTRIBUTION.BHD),
      USD: generateCumulativePattern(RTGS_TRANSACTION_COUNTS, RTGS_CURRENCY_DISTRIBUTION.USD),
      EUR: generateCumulativePattern(RTGS_TRANSACTION_COUNTS, RTGS_CURRENCY_DISTRIBUTION.EUR),
      SAR: generateCumulativePattern(RTGS_TRANSACTION_COUNTS, RTGS_CURRENCY_DISTRIBUTION.SAR)
    }
  },
  csd: {
    transactionCounts: CSD_TRANSACTION_COUNTS,
    settlementValues: generateCumulativePattern(CSD_TRANSACTION_COUNTS, 1500000), // Average 1.5M BHD per transaction
    securities: {
      Government: generateCumulativePattern(CSD_TRANSACTION_COUNTS, CSD_SECURITIES_DISTRIBUTION.Government),
      Corporate: generateCumulativePattern(CSD_TRANSACTION_COUNTS, CSD_SECURITIES_DISTRIBUTION.Corporate),
      Sukuk: generateCumulativePattern(CSD_TRANSACTION_COUNTS, CSD_SECURITIES_DISTRIBUTION.Sukuk)
    }
  }
};