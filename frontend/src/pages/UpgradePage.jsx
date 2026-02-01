import { useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function UpgradePage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user, loadingUser } = useContext(AuthContext);

  // Show loading while AuthContext checks user
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleUpgrade = () => {
    api
      .put("/auth/upgrade")
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/dashboard");
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Become a Seller</h1>

        <p className="text-gray-600 mb-6">
          Start listing products and managing orders by upgrading your account.
        </p>

        <button
          onClick={handleUpgrade}
          className="bg-slate-700 text-yellow-200 px-6 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
