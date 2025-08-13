import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import MFAPage from "./pages/auth/MFAPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import HomePage from "./pages/dashboard/HomePage";
import SecuritiesLifecyclePage from "./pages/securities/SecuritiesLifecyclePage";
import InstrumentReferencePage from "./pages/securities/InstrumentReferencePage";
import IssuancePage from "./pages/securities/IssuancePage";
import CorporateActionsPage from "./pages/securities/CorporateActionsPage";
import TradingPage from "./pages/trading/TradingPage";
import TransferInstructionPage from "./pages/trading/TransferInstructionPage";
import OrderManagementPage from "./pages/trading/OrderManagementPage";
import AuctionsTradingMonitorPage from "./pages/trading/AuctionsTradingMonitorPage";
import BilateralTradingMonitorPage from "./pages/trading/BilateralTradingMonitorPage";
import ClearingHubPage from "./pages/clearing/ClearingHubPage";
import ClearingManagerPage from "./pages/clearing/ClearingManagerPage";
import MarginCalculationPage from "./pages/clearing/MarginCalculationPage";
import DefaultManagementPage from "./pages/clearing/DefaultManagementPage";
import CCPDashboardPage from "./pages/clearing/CCPDashboardPage";
import SettlementHubPage from "./pages/settlement/SettlementHubPage";
import CustodyHubPage from "./pages/custody/CustodyHubPage";
import LiquidityHubPage from "./pages/liquidity/LiquidityHubPage";
import TriPartyRepoPage from "./pages/liquidity/TriPartyRepoPage";
import CentralBankLiquidityPage from "./pages/liquidity/CentralBankLiquidityPage";
import IslamicRepoPage from "./pages/liquidity/IslamicRepoPage";
import CollateralOptimizationPage from "./pages/collateral/CollateralOptimizationPage";
import CollateralManagerPage from "./pages/collateral/CollateralManagerPage";
import RiskManagementPage from "./pages/risk/RiskManagementPage";
import AuctionManagementPage from "./pages/auction/AuctionManagementPage";
import InvestorServicesHubPage from "./pages/investor/InvestorServicesHubPage";
import ReportingPage from "./pages/reporting/ReportingPage";
import MasterDataPage from "./pages/masterdata/MasterDataPage";
import SystemAdminPage from "./pages/admin/SystemAdminPage";
import SystemMonitoringPage from "./pages/admin/SystemMonitoringPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import IntegrationsManagementPage from "./pages/admin/IntegrationsManagementPage";
import MarketDataPage from "./pages/admin/MarketDataPage";
import StaticDataManagementPage from "./pages/admin/StaticDataManagementPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OperationsPage from "./pages/operations/OperationsPage";
import RTGSHomePage from "./pages/rtgs/RTGSHomePage";
import FinancialMonitoringPage from "./pages/rtgs/FinancialMonitoringPage";
import AccountManagementPage from "./pages/rtgs/AccountManagementPage";
import BalancesLiquidityPage from "./pages/rtgs/BalancesLiquidityPage";
import TransactionStatusPage from "./pages/rtgs/TransactionStatusPage";
import CentralBankOperationsPage from "./pages/rtgs/CentralBankOperationsPage";
import AnomalyDetectionPage from "./pages/rtgs/AnomalyDetectionPage";
import DisputeManagementPage from "./pages/rtgs/DisputeManagementPage";
import KnowledgeHubPage from "./pages/knowledge/KnowledgeHubPage";
import KnowledgeSearchPage from "./pages/knowledge/KnowledgeSearchPage";
import KnowledgeFindingsPage from "./pages/knowledge/KnowledgeFindingsPage";
import RTGSConfigurationPage from "./pages/admin/RTGSConfigurationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mfa" element={<MFAPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<HomePage />} />
              <Route path="operations" element={<OperationsPage />} />
              <Route path="securities" element={<SecuritiesLifecyclePage />} />
              <Route path="securities/instrument-reference" element={<InstrumentReferencePage />} />
              <Route path="securities/issuance" element={<IssuancePage />} />
              <Route path="securities/corporate-actions" element={<CorporateActionsPage />} />
              <Route path="trading" element={<TradingPage />} />
              <Route path="trading/transfer-instruction" element={<TransferInstructionPage />} />
              <Route path="trading/order-management" element={<OrderManagementPage />} />
              <Route path="trading/auctions" element={<AuctionsTradingMonitorPage />} />
              <Route path="trading/bilateral" element={<BilateralTradingMonitorPage />} />
              <Route path="clearing" element={<ClearingHubPage />} />
              <Route path="clearing/manager" element={<ClearingManagerPage />} />
              <Route path="clearing/margin" element={<MarginCalculationPage />} />
              <Route path="clearing/default" element={<DefaultManagementPage />} />
              <Route path="clearing/ccp" element={<CCPDashboardPage />} />
              <Route path="settlement" element={<SettlementHubPage />} />
              <Route path="custody" element={<CustodyHubPage />} />
              <Route path="liquidity" element={<LiquidityHubPage />} />
              <Route path="liquidity/tri-party-repo" element={<TriPartyRepoPage />} />
              <Route path="liquidity/central-bank-liquidity" element={<CentralBankLiquidityPage />} />
              <Route path="liquidity/islamic-repo" element={<IslamicRepoPage />} />
              <Route path="collateral/manager" element={<CollateralManagerPage />} />
              <Route path="collateral/optimization" element={<CollateralOptimizationPage />} />
              <Route path="risk" element={<RiskManagementPage />} />
              <Route path="risk/monitoring" element={<RiskManagementPage />} />
              {/* RTGS */}
              <Route path="rtgs" element={<RTGSHomePage />} />
              <Route path="rtgs/financial-monitoring" element={<FinancialMonitoringPage />} />
              <Route path="rtgs/account-management" element={<AccountManagementPage />} />
              <Route path="rtgs/balances-liquidity" element={<BalancesLiquidityPage />} />
              <Route path="rtgs/transaction-status" element={<TransactionStatusPage />} />
              <Route path="rtgs/central-bank-operations" element={<CentralBankOperationsPage />} />
              <Route path="rtgs/anomaly-detection" element={<AnomalyDetectionPage />} />
              <Route path="rtgs/dispute-management" element={<DisputeManagementPage />} />
              {/* Knowledge Hub */}
              <Route path="knowledge" element={<KnowledgeHubPage />} />
              <Route path="knowledge/search" element={<KnowledgeSearchPage />} />
              <Route path="knowledge/findings" element={<KnowledgeFindingsPage />} />
              {/* Administration */}
              <Route path="admin/rtgs-config" element={<RTGSConfigurationPage />} />
              <Route path="auction" element={<AuctionManagementPage />} />
              <Route path="investor-services" element={<InvestorServicesHubPage />} />
              <Route path="reporting" element={<ReportingPage />} />
              <Route path="masterdata" element={<MasterDataPage />} />
              <Route path="admin/integrations" element={<IntegrationsManagementPage />} />
              <Route path="admin/market-data" element={<MarketDataPage />} />
              <Route path="admin/static-data" element={<StaticDataManagementPage />} />
              <Route path="admin" element={<SystemMonitoringPage />} />
              <Route path="monitoring" element={<SystemAdminPage />} />
              <Route path="users" element={<UserManagementPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
