// Page Title Configuration
// This file centralizes all page and component titles for consistency

export const pageConfig = {
  // CSD Pages
  csd: {
    dashboard: {
      title: "CSD Dashboard",
      description: "Central Securities Depository overview and key metrics"
    },
    accountStatements: {
      title: "Account Statements", 
      description: "Generate and manage account statements for CSD participants",
      tableTitle: "Statement Records"
    },
    exposureSummary: {
      title: "Exposure Summary",
      description: "Monitor and analyze counterparty exposures and risk concentrations", 
      tableTitle: "Counterparty Exposures"
    },
    corporateActionsSummary: {
      title: "Corporate Actions Summary",
      description: "Monitor and manage corporate actions across all securities",
      tableTitle: "Corporate Actions Schedule"
    },
    couponReward: {
      title: "Coupon/Reward Processing",
      description: "Manage coupon payments and reward distributions for securities",
      tableTitle: "Coupon Payment Schedule"
    },
    redemptions: {
      title: "Redemptions", 
      description: "Manage security redemptions and maturity processing",
      tableTitle: "Redemption Schedule"
    },
    earlyRedemptions: {
      title: "Early Redemptions",
      description: "Manage early redemption requests and call options",
      tableTitle: "Early Redemption Requests"
    },
    transactionsSummary: {
      title: "Transactions Summary",
      description: "Overview of all transaction activities and settlement status",
      tableTitle: "Recent Transactions"
    },
    documentsApproval: {
      title: "Documents Approval",
      description: "Manage document review and approval workflow", 
      tableTitle: "Document Approval Queue"
    },
    settledTransactions: {
      title: "Settled Transactions",
      description: "View completed and settled transactions",
      tableTitle: "Settlement Records"
    },
    pendingTransactions: {
      title: "Pending Transactions", 
      description: "Monitor transactions awaiting settlement or approval",
      tableTitle: "Pending Transactions Queue"
    },
    failedTransactions: {
      title: "Failed Transactions",
      description: "Monitor and resolve failed transaction attempts",
      tableTitle: "Failed Transaction Records"
    },
    transfersDvp: {
      title: "Transfers (DvF / DvP)",
      description: "Manage delivery versus payment and delivery versus free transfers",
      tableTitle: "Transfer Instructions"
    }
  },
  
  // RTGS Pages  
  rtgs: {
    dashboard: {
      title: "RTGS Dashboard",
      description: "Real-Time Gross Settlement system overview and monitoring"
    },
    accountManagement: {
      title: "Account Management", 
      description: "Manage participant accounts and balances",
      tableTitle: "Account Overview"
    },
    transactionStatus: {
      title: "Transaction Status",
      description: "Monitor transaction processing and settlement status",
      tableTitle: "Transaction Records" 
    }
  },

  // CMS Pages
  cms: {
    dashboard: {
      title: "CMS Dashboard", 
      description: "Collateral Management System overview and risk monitoring"
    }
  },

  // Admin Pages
  admin: {
    dashboard: {
      title: "Admin Dashboard",
      description: "System administration and configuration"
    },
    userManagement: {
      title: "User Management",
      description: "Manage system users, roles and permissions", 
      tableTitle: "User Accounts"
    }
  }
};

// Helper function to get page configuration
export const getPageConfig = (system: string, page: string) => {
  return pageConfig[system as keyof typeof pageConfig]?.[page as keyof any] || {
    title: "Page Title",
    description: "Page description",
    tableTitle: "Data Records"
  };
};