import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import MFAPage from "./pages/auth/MFAPage";

// Dashboard
import HomePage from "./pages/dashboard/HomePage";

// All other pages
import RTGSHomePage from "./pages/rtgs/RTGSHomePage";
import FinancialMonitoringPage from "./pages/rtgs/FinancialMonitoringPage";
import AccountManagementPage from "./pages/rtgs/AccountManagementPage";
import BalancesLiquidityPage from "./pages/rtgs/BalancesLiquidityPage";
import TransactionStatusPage from "./pages/rtgs/TransactionStatusPage";
import CentralBankOperationsPage from "./pages/rtgs/CentralBankOperationsPage";
import AnomalyDetectionPage from "./pages/rtgs/AnomalyDetectionPage";
import DisputeManagementPage from "./pages/rtgs/DisputeManagementPage";
import BusinessDayManagementPage from "./pages/rtgs/BusinessDayManagementPage";
import BillingPage from "./pages/rtgs/BillingPage";
import RealTimeCashFlowOverviewPage from "./pages/rtgs/RealTimeCashFlowOverviewPage";
import TradingPage from "./pages/trading/TradingPage";
import LiquidityHubPage from "./pages/liquidity/LiquidityHubPage";
import SettlementHubPage from "./pages/settlement/SettlementHubPage";
import ClearingHubPage from "./pages/clearing/ClearingHubPage";
import CollateralManagerPage from "./pages/collateral/CollateralManagerPage";
import CustodyHubPage from "./pages/custody/CustodyHubPage";
import InvestorServicesHubPage from "./pages/investor/InvestorServicesHubPage";
import RiskManagementPage from "./pages/risk/RiskManagementPage";
import ReportingPage from "./pages/reporting/ReportingPage";
import KnowledgeHubPage from "./pages/knowledge/KnowledgeHubPage";
import OperationsPage from "./pages/operations/OperationsPage";
import SystemAdminPage from "./pages/admin/SystemAdminPage";
import MasterDataPage from "./pages/masterdata/MasterDataPage";

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
                      <Route path="/" element={<HomePage />} />
                      <Route path="/rtgs" element={<RTGSHomePage />} />
                      <Route path="/rtgs/financial-monitoring" element={<FinancialMonitoringPage />} />
                      <Route path="/rtgs/financial-monitoring/account-management" element={<AccountManagementPage />} />
                      <Route path="/rtgs/financial-monitoring/balances-liquidity" element={<BalancesLiquidityPage />} />
                      <Route path="/rtgs/financial-monitoring/transaction-status" element={<TransactionStatusPage />} />
                      <Route path="/rtgs/financial-monitoring/business-day-management" element={<BusinessDayManagementPage />} />
                      <Route path="/rtgs/financial-monitoring/billing" element={<BillingPage />} />
                      <Route path="/rtgs/central-bank-operations" element={<CentralBankOperationsPage />} />
                      <Route path="/rtgs/central-bank-operations/cash-flow-overview" element={<RealTimeCashFlowOverviewPage />} />
                      <Route path="/rtgs/anomaly-detection" element={<AnomalyDetectionPage />} />
                      <Route path="/rtgs/dispute-management" element={<DisputeManagementPage />} />
                      <Route path="/trading" element={<TradingPage />} />
                      <Route path="/liquidity" element={<LiquidityHubPage />} />
                      <Route path="/settlement" element={<SettlementHubPage />} />
                      <Route path="/clearing" element={<ClearingHubPage />} />
                      <Route path="/collateral/manager" element={<CollateralManagerPage />} />
                      <Route path="/custody" element={<CustodyHubPage />} />
                      <Route path="/investor-services" element={<InvestorServicesHubPage />} />
                      <Route path="/risk" element={<RiskManagementPage />} />
                      <Route path="/reporting" element={<ReportingPage />} />
                      <Route path="/knowledge" element={<KnowledgeHubPage />} />
                      <Route path="/operations" element={<OperationsPage />} />
                      <Route path="/admin" element={<SystemAdminPage />} />
                      <Route path="/masterdata" element={<MasterDataPage />} />
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
