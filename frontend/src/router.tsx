import {  Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import RegisterBuyer from "./pages/register-buyer";
import RegisterVendor from "./pages/register-vendor";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import VendorPage from "./pages/vendor/vendor";
import KYCPage from "./pages/vendor/kyc";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRouter = () => (
  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/buyer" element={<RegisterBuyer />} />
          <Route path="/register/vendor" element={<RegisterVendor />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/vendor" element={
            // <ProtectedRoute>
              <VendorPage />
            // </ProtectedRoute>
          } />
          <Route path="/vendor/kyc" element={
            // <ProtectedRoute>
              <KYCPage />
            // </ProtectedRoute>
          } />
        </Routes>
);

export default AppRouter;
