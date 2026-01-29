import { Link } from "react-router-dom";

export default function NavbarSeller({ location, logout, isMobile = false }) {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Products", path: "/my-products" },
    { name: "Orders", path: "/seller-orders" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`px-3 py-2 rounded-md font-medium transition ${
            location.pathname === link.path
              ? "bg-slate-700 text-yellow-300"
              : "text-slate-100 hover:bg-slate-700/50 hover:text-yellow-200"
          }`}
        >
          {link.name}
        </Link>
      ))}

      <button
        onClick={logout}
        className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition"
      >
        Logout
      </button>
    </>
  );
}
