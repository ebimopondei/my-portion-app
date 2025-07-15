import {  Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterBuyer from "./pages/register-buyer";
import RegisterVendor from "./pages/register-vendor";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import OrdersPage from "./pages/orders";
import VendorPage from "./pages/vendor/vendor";
import KYCPage from "./pages/vendor/kyc";
import ProtectedRoutes from "./hooks/protected-routes";

const AppRouter = () => (
  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterBuyer />} />
          <Route path="/register/vendor" element={<RegisterVendor />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/vendor/kyc" element={<KYCPage />} />
            <Route path="/vendor" element={<VendorPage />} />

          </Route>
        </Routes>
);

export default AppRouter;
