import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";

function Jobs() {
  const { user } = useAuth();  
  const [jobs, setJobs] = useState([]);

  if (!user || user.role !== "technician") {
    return <p>Only technicians can view available jobs.</p>;
  }

  useEffect(() => {
    async function fetchJobs() {
        try {
            const response = await api.get("/api/work-jobs");
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    }
    fetchJobs();
  }, []);

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
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
}

export default Jobs;
