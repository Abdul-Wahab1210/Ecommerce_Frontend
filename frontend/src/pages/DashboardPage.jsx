import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user, loadingUser } = useContext(AuthContext);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {user.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your store from one place
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            to="/my-products"
            className="group bg-card border border-card-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <Package size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">My Products</h2>
            <p className="text-muted-foreground text-sm mb-4">
              View, add, edit, or remove your product listings.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              Manage Products <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            to="/seller-orders"
            className="group bg-card border border-card-border rounded-2xl p-8 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
              <ShoppingBag size={24} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Orders</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Track and update order statuses for your products.
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
              View Orders <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
