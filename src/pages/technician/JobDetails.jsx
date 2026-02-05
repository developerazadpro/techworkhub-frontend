import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import { capitalize } from "../../utils/string";
import { useAcceptJob } from "../../hooks/jobs/useAcceptJob";
import JobStatusDropdown from "../../components/technician/jobs/JobStatusDropdown";
import { JOB_STATUS_TRANSITIONS } from "../../constants/jobStatusTransitions";
import { formateDate } from "../../utils/string";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleAcceptJob, acceptingJobId} = useAcceptJob();

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await api.get(`/api/work-jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">
            Loading...
          </p>
        </div>
      </div>      
    );
  }

  if (!job) {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">
            Job not found.
          </p>
        </div>
      </div>      
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="text-sm text-brand-muted mt-1">
            Posted {job?.posted_ago} • Client # {job?.client?.id}
          </p>
        </div>

        {/* Description */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-brand-gray leading-relaxed">
            {job.description}
          </p>
        </section>

        {/* Skills */}
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

        {/* Job Meta */}
        <section className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-brand-muted">Status</p>
            <span className={`text-xs px-3 py-1 rounded-full font-medium
                ${job.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}
                `}
            >
                {capitalize(job.status)}
            </span>
          </div>
          <div>
            <p className="text-brand-muted">Created</p>
            <p className="font-medium">{formateDate(job.created_at)}</p>
          </div>
        </section>

        {/* Job Status Dropdown */}
        {user?.role === "technician" && job.status !== "completed" && JOB_STATUS_TRANSITIONS[job.status]?.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-brand-muted mb-1">Update Status:</p>
            <JobStatusDropdown job={job} setJob={setJob} />
          </div>
        )}

      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        {/* Action Card */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <button
            onClick={() => handleAcceptJob(job.id)}
            disabled={ acceptingJobId === job.id || job.status !== "open"}
            className="w-full bg-brand-green text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {acceptingJobId === job.id ? "Accepting..." : job.status !== "open" ? "Not Available": "Accept"}
          </button>

          {job.status !== "open" && (
            <p className="text-xs text-red-500 mt-2 text-center">
              Job already assigned
            </p>
          )}
        </div>

        {/* Client Info */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Client Information</h4>
          <p className="text-sm text-brand-gray">
            Jobs posted: {job.client.jobs_posted}
          </p>
          <p className="text-sm text-brand-gray">
            Member since: {job.client.member_since}
          </p>
        </div>
      </aside>
    </div>
  );
}
