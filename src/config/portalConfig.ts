// Central configuration for the entire portal
export const portalConfig = {
  // Application metadata
  app: {
    name: 'Central Bank Unified Portal',
    version: '2.0.0',
    description: 'Unified portal for RTGS, CSD, and CMS operations'
  },

  // Supported currencies and symbols
  currencies: {
    primary: 'BHD',
    symbol: 'BHD',
    formatting: {
      thousands: ',',
      decimal: '.',
      precision: 2
    },
    supported: ['BHD', 'USD', 'EUR']
  },

  // Bank names and identifiers for Bahrain
  banks: {
    commercial: [
      'National Bank of Bahrain',
      'Ahli United Bank',
      'Arab Banking Corporation',
      'Bahrain Islamic Bank',
      'Bank of Bahrain and Kuwait',
      'HSBC Bank Middle East Limited',
      'Standard Chartered Bank',
      'Citibank N.A.',
      'Future Bank',
      'Al Salam Bank',
      'Ithmaar Bank',
      'Khaleeji Commercial Bank',
      'United Bank Limited',
      'Al Baraka Banking Group'
    ],
    central: 'Central Bank of Bahrain',
    codes: {
      'National Bank of Bahrain': 'NBB',
      'Ahli United Bank': 'AUB',
      'Arab Banking Corporation': 'ABC',
      'Bahrain Islamic Bank': 'BISB',
      'Bank of Bahrain and Kuwait': 'BBK',
      'HSBC Bank Middle East Limited': 'HSBC',
      'Standard Chartered Bank': 'SCB',
      'Citibank N.A.': 'CITI',
      'Future Bank': 'FB',
      'Al Salam Bank': 'ASB',
      'Ithmaar Bank': 'IB',
      'Khaleeji Commercial Bank': 'KCB',
      'United Bank Limited': 'UBL',
      'Al Baraka Banking Group': 'ABG'
    }
  },

  // Role-based access control
  roles: {
    Admin: {
      permissions: ['*'], // Full access
      label: 'Administrator',
      color: 'red'
    },
    Issuer: {
      permissions: ['securities.*', 'issuance.*', 'corporate-actions.*'],
      label: 'Issuer',
      color: 'blue'
    },
    Custodian: {
      permissions: ['custody.*', 'settlement.*', 'securities.view'],
      label: 'Custodian',
      color: 'green'
    },
    Broker: {
      permissions: ['trading.*', 'orders.*', 'settlement.view'],
      label: 'Broker/Dealer',
      color: 'purple'
    },
    Participant: {
      permissions: ['rtgs.view', 'liquidity.view', 'reporting.view'],
      label: 'Participant',
      color: 'yellow'
    },
    Regulator: {
      permissions: ['reporting.*', 'monitoring.*', 'audit.*'],
      label: 'Regulator',
      color: 'gray'
    }
  },

  // System configuration
  systems: {
    rtgs: {
      name: 'Real-Time Gross Settlement',
      code: 'RTGS',
      color: 'blue',
      icon: 'Banknote'
    },
    csd: {
      name: 'Central Securities Depository',
      code: 'CSD',
      color: 'green',
      icon: 'Building2'
    },
    cms: {
      name: 'Collateral Management System',
      code: 'CMS',
      color: 'purple',
      icon: 'Shield'
    }
  },

  // Business hours and operational settings
  operations: {
    businessHours: {
      start: '08:00',
      end: '17:00',
      timezone: 'Asia/Bahrain'
    },
    cutoffTimes: {
      rtgs: '16:30',
      settlement: '15:00',
      corporateActions: '12:00'
    },
    refreshInterval: 30000 // 30 seconds
  }
};

export default portalConfig;