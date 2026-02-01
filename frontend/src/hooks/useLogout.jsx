import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    // Clear auth state
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Redirect to homepage
    navigate("/", { replace: true });
  }, [setUser, navigate]);

  return logout;
};
