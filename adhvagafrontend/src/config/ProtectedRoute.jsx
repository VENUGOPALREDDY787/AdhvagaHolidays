import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "./api";

const ProtectedRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      if (!token) {
        if (!cancelled) {
          setIsAuthorized(false);
          setIsChecking(false);
        }
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/admin/verify-admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cancelled) {
          setIsAuthorized(response.ok);
          if (!response.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("admin_email");
          }
        }
      } catch {
        if (!cancelled) {
          setIsAuthorized(false);
        }
      } finally {
        if (!cancelled) {
          setIsChecking(false);
        }
      }
    };

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (isChecking) {
    return <div style={{ minHeight: "100vh", background: "#041629" }} />;
  }

  if (!token || !isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
