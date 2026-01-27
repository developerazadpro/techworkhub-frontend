import { Mail, User, Building2, Briefcase } from "lucide-react";

export default function ClientProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT CONTENT */}
      <div className="lg:col-span-2 space-y-10">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">My Profile</h2>
          <p className="text-brand-gray mt-2 max-w-xl">
            Manage your account information and business activity.
          </p>
        </div>

        {/* Account Info Card */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="space-y-3 text-sm text-brand-gray">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-brand-muted" />
              <span className="font-medium text-black">{user.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-muted" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-brand-muted" />
              <span className="capitalize">{user.role || "client"} account</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6">
        {/* Quick Actions */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition">
          <h4 className="font-semibold mb-3">Quick Actions</h4>
          <p className="text-sm text-brand-gray mb-3">
            Post a new job or review your recent activity.
          </p>
        </div>

        {/* Business Overview */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition">
          <h4 className="font-semibold mb-3">Business Overview</h4>
          <ul className="space-y-3 text-sm text-brand-gray">
            <li className="flex justify-between">
              <span>Jobs Posted</span>
              <span className="font-medium">8</span>
            </li>
            <li className="flex justify-between">
              <span>Active Jobs</span>
              <span className="font-medium">2</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
