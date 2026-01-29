import { useState } from "react";
import { FaTrash, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import axiosPrivate from "../api/axiosPrivate";

const SellerProductCard = ({ product, refresh }) => {
  const [index, setIndex] = useState(0);
  const [editOpen, setEditOpen] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % product.images.length);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));

  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    await axiosPrivate.delete(`/products/${product._id}`);
    refresh();
  };

  const stockStatus =
    product.stock === 0
      ? "Out of stock"
      : product.stock < 5
        ? "Low stock"
        : "In stock";

  return (
    <div className=" rounded-xl p-4 relative bg-slate-50 shadow hover:shadow-lg transition">
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={product.images[index]}
          className="w-full h-48 object-cover rounded-lg"
        />

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Product Info */}
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-1 font-medium">Rs {product.price}</p>

      {/* Stock + Actions Row */}
      <div className="mt-3 flex items-center justify-between">
        {/* Stock info */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">In stock: {product.stock}</span>

          <span
            className={`text-xs px-2 py-1 rounded ${
              stockStatus === "Out of stock"
                ? "bg-red-100 text-red-700"
                : stockStatus === "Low stock"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {stockStatus}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          <button onClick={() => setEditOpen(true)} title="Edit product">
            <FaEdit
              size={20}
              className="text-blue-600 hover:scale-110 transition"
            />
          </button>

          <button onClick={deleteProduct} title="Delete product">
            <FaTrash
              size={20}
              className="text-red-600 hover:scale-110 transition"
            />
          </button>
        </div>
      </div>

      <EditProductModal
        product={product}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onUpdated={refresh}
      />
    </div>
  );
};

export default SellerProductCard;
