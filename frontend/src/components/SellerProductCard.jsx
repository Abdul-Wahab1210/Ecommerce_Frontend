import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditProductModal from "./EditProductModal";
import axiosPrivate from "../api/axiosPrivate";
import ImageCarousel from "./ImageCarousel";

const SellerProductCard = ({ product, refresh }) => {
  const [editOpen, setEditOpen] = useState(false);

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

  const stockColor =
    product.stock === 0
      ? "bg-danger-bg text-danger"
      : product.stock < 5
        ? "bg-warning-bg text-warning"
        : "bg-success-bg text-success";

  return (
    <div className="bg-card border border-card-border rounded-2xl p-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
      <ImageCarousel images={product.images} className="mb-3" />

      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
        {product.description}
      </p>
      <p className="mt-2 font-bold text-foreground">Rs {product.price}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${stockColor}`}>
            {stockStatus}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditOpen(true)}
            title="Edit product"
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <FaEdit size={15} />
          </button>
          <button
            onClick={deleteProduct}
            title="Delete product"
            className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-danger hover:bg-danger-bg transition-all duration-200"
          >
            <FaTrash size={15} />
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
