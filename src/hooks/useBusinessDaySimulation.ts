import { useState, useEffect, useCallback } from 'react';

export interface RTGSMetrics {
  totalLiquidity: number;
  utilizationRate: number;
  queuedPayments: number;
  activeAlerts: number;
  cashLiquidity: number;
  pledgedCollateral: number;
  settledTransactions: number;
  averageTransactionValue: number;
}

export interface CSDMetrics {
  settlementValue: number;
  failedSettlements: number;
  corporateActions: number;
  pendingInstructions: number;
  custodyValue: number;
  newIssuances: number;
}

export interface LiquidityData {
  time: string;
  total: number;
  cash: number;
  collateral: number;
}

export interface PaymentFlowData {
  hour: string;
  settled: number;
  queued: number;
}

const getBusinessDayHour = () => {
  const now = new Date();
  return now.getHours();
};

const generateRTGSPattern = (hour: number, baseMetrics: RTGSMetrics): RTGSMetrics => {
  // Business day pattern: peak activity 10-14, lower activity early/late
  const activityMultiplier = hour >= 9 && hour <= 16 
    ? (hour >= 10 && hour <= 14 ? 1.2 + Math.random() * 0.3 : 0.8 + Math.random() * 0.4)
    : 0.4 + Math.random() * 0.3;

  const variation = () => 0.95 + Math.random() * 0.1; // ±5% variation

  return {
    totalLiquidity: Math.round(baseMetrics.totalLiquidity * activityMultiplier * variation()),
    utilizationRate: Math.min(95, Math.max(45, Math.round(baseMetrics.utilizationRate * activityMultiplier * variation()))),
    queuedPayments: Math.round(baseMetrics.queuedPayments * (2 - activityMultiplier) * variation()),
    activeAlerts: Math.max(0, Math.round(baseMetrics.activeAlerts * (hour >= 15 ? 1.5 : 1) * variation())),
    cashLiquidity: Math.round(baseMetrics.cashLiquidity * activityMultiplier * variation()),
    pledgedCollateral: Math.round(baseMetrics.pledgedCollateral * variation()),
    settledTransactions: Math.round(baseMetrics.settledTransactions * activityMultiplier * variation()),
    averageTransactionValue: Math.round(baseMetrics.averageTransactionValue * variation())
  };
};

const generateCSDPattern = (hour: number, baseMetrics: CSDMetrics): CSDMetrics => {
  const activityMultiplier = hour >= 9 && hour <= 17 
    ? (hour >= 11 && hour <= 15 ? 1.1 + Math.random() * 0.2 : 0.9 + Math.random() * 0.2)
    : 0.3 + Math.random() * 0.2;

  const variation = () => 0.9 + Math.random() * 0.2;

  return {
    settlementValue: Math.round(baseMetrics.settlementValue * activityMultiplier * variation()),
    failedSettlements: Math.max(0, Math.round(baseMetrics.failedSettlements * (2 - activityMultiplier) * variation())),
    corporateActions: Math.round(baseMetrics.corporateActions * variation()),
    pendingInstructions: Math.round(baseMetrics.pendingInstructions * (1.5 - activityMultiplier * 0.5) * variation()),
    custodyValue: Math.round(baseMetrics.custodyValue * (1 + (activityMultiplier - 1) * 0.5) * variation()),
    newIssuances: Math.round(baseMetrics.newIssuances * variation())
  };
};

const generateLiquidityTrend = (currentHour: number): LiquidityData[] => {
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  const baseTotal = 12500;
  const baseCollateral = 4000;
  
  return hours.map((time, index) => {
    const hourNum = 9 + index;
    const activityFactor = hourNum <= currentHour ? 
      (1 - (hourNum - 9) * 0.08 + Math.random() * 0.05) : 
      (1 - (hourNum - 9) * 0.08);
    
    const total = Math.round(baseTotal * activityFactor);
    const collateral = baseCollateral + Math.round(Math.random() * 200 - 100);
    
    return {
      time,
      total,
      cash: total - collateral,
      collateral
    };
  });
};

const generatePaymentFlow = (currentHour: number): PaymentFlowData[] => {
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
  
  return hours.map((hour, index) => {
    const hourNum = 9 + index;
    const isCurrentOrPast = hourNum <= currentHour;
    
    if (!isCurrentOrPast) {
      return { hour, settled: 0, queued: 0 };
    }
    
    const peakFactor = hourNum >= 10 && hourNum <= 14 ? 1.2 : 0.8;
    const settled = Math.round((2800 + Math.random() * 700) * peakFactor);
    const queued = Math.round((450 + Math.random() * 270) * (2 - peakFactor));
    
    return { hour, settled, queued };
  });
};

export const useBusinessDaySimulation = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const baseRTGSMetrics: RTGSMetrics = {
    totalLiquidity: 7500,
    utilizationRate: 68,
    queuedPayments: 47,
    activeAlerts: 3,
    cashLiquidity: 3500,
    pledgedCollateral: 4000,
    settledTransactions: 15642,
    averageTransactionValue: 2450000
  };

  const baseCSDMetrics: CSDMetrics = {
    settlementValue: 850000000,
    failedSettlements: 12,
    corporateActions: 8,
    pendingInstructions: 156,
    custodyValue: 2400000000,
    newIssuances: 3
  };

  const [rtgsMetrics, setRTGSMetrics] = useState<RTGSMetrics>(baseRTGSMetrics);
  const [csdMetrics, setCSDMetrics] = useState<CSDMetrics>(baseCSDMetrics);
  const [liquidityTrend, setLiquidityTrend] = useState<LiquidityData[]>([]);
  const [paymentFlow, setPaymentFlow] = useState<PaymentFlowData[]>([]);

  const updateSimulation = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    
    setCurrentTime(now);
    setRTGSMetrics(generateRTGSPattern(hour, baseRTGSMetrics));
    setCSDMetrics(generateCSDPattern(hour, baseCSDMetrics));
    setLiquidityTrend(generateLiquidityTrend(hour));
    setPaymentFlow(generatePaymentFlow(hour));
  }, []);

  useEffect(() => {
    // Initial load
    updateSimulation();
    
    // Update every 2 minutes (120000 ms)
    const interval = setInterval(updateSimulation, 120000);
    
    return () => clearInterval(interval);
  }, [updateSimulation]);

  return {
    currentTime,
    rtgsMetrics,
    csdMetrics,
    liquidityTrend,
    paymentFlow,
    lastUpdated: currentTime,
    isBusinessHours: currentTime.getHours() >= 8 && currentTime.getHours() <= 18
  };
};