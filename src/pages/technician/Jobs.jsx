import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useJobs } from "../../hooks/technician/useJobs";
import { useAcceptJob } from "../../hooks/technician/useAcceptJob";

export default function Jobs() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { jobs, recommendedJobs, otherJobs, loading, setJobs } = useJobs(user);
  const { handleAcceptJob, acceptingJobId } = useAcceptJob(setJobs);

  if (!user || user.role !== "technician") {
    return <p className="text-brand-gray">Only technicians can view jobs.</p>;
  }

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  const renderJobCard = (job, highlight = false) => {
    const canAccept = job.status === "open" && job.recommended && acceptingJobId !== job.id;

    return (
      <div
        key={job.id}
        className={`relative bg-white border rounded-2xl p-6 transition
          ${highlight ? "border-green-400 shadow-md" : "border-brand-border"}`}
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-sm text-brand-gray mt-1">{job.description}</p>
        </div>

        {job.recommended && (
          <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
            Recommended
          </span>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills?.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-brand-accent border border-brand-border"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => navigate(`/technician/job/${job.id}`)}
            className="text-xs px-4 py-2 rounded-lg border border-brand-border hover:bg-brand-accent"
          >
            View
          </button>

          <button
            onClick={() => handleAcceptJob(job.id)}
            disabled={!canAccept}
            className={`text-xs px-4 py-2 rounded-lg text-white
              ${canAccept ? "bg-brand-green hover:opacity-90" : "bg-gray-300 cursor-not-allowed"}`}
            title={
              !job.recommended
                ? "Not matched to your skills"
                : job.status !== "open"
                ? "Job not available"
                : "Accept job"
            }
          >
            {acceptingJobId === job.id ? "Accepting..." : "Accept"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {recommendedJobs.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">Recommended for you</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.map((job) => renderJobCard(job, true))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">All Open Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-brand-gray">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherJobs.map(renderJobCard)}
          </div>
        )}
      </section>
    </div>
  );
}
