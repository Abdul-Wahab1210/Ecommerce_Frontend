import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/Home";
import RegisterPage from "./pages/Registeruser";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import MyProductsPage from "./pages/MyProductsPage";
import SellerOrdersPage from "./pages/SellerOrdersPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text transition-colors duration-300">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
          <Route path="/seller-orders" element={<SellerOrdersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
