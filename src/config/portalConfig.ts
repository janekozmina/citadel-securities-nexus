// Central Bank Portal Configuration
// This file contains all portal-wide settings, data, and configurations

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
      precision: 3
    },
    supported: ['BHD', 'USD']
  },

  // Bank names and identifiers for Bahrain
  banks: {
    commercial: [
      'National Bank of Bahrain (NBB)',
      'Ahli United Bank B.S.C.',
      'Arab Bank plc., Bahrain',
      'Bank of Bahrain and Kuwait (BBK)',
      'Bahrain Development Bank B.S.C.',
      'Bahrain Middle East Bank B.S.C.',
      'Bank Al Habib Wholesale Branch',
      'Bank Alfalah Bahrain',
      'Bank of Jordan, Bahrain',
      'Citibank N.A., Kingdom of Bahrain',
      'Credit Libanais SAL, Bahrain',
      'Cairo Amman Bank Bahrain (CAB)',
      'DenizBank A.Ş., Bahrain',
      'Eskan Bank B.S.C.',
      'QNB Finansbank A.Ş., Bahrain',
      'First Abu Dhabi Bank – Bahrain Branch (FAB)',
      'Gulf International Bank B.S.C. (GIB)',
      'Habib Bank Limited – HBL Bahrain',
      'HSBC Bank Middle East Limited – Bahrain',
      'HDFC Bank Limited – Bahrain',
      'ICICI Bank, Bahrain Branch',
      'JPMorgan Chase Bank N.A., Bahrain',
      'JS Bank, Bahrain Branch',
      'KEB Hana Bank, Bahrain Branch',
      'MCB Wholesale Bank (Branch) Manama – Bahrain',
      'MUFG Bank, Bahrain Branch',
      'Mashreqbank P.S.C., Bahrain',
      'National Bank of Kuwait S.A.K.P., Bahrain (NBK)',
      'National Bank of Pakistan, Bahrain',
      'Palestine Investment Bank, Bahrain',
      'Rafidain Bank Bahrain',
      'SICO Bank',
      'The Saudi National Bank, Bahrain',
      'Standard Chartered Bank (Bahrain) Limited',
      'State Bank of India, Bahrain Branch (SBI)',
      'The Housing Bank – Bahrain (HBTF)',
      'Ziraat Bank, Bahrain Branch',
      'Halkbank, Bahrain Branch',
      'İşbank, Bahrain Branch',
      'United Bank Limited, Bahrain (UBL)',
      'United Gulf Bank B.S.C. (UGB)',
      'VakıfBank Bahrain Branch',
      'Woori Bank Bahrain',
      'Yapı Kredi – Bahrain Branch',
      'ABC Islamic Bank',
      'Al Baraka Islamic Bank B.S.C.',
      'Al Salam Bank B.S.C.',
      'Bahrain Islamic Bank B.S.C. (BisB)',
      'Ithmaar Bank B.S.C.',
      'Khaleeji Commercial Bank B.S.C. (KHCB)',
      'Kuwait Finance House Bahrain B.S.C.'
    ],
    central: 'Central Bank of Bahrain',
    codes: {
      'National Bank of Bahrain (NBB)': 'NBB',
      'Ahli United Bank B.S.C.': 'AUB',
      'Arab Bank plc., Bahrain': 'ABPLC',
      'Bank of Bahrain and Kuwait (BBK)': 'BBK',
      'Bahrain Development Bank B.S.C.': 'BDB',
      'Bahrain Middle East Bank B.S.C.': 'BMEB',
      'Bank Al Habib Wholesale Branch': 'BAHB',
      'Bank Alfalah Bahrain': 'BAB',
      'Bank of Jordan, Bahrain': 'BOJ',
      'Citibank N.A., Kingdom of Bahrain': 'CITI',
      'Credit Libanais SAL, Bahrain': 'CLS',
      'Cairo Amman Bank Bahrain (CAB)': 'CAB',
      'DenizBank A.Ş., Bahrain': 'DENIZ',
      'Eskan Bank B.S.C.': 'ESKAN',
      'QNB Finansbank A.Ş., Bahrain': 'QNBF',
      'First Abu Dhabi Bank – Bahrain Branch (FAB)': 'FAB',
      'Gulf International Bank B.S.C. (GIB)': 'GIB',
      'Habib Bank Limited – HBL Bahrain': 'HBL',
      'HSBC Bank Middle East Limited – Bahrain': 'HSBC',
      'HDFC Bank Limited – Bahrain': 'HDFC',
      'ICICI Bank, Bahrain Branch': 'ICICI',
      'JPMorgan Chase Bank N.A., Bahrain': 'JPM',
      'JS Bank, Bahrain Branch': 'JSB',
      'KEB Hana Bank, Bahrain Branch': 'KEBH',
      'MCB Wholesale Bank (Branch) Manama – Bahrain': 'MCB',
      'MUFG Bank, Bahrain Branch': 'MUFG',
      'Mashreqbank P.S.C., Bahrain': 'MASQ',
      'National Bank of Kuwait S.A.K.P., Bahrain (NBK)': 'NBK',
      'National Bank of Pakistan, Bahrain': 'NBP',
      'Palestine Investment Bank, Bahrain': 'PIB',
      'Rafidain Bank Bahrain': 'RAFI',
      'SICO Bank': 'SICO',
      'The Saudi National Bank, Bahrain': 'SNB',
      'Standard Chartered Bank (Bahrain) Limited': 'SCB',
      'State Bank of India, Bahrain Branch (SBI)': 'SBI',
      'The Housing Bank – Bahrain (HBTF)': 'HBTF',
      'Ziraat Bank, Bahrain Branch': 'ZIRAAT',
      'Halkbank, Bahrain Branch': 'HALK',
      'İşbank, Bahrain Branch': 'ISBANK',
      'United Bank Limited, Bahrain (UBL)': 'UBL',
      'United Gulf Bank B.S.C. (UGB)': 'UGB',
      'VakıfBank Bahrain Branch': 'VAKIF',
      'Woori Bank Bahrain': 'WOORI',
      'Yapı Kredi – Bahrain Branch': 'YAPI',
      'ABC Islamic Bank': 'ABCI',
      'Al Baraka Islamic Bank B.S.C.': 'ABIB',
      'Al Salam Bank B.S.C.': 'ASB',
      'Bahrain Islamic Bank B.S.C. (BisB)': 'BISB',
      'Ithmaar Bank B.S.C.': 'ITHMAAR',
      'Khaleeji Commercial Bank B.S.C. (KHCB)': 'KHCB',
      'Kuwait Finance House Bahrain B.S.C.': 'KFHB'
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
    },
    CSDParticipant: {
      permissions: [
        'csd.dashboard',
        'csd.operations',
        'csd.auctions.view',
        'csd.reporting.view'
      ],
      label: 'CSD Participant',
      color: 'primary',
      allowedSystems: ['CSD']
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
      },
      {
        email: 'participant@demo.com',
        password: 'CMA!@#$',
        role: 'CSDParticipant',
        name: 'CSD Participant',
        department: 'Securities Operations'
      }
    ],
    mfaCodes: ['123456', '000000'] // Demo MFA codes
  }
};

export default portalConfig;