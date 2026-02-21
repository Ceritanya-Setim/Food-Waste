import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { SignInPage } from "./pages/SignInPage";
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;