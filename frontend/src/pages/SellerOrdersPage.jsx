import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function SellerOrdersPage() {
  const { user, api, loadingUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdates, setStatusUpdates] = useState({}); // store pending updates

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

  const handleSaveStatus = (orderId, productIndex) => {
    const key = `${orderId}_${productIndex}`;
    const newStatus = statusUpdates[key];
    if (!newStatus) return;

    api
      .patch(`/orders/${orderId}/seller`, { status: newStatus })
      .then((res) => {
        setOrders((prev) =>
          prev.map((order) => {
            if (order._id !== orderId) return order;
            const updatedProducts = order.products.map((p, idx) =>
              idx === productIndex ? { ...p, status: newStatus } : p,
            );
            return {
              ...order,
              products: updatedProducts,
              orderStatus: res.data.orderStatus,
            };
          }),
        );
        setStatusUpdates((prev) => {
          const copy = { ...prev };
          delete copy[key];
          return copy;
        });
      })
      .catch((err) => console.error(err));
  };

  if (loadingUser) return <p>Loading...</p>;
  if (!user || user.role !== "seller") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Seller Orders</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-8 w-8 rounded-full border-4 border-slate-600 border-t-transparent" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm border p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order._id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Buyer</p>
                    <p className="font-medium">{order.buyer?.name || "N/A"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Order Status</p>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y">
                  {order.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4"
                    >
                      {/* Product Info */}
                      <div className="flex gap-4 items-center">
                        <img
                          src={
                            product.product.images?.[0] || "/placeholder.png"
                          }
                          alt={product.product.name}
                          className="h-28 w-28 rounded-lg object-cover border"
                        />

                        <div>
                          <p className="font-semibold">
                            {product.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-sm">
                            Status:{" "}
                            <span className="font-medium">
                              {product.status}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Status Action */}
                      {product.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <select
                            value={
                              statusUpdates[`${order._id}_${idx}`] ||
                              product.status
                            }
                            onChange={(e) =>
                              handleSelectChange(order._id, idx, e.target.value)
                            }
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleSaveStatus(order._id, idx)}
                            className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">
                          Status locked
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
