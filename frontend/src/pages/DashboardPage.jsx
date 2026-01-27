import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, loadingUser } = useContext(AuthContext);

  // Wait until AuthContext finishes loading
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not logged in or not a seller
  if (!user || user.role !== "seller") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col justify-center items-center">
      <motion.h1
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome, {user.name}
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Link
          to="/my-products"
          className="bg-white rounded-lg shadow-lg p-10 w-80 flex flex-col items-center justify-center hover:shadow-xl transition-transform transform hover:-translate-y-2"
        >
          <h2 className="text-3xl font-bold mb-4">My Products</h2>
          <p className="text-lg text-gray-600 text-center">
            View and manage all products you have listed.
          </p>
        </Link>

        <Link
          to="/seller-orders"
          className="bg-white rounded-lg shadow-lg p-10 w-80 flex flex-col items-center justify-center hover:shadow-xl transition-transform transform hover:-translate-y-2"
        >
          <h2 className="text-3xl font-bold mb-4">Orders</h2>
          <p className="text-lg text-gray-600 text-center">
            See all orders containing your products and update their status.
          </p>
        </Link>
      </motion.div>
    </div>
  );
}
