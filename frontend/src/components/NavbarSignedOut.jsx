import { Link } from "react-router-dom";

export default function NavbarSignedOut({ location, isMobile = false }) {
  if (isMobile) {
    return (
      <>
        <Link
          to="/auth/login"
          className="block px-4 py-2.5 rounded-lg text-navbar-text-muted hover:text-navbar-text hover:bg-secondary transition-all duration-200 font-medium"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="block px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all duration-200 text-center"
        >
          Get Started
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        to="/auth/login"
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          location.pathname === "/auth/login"
            ? "bg-primary/10 text-primary"
            : "text-navbar-text-muted hover:text-navbar-text hover:bg-secondary"
        }`}
      >
        Login
      </Link>
      <Link
        to="/auth/register"
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all duration-200 shadow-sm hover:shadow-md"
      >
        Get Started
      </Link>
    </>
  );
}
