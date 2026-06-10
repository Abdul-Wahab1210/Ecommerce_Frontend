import { useEffect, useState, useContext } from "react";
import axiosPrivate from "../api/axiosPrivate";
import SellerProductCard from "../components/SellerProductCard";
import CreateProductModal from "../components/CreateProductModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Products</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {products.length} product{products.length !== 1 ? "s" : ""} listed
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Plus size={18} />
            New Product
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSpinner height="h-64" />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-muted-foreground/40" />
            </div>
            <p className="text-lg font-medium text-foreground">No products yet</p>
            <p className="text-muted-foreground text-sm mt-1 mb-6">
              Create your first product to start selling
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all duration-300 shadow-sm"
            >
              <Plus size={18} />
              Create Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
