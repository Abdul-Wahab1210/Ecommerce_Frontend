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
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">Seller Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <p>
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p>
                <span className="font-semibold">Buyer:</span>{" "}
                {order.buyer?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                {order.orderStatus}
              </p>

              <div className="mt-2 space-y-2">
                {order.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 justify-between border-b pb-2"
                  >
                    <div>
                      <p>
                        <span className="font-semibold">Product:</span>{" "}
                        {product.product.name}
                      </p>
                      <p>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {product.quantity}
                      </p>
                      <p>
                        <span className="font-semibold">Current Status:</span>{" "}
                        {product.status}
                      </p>
                    </div>

                    {/* Only allow status change if pending */}
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
                          className="border rounded p-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleSaveStatus(order._id, idx)}
                          className="bg-slate-600 text-white px-3 py-1 rounded hover:bg-slate-700 transition"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Status locked</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
