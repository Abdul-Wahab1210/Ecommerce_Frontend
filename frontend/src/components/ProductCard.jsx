import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">Rs {product.price}</span>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-all duration-300">
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
