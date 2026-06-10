import { SlidersHorizontal } from "lucide-react";

export default function ProductFilters({ categories, value, onChange }) {
  return (
    <div className="relative">
      <SlidersHorizontal size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-48 pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
