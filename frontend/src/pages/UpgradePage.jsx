import { useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Sparkles, TrendingUp, Package, Check } from "lucide-react";

const benefits = [
  "List unlimited products",
  "Manage inventory and stock",
  "Track orders and update statuses",
  "Dashboard with sales insights",
];

export default function UpgradePage() {
  const { setUser, user, loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "seller") {
    return <Navigate to="/dashboard" replace />;
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
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-lg animate-scale-in">
        <div className="bg-card border border-card-border rounded-2xl p-8 sm:p-10 shadow-lg text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={32} className="text-amber-600 dark:text-amber-400" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Become a Seller</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Start listing products and managing orders on Cartly.
          </p>

          <ul className="text-left space-y-3 mb-8">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Check size={18} className="text-success shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{b}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            className="w-full py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <TrendingUp size={18} />
            Upgrade Now
          </button>

          <p className="text-xs text-muted-foreground mt-4">
            You can switch back to a buyer account anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
