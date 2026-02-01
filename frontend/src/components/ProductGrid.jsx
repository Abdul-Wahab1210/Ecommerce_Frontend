import ImageCarousel from "./ImageCarousel";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <ImageCarousel images={product.images} />

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-slate-800">
                Rs. {product.price}
              </span>
              <button className="bg-slate-700 text-yellow-300 px-3 py-1 rounded hover:bg-slate-800 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
