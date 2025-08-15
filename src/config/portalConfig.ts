// Central Bank Portal Configuration
// This file contains all portal-wide settings, data, and configurations

export const portalConfig = {
  // Application metadata
  app: {
    name: 'Central Bank Unified Portal',
    version: '2.0.0',
    description: 'Unified portal for RTGS, CSD, and CMS operations',
    logo: '/cbb-logo-official.png'
  },

  // Supported currencies and symbols
  currencies: {
    primary: 'BHD',
    symbol: 'BD',
    formatting: {
      thousands: ',',
      decimal: '.',
      precision: 3
    },
    supported: ['BHD', 'USD', 'EUR', 'SAR', 'KWD', 'QAR', 'AED']
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
      label: 'System Administrator',
      color: 'destructive',
      allowedSystems: ['RTGS', 'CSD', 'CMS']
    },
    CBBOperator: {
      permissions: [
        'rtgs.*',
        'csd.*', 
        'cms.*',
        'reports.*',
        'monitoring.*'
      ],
      label: 'CBB Operator',
      color: 'primary',
      allowedSystems: ['RTGS', 'CSD', 'CMS']
    },
    BankOperator: {
      permissions: [
        'rtgs.transactions',
        'rtgs.accounts',
        'csd.trading',
        'csd.settlement',
        'cms.collateral',
        'reports.basic'
      ],
      label: 'Bank Operator',
      color: 'secondary',
      allowedSystems: ['RTGS', 'CSD', 'CMS']
    },
    Broker: {
      permissions: [
        'csd.trading',
        'csd.settlement',
        'reports.trading'
      ],
      label: 'Broker/Dealer',
      color: 'accent',
      allowedSystems: ['CSD']
    },
    Custodian: {
      permissions: [
        'csd.custody',
        'csd.settlement',
        'cms.collateral',
        'reports.custody'
      ],
      label: 'Custodian',
      color: 'outline',
      allowedSystems: ['CSD', 'CMS']
    },
    Auditor: {
      permissions: [
        'reports.*',
        'monitoring.view',
        'audit.*'
      ],
      label: 'Auditor',
      color: 'muted',
      allowedSystems: ['RTGS', 'CSD', 'CMS']
    }
  },

  // System configuration
  systems: {
    RTGS: {
      name: 'Real-Time Gross Settlement',
      code: 'RTGS',
      description: 'High-value payment system',
      color: 'blue',
      icon: 'Banknote'
    },
    CSD: {
      name: 'Central Securities Depository',
      code: 'CSD', 
      description: 'Securities settlement and custody',
      color: 'green',
      icon: 'Building2'
    },
    CMS: {
      name: 'Collateral Management System',
      code: 'CMS',
      description: 'Collateral and risk management',
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
    refreshInterval: 30000, // 30 seconds
    batchProcessing: {
      settlement: '19:00',
      reporting: '20:00',
      backup: '22:00'
    }
  },

  // Demo data for development
  demo: {
    users: [
      {
        email: 'admin@cbb.gov.bh',
        password: 'admin123',
        role: 'Admin',
        name: 'System Administrator',
        department: 'IT Operations'
      },
      {
        email: 'operator@cbb.gov.bh', 
        password: 'operator123',
        role: 'CBBOperator',
        name: 'CBB Operations Team',
        department: 'Financial Operations'
      },
      {
        email: 'bank@nbb.com.bh',
        password: 'bank123', 
        role: 'BankOperator',
        name: 'NBB Operator',
        department: 'Treasury Operations'
      }
    ],
    mfaCodes: ['123456', '000000'] // Demo MFA codes
  }
};

export default portalConfig;