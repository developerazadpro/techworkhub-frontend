import { NavLink, Outlet, useLocation, matchPath } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function BaseLayout({
  sidebarLinks = [],
  onLogout,
}) {
  const location = useLocation();

  const titles = [
    { path: "/technician", title: "Dashboard" },
    { path: "/technician/jobs", title: "Jobs" },
    { path: "/technician/my-jobs", title: "My Jobs" },
    { path: "/technician/job/:id", title: "Job Details" },

    { path: "/client/dashboard", title: "Dashboard" },
    { path: "/client/create-job", title: "Create Job" },
    { path: "/client/my-jobs", title: "My Jobs" },
  ];

  const pageTitle =
    titles.find(({ path }) =>
      matchPath({ path, end: true }, location.pathname)
    )?.title || "TechWorkHub";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
    }
  };
  return (
    <div className="flex min-h-screen bg-brand-light text-[#1f2937]">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-brand-border flex flex-col">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-brand-border">
          <h1 className="text-2xl font-semibold text-brand-green">
            TechWorkHub
          </h1>
          <p className="text-xs text-brand-gray mt-1">
            Job Matching Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1 flex-1">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-brand-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-brand-border flex items-center px-10">
          <h2 className="text-xl font-semibold tracking-tight">
            {pageTitle}
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-10 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
          isActive
            ? "bg-brand-accent text-brand-green"
            : "text-[#374151] hover:bg-[#f1f3f5]"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
