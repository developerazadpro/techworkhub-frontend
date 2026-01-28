import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ClientMyJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "client") return;

    async function fetchJobs() {
      try {
        const res = await api.get("/api/client/my-jobs");
        setJobs(Array.isArray(res.data.jobs) ? res.data.jobs : []);
      } catch (error) {
        console.error("Error fetching client jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [user]);

  // Role guard
  if (!user || user.role !== "client") {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">
            Only clients can view their jobs.
          </p>
        </div>
      </div>      
    );
  }

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

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          My Jobs
        </h2>
        <p className="text-brand-gray mt-2 max-w-xl">
          Jobs you have created and their current status
        </p>
      </div>

      {/* Jobs */}
      {jobs.length === 0 ? (
        <p className="text-brand-gray">You haven’t created any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-brand-border rounded-2xl lg:p-8 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-brand-gray mt-1 line-clamp-3">
                {job.description}
              </p>

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills?.length ? (
                  job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-brand-accent border border-brand-border"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-brand-gray">No skills</span>
                )}
              </div>

              {/* Status */}
              <div className="mt-4 text-xs">
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize text-brand-gray">
                  {job.status}
                </span>
              </div>

              {/* Footer */}
              <div className="mt-4 text-xs text-brand-muted">
                Created on{" "}
                {new Date(job.created_at).toLocaleDateString()}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => navigate(`/client/jobs/${job.id}/edit`)}
                  className="text-xs px-4 py-2 rounded-lg border border-brand-border hover:bg-brand-accent"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
