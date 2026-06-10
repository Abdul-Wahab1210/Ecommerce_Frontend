import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const { login, api } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data);
      if (res.data.user.role === "seller") navigate("/dashboard");
      else navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Brand */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm">
            <ShoppingCart size={18} />
          </div>
          <span className="text-lg font-bold text-foreground">Cartly</span>
        </Link>

        <div className="bg-card border border-card-border rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
            <p className="text-muted-foreground text-sm mt-1">Join Cartly today</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-danger-bg text-danger text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center justify-center gap-1.5 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
