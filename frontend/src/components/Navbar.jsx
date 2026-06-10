import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Moon, Sun } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

import NavbarSignedOut from "./NavbarSignedOut";
import NavbarBuyer from "./NavbarBuyer";
import NavbarSeller from "./NavbarSeller";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <nav className="fixed w-full z-50 top-0 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm group-hover:shadow-md transition-all duration-300">
              <ShoppingCart size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-navbar-text">
              Cartly
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1.5">
            {!user && <NavbarSignedOut location={location} />}
            {user && user.role === "buyer" && (
              <NavbarBuyer location={location} logout={logout} user={user} />
            )}
            {user && user.role === "seller" && (
              <NavbarSeller location={location} logout={logout} user={user} />
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="ml-2 p-2 rounded-lg text-navbar-text-muted hover:text-navbar-text hover:bg-secondary transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-navbar-text-muted hover:text-navbar-text hover:bg-secondary transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-navbar-text-muted hover:text-navbar-text hover:bg-secondary transition-all duration-200"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-card-border animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {!user && <NavbarSignedOut location={location} isMobile />}
            {user && user.role === "buyer" && (
              <NavbarBuyer location={location} logout={logout} user={user} isMobile />
            )}
            {user && user.role === "seller" && (
              <NavbarSeller location={location} logout={logout} user={user} isMobile />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
