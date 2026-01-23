import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAcceptJob } from "../hooks/useAcceptJob";

function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { handleAcceptJob, acceptingJobId } = useAcceptJob();

  useEffect(() => {
    if (!user || user.role !== "technician") return;

    async function fetchJobs() {
      try {
        const res = await api.get("/api/work-jobs");
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
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
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Available Jobs
        </h2>
        <p className="text-brand-gray mt-2 max-w-xl">
          Jobs matched to your skills and availability.
        </p>
      </div>

      {/* Jobs list */}
    
      { jobs.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">No jobs available right now.</p>
        </div>
      ) : (          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white border border-brand-border rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition" >
              {/* Title + status */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    {job.title}
                  </h2>
                  <p className="text-sm text-brand-gray mt-1">
                    {job.description}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-5">
                <p className="text-xs font-medium text-brand-muted mb-2">
                  Required Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.length > 0 ? (
                    job.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-full bg-brand-accent text-brand-gray border border-brand-border" >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-brand-gray">N/A</span>
                  )}
                </div>
              </div>

              {/* Match indicator (TECHNICIAN-FOCUSED) */}
              <div className="mt-5 flex items-center gap-2">
                <span className="text-xs font-medium px-3 py-1 rounded-full
                                bg-blue-50 text-blue-700 border border-blue-100">
                  Good match
                </span>
                <span className="text-xs text-brand-muted">
                  Based on skills
                </span>
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  onClick={() => navigate(`/job/${job.id}`)} 
                  className="text-xs px-4 py-2 rounded-lg border border-brand-border text-brand-gray hover:bg-brand-accent transition">
                  View
                </button>

                <button
                  onClick={() => handleAcceptJob(job.id)}
                  disabled={acceptingJobId === job.id || job.status !== "open"}
                  className={`text-xs px-4 py-2 rounded-lg text-white transition
                            ${acceptingJobId === job.id ? "bg-gray-400 cursor-not-allowed" : job.status !== "open" ? "bg-gray-300 cursor-not-allowed" : "bg-brand-green hover:opacity-90"}
                          `}
                  title={
                    job.status !== "open" ? "This job is no longer available" : "Accept this job"
                  }
                >
                  {acceptingJobId === job.id ? "Accepting..." : job.status !== "open" ? "Not Available": "Accept"}
                </button>
              </div>
            </div>
          ))}
        </div>          
      )}
    </div>
  );
}

export default Jobs;
