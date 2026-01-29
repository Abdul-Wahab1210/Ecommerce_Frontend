import { useEffect, useState } from "react";
import axiosPrivate from "../api/axiosPrivate";
import SellerProductCard from "../components/SellerProductCard";

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axiosPrivate.get("/products/dashboard");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <SellerProductCard
              key={product._id}
              product={product}
              refresh={fetchProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProductsPage;
