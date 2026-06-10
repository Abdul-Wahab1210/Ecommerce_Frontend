import { useState } from "react";
import Modal from "./Modal";
import axiosPrivate from "../api/axiosPrivate";

const EditProductModal = ({ product, isOpen, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosPrivate.put(`/products/${product._id}`, formData);
    onUpdated();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-foreground mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          placeholder="Name"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none h-24 transition-all duration-200"
          placeholder="Description"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            placeholder="Price"
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
            placeholder="Stock"
          />
        </div>

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          placeholder="Category"
        />

        <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-sm transition-all duration-300">
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default EditProductModal;
