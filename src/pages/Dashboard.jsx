import { Briefcase, Users, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-brand-gray mt-2 max-w-xl">
          Here’s a quick snapshot of what’s happening across your platform today.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Jobs" value="24" icon={<Briefcase size={22} />} />
        <MetricCard title="Open Jobs" value="12" icon={<Clock size={22} />} />
        <MetricCard title="Technicians" value="8" icon={<Users size={22} />} />
        <MetricCard title="Completed Jobs" value="5" icon={<CheckCircle size={22} />} />
      </div>
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
