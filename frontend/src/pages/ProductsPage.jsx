import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import ProductSearch from "../components/ProductSearch";
import ProductFilters from "../components/ProductFilters";
import LoadingSpinner from "../components/LoadingSpinner";
import { CartContext } from "../context/CartContext";
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // inline notifications
  const { addToCart } = useContext(CartContext);
  const { user, loadingUser } = useContext(AuthContext);

  // Show loading while AuthContext checks user

  // track carousel index per product
  const [carouselIndexes, setCarouselIndexes] = useState({});
  // track selected quantity per product
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        // initialize carousel and quantity states
        const indexes = {};
        const initialQuantities = {};
        res.data.forEach((p) => {
          indexes[p._id] = 0;
          initialQuantities[p._id] = 1; // default quantity
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
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
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
      showMessage(
        `Cannot add more than available stock (${product.stock})`,
        "error",
      );
      return;
    }

    addToCart(product, quantity);
    showMessage(`${product.name} (${quantity}) added to cart`, "success");
  };

  const nextImage = (id, length) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % length,
    }));
  };

  const prevImage = (id, length) => {
    setCarouselIndexes((prev) => ({
      ...prev,
      [id]: prev[id] === 0 ? length - 1 : prev[id] - 1,
    }));
  };

  const incrementQuantity = (id, stock) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 1) + 1, stock),
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-4xl font-bold mb-6 text-slate-800">Products</h1>

      {/* Inline message */}
      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          } transition-all duration-300`}
        >
          {message.text}
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <ProductSearch value={search} onChange={setSearch} />
        <ProductFilters
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <LoadingSpinner height="h-64" />
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus =
              product.stock === 0
                ? "Out of stock"
                : product.stock < 5
                  ? "Low stock"
                  : "In stock";

            const currentIndex = carouselIndexes[product._id] || 0;
            const quantity = quantities[product._id] || 1;

            return (
              <div
                key={product._id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition hover:-translate-y-1"
              >
                {/* Image Carousel */}
                <div className="relative">
                  <img
                    src={product.images[currentIndex]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          prevImage(product._id, product.images.length)
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition text-black"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() =>
                          nextImage(product._id, product.images.length)
                        }
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition text-black"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>

                {/* Product Info */}
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="mt-1 font-medium">Rs {product.price}</p>

                {/* Stock Info */}
                <span
                  className={`inline-block text-xs px-2 py-1 mt-2 rounded ${
                    stockStatus === "Out of stock"
                      ? "bg-red-100 text-red-700"
                      : stockStatus === "Low stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {stockStatus} ({product.stock})
                </span>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => decrementQuantity(product._id)}
                    disabled={quantity <= 1}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-2">{quantity}</span>
                  <button
                    onClick={() =>
                      incrementQuantity(product._id, product.stock)
                    }
                    disabled={quantity >= product.stock}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`mt-3 w-full py-2 rounded-lg text-white font-semibold transition transform duration-200 ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-900 hover:scale-105"
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
