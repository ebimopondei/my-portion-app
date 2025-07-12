import {  Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import RegisterBuyer from "./pages/register-buyer";
import RegisterVendor from "./pages/register-vendor";
import HomePage from "./pages/home";

const AppRouter = () => (
  
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/buyer" element={<RegisterBuyer />} />
          <Route path="/register/vendor" element={<RegisterVendor />} />
        </Routes>
);

export default AppRouter;
