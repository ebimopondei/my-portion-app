import {  Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterBuyer from "./pages/register-buyer";
import RegisterVendor from "./pages/register-vendor";
import HomePage from "./pages/home";
import MarketPlace from "./pages/dashboard";
import OrdersPage from "./pages/orders";
import DashboardPage from "./pages/vendor/vendor";
import KYCPage from "./pages/vendor/kyc";
import ProtectedRoutes from "./hooks/protected-routes";
import Checkout from "./pages/check-out";
import CompleteCheckOutPayment from "./pages/complete-checkout-payment";
import ProductDetailPage from "./pages/product-details";
import VendorDashboardLayout from "./components/Layout/vendor-dashboard-layout";
import VendorProductsPage from "./pages/vendor/products";
import DashboardNotificationPage from "./pages/vendor/notification";
import DashboardProfilePage from "./pages/vendor/profile-view";
import DashboardWalletPage from "./pages/vendor/wallet";
import DashboardOrdersPage from "./pages/vendor/orders";

const AppRouter = () => (
  
        <Routes>
          
          <Route path="/" element={<MarketPlace />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterBuyer />} />
          <Route path="/register/vendor" element={<RegisterVendor />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/complete-payment/:order_record_id" element={<CompleteCheckOutPayment />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard/kyc" element={<KYCPage />} />
            <Route path="/dashboard" element={<VendorDashboardLayout></VendorDashboardLayout>}>
              <Route path="" element={<DashboardPage />} />
              <Route path="overview" element={<DashboardPage />} />
              <Route path="products" element={<VendorProductsPage />} />
              <Route path="orders" element={<DashboardOrdersPage />} />
              <Route path="wallet" element={<DashboardWalletPage />} />
              <Route path="profile" element={<DashboardProfilePage />} />
              <Route path="notification" element={<DashboardNotificationPage />} />
            </Route>
          </Route>
        </Routes>
);

export default AppRouter;
