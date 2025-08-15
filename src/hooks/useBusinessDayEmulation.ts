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
  if (decimalHour >= 7 && decimalHour < 8.5) {
    activityMultiplier = 0.3; // Pre-opening
  } else if (decimalHour >= 8.5 && decimalHour < 12) {
    activityMultiplier = 0.8 + Math.sin((decimalHour - 8.5) * Math.PI / 7) * 0.4; // Morning ramp-up
  } else if (decimalHour >= 12 && decimalHour < 14.5) {
    activityMultiplier = 1.2 + Math.random() * 0.3; // Peak activity
  } else if (decimalHour >= 14.5 && decimalHour < 16.5) {
    activityMultiplier = 0.9 + Math.random() * 0.2; // Afternoon
  } else if (decimalHour >= 16.5 && decimalHour < 17) {
    activityMultiplier = 0.5 + Math.random() * 0.3; // End-of-day
  } else if (decimalHour >= 17 && decimalHour < 18) {
    activityMultiplier = 0.2 + Math.random() * 0.1; // Post-closing
  } else {
    activityMultiplier = 0.1; // Outside business hours
  }

  const variation = () => 0.9 + Math.random() * 0.2; // ±10% variation

  const baseTransactions = 15000;
  const totalTransactions = Math.round(baseTransactions * activityMultiplier * variation());
  
  // Settlement rate varies by time of day
  const settlementRate = Math.min(0.95, 0.70 + (activityMultiplier * 0.25));
  const settledTransactions = Math.round(totalTransactions * settlementRate);
  
  const rejectedTransactions = Math.round(totalTransactions * (0.02 + Math.random() * 0.03));
  const queuedTransactions = Math.round(totalTransactions * (0.10 - activityMultiplier * 0.05));
  const ilfTransactions = Math.round(totalTransactions * (0.05 + Math.random() * 0.02));

  const averageValue = 2400000 + Math.random() * 500000;
  const totalVolume = Math.round(settledTransactions * averageValue);

  return {
    totalTransactions,
    settledTransactions,
    rejectedTransactions,
    queuedTransactions,
    ilfTransactions,
    totalVolume,
    averageTransactionValue: Math.round(averageValue)
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

export const useBusinessDayEmulation = (timeMultiplier: number = 1) => {
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

  const [transactionMetrics, setTransactionMetrics] = useState<TransactionMetrics>(() => 
    generateTransactionPattern(7, 0)
  );
  
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
      
      // Add time based on multiplier (1 real minute = timeMultiplier emulated minutes)
      newEmulatedTime.setMinutes(newEmulatedTime.getMinutes() + timeMultiplier);
      
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

    // Update every minute in real time
    const interval = setInterval(() => {
      updateEmulation();
      updateMetrics();
    }, 60000); // 1 minute real time

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
    
    setTransactionMetrics(generateTransactionPattern(7, 0));
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