export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.images?.[0] || "/placeholder.png"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-slate-700">
            Rs {product.price}
          </span>

          <button className="px-3 py-1 rounded bg-slate-700 text-yellow-300 hover:bg-slate-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
