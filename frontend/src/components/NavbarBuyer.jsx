import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function NavbarBuyer({
  location,
  logout,
  user,
  isMobile = false,
}) {
  const links = [
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={16} /> },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-3 py-2 rounded-md font-medium transition flex items-center gap-1 ${
            location.pathname === link.path
              ? "bg-slate-700 text-yellow-300"
              : "text-slate-100 hover:bg-slate-700/50 hover:text-yellow-200"
          }`}
        >
          {link.icon && link.icon}
          {link.name}
        </Link>
      ))}

      {!user.isSeller && (
        <Link
          to="/upgrade"
          className={`px-3 py-2 rounded-md font-medium transition ${
            location.pathname === "/upgrade"
              ? "bg-slate-700 text-yellow-300"
              : "text-slate-100 hover:bg-slate-700/50 hover:text-yellow-200"
          }`}
        >
          Upgrade to Seller
        </Link>
      )}

      <button
        onClick={logout}
        className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition"
      >
        Logout
      </button>
    </>
  );
}
