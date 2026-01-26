import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import { capitalize } from "../../utils/string";
import { useNavigate } from "react-router-dom";

export default function MyJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "technician") return;

    async function fetchMyJobs() {
      try {
        const res = await api.get("/api/my-jobs");
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyJobs();
  }, [user]);

  if (!user || user.role !== "technician") {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">
            Only technicians can view available jobs.
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
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          My Jobs
        </h2>
        <p className="text-brand-gray mt-2 max-w-xl">
          Jobs you have accepted
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">No assigned jobs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-brand-border rounded-2xl p-6" >
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-brand-gray mt-1">
                {job.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills?.length > 0 ? (
                    job.skills.map((skill, idx) => (                
                        <span key={idx} className="text-xs px-3 py-1 rounded-full bg-brand-accent" > 
                            {skill}
                        </span>
                    ))
                ) : (
                  <span className="text-sm text-brand-gray">N/A</span>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-brand-muted">
                  Status: {capitalize(job.status)}
                </span>

                <button
                  onClick={() => navigate(`/technician/job/${job.id}`)}
                  className="text-xs px-4 py-2 rounded-lg border border-brand-border text-brand-gray hover:bg-brand-accent transition"
                >
                  View Details
                </button>
              </div>

            </div>
            
          ))}
        </div>
      )}
    </div>
  );
}
