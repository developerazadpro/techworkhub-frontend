import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function RootRedirect() {
  const { user, loading } = useAuth();  

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "technician") {
    return <Navigate to="/technician" replace />;
  }

  if (user.role === "client") {
    return <Navigate to="/client" replace />;
  }

  return <Navigate to="/login" replace />;
}
