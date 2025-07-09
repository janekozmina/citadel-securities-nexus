
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
import TradingPage from "./pages/trading/TradingPage";
import ClearingHubPage from "./pages/clearing/ClearingHubPage";
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
              <Route path="securities" element={<SecuritiesLifecyclePage />} />
              <Route path="trading" element={<TradingPage />} />
              <Route path="clearing" element={<ClearingHubPage />} />
              <Route path="settlement" element={<SettlementHubPage />} />
              <Route path="custody" element={<CustodyHubPage />} />
              <Route path="liquidity" element={<LiquidityHubPage />} />
              <Route path="risk" element={<RiskManagementPage />} />
              <Route path="auction" element={<AuctionManagementPage />} />
              <Route path="reporting" element={<ReportingPage />} />
              <Route path="masterdata" element={<MasterDataPage />} />
              <Route path="admin" element={<SystemAdminPage />} />
              <Route path="monitoring" element={<SystemMonitoringPage />} />
              <Route path="users" element={<UserManagementPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
