import { Briefcase,  Users,  CheckCircle,  Clock,  PlusCircle, } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT CONTENT */}
      <div className="lg:col-span-2 space-y-10">
        {/* Welcome */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Welcome back 👋
          </h2>
          <p className="text-brand-gray mt-2 max-w-xl">
            Manage your jobs, track technician activity, and create new work
            easily.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <MetricCard
            title="Total Jobs"
            value="24"
            icon={<Briefcase size={22} />}
          />
          <MetricCard
            title="Open Jobs"
            value="15"
            icon={<Clock size={22} />}
          />
          <MetricCard
            title="Technicians"
            value="8"
            icon={<Users size={22} />}
          />
          <MetricCard
            title="Completed Jobs"
            value="5"
            icon={<CheckCircle size={22} />}
          />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <aside className="space-y-6">
        {/* Quick Action */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <Link
            to="/client/create-job"
            className="flex items-center justify-center gap-2 w-full bg-brand-green text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 transition"
          >
            <PlusCircle size={18} />
            Create New Job
          </Link>

          <p className="text-xs text-brand-muted text-center mt-3">
            Post a new job and get matched with technicians
          </p>
        </div>

        {/* Job Status Overview */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-4">Job Status Overview</h4>

          <ul className="space-y-3 text-sm text-brand-gray">
            <li className="flex justify-between">
              <span>Awaiting technicians</span>
              <span className="font-medium">6</span>
            </li>
            <li className="flex justify-between">
              <span>In progress</span>
              <span className="font-medium">4</span>
            </li>
            <li className="flex justify-between">
              <span>Completed</span>
              <span className="font-medium">5</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-brand-gray">{title}</p>
        <div className="p-3 rounded-xl bg-brand-accent text-brand-green">
          {icon}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-3xl font-semibold">{value}</p>
        <p className="text-xs text-brand-muted mt-1">Updated just now</p>
      </div>
    </div>
  );
}
