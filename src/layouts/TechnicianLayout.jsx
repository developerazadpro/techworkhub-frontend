import { Navigate, Outlet } from "react-router-dom";
import { Home, Briefcase, CheckCircle, User } from "lucide-react";
import BaseLayout from "./BaseLayout";
import { useLogout } from "../hooks/useLogout";

export default function TechnicianLayout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = useLogout();

  if (!user || user.role !== "technician") {
    return <Navigate to="/login" replace />;
  }

  return (
    <BaseLayout
      onLogout={logout}
      sidebarLinks={[
        { to: "/technician", end: true, icon: <Home size={20} />, label: "Dashboard" },
        { to: "/technician/jobs", icon: <Briefcase size={20} />, label: "Jobs" },
        { to: "/technician/my-jobs", icon: <CheckCircle size={20} />, label: "My Jobs", },
        { to: "/technician/profile", icon: <User size={20} />, label: "Profile", },
      ]}
    >
      <Outlet />
    </BaseLayout>
  );
}
