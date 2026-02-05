import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { capitalize, formateDate } from "../../utils/string";
import { useAcceptJob } from "../../hooks/technician/useAcceptJob";
import { useJobDetails } from "../../hooks/technician/useJobDetails";
import JobStatusDropdown from "../../components/technician/jobs/JobStatusDropdown";
import { JOB_STATUS_TRANSITIONS } from "../../constants/jobStatusTransitions";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { job, setJob, loading } = useJobDetails(id);
  const { handleAcceptJob, acceptingJobId } = useAcceptJob();

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  if (!job) {
    return <p className="text-brand-gray">Job not found.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="text-sm text-brand-muted mt-1">
            Posted {job?.posted_ago} • Client #{job?.client?.id}
          </p>
        </div>

        <section>
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-brand-gray leading-relaxed">{job.description}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-brand-accent border border-brand-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-brand-muted">Status</p>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                job.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
              }`}
            >
              {capitalize(job.status)}
            </span>
          </div>
          <div>
            <p className="text-brand-muted">Created</p>
            <p className="font-medium">{formateDate(job.created_at)}</p>
          </div>
        </section>

        {user?.role === "technician" &&
          job.status !== "completed" &&
          JOB_STATUS_TRANSITIONS[job.status]?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-brand-muted mb-1">Update Status:</p>
              <JobStatusDropdown job={job} setJob={setJob} />
            </div>
          )}
      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <button
            onClick={() => handleAcceptJob(job.id)}
            disabled={acceptingJobId === job.id || job.status !== "open"}
            className="w-full bg-brand-green text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {acceptingJobId === job.id
              ? "Accepting..."
              : job.status !== "open"
              ? "Not Available"
              : "Accept"}
          </button>

          {job.status !== "open" && (
            <p className="text-xs text-red-500 mt-2 text-center">Job already assigned</p>
          )}
        </div>

        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Client Information</h4>
          <p className="text-sm text-brand-gray">Jobs posted: {job.client.jobs_posted}</p>
          <p className="text-sm text-brand-gray">Member since: {job.client.member_since}</p>
        </div>
      </aside>
    </div>
  );
}
