import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import ProductSearch from "../components/ProductSearch";
import ProductFilters from "../components/ProductFilters";
import LoadingSpinner from "../components/LoadingSpinner";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user, loadingUser } = useContext(AuthContext);
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [quantities, setQuantities] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        const indexes = {};
        const initialQuantities = {};
        res.data.forEach((p) => {
          indexes[p._id] = 0;
          initialQuantities[p._id] = 1;
        });
        setCarouselIndexes(indexes);
        setQuantities(initialQuantities);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    if (quantity > product.stock) {
      showMessage(`Cannot add more than available stock (${product.stock})`, "error");
      return;
    }
    addToCart(product, quantity);
    showMessage(`${product.name} (${quantity}) added to cart`, "success");
  };

  const nextImage = (id, length) => {
    setCarouselIndexes((prev) => ({ ...prev, [id]: (prev[id] + 1) % length }));
  };

  const prevImage = (id, length) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? length - 1 : prev[id] - 1,
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-card-border text-foreground font-medium hover:bg-secondary transition-all duration-200"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Search + Filters */}
        <div className={`${showFilters ? "flex" : "hidden"} sm:flex flex-col sm:flex-row gap-3 mb-8`}>
          <ProductSearch value={search} onChange={setSearch} />
          <ProductFilters categories={categories} value={category} onChange={setCategory} />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in ${
              message.type === "error"
                ? "bg-danger-bg text-danger"
                : "bg-success-bg text-success"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <LoadingSpinner height="h-64" />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Search size={40} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const stockStatus =
                product.stock === 0
                  ? "Out of stock"
                  : product.stock < 5
                    ? "Low stock"
                    : "In stock";

              const stockColor =
                product.stock === 0
                  ? "bg-danger-bg text-danger"
                  : product.stock < 5
                    ? "bg-warning-bg text-warning"
                    : "bg-success-bg text-success";

              const currentIndex = carouselIndexes[product._id] || 0;
              const quantity = quantities[product._id] || 1;

              return (
                <div
                  key={product._id}
                  className="group bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={product.images[currentIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(product._id, product.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition-all duration-200 shadow-sm"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => nextImage(product._id, product.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition-all duration-200 shadow-sm"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${stockColor}`}>
                      {stockStatus}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">Rs {product.price}</span>

                      {/* Quantity */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            setQuantities((prev) => ({
                              ...prev,
                              [product._id]: Math.max((prev[product._id] || 1) - 1, 1),
                            }))
                          }
                          disabled={quantity <= 1}
                          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 disabled:opacity-40 transition-all duration-200"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">{quantity}</span>
                        <button
                          onClick={() =>
                            setQuantities((prev) => ({
                              ...prev,
                              [product._id]: Math.min((prev[product._id] || 1) + 1, product.stock),
                            }))
                          }
                          disabled={quantity >= product.stock}
                          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 disabled:opacity-40 transition-all duration-200"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md"
                    >
                      <ShoppingCart size={16} />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
