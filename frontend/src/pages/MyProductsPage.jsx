import { useEffect, useState, useContext } from "react";
import axiosPrivate from "../api/axiosPrivate";
import SellerProductCard from "../components/SellerProductCard";
import CreateProductModal from "../components/CreateProductModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const MyProductsPage = () => {
  const { user, loadingUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get("/products/dashboard");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Wait until user loading finishes
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
    <div className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex-row gap-y-4 md:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Products</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            + Create New Product
          </button>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <SellerProductCard
                key={product._id}
                product={product}
                refresh={fetchProducts}
              />
            ))}
          </div>
        )}

        <CreateProductModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreated={fetchProducts}
        />
      </div>
    </div>
  );
};

export default MyProductsPage;
