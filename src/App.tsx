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

// CMS Pages
import CMSPage from "./pages/cms/CMSPage";
import CMSCollateralPage from "./pages/cms/CMSCollateralPage";
import CMSRiskPage from "./pages/cms/CMSRiskPage";

// Common Pages
import ReportsPage from "./pages/reports/ReportsPage";
import AdminPage from "./pages/admin/AdminPage";

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
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <AdminPage />
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