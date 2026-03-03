import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PickRole } from "./pages/PickRole";
import { MerchantDashboard } from "./pages/MerchantDashboard";
import { ConsumerDashboard } from "./pages/ConsumerDashboard";
import "./App.css"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/PickRole" element={<PickRole />} />
        
        {/* Halaman Dashboard sesuai Role */}
        <Route path="/ConsumerDashboard" element={<ConsumerDashboard />} />
        <Route path="/MerchantDashboard" element={<MerchantDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;