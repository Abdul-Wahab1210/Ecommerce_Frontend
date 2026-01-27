import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-linear-to-l from-slate-600 to-slate-800 shadow-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 shadow-md">
              <ShoppingCart size={20} />
            </div>
            <span className="text-xl font-bold text-slate-100">Cartly</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md font-medium transition   ${
                  location.pathname === link.path
                    ? "bg-slate-700 text-yellow-300"
                    : "text-slate-100 hover:bg-slate-700/50 hover:text-yellow-200"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            {!user && (
              <>
                <Link
                  to="/auth/login"
                  className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-3 py-2 rounded-md bg-slate-400 text-black font-semibold hover:bg-slate-500 hover:font-extrabold transition"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
                {user.role === "buyer" && (
                  <>
                    <Link
                      to="/cart"
                      className="px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition flex items-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      Cart
                    </Link>
                    <Link
                      to="/orders"
                      className="px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                    >
                      Orders
                    </Link>
                    {!user.isSeller && (
                      <Link
                        to="/upgrade"
                        className="px-3 py-2 rounded-md bg-rose-200 text-rose-800 font-semibold hover:bg-rose-300 transition"
                      >
                        Upgrade to Seller
                      </Link>
                    )}
                  </>
                )}
                {user.role === "seller" && (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-products"
                      className="px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                    >
                      My Products
                    </Link>
                    <Link
                      to="/seller-orders"
                      className="px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                    >
                      Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-100 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-linearto-br from-slate-600 to-slate-800 border-t border-slate-700">
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition ${
                    location.pathname === link.path
                      ? "bg-slate-700 text-yellow-300"
                      : "text-slate-100 hover:bg-slate-700/50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {!user && (
              <>
                <li>
                  <Link
                    to="/auth/login"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 rounded-md bg-slate-400 text-black font-semibold hover:bg-slate-600 transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                {user.role === "buyer" && (
                  <>
                    <li>
                      <Link
                        to="/cart"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition flex items-center gap-1"
                      >
                        <ShoppingCart size={16} />
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                      >
                        Orders
                      </Link>
                    </li>
                    {!user.isSeller && (
                      <li>
                        <Link
                          to="/upgrade"
                          onClick={() => setOpen(false)}
                          className="block px-3 py-2 rounded-md bg-rose-200 text-rose-800 font-semibold hover:bg-rose-300 transition"
                        >
                          Upgrade to Seller
                        </Link>
                      </li>
                    )}
                  </>
                )}

                {user.role === "seller" && (
                  <>
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-products"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                      >
                        My Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/seller-orders"
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 rounded-md text-slate-100 font-medium hover:bg-slate-700/50 transition"
                      >
                        Orders
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="block px-3 py-2 rounded-md bg-slate-100 text-slate-800 font-semibold hover:bg-slate-200 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
