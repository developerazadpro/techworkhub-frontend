import { Mail, User, Briefcase } from "lucide-react";

export default function TechnicianProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage your personal and work information
          </p>
        </div>

        {/* Account Info */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>

          <div className="bg-white border border-brand-border rounded-2xl p-6 space-y-4 text-sm text-brand-gray">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-brand-muted" />
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-muted" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-brand-muted" />
              <span className="capitalize">
                {user.role || "technician"}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        {/* Work Overview */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-4">Work Overview</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-brand-accent rounded-xl p-4">
              <p className="text-sm text-brand-muted">Completed Jobs</p>
              <p className="text-2xl font-semibold mt-1">12</p>
            </div>

            <div className="bg-brand-accent rounded-xl p-4">
              <p className="text-sm text-brand-muted">Active Jobs</p>
              <p className="text-2xl font-semibold mt-1">3</p>
            </div>
          </div>
        </div>

        {/* Future Actions Placeholder */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <p className="text-sm text-brand-muted text-center">
            Profile editing & skills management coming soon
          </p>
        </div>
      </aside>
    </div>
  );
}
