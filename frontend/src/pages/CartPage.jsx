import { useContext, useState } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, clearCart, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [message, setMessage] = useState(null);
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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    api
      .post("/orders", {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      })
      .then(() => {
        clearCart();
        showMessage("Order placed successfully!", "success");
      })
      .catch((err) => {
        console.error(err);
        showMessage("Failed to place order!", "error");
      });
  };

  const incrementQuantity = (item) => {
    if (item.quantity >= item.stock) {
      showMessage(`Cannot exceed available stock (${item.stock})`, "error");
      return;
    }
    updateQuantity(item._id, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item._id);
      showMessage(`${item.name} removed from cart`, "info");
      return;
    }
    updateQuantity(item._id, item.quantity - 1);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-4xl font-bold mb-6 text-slate-800">Cart</h1>

      {/* Inline message */}
      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
          } transition-all duration-300`}
        >
          {message.text}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-4 shadow flex gap-4 items-center"
              >
                <img
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Price: Rs {item.price}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decrementQuantity(item)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <p className="font-bold">Rs {item.price * item.quantity}</p>

                {/* Remove item */}
                <button
                  onClick={() => {
                    removeFromCart(item._id);
                    showMessage(`${item.name} removed from cart`, "info");
                  }}
                  className="text-red-600 hover:text-red-800 transition ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Total: Rs {total}</p>

            <button
              onClick={handleCheckout}
              className="bg-slate-700 text-yellow-300 px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
