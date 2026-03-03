import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PickRole } from "./pages/PickRole";
import "./App.css"; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman utama adalah login */}
        <Route path="/" element={<SignInPage />} />

        {/* Pastikan path ini sesuai dengan Link yang kamu klik */}
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/PickRole" element={<PickRole />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;