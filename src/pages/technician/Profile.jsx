import { Mail, User, Briefcase } from "lucide-react";

export default function TechnicianProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6 grid md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-medium mb-4">Account Information</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4" />
              <span>{user.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4" />
              <span className="capitalize">{user.role || "technician"}</span>
            </div>
          </div>
        </div>

        {/* Stats / Placeholder */}
        <div>
          <h2 className="text-lg font-medium mb-4">Work Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Completed Jobs</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Active Jobs</p>
              <p className="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
