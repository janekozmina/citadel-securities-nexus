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
import RiskManagementPage from "./pages/risk/RiskManagementPage";
import AuctionManagementPage from "./pages/auction/AuctionManagementPage";
import ReportingPage from "./pages/reporting/ReportingPage";
import MasterDataPage from "./pages/masterdata/MasterDataPage";
import SystemAdminPage from "./pages/admin/SystemAdminPage";
import SystemMonitoringPage from "./pages/admin/SystemMonitoringPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OperationsPage from "./pages/operations/OperationsPage";

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
              <Route path="risk" element={<RiskManagementPage />} />
              <Route path="auction" element={<AuctionManagementPage />} />
              <Route path="reporting" element={<ReportingPage />} />
              <Route path="masterdata" element={<MasterDataPage />} />
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
