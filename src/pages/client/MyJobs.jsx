import { useAuth } from "../../contexts/AuthContext";
import { useClientJobs } from "../../hooks/useClientJobs";
import ClientJobCard from "../../components/jobs/ClientJobCard";

export default function ClientMyJobs() {
  const { user } = useAuth();
  const { jobs, loading } = useClientJobs(user);

  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can view their jobs.</p>;
  }

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          My Jobs
        </h2>
        <p className="text-brand-gray mt-2 max-w-xl">
          Jobs you have created and their current status
        </p>
      </div>

      {jobs.length === 0 ? (
        <p className="text-brand-gray">You haven’t created any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {jobs.map((job) => (
            <ClientJobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
