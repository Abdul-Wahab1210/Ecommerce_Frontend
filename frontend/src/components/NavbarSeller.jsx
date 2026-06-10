import { Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react";

export default function NavbarSeller({ location, logout, user, isMobile = false }) {
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Products", path: "/my-products", icon: Package },
    { name: "Orders", path: "/seller-orders", icon: ShoppingBag },
  ];

  if (isMobile) {
    return (
      <>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-navbar-text-muted hover:text-navbar-text hover:bg-secondary"
              }`}
            >
              <Icon size={16} />
              {link.name}
            </Link>
          );
        })}
        <hr className="border-card-border my-2" />
        <div className="px-4 py-2 text-sm text-navbar-text-muted">
          Seller: <span className="font-medium text-navbar-text">{user.name}</span>
        </div>
        <button
          onClick={logout}
          className="w-full mt-1 px-4 py-2.5 rounded-lg text-danger hover:bg-danger-bg font-medium transition-all duration-200"
        >
          Sign Out
        </button>
      </>
    );
  }

  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-navbar-text-muted hover:text-navbar-text hover:bg-secondary"
            }`}
          >
            <Icon size={16} />
            {link.name}
          </Link>
        );
      })}
      <button
        onClick={logout}
        className="px-4 py-2 rounded-lg border border-card-border text-navbar-text-muted hover:text-navbar-text hover:bg-secondary font-medium transition-all duration-200"
      >
        Sign Out
      </button>
    </>
  );
}
