import { useState, useEffect, useCallback } from 'react';
import { 
  simulationConfig, 
  getTransactionCountForHour, 
  getHourlyProgress,
  RTGS_TRANSACTION_COUNTS,
  CSD_TRANSACTION_COUNTS 
} from '../config/simulationConfig';

export interface EmulatedBusinessDay {
  currentTime: Date;
  emulatedTime: Date;
  currentPhase: number;
  isRunning: boolean;
  timeMultiplier: number; // How many real minutes = 1 emulated hour
}

export interface TransactionMetrics {
  totalTransactions: number;
  settledTransactions: number;
  rejectedTransactions: number;
  queuedTransactions: number;
  ilfTransactions: number;
  totalVolume: number;
  averageTransactionValue: number;
  processingTime: number;
  delayShare: number;
  cumulativeTransactions: number;
  hourlyTransactions: number;
  currencyBreakdown: {
    BHD: number;
    USD: number;
    EUR: number;
    SAR: number;
  };
}

export interface CSDMetrics {
  totalTransactions: number;
  settledTransactions: number;
  failedSettlements: number;
  pendingInstructions: number;
  settlementValue: number;
  cumulativeTransactions: number;
  hourlyTransactions: number;
  securitiesBreakdown: {
    Government: number;
    Corporate: number;
    Sukuk: number;
  };
}

export interface LiquidityMetrics {
  totalLiquidity: number;
  availableLiquidity: number;
  utilizationRate: number;
  cashLiquidity: number;
  pledgedCollateral: number;
  intraday_credit: number;
}

export interface BusinessPhase {
  id: number;
  name: string;
  startHour: number;
  endHour: number;
  description: string;
  activities: string[];
}

const BUSINESS_PHASES: BusinessPhase[] = [
  {
    id: 1,
    name: 'Pre-Opening Phase',
    startHour: 7,
    endHour: 8.5,
    description: 'System Preparation & Liquidity Setup',
    activities: [
      'System health checks',
      'Batch processing completion check',
      'Liquidity provision',
      'Initial reports'
    ]
  },
  {
    id: 2,
    name: 'Opening & Morning Session',
    startHour: 8.5,
    endHour: 12,
    description: 'High-value payments and liquidity management',
    activities: [
      'System officially opens',
      'High-value and urgent payments processed',
      'Liquidity management',
      'Settlement monitoring'
    ]
  },
  {
    id: 3,
    name: 'Midday Settlement Peaks',
    startHour: 12,
    endHour: 14.5,
    description: 'Bulk settlements and peak activity',
    activities: [
      'Bulk settlements',
      'Securities settlement obligations',
      'FX settlement obligations',
      'Liquidity reshuffling'
    ]
  },
  {
    id: 4,
    name: 'Afternoon Adjustments',
    startHour: 14.5,
    endHour: 16.5,
    description: 'Final settlements and adjustments',
    activities: [
      'Final settlement for SSS/CCP positions',
      'Customer and interbank transfers',
      'Liquidity returns',
      'Critical payments processing'
    ]
  },
  {
    id: 5,
    name: 'Cut-Off & End-of-Day Processing',
    startHour: 16.5,
    endHour: 17,
    description: 'End-of-day procedures',
    activities: [
      'Cut-off for customer payments',
      'Final gridlock resolution',
      'Closing of intraday credit lines',
      'Daily summary reports'
    ]
  },
  {
    id: 6,
    name: 'Post-Closing',
    startHour: 17,
    endHour: 18,
    description: 'System reconciliation and preparation',
    activities: [
      'System reconciliation',
      'Backup of transaction data',
      'Preparation for overnight processes',
      'EOD statements availability'
    ]
  }
];

const generateTransactionPattern = (hour: number, minute: number): TransactionMetrics => {
  const isBusinessHours = hour >= 8 && hour <= 17;
  
  // Get cumulative and hourly transaction counts from configuration
  const cumulativeTransactions = isBusinessHours ? 
    RTGS_TRANSACTION_COUNTS[Math.min(hour - 8, RTGS_TRANSACTION_COUNTS.length - 1)] : 0;
  const hourlyTransactions = isBusinessHours ? 
    getTransactionCountForHour(hour, RTGS_TRANSACTION_COUNTS) : 0;
  const progressTransactions = isBusinessHours ? 
    getHourlyProgress(hour, minute, RTGS_TRANSACTION_COUNTS) : 0;
  
  const totalTransactions = cumulativeTransactions + progressTransactions;
  
  // Generate processing metrics only during opening phase
  let processingTime = 0;
  let averageValue = 0;
  let delayShare = 0;
  
  if (hour >= 8 && hour <= 17) {
    processingTime = normalRandom(2.3, 0.5);
    averageValue = normalRandom(2400000, 300000);
    delayShare = normalRandom(0.02, 0.01);
  }
  
  // Settlement rates
  const settlementRate = isBusinessHours ? 0.95 + normalRandom(0, 0.03) : 0;
  const settledTransactions = Math.round(totalTransactions * settlementRate);
  const rejectedTransactions = Math.round(totalTransactions * normalRandom(0.02, 0.01));
  const queuedTransactions = Math.round(totalTransactions * normalRandom(0.08, 0.02));
  const ilfTransactions = Math.round(totalTransactions * normalRandom(0.05, 0.015));
  
  const totalVolume = Math.round(settledTransactions * Math.max(0, averageValue));
  
  // Currency breakdown based on configuration
  const currencyBreakdown = {
    BHD: Math.round(totalTransactions * 0.65),
    USD: Math.round(totalTransactions * 0.25),
    EUR: Math.round(totalTransactions * 0.07),
    SAR: Math.round(totalTransactions * 0.03)
  };

  return {
    totalTransactions,
    settledTransactions,
    rejectedTransactions,
    queuedTransactions,
    ilfTransactions,
    totalVolume,
    averageTransactionValue: Math.max(0, Math.round(averageValue)),
    processingTime: Math.max(0, processingTime),
    delayShare: Math.max(0, delayShare),
    cumulativeTransactions,
    hourlyTransactions: hourlyTransactions + progressTransactions,
    currencyBreakdown
  };
};

const generateCSDPattern = (hour: number, minute: number): CSDMetrics => {
  const isBusinessHours = hour >= 9 && hour <= 17;
  
  // Get cumulative and hourly transaction counts from configuration
  const cumulativeTransactions = isBusinessHours ? 
    CSD_TRANSACTION_COUNTS[Math.min(hour - 9, CSD_TRANSACTION_COUNTS.length - 1)] : 0;
  const hourlyTransactions = isBusinessHours ? 
    getTransactionCountForHour(hour, CSD_TRANSACTION_COUNTS) : 0;
  const progressTransactions = isBusinessHours ? 
    getHourlyProgress(hour, minute, CSD_TRANSACTION_COUNTS) : 0;
  
  const totalTransactions = cumulativeTransactions + progressTransactions;
  
  // Settlement metrics
  const settlementRate = isBusinessHours ? 0.92 + normalRandom(0, 0.05) : 0;
  const settledTransactions = Math.round(totalTransactions * settlementRate);
  const failedSettlements = Math.round(totalTransactions * normalRandom(0.03, 0.01));
  const pendingInstructions = Math.round(totalTransactions * normalRandom(0.05, 0.02));
  
  const averageSettlementValue = 1500000; // 1.5M BHD average
  const settlementValue = Math.round(settledTransactions * averageSettlementValue);
  
  // Securities breakdown
  const securitiesBreakdown = {
    Government: Math.round(totalTransactions * 0.60),
    Corporate: Math.round(totalTransactions * 0.25),
    Sukuk: Math.round(totalTransactions * 0.15)
  };

  return {
    totalTransactions,
    settledTransactions,
    failedSettlements,
    pendingInstructions,
    settlementValue,
    cumulativeTransactions,
    hourlyTransactions: hourlyTransactions + progressTransactions,
    securitiesBreakdown
  };
};

const generateLiquidityPattern = (hour: number, minute: number): LiquidityMetrics => {
  const decimalHour = hour + minute / 60;
  
  // Liquidity consumption pattern
  let utilizationRate = 45;
  if (decimalHour >= 8.5 && decimalHour < 17) {
    utilizationRate = 55 + Math.sin((decimalHour - 8.5) * Math.PI / 8.5) * 20;
  }
  
  const baseLiquidity = 12500000000; // 12.5B
  const totalLiquidity = baseLiquidity + Math.random() * 500000000;
  const availableLiquidity = totalLiquidity * (1 - utilizationRate / 100);
  
  const cashLiquidity = availableLiquidity * 0.6;
  const pledgedCollateral = totalLiquidity * 0.3;
  const intraday_credit = totalLiquidity * 0.1;

  return {
    totalLiquidity: Math.round(totalLiquidity),
    availableLiquidity: Math.round(availableLiquidity),
    utilizationRate: Math.round(utilizationRate * 10) / 10,
    cashLiquidity: Math.round(cashLiquidity),
    pledgedCollateral: Math.round(pledgedCollateral),
    intraday_credit: Math.round(intraday_credit)
  };
};

// Normal distribution helper function
const normalRandom = (mean: number, stdDev: number) => {
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + stdDev * z;
};

export const useBusinessDayEmulation = () => {
  const [emulatedDay, setEmulatedDay] = useState<EmulatedBusinessDay>(() => {
    const now = new Date();
    
    return {
      currentTime: now,
      emulatedTime: now, // Sync directly with current local time
      currentPhase: 1,
      isRunning: true,
      timeMultiplier: 1 // Real time progression
    };
  });

  const [transactionMetrics, setTransactionMetrics] = useState<TransactionMetrics>(() => ({
    totalTransactions: 0,
    settledTransactions: 0,
    rejectedTransactions: 0,
    queuedTransactions: 0,
    ilfTransactions: 0,
    totalVolume: 0,
    averageTransactionValue: 0,
    processingTime: 0,
    delayShare: 0,
    cumulativeTransactions: 0,
    hourlyTransactions: 0,
    currencyBreakdown: { BHD: 0, USD: 0, EUR: 0, SAR: 0 }
  }));
  
  const [csdMetrics, setCSDMetrics] = useState<CSDMetrics>(() => ({
    totalTransactions: 0,
    settledTransactions: 0,
    failedSettlements: 0,
    pendingInstructions: 0,
    settlementValue: 0,
    cumulativeTransactions: 0,
    hourlyTransactions: 0,
    securitiesBreakdown: { Government: 0, Corporate: 0, Sukuk: 0 }
  }));
  
  const [liquidityMetrics, setLiquidityMetrics] = useState<LiquidityMetrics>(() => 
    generateLiquidityPattern(7, 0)
  );

  const getCurrentPhase = useCallback((emulatedTime: Date): number => {
    const hour = emulatedTime.getHours() + emulatedTime.getMinutes() / 60;
    
    for (const phase of BUSINESS_PHASES) {
      if (hour >= phase.startHour && hour < phase.endHour) {
        return phase.id;
      }
    }
    
    // Handle times outside business hours
    if (hour < 7) return 1; // Before business day starts
    if (hour >= 18) return 6; // After business day ends
    return 1; // Default fallback
  }, []);

  const updateEmulation = useCallback(() => {
    if (!emulatedDay.isRunning) return;

    setEmulatedDay(prev => {
      const now = new Date();
      // Always sync with current local time
      const currentPhase = getCurrentPhase(now);

      return {
        ...prev,
        currentTime: now,
        emulatedTime: now, // Keep synced with real time
        currentPhase
      };
    });
  }, [emulatedDay.isRunning, getCurrentPhase]);

  const updateMetrics = useCallback(() => {
    // Use current real time for metrics calculation
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    setTransactionMetrics(generateTransactionPattern(hour, minute));
    setCSDMetrics(generateCSDPattern(hour, minute));
    setLiquidityMetrics(generateLiquidityPattern(hour, minute));
  }, []);

  useEffect(() => {
    // Initial metrics calculation on mount
    updateMetrics();
    
    if (!emulatedDay.isRunning) return;

    // Update every 30 seconds for real-time updates
    const interval = setInterval(() => {
      updateEmulation();
      updateMetrics();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [updateEmulation, updateMetrics, emulatedDay.isRunning]);

  const toggleSimulation = () => {
    setEmulatedDay(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetSimulation = () => {
    const now = new Date();
    
    setEmulatedDay(prev => ({
      ...prev,
      emulatedTime: now, // Reset to current time
      currentPhase: getCurrentPhase(now),
      isRunning: false
    }));
    
    setTransactionMetrics({
      totalTransactions: 0,
      settledTransactions: 0,
      rejectedTransactions: 0,
      queuedTransactions: 0,
      ilfTransactions: 0,
      totalVolume: 0,
      averageTransactionValue: 0,
      processingTime: 0,
      delayShare: 0,
      cumulativeTransactions: 0,
      hourlyTransactions: 0,
      currencyBreakdown: { BHD: 0, USD: 0, EUR: 0, SAR: 0 }
    });
    setCSDMetrics({
      totalTransactions: 0,
      settledTransactions: 0,
      failedSettlements: 0,
      pendingInstructions: 0,
      settlementValue: 0,
      cumulativeTransactions: 0,
      hourlyTransactions: 0,
      securitiesBreakdown: { Government: 0, Corporate: 0, Sukuk: 0 }
    });
    setLiquidityMetrics(generateLiquidityPattern(now.getHours(), now.getMinutes()));
  };

  // Initial phase calculation on mount
  useEffect(() => {
    const now = new Date();
    const initialPhase = getCurrentPhase(now);
    setEmulatedDay(prev => ({
      ...prev,
      currentPhase: initialPhase
    }));
  }, [getCurrentPhase]);

  const setTimeMultiplier = (multiplier: number) => {
    setEmulatedDay(prev => ({
      ...prev,
      timeMultiplier: multiplier
    }));
  };

  const currentPhaseData = BUSINESS_PHASES.find(p => p.id === emulatedDay.currentPhase) || BUSINESS_PHASES[0];

  return {
    emulatedDay,
    transactionMetrics,
    csdMetrics,
    liquidityMetrics,
    currentPhaseData,
    businessPhases: BUSINESS_PHASES,
    toggleSimulation,
    resetSimulation,
    setTimeMultiplier,
    formatEmulatedTime: (time: Date) => {
      return time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    },
    getPhaseProgress: () => {
      const hour = emulatedDay.emulatedTime.getHours() + emulatedDay.emulatedTime.getMinutes() / 60;
      const phase = currentPhaseData;
      const progress = Math.min(100, Math.max(0, 
        ((hour - phase.startHour) / (phase.endHour - phase.startHour)) * 100
      ));
      return Math.round(progress);
    }
  };
};