import portalConfig from './portalConfig';

// Financial and operational data configuration
export const dataConfig = {
  // RTGS metrics and sample data
  rtgs: {
    defaultMetrics: {
      queuedPayments: 45,
      settledTransactions: 1250,
      totalLiquidity: 2500000000, // 2.5B BHD
      averageTransactionValue: 2000000, // 2M BHD
      systemUptime: 99.98,
      activeParticipants: 14
    },
    
    sampleTransactions: [
      {
        id: 'RT001',
        from: portalConfig.banks.commercial[0],
        to: portalConfig.banks.commercial[1],
        amount: 5000000,
        currency: portalConfig.currencies.primary,
        status: 'Settled',
        timestamp: new Date()
      },
      {
        id: 'RT002',
        from: portalConfig.banks.commercial[2],
        to: portalConfig.banks.commercial[3],
        amount: 2500000,
        currency: portalConfig.currencies.primary,
        status: 'Pending',
        timestamp: new Date()
      }
    ],

    accountTypes: ['Current', 'Reserve', 'Settlement', 'Collateral'],
    
    transactionTypes: ['Credit Transfer', 'Debit Transfer', 'Liquidity Transfer', 'Settlement']
  },

  // CSD metrics and sample data
  csd: {
    defaultMetrics: {
      settlementValue: 1500000000, // 1.5B BHD
      pendingInstructions: 125,
      corporateActions: 8,
      activeSecurities: 20500000,
      custodyValue: 45000000000, // 45B BHD
      dailyTrades: 1500
    },

    securityTypes: [
      'Government Bonds',
      'Corporate Bonds',
      'Equities',
      'ETFs',
      'Islamic Sukuk',
      'Money Market Bills'
    ],

    sampleSecurities: [
      {
        isin: 'BH0001234567',
        name: 'Bahrain Government Bond 2024',
        type: 'Government Bond',
        issuer: portalConfig.banks.central,
        maturityDate: '2024-12-31',
        outstandingAmount: 100000000
      },
      {
        isin: 'BH0007654321',
        name: 'NBB Corporate Bond 2025',
        type: 'Corporate Bond',
        issuer: portalConfig.banks.commercial[0],
        maturityDate: '2025-06-30',
        outstandingAmount: 50000000
      }
    ]
  },

  // CMS metrics and sample data
  cms: {
    defaultMetrics: {
      totalCollateral: 8500000000, // 8.5B BHD
      marginRequirements: 125000000, // 125M BHD
      collateralUtilization: 78.5,
      activeAgreements: 45,
      riskExposure: 2.5
    },

    collateralTypes: [
      'Government Securities',
      'Corporate Bonds',
      'Bank Guarantees',
      'Cash Deposits',
      'Islamic Sukuk'
    ]
  },

  // System status data
  systemStatus: {
    rtgs: [
      { name: 'RTGS System', status: 'operational' },
      { name: 'Settlement Engine', status: 'operational' },
      { name: 'Queue Manager', status: 'warning' },
      { name: 'Liquidity Manager', status: 'operational' }
    ],
    
    csd: [
      { name: 'CSD Core', status: 'operational' },
      { name: 'Settlement System', status: 'operational' },
      { name: 'Corporate Actions', status: 'operational' },
      { name: 'Trade Repository', status: 'operational' }
    ],

    cms: [
      { name: 'Collateral Management', status: 'operational' },
      { name: 'Risk Engine', status: 'warning' },
      { name: 'Valuation Service', status: 'operational' },
      { name: 'Margin Calculator', status: 'operational' }
    ]
  },

  // Quick actions configuration
  quickActions: {
    rtgs: [
      { label: 'Process Payment', action: 'rtgs.payment.create', icon: 'CreditCard' },
      { label: 'Check Balance', action: 'rtgs.balance.check', icon: 'DollarSign' },
      { label: 'Generate Report', action: 'rtgs.report.generate', icon: 'FileText' },
      { label: 'Monitor Queue', action: 'rtgs.queue.monitor', icon: 'Clock' }
    ],
    
    csd: [
      { label: 'New Settlement', action: 'csd.settlement.create', icon: 'RefreshCw' },
      { label: 'Corporate Action', action: 'csd.corporate.create', icon: 'Building' },
      { label: 'Trade Inquiry', action: 'csd.trade.search', icon: 'Search' },
      { label: 'Position Report', action: 'csd.position.report', icon: 'BarChart3' }
    ],

    cms: [
      { label: 'Collateral Check', action: 'cms.collateral.check', icon: 'Shield' },
      { label: 'Risk Assessment', action: 'cms.risk.assess', icon: 'AlertTriangle' },
      { label: 'Margin Call', action: 'cms.margin.call', icon: 'Bell' },
      { label: 'Optimize Portfolio', action: 'cms.optimize.portfolio', icon: 'TrendingUp' }
    ]
  },

  // Format configuration for display
  formatting: {
    currency: (amount: number, currency: string = portalConfig.currencies.primary) => {
      return `${currency} ${amount.toLocaleString('en-BH', {
        minimumFractionDigits: portalConfig.currencies.formatting.precision,
        maximumFractionDigits: portalConfig.currencies.formatting.precision
      })}`;
    },

    percentage: (value: number) => {
      return `${value.toFixed(2)}%`;
    },

    largeNumber: (value: number) => {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)}B`;
      } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toLocaleString();
    }
  }
};

export default dataConfig;