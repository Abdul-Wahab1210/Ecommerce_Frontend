import { Search } from "lucide-react";

export default function ProductSearch({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200"
      />
    </div>
  );
}
