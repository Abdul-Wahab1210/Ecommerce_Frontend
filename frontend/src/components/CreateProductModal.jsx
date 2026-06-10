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
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-foreground mb-4">Create New Product</h2>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-danger-bg text-danger text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200"
          placeholder="Product Name"
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

        <div className="border-2 border-dashed border-card-border rounded-xl p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <AiOutlinePlus size={24} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {images.length > 0
                ? `${images.length} image${images.length > 1 ? "s" : ""} selected`
                : "Add Images"}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {Array.from(images).map((file, idx) => (
                <span
                  key={idx}
                  className="bg-secondary text-muted-foreground text-xs px-2.5 py-1 rounded-lg truncate max-w-[140px]"
                >
                  {file.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-sm transition-all duration-300"
        >
          Create Product
        </button>
      </form>
    </Modal>
  );
};

export default CreateProductModal;
