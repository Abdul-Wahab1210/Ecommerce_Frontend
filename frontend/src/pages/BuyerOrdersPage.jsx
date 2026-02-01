import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-4xl font-bold mb-6 text-slate-800">My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
            >
              <p className="font-semibold">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </p>

              <p className="mb-4">
                Status:{" "}
                <span className="font-medium text-slate-700">
                  {order.orderStatus}
                </span>
              </p>

              <div className="space-y-4">
                {order.products.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 border-t pt-4"
                  >
                    <img
                      src={item.product.images?.[0] || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm italic text-gray-500">
                        {item.status}
                      </p>
                    </div>
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
