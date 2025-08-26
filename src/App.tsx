import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Layouts
import MainLayout from "./components/layout/MainLayout";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import MFAPage from "./pages/auth/MFAPage";

// Dashboard Pages
import HomePage from "./pages/dashboard/HomePage";

// RTGS Pages
import RTGSPage from "./pages/rtgs/RTGSPage";
import FinancialMonitoringPage from "./pages/rtgs/FinancialMonitoringPage";

import AccountManagementPage from "./pages/rtgs/AccountManagementPage";

import BalancesLiquidityPage from "./pages/rtgs/BalancesLiquidityPage";
import TransactionStatusPage from "./pages/rtgs/TransactionStatusPage";
import AuctionsSummaryPage from "./pages/csd/AuctionsSummaryPage";
import OperationsSummaryPage from "./pages/csd/OperationsSummaryPage";
import ReservesSummaryPage from "./pages/csd/ReservesSummaryPage";
import LimitsSummaryPage from "./pages/csd/LimitsSummaryPage";
import LimitsAlertsPage from "./pages/csd/LimitsAlertsPage";
import TransactionReconciliationPage from "./pages/csd/TransactionReconciliationPage";
import InvestorsSummaryPage from "./pages/csd/InvestorsSummaryPage";
import CMSDashboardPage from "./pages/cms/CMSDashboardPage";
import BusinessDayManagementPage from "./pages/rtgs/BusinessDayManagementPage";
import BillingPage from "./pages/rtgs/BillingPage";
import BIReportsPage from "./pages/rtgs/BIReportsPage";
import CentralBankOperationsPage from "./pages/rtgs/CentralBankOperationsPage";
import CashOperationsPage from "./pages/rtgs/CashOperationsPage";

// CSD Pages  
import CSDPage from "./pages/csd/CSDPage";
import CSDTradingPage from "./pages/csd/CSDTradingPage";
import CSDSettlementPage from "./pages/csd/CSDSettlementPage";
import CSDCustodyPage from "./pages/csd/CSDCustodyPage";
import CSDAccountManagementPage from "./pages/csd/CSDAccountManagementPage";
import AccountStatementsPage from "./pages/csd/AccountStatementsPage";
import ExposureSummaryPage from "./pages/csd/ExposureSummaryPage";
import CorporateActionsSummaryPage from "./pages/csd/CorporateActionsSummaryPage";
import CouponRewardPage from "./pages/csd/CouponRewardPage";
import RedemptionsPage from "./pages/csd/RedemptionsPage";
import EarlyRedemptionsPage from "./pages/csd/EarlyRedemptionsPage";
import TransactionsSummaryPage from "./pages/csd/TransactionsSummaryPage";
import DocumentsApprovalPage from "./pages/csd/DocumentsApprovalPage";
import SettledTransactionsPage from "./pages/csd/SettledTransactionsPage";
import PendingTransactionsPage from "./pages/csd/PendingTransactionsPage";
import FailedTransactionsPage from "./pages/csd/FailedTransactionsPage";
import CrossBorderSettlementPage from "./pages/csd/CrossBorderSettlementPage";
import ExchangeTradesSettlementPage from "./pages/csd/ExchangeTradesSettlementPage";
import ClearingManagerPage from "./pages/csd/ClearingManagerPage";
import PaymentsStatusPage from "./pages/csd/PaymentsStatusPage";

// OMO Pages
import ActiveAuctionsPage from "./pages/omo/ActiveAuctionsPage";
import CBAuctionPage from "./pages/omo/CBAuctionPage";
import RepoReverseRepoAuctionPage from "./pages/omo/RepoReverseRepoAuctionPage";
import DepositAuctionPage from "./pages/omo/DepositAuctionPage";
import OutrightAuctionPage from "./pages/omo/OutrightAuctionPage";
import FXAuctionPage from "./pages/omo/FXAuctionPage";
import FXForwardAuctionPage from "./pages/omo/FXForwardAuctionPage";
import FXSwapAuctionPage from "./pages/omo/FXSwapAuctionPage";
import DebtSwitchAuctionPage from "./pages/omo/DebtSwitchAuctionPage";
import BuybackAuctionPage from "./pages/omo/BuybackAuctionPage";
import RegisterCBBInstrumentPage from "./pages/securities/RegisterCBBInstrumentPage";
import RegisterTreasuryBillPage from "./pages/securities/RegisterTreasuryBillPage";
import RegisterTreasuryBondPage from "./pages/securities/RegisterTreasuryBondPage";
import SecuritiesIssuanceOtherPage from "./pages/securities/SecuritiesIssuanceOtherPage";
import PrivatePlacementPage from "./pages/securities/PrivatePlacementPage";
import StatusManagementPage from "./pages/securities/StatusManagementPage";
import InstrumentsSummaryPage from "./pages/securities/InstrumentsSummaryPage";
import RegisterIslamicSukukPage from "./pages/csd/RegisterIslamicSukukPage";
import TransfersPage from "./pages/csd/TransfersPage";
import InstrumentTypesPage from "./pages/securities/InstrumentTypesPage";
import CollateralParametersPage from "./pages/collateral/CollateralParametersPage";
import EligibilityCriteriaBuilderPage from "./pages/cms/EligibilityCriteriaBuilderPage";

// CMS Pages
import CMSPage from "./pages/cms/CMSPage";
import CMSCollateralPage from "./pages/cms/CMSCollateralPage";
import CMSRiskPage from "./pages/cms/CMSRiskPage";

// Operations Pages
import OperationsPage from "./pages/operations/OperationsPage";

// Common Pages
import ReportsPage from "./pages/reports/ReportsPage";
import AdminPage from "./pages/admin/AdminPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import UserAccountsManagementPage from "./pages/admin/UserAccountsManagementPage";
import RolesPermissionsPage from "./pages/admin/RolesPermissionsPage";
import SystemConfigurationPage from "./pages/admin/SystemConfigurationPage";
import RTGSConfigurationPage from "./pages/admin/RTGSConfigurationPage";
import CSDConfigurationPage from "./pages/admin/CSDConfigurationPage";

// Participants Pages
import ParticipantUnifiedPortalPage from "./pages/participants/ParticipantUnifiedPortalPage";
import ParticipantOnboardingPage from "./pages/participants/ParticipantOnboardingPage";

// New User Management Pages
import RTGSUserAccountsPage from "./pages/admin/RTGSUserAccountsPage";
import CSDUserAccountsPage from "./pages/admin/CSDUserAccountsPage";
import RTGSRolesPermissionsPage from "./pages/admin/RTGSRolesPermissionsPage";
import CSDCMSRolesPermissionsPage from "./pages/admin/CSDCMSRolesPermissionsPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

// Standing Facilities Pages
import IslamicLiquiditySummaryPage from '@/pages/csd/standing-facilities/IslamicLiquiditySummaryPage';
import ILFPage from '@/pages/csd/standing-facilities/ILFPage';
import FloorFacilitiesPage from '@/pages/csd/standing-facilities/FloorFacilitiesPage';
import LendingFacilitiesPage from '@/pages/csd/standing-facilities/LendingFacilitiesPage';
import DepositFacilitiesPage from '@/pages/csd/standing-facilities/DepositFacilitiesPage';
import RepoPage from '@/pages/csd/standing-facilities/RepoPage';
import ReverseRepoPage from '@/pages/csd/standing-facilities/ReverseRepoPage';
import IslamicDepositsPage from '@/pages/csd/standing-facilities/IslamicDepositsPage';
import IslamicLendingSecuritiesPage from '@/pages/csd/standing-facilities/IslamicLendingSecuritiesPage';
import LiquidityPositionSummaryPage from '@/pages/csd/liquidity-monitor/LiquidityPositionSummaryPage';
import LiquidityForecastingPage from '@/pages/csd/liquidity-monitor/LiquidityForecastingPage';
import BalancesOverviewPage from './pages/csd/BalancesOverviewPage';
import HaircutsManagementPage from './pages/cms/HaircutsManagementPage';
import CollateralPositionsPage from './pages/cms/CollateralPositionsPage';
import CollateralOptimizationPage from './pages/cms/CollateralOptimizationPage';
import ReportingAnalyticsPage from './pages/cms/ReportingAnalyticsPage';
import CMSBIReportsPage from './pages/cms/BIReportsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mfa" element={<MFAPage />} />
            
            {/* Protected Routes with MainLayout */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* RTGS System */}
            <Route path="/rtgs" element={
              <ProtectedRoute>
                <MainLayout>
                  <RTGSPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Financial Monitoring */}
            <Route path="/rtgs/financial-monitoring" element={
              <ProtectedRoute>
                <MainLayout>
                  <FinancialMonitoringPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/financial-monitoring/account-management" element={
              <ProtectedRoute>
                <MainLayout>
                  <AccountManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/financial-monitoring/balances-liquidity" element={
              <ProtectedRoute>
                <MainLayout>
                  <BalancesLiquidityPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/financial-monitoring/transaction-status" element={
              <ProtectedRoute>
                <MainLayout>
                  <TransactionStatusPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/financial-monitoring/business-day-management" element={
              <ProtectedRoute>
                <MainLayout>
                  <BusinessDayManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/financial-monitoring/billing" element={
              <ProtectedRoute>
                <MainLayout>
                  <BillingPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/financial-monitoring/bi-reports" element={
              <ProtectedRoute>
                <MainLayout>
                  <BIReportsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* CB Operations */}
            <Route path="/rtgs/cb-operations" element={
              <ProtectedRoute>
                <MainLayout>
                  <CentralBankOperationsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/rtgs/cb-operations/cash-operations" element={
              <ProtectedRoute>
                <MainLayout>
                  <CashOperationsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* CSD System */}
            <Route path="/csd" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/trading/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDTradingPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/settlement/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDSettlementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/custody/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDCustodyPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/accounts-balances/summary" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDAccountManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/accounts-balances/overview" element={
              <ProtectedRoute>
                <MainLayout>
                  <BalancesOverviewPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/accounts-balances/statements" element={
              <ProtectedRoute>
                <MainLayout>
                  <AccountStatementsPage />
                </MainLayout>
              </ProtectedRoute>
             } />
             
             {/* CSD Positions */}
             <Route path="/csd/positions/exposure-summary" element={
               <ProtectedRoute>
                 <MainLayout>
                   <ExposureSummaryPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             
             {/* CSD Corporate Actions */}
             <Route path="/csd/corporate-actions/summary" element={
               <ProtectedRoute>
                 <MainLayout>
                   <CorporateActionsSummaryPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/corporate-actions/coupon-reward" element={
               <ProtectedRoute>
                 <MainLayout>
                   <CouponRewardPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/corporate-actions/redemptions" element={
               <ProtectedRoute>
                 <MainLayout>
                   <RedemptionsPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/corporate-actions/early-redemptions" element={
               <ProtectedRoute>
                 <MainLayout>
                   <EarlyRedemptionsPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             
             {/* CSD Transactions */}
             <Route path="/csd/transactions/summary" element={
               <ProtectedRoute>
                 <MainLayout>
                   <TransactionsSummaryPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/transactions/documents-approval" element={
               <ProtectedRoute>
                 <MainLayout>
                   <DocumentsApprovalPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/transactions/settled" element={
               <ProtectedRoute>
                 <MainLayout>
                   <SettledTransactionsPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/transactions/pending" element={
               <ProtectedRoute>
                 <MainLayout>
                   <PendingTransactionsPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
             <Route path="/csd/transactions/failed" element={
               <ProtectedRoute>
                 <MainLayout>
                   <FailedTransactionsPage />
                 </MainLayout>
               </ProtectedRoute>
             } />
              <Route path="/csd/transactions/transfers" element={
                <ProtectedRoute>
                  <MainLayout>
                    <TransfersPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/csd/transactions/cross-border-settlement" element={
                <ProtectedRoute>
                  <MainLayout>
                    <CrossBorderSettlementPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/csd/transactions/exchange-trades-settlement" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ExchangeTradesSettlementPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/csd/transactions/clearing-manager" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ClearingManagerPage />
                  </MainLayout>
                </ProtectedRoute>
              } />

              <Route path="/csd/transactions/payments-status" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PaymentsStatusPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
               
               {/* CSD Summary Pages */}
               <Route path="/csd/open-market-operations/auctions-summary" element={
                <ProtectedRoute>
                  <MainLayout>
                    <AuctionsSummaryPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/csd/standing-facilities/operations-summary" element={
                <ProtectedRoute>
                  <MainLayout>
                    <OperationsSummaryPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/csd/reserves-management/summary" element={
                <ProtectedRoute>
                  <MainLayout>
                    <ReservesSummaryPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
            {/* Limits Routes */}
            <Route path="/csd/limits/summary" element={
              <ProtectedRoute>
                <MainLayout>
                  <LimitsSummaryPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/limits/alerts" element={
              <ProtectedRoute>
                <MainLayout>
                  <LimitsAlertsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
              <Route path="/csd/reconciliation/transactions" element={
                <ProtectedRoute>
                  <MainLayout>
                    <TransactionReconciliationPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/csd/investors-management/summary" element={
                <ProtectedRoute>
                  <MainLayout>
                    <InvestorsSummaryPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* CSD Instruments */}
            <Route path="/csd/instruments/register-cbb" element={
              <ProtectedRoute>
                <MainLayout>
                  <RegisterCBBInstrumentPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/register-treasury-bill" element={
              <ProtectedRoute>
                <MainLayout>
                  <RegisterTreasuryBillPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/register-treasury-bond" element={
              <ProtectedRoute>
                <MainLayout>
                  <RegisterTreasuryBondPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/securities-issuance-other" element={
              <ProtectedRoute>
                <MainLayout>
                  <SecuritiesIssuanceOtherPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/private-placement" element={
              <ProtectedRoute>
                <MainLayout>
                  <PrivatePlacementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/status-management" element={
              <ProtectedRoute>
                <MainLayout>
                  <StatusManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/summary" element={
              <ProtectedRoute>
                <MainLayout>
                  <InstrumentsSummaryPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/register-islamic-sukuk" element={
              <ProtectedRoute>
                <MainLayout>
                  <RegisterIslamicSukukPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/transactions/transfers" element={
              <ProtectedRoute>
                <MainLayout>
                  <TransfersPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/instruments/types" element={
              <ProtectedRoute>
                <MainLayout>
                  <InstrumentTypesPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/collateral/haircut-matrix" element={
              <ProtectedRoute>
                <MainLayout>
                  <CollateralParametersPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/eligibility-criteria-builder" element={
              <ProtectedRoute>
                <MainLayout>
                  <EligibilityCriteriaBuilderPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Operations Hub */}
            <Route path="/csd/operations-hub" element={
              <ProtectedRoute>
                <MainLayout>
                  <OperationsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/operations-hub/operations" element={
              <ProtectedRoute>
                <MainLayout>
                  <OperationsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            
            {/* CMS System */}
            <Route path="/cms" element={
              <ProtectedRoute>
                <MainLayout>
                  <CMSDashboardPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/collateral/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <CMSCollateralPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/risk/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <CMSRiskPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/haircuts-management" element={
              <ProtectedRoute>
                <MainLayout>
                  <HaircutsManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/collateral-positions" element={
              <ProtectedRoute>
                <MainLayout>
                  <CollateralPositionsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/collateral-optimization" element={
              <ProtectedRoute>
                <MainLayout>
                  <CollateralOptimizationPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/reporting-analytics" element={
              <ProtectedRoute>
                <MainLayout>
                  <ReportingAnalyticsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/cms/bi-reports" element={
              <ProtectedRoute>
                <MainLayout>
                  <CMSBIReportsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Common */}
            <Route path="/reports/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <ReportsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute>
                <MainLayout>
                  <AdminDashboardPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <MainLayout>
                  <UserManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users/rtgs-accounts" element={
              <ProtectedRoute>
                <MainLayout>
                  <RTGSUserAccountsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users/csd-cms-accounts" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDUserAccountsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users/rtgs-roles" element={
              <ProtectedRoute>
                <MainLayout>
                  <RTGSRolesPermissionsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users/csd-cms-roles" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDCMSRolesPermissionsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/config" element={
              <ProtectedRoute>
                <MainLayout>
                  <SystemConfigurationPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/config/rtgs" element={
              <ProtectedRoute>
                <MainLayout>
                  <RTGSConfigurationPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/config/csd" element={
              <ProtectedRoute>
                <MainLayout>
                  <CSDConfigurationPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* OMO Routes */}
            <Route path="/csd/open-market-operations/active-auctions" element={
              <ProtectedRoute>
                <MainLayout>
                  <ActiveAuctionsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/cb-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <CBAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/repo-reverse-repo-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <RepoReverseRepoAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/deposit-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <DepositAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/outright-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <OutrightAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/fx-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <FXAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/fx-forward-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <FXForwardAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/fx-swap-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <FXSwapAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/debt-switch-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <DebtSwitchAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/open-market-operations/buyback-auction" element={
              <ProtectedRoute>
                <MainLayout>
                  <BuybackAuctionPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Standing Facilities Routes */}
            <Route path="/csd/standing-facilities/islamic-liquidity-summary" element={
              <ProtectedRoute>
                <MainLayout>
                  <IslamicLiquiditySummaryPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/ilf" element={
              <ProtectedRoute>
                <MainLayout>
                  <ILFPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/floor-facilities" element={
              <ProtectedRoute>
                <MainLayout>
                  <FloorFacilitiesPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/lending-facilities" element={
              <ProtectedRoute>
                <MainLayout>
                  <LendingFacilitiesPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/deposit-facilities" element={
              <ProtectedRoute>
                <MainLayout>
                  <DepositFacilitiesPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/repo" element={
              <ProtectedRoute>
                <MainLayout>
                  <RepoPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/reverse-repo" element={
              <ProtectedRoute>
                <MainLayout>
                  <ReverseRepoPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/islamic-deposits" element={
              <ProtectedRoute>
                <MainLayout>
                  <IslamicDepositsPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/standing-facilities/islamic-lending-securities" element={
              <ProtectedRoute>
                <MainLayout>
                  <IslamicLendingSecuritiesPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Liquidity Monitor Routes */}
            <Route path="/csd/liquidity-monitor/liquidity-position-summary" element={
              <ProtectedRoute>
                <MainLayout>
                  <LiquidityPositionSummaryPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/csd/liquidity-monitor/liquidity-forecasting" element={
              <ProtectedRoute>
                <MainLayout>
                  <LiquidityForecastingPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Participants Routes */}
            <Route path="/participants/unified-portal" element={
              <ProtectedRoute>
                <MainLayout>
                  <ParticipantUnifiedPortalPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/participants/onboarding" element={
              <ProtectedRoute>
                <MainLayout>
                  <ParticipantOnboardingPage />
                </MainLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;