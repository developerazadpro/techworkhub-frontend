import { Navigate, Outlet } from "react-router-dom";
import { Home, PlusCircle, Briefcase, User } from "lucide-react";
import BaseLayout from "./BaseLayout";
import { useLogout } from "../hooks/useLogout";

export default function ClientLayout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = useLogout();

  if (!user || user.role !== "client") {
    return <Navigate to="/login" replace />;
  }

  return (
    <BaseLayout
      onLogout={logout}
      sidebarLinks={[
        { to: "/client", end: true, icon: <Home size={20} />, label: "Dashboard" },
        { to: "/client/create-job", icon: <PlusCircle size={20} />, label: "Create Job", },
        { to: "/client/my-jobs", icon: <Briefcase size={20} />, label: "My Jobs", },
        { to: "/client/profile", icon: <User size={20} />, label: "Profile", },
      ]}
    >
      <Outlet />
    </BaseLayout>
  );
}
