import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import axiosPrivate from "../api/axiosPrivate";

const CreateProductModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.category ||
      images.length === 0
    ) {
      setError("All fields including images are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    images.forEach((img) => data.append("images", img));

    try {
      await axiosPrivate.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreated();
      onClose();
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "General",
      });
      setImages([]);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl w-full overflow-y-auto "
    >
      <h2 className="text-xl font-semibold mb-4">Create New Product</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Description */}
        <div className="flex flex-col gap-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="Product Name"
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
        <div className="md:flex gap-3">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
            placeholder="Price"
          />

          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="w-1/2 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
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

        {/* Images */}
        <div className="border rounded-lg p-3 flex flex-col gap-2 cursor-pointer hover:bg-slate-50 transition">
          <label className="flex items-center gap-2 cursor-pointer">
            <AiOutlinePlus size={20} className="text-slate-600" />
            <span className="text-slate-600">Add Images ({images.length})</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from(images).map((file, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 px-2 py-1 rounded text-sm"
                >
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition"
        >
          Create Product
        </button>
      </form>
    </Modal>
  );
};

export default CreateProductModal;
