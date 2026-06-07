import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute"; // Sesuaikan folder jika berbeda

import { Login } from "./pages/LoginPage";
import { Register } from "./pages/RegisterPage";
import { PickRole } from "./pages/PickRole";
import ExploreConsumer from "./pages/Consumer/ExploreConsumer";
import ExploreMerchant from "./pages/Merchant/ExploreMerchant";
import ImpactConsumer from "./pages/Consumer/ImpactConsumer";
import CartFlow from "./components/Consumer/ConsumerCart/ConsumerCart";
import ProfileConsumer from "./components/Consumer/ProfileConsumer/ProfileConsumer";
import NavbarConsumer from "./components/Consumer/ConsumerNavbar/NavbarConsumer";
import { MerchantDashboard } from "./pages/Merchant/MerchantDashboard";
import DashboardPage from "./pages/Consumer/DashboardConsumer";
import { ConsumerFoodDetail } from "./pages/Consumer/ConsumerFoodDetail";
import ReviewOrderPage from "./pages/Consumer/ReviewOrderPage";
import LandingPage from "./pages/LandingPage";

// Wrapper untuk Consumer Cart Page 
function ConsumerCartPage() {
  const [activePage, setActivePage] = useState("cart");
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={0} />
      <CartFlow />
    </div>
  );
}

// Wrapper untuk Consumer Profile Page
function ConsumerProfilePage() {
  const [activePage, setActivePage] = useState("profile");
  return (
    <div className="min-h-screen bg-slate-50">
      <NavbarConsumer activePage={activePage} setActivePage={setActivePage} cartCount={0} />
      <ProfileConsumer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Food-Waste" element={<LandingPage />} />
        {/* Authentication Routes  */}
        <Route path="/LoginPage" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegisterPage" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PickRole" element={<PickRole />} />
        {/* Customer Routes  */}
        <Route path="/DashboardConsumer" element={<DashboardPage />} />
        <Route path="/CartConsumer" element={<ConsumerCartPage />} />
        <Route path="/ProfileConsumer" element={<ConsumerProfilePage />} />
        <Route path="/ExploreConsumer" element={<ExploreConsumer />} />
        <Route path="/ImpactConsumer" element={<ImpactConsumer />} />
        <Route path="/food-detail/:id" element={<ConsumerFoodDetail />} />
        <Route path="/order-review/:orderId" element={<ReviewOrderPage />} />

        {/* Merchant Routes  */}
        <Route path="/ExploreMerchant" element={<ExploreMerchant />} />
        <Route path="/MerchantDashboard" element={<MerchantDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;