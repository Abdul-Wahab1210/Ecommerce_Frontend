import { Link } from "react-router-dom";

export default function NavbarSignedOut({ location, isMobile = false }) {
  const links = [
    { name: "Login", path: "/auth/login" },
    { name: "Register", path: "/auth/register" },
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
    </>
  );
}
