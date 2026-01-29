import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

import NavbarSignedOut from "./NavbarSignedOut";
import NavbarBuyer from "./NavbarBuyer";
import NavbarSeller from "./NavbarSeller";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

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
            {!user && <NavbarSignedOut location={location} />}
            {user && user.role === "buyer" && (
              <NavbarBuyer location={location} logout={logout} user={user} />
            )}
            {user && user.role === "seller" && (
              <NavbarSeller location={location} logout={logout} user={user} />
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
        <div className="md:hidden bg-linear-to-br from-slate-600 to-slate-800 border-t border-slate-700">
          <ul className="flex flex-col p-4 space-y-2">
            {!user && <NavbarSignedOut location={location} isMobile />}
            {user && user.role === "buyer" && (
              <NavbarBuyer
                location={location}
                logout={logout}
                user={user}
                isMobile
              />
            )}
            {user && user.role === "seller" && (
              <NavbarSeller
                location={location}
                logout={logout}
                user={user}
                isMobile
              />
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
