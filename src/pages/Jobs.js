import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "technician") return;

    async function fetchJobs() {
      try {
        const response = await api.get("/api/work-jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, [user]);

  if (!user || user.role !== "technician") {
    return <p>Only technicians can view available jobs.</p>;
  }

  return (
    <div>
      <h1>Jobs Page</h1>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>

              <p><strong>Status:</strong> {job.status}</p>
              <p>
                <strong>Skills:</strong>{" "}
                {job.skills?.length > 0 ? job.skills.join(", ") : "N/A"}
              </p>

              <p>
                <strong>Recommended Technicians:</strong>{" "}
                {job.recommended_technicians?.length > 0 ? job.recommended_technicians.join(", ") : "None"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Jobs;
