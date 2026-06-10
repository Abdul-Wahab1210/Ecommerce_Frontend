import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loadingUser } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <LoadingSpinner height="h-64" />
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-muted-foreground/40" />
            </div>
            <p className="text-lg font-medium text-foreground">No orders yet</p>
            <p className="text-muted-foreground text-sm mt-1 mb-6">
              Start shopping to see your orders here
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all duration-300 shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-card border border-card-border rounded-2xl p-5 hover:shadow-sm transition-shadow duration-200"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-4 border-b border-card-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Order</p>
                    <p className="text-sm font-mono text-foreground break-all">{order._id}</p>
                  </div>
                  <span
                    className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus === "completed"
                        ? "bg-success-bg text-success"
                        : order.orderStatus === "cancelled"
                          ? "bg-danger-bg text-danger"
                          : "bg-warning-bg text-warning"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {/* Products */}
                <div className="space-y-3">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img
                        src={item.product.images?.[0] || "/placeholder.png"}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground capitalize">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
