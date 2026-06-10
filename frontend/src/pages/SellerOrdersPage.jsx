import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SellerOrdersPage() {
  const { user, api, loadingUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [saving, setSaving] = useState(null);

  useEffect(() => {
    if (!loadingUser && user && user.role === "seller") {
      api
        .get("/orders/seller")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loadingUser, user]);

  const handleSelectChange = (orderId, productIndex, value) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [`${orderId}_${productIndex}`]: value,
    }));
  };

  const handleSaveStatus = async (orderId, productIndex) => {
    const key = `${orderId}_${productIndex}`;
    const newStatus = statusUpdates[key];
    if (!newStatus) return;

    setSaving(key);
    try {
      const res = await api.patch(`/orders/${orderId}/seller`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) => {
          if (order._id !== orderId) return order;
          const updatedProducts = order.products.map((p, idx) =>
            idx === productIndex ? { ...p, status: newStatus } : p,
          );
          return { ...order, products: updatedProducts, orderStatus: res.data.orderStatus };
        }),
      );
      setStatusUpdates((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  if (loadingUser) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
  if (!user || user.role !== "seller") return <Navigate to="/" replace />;

  const statusColor = (status) => {
    switch (status) {
      case "completed": return "bg-success-bg text-success";
      case "cancelled": return "bg-danger-bg text-danger";
      default: return "bg-warning-bg text-warning";
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Seller Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Orders containing your products
          </p>
        </div>

        {loading ? (
          <LoadingSpinner height="h-64" />
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} className="text-muted-foreground/40" />
            </div>
            <p className="text-lg font-medium text-foreground">No orders found</p>
            <p className="text-muted-foreground text-sm mt-1">
              Orders will appear here when customers purchase your products
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-sm transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 mb-4 border-b border-card-border">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Order ID</p>
                    <p className="text-sm font-mono text-foreground break-all">{order._id}</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-xs text-muted-foreground">Buyer</p>
                    <p className="text-sm font-medium text-foreground">{order.buyer?.name || "N/A"}</p>
                  </div>
                  <div className="shrink-0">
                    <p className="text-xs text-muted-foreground mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y divide-card-border">
                  {order.products.map((product, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4 items-center">
                        <img
                          src={product.product.images?.[0] || "/placeholder.png"}
                          alt={product.product.name}
                          className="h-16 w-16 rounded-xl object-cover border border-card-border shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{product.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {product.quantity}
                          </p>
                          <span className={`inline-block mt-1 text-xs font-medium ${statusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </div>
                      </div>

                      {product.status === "pending" ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={statusUpdates[`${order._id}_${idx}`] || product.status}
                            onChange={(e) => handleSelectChange(order._id, idx, e.target.value)}
                            className="px-3 py-2 rounded-xl bg-input border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleSaveStatus(order._id, idx)}
                            disabled={saving === `${order._id}_${idx}`}
                            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary-hover disabled:opacity-50 transition-all duration-200"
                          >
                            {saving === `${order._id}_${idx}` ? "Saving..." : "Save"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic shrink-0">
                          Locked
                        </span>
                      )}
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
