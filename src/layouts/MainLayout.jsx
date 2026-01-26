// import { NavLink, Outlet, useLocation, matchPath } from "react-router-dom";
// import { Home, Briefcase, PlusCircle, CheckCircle, LogOut } from "lucide-react";
// import { useAuth } from "../contexts/AuthContext";
// import { useLogout } from "../hooks/useLogout";

// export default function MainLayout() {
//   const location = useLocation();
//   const { user } = useAuth();
//   const logout = useLogout();

//   const titles = [
//     { path: "/", title: "Dashboard" },
    
//     { path: "/jobs", title: "Jobs" },
//     { path: "/my-jobs", title: "My Jobs" },
//     { path: "/job/:id", title: "Job Details" },

//     { path: "/client/my-jobs", title: "My Jobs" },
//     { path: "/client/create-job", title: "Create Job" },  
//   ];
//   const pageTitle = titles.find(({path}) => 
//     matchPath({ path, end:true }, 
//       location.pathname))?.title || "TechWorkHub";

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       logout();
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-brand-light text-[#1f2937]">
//       {/* Sidebar */}
//       <aside className="w-[280px] bg-white border-r border-brand-border flex flex-col">
//         {/* Brand */}
//         <div className="px-6 py-6 border-b border-brand-border">
//           <h1 className="text-2xl font-semibold text-brand-green">TechWorkHub</h1>
//           <p className="text-xs text-brand-gray mt-1">Job Matching Platform</p>
//         </div>

//         {/* Navigation */}
//         <nav className="px-4 py-6 space-y-1 flex-1">
//           <SidebarLink to="/" icon={<Home size={20} />} label="Dashboard" />

//           {user?.role === "technician" && (
//             <>
//               <SidebarLink to="/jobs" icon={<Briefcase size={20} />} label="Jobs" />
//               <SidebarLink to="/my-jobs" icon={<CheckCircle  size={20} />} label="My Jobs" />          
//             </>
//           )}

//           {user?.role === "client" && (
//             <>
//               <SidebarLink to="/client/create-job" icon={<PlusCircle size={20} />} label="Create Job" />
//               <SidebarLink to="/client/my-jobs" icon={<Briefcase size={20} />} label="My Jobs" />
//             </>
//           )}
//         </nav>

//         {/* Footer */}
//         <div className="px-4 py-4 border-t border-brand-border">
//           <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition">
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="h-16 bg-white border-b border-brand-border flex items-center px-10">
//           <h2 className="text-xl font-semibold tracking-tight">{pageTitle}</h2>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="max-w-[1440px] mx-auto px-10 py-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function SidebarLink({ to, icon, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
//           isActive
//             ? "bg-brand-accent text-brand-green"
//             : "text-[#374151] hover:bg-[#f1f3f5]"
//         }`
//       }
//     >
//       {icon}
//       <span>{label}</span>
//     </NavLink>
//   );
// }
