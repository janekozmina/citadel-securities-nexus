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
            <Route path="/*" element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
                    {/* Dashboard */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* RTGS System */}
                    <Route path="/rtgs" element={<RTGSPage />} />
                    
                    {/* Financial Monitoring */}
                    <Route path="/rtgs/financial-monitoring" element={<FinancialMonitoringPage />} />
                    <Route path="/rtgs/financial-monitoring/account-management" element={<AccountManagementPage />} />
                    <Route path="/rtgs/financial-monitoring/balances-liquidity" element={<BalancesLiquidityPage />} />
                    <Route path="/rtgs/financial-monitoring/transaction-status" element={<TransactionStatusPage />} />
                    <Route path="/rtgs/financial-monitoring/business-day-management" element={<BusinessDayManagementPage />} />
                    <Route path="/rtgs/financial-monitoring/billing" element={<BillingPage />} />
                    <Route path="/rtgs/financial-monitoring/bi-reports" element={<BIReportsPage />} />
                    
                    {/* CB Operations */}
                    <Route path="/rtgs/cb-operations" element={<CentralBankOperationsPage />} />
                    <Route path="/rtgs/cb-operations/cash-operations" element={<CashOperationsPage />} />
                    
                    {/* CSD System */}
                    <Route path="/csd" element={<CSDPage />} />
                    <Route path="/csd/trading/*" element={<CSDTradingPage />} />
                    <Route path="/csd/settlement/*" element={<CSDSettlementPage />} />
                    <Route path="/csd/custody/*" element={<CSDCustodyPage />} />
                    
                    {/* CMS System */}
                    <Route path="/cms" element={<CMSPage />} />
                    <Route path="/cms/collateral/*" element={<CMSCollateralPage />} />
                    <Route path="/cms/risk/*" element={<CMSRiskPage />} />
                    
                    {/* Common */}
                    <Route path="/reports/*" element={<ReportsPage />} />
                    <Route path="/admin/*" element={<AdminPage />} />
                  </Routes>
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