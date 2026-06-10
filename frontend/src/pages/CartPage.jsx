import { useContext, useState } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cartItems, clearCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [message, setMessage] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const { user, loadingUser } = useContext(AuthContext);

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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setCheckingOut(true);
    try {
      await api.post("/orders", {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
      });
      clearCart();
      showMessage("Order placed successfully!", "success");
    } catch (err) {
      console.error(err);
      showMessage("Failed to place order. Please try again.", "error");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cart</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                showMessage("Cart cleared", "info");
              }}
              className="text-sm text-danger hover:text-danger/80 font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in ${
              message.type === "error"
                ? "bg-danger-bg text-danger"
                : message.type === "success"
                  ? "bg-success-bg text-success"
                  : "bg-info-bg text-info"
            }`}
          >
            {message.text}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <ShoppingCart size={32} className="text-muted-foreground/40" />
            </div>
            <p className="text-lg font-medium text-foreground">Your cart is empty</p>
            <p className="text-muted-foreground text-sm mt-1 mb-6">
              Looks like you haven't added anything yet
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all duration-300 shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-card border border-card-border rounded-2xl p-4 flex gap-4 items-center hover:shadow-sm transition-shadow duration-200 animate-fade-in"
                >
                  <img
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Rs {item.price} each
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) {
                            removeFromCart(item._id);
                            showMessage(`${item.name} removed`, "info");
                            return;
                          }
                          updateQuantity(item._id, item.quantity - 1);
                        }}
                        className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-all duration-200"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => {
                          if (item.quantity >= item.stock) {
                            showMessage(`Cannot exceed stock (${item.stock})`, "error");
                            return;
                          }
                          updateQuantity(item._id, item.quantity + 1);
                        }}
                        className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-all duration-200"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-bold text-foreground">Rs {item.price * item.quantity}</p>
                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        showMessage(`${item.name} removed`, "info");
                      }}
                      className="mt-2 text-muted-foreground hover:text-danger transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card border border-card-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">Rs {total}</span>
              </div>
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-success font-medium">Free</span>
              </div>
              <hr className="border-card-border mb-4" />
              <div className="flex items-center justify-between mb-6">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-lg font-bold text-foreground">Rs {total}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-lg shadow-primary/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {checkingOut ? "Processing..." : "Place Order"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
