import { useState, useEffect, useCallback } from 'react';

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
  // Convert hour.minute to decimal hour
  const decimalHour = hour + minute / 60;
  
  // Activity multiplier based on business day phases
  let activityMultiplier = 1;
  let processingTime = 0;
  let averageValue = 0;
  let delayShare = 0;
  
  if (decimalHour >= 7 && decimalHour < 8.5) {
    // Pre-opening phase - minimal transactions
    activityMultiplier = 0.05;
    processingTime = 0;
    averageValue = 0;
    delayShare = 0;
  } else if (decimalHour >= 8.5 && decimalHour < 12) {
    // Opening phase - start generating metrics
    activityMultiplier = 0.8 + Math.sin((decimalHour - 8.5) * Math.PI / 7) * 0.4;
    processingTime = normalRandom(2.3, 0.5); // Normal distribution around 2.3s
    averageValue = normalRandom(2400000, 300000); // Normal distribution around 2.4M BHD
    delayShare = normalRandom(0.02, 0.01); // Normal distribution around 0.02%
  } else if (decimalHour >= 12 && decimalHour < 14.5) {
    // Peak activity
    activityMultiplier = 1.2 + normalRandom(0, 0.15);
    processingTime = normalRandom(2.1, 0.4);
    averageValue = normalRandom(2600000, 400000);
    delayShare = normalRandom(0.025, 0.015);
  } else if (decimalHour >= 14.5 && decimalHour < 16.5) {
    // Afternoon
    activityMultiplier = 0.9 + normalRandom(0, 0.1);
    processingTime = normalRandom(2.4, 0.3);
    averageValue = normalRandom(2300000, 250000);
    delayShare = normalRandom(0.018, 0.008);
  } else if (decimalHour >= 16.5 && decimalHour < 17) {
    // End-of-day
    activityMultiplier = 0.5 + normalRandom(0, 0.15);
    processingTime = normalRandom(2.7, 0.6);
    averageValue = normalRandom(2100000, 300000);
    delayShare = normalRandom(0.035, 0.02);
  } else if (decimalHour >= 17 && decimalHour < 18) {
    // Post-closing
    activityMultiplier = 0.2 + normalRandom(0, 0.05);
    processingTime = normalRandom(3.1, 0.8);
    averageValue = normalRandom(1800000, 200000);
    delayShare = normalRandom(0.015, 0.01);
  } else {
    // Outside business hours
    activityMultiplier = 0.02;
    processingTime = 0;
    averageValue = 0;
    delayShare = 0;
  }

  // Different base transactions for RTGS vs CSD (RTGS typically higher volume)
  const baseRTGSTransactions = 18000;
  const totalTransactions = Math.max(0, Math.round(baseRTGSTransactions * activityMultiplier * normalRandom(1, 0.1)));
  
  // Settlement rate varies by time of day
  const settlementRate = Math.min(0.98, Math.max(0.85, 0.70 + (activityMultiplier * 0.25)));
  const settledTransactions = Math.round(totalTransactions * settlementRate);
  
  const rejectedTransactions = Math.round(totalTransactions * Math.max(0, normalRandom(0.025, 0.01)));
  const queuedTransactions = Math.round(totalTransactions * Math.max(0, (0.10 - activityMultiplier * 0.05)));
  const ilfTransactions = Math.round(totalTransactions * Math.max(0, normalRandom(0.05, 0.015)));

  const totalVolume = Math.round(settledTransactions * Math.max(0, averageValue));

  return {
    totalTransactions,
    settledTransactions,
    rejectedTransactions,
    queuedTransactions,
    ilfTransactions,
    totalVolume,
    averageTransactionValue: Math.max(0, Math.round(averageValue)),
    processingTime: Math.max(0, processingTime),
    delayShare: Math.max(0, delayShare)
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

export const useBusinessDayEmulation = (timeMultiplier: number = 11) => { // 11 minutes real time = 1 hour emulated (60 minutes)
  const [emulatedDay, setEmulatedDay] = useState<EmulatedBusinessDay>(() => {
    const now = new Date();
    // Start emulated day at 7:00 AM
    const emulatedStart = new Date();
    emulatedStart.setHours(7, 0, 0, 0);
    
    return {
      currentTime: now,
      emulatedTime: emulatedStart,
      currentPhase: 1,
      isRunning: true,
      timeMultiplier
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
    delayShare: 0
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
    return 6; // Default to last phase if outside range
  }, []);

  const updateEmulation = useCallback(() => {
    if (!emulatedDay.isRunning) return;

    setEmulatedDay(prev => {
      const now = new Date();
      const newEmulatedTime = new Date(prev.emulatedTime);
      
      // Add 1 emulated minute each update (every 5.45 seconds real time)
      newEmulatedTime.setMinutes(newEmulatedTime.getMinutes() + 1);
      
      // Reset to next day at 7:00 AM if we go past 18:00
      if (newEmulatedTime.getHours() >= 18) {
        newEmulatedTime.setHours(7, 0, 0, 0);
        newEmulatedTime.setDate(newEmulatedTime.getDate() + 1);
      }

      const currentPhase = getCurrentPhase(newEmulatedTime);

      return {
        ...prev,
        currentTime: now,
        emulatedTime: newEmulatedTime,
        currentPhase
      };
    });
  }, [emulatedDay.isRunning, timeMultiplier, getCurrentPhase]);

  const updateMetrics = useCallback(() => {
    const hour = emulatedDay.emulatedTime.getHours();
    const minute = emulatedDay.emulatedTime.getMinutes();
    
    setTransactionMetrics(generateTransactionPattern(hour, minute));
    setLiquidityMetrics(generateLiquidityPattern(hour, minute));
  }, [emulatedDay.emulatedTime]);

  useEffect(() => {
    if (!emulatedDay.isRunning) return;

    // Update every 5.45 seconds to complete full business day in 1 hour
    // 11 hours of business day / 60 minutes = 11 minutes per emulated hour
    // 60 seconds / 11 = ~5.45 seconds per emulated minute
    const interval = setInterval(() => {
      updateEmulation();
      updateMetrics();
    }, 5450); // ~5.45 seconds real time = 1 emulated minute

    return () => clearInterval(interval);
  }, [updateEmulation, updateMetrics, emulatedDay.isRunning]);

  const toggleSimulation = () => {
    setEmulatedDay(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const resetSimulation = () => {
    const emulatedStart = new Date();
    emulatedStart.setHours(7, 0, 0, 0);
    
    setEmulatedDay(prev => ({
      ...prev,
      emulatedTime: emulatedStart,
      currentPhase: 1,
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
      delayShare: 0
    });
    setLiquidityMetrics(generateLiquidityPattern(7, 0));
  };

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