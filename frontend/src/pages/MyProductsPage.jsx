import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function MyProductsPage() {
  const { user, api, loadingUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Wait for auth context to load
  useEffect(() => {
    if (!loadingUser && user && user.role === "seller") {
      api
        .get("/products/dashboard")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // prevent infinite loading
    }
  }, [loadingUser, user]);

  if (loadingUser) return <p>Loading...</p>;

  if (!user || user.role !== "seller") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6">My Products</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
