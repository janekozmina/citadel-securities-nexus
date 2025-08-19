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
import TransfersDvpPage from "./pages/csd/TransfersDvpPage";
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
                   <TransfersDvpPage />
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
                  <CMSPage />
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
                  <AdminPage />
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
            <Route path="/admin/users/accounts" element={
              <ProtectedRoute>
                <MainLayout>
                  <UserAccountsManagementPage />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users/roles" element={
              <ProtectedRoute>
                <MainLayout>
                  <RolesPermissionsPage />
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