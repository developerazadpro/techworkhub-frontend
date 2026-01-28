import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import { normalizeSkills } from "../../utils/string";
import { capitalize } from "../../utils/string";

export default function ClientJobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job using show() endpoint
  useEffect(() => {
    if (!user || user.role !== "client") return;

    async function fetchJob() {
      try {
        const res = await api.get(`/api/work-jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error(err);
        setError("Failed to load job.");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id, user]);

  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can view this job.</p>;
  }

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  if (!job) {
    return <p className="text-brand-gray">Job not found.</p>;
  }

  // Check if job is editable
  const isEditable = job.status === "open";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT: Job Details */}
      <div className="lg:col-span-2 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">{job.title}</h1>
          <p className="text-sm text-brand-muted mt-1">
            Status: {capitalize(job.status)} • Created on {new Date(job.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Description */}
        <section>
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-brand-gray leading-relaxed">{job.description}</p>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills?.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-brand-accent border border-brand-border"
              >
                {skill}
              </span>
            )) || <span className="text-xs text-brand-gray">No skills</span>}
          </div>
        </section>

        {/* Recommended Technicians (optional, read-only for client) */}
        {job.recommended_technicians?.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-2">Recommended Technicians</h3>
            <div className="flex flex-wrap gap-2">
              {job.recommended_technicians.map((techId) => (
                <span
                  key={techId}
                  className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200"
                >
                  Technician #{techId}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Edit Button */}
        {isEditable && (
          <div className="mt-6">
            <button
              onClick={() => navigate(`/client/job/${job.id}/edit`)}
              className="px-6 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:opacity-90 transition"
            >
              Edit Job
            </button>
          </div>
        )}

      </div>

      {/* RIGHT: Sidebar */}
      <aside className="space-y-6">
        {/* Job Meta */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Job Details</h4>
          <p className="text-sm text-brand-gray">
            Job ID: {job.id}
          </p>
          <p className="text-sm text-brand-gray">
            Created: {new Date(job.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm text-brand-gray">
            Updated: {new Date(job.updated_at).toLocaleDateString()}
          </p>
        </div>

        {/* Tips / Info */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Tips</h4>
          <ul className="text-sm text-brand-gray space-y-2 list-disc pl-4">
            <li>Use clear job titles to attract the right technicians.</li>
            <li>Include multiple skills if needed.</li>
            <li>Edit job anytime while it's open.</li>
          </ul>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </aside>
    </div>
  );
}
