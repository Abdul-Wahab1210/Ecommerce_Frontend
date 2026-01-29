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
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Description */}
        <div className="flex flex-col gap-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="Name"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600 resize-none h-24"
            placeholder="Description"
          />
        </div>

        {/* Price and Stock in a row */}
        <div className="md:flex gap-3 space-y-4">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="Price"
          />

          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="Stock"
          />
        </div>

        {/* Category */}
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
          placeholder="Category"
        />

        <button className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition">
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default EditProductModal;
