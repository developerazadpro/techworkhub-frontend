import { useEffect, useState, useMemo } from "react";
import { getOpenJobs } from "../../api/technician";

export const useJobs = (user) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "technician") return;

    async function fetchJobs() {
      try {
        const data = await getOpenJobs();

        // Map recommended flag
        const mappedJobs = data.map((job) => ({
          ...job,
          recommended: Array.isArray(job.recommended_technicians)
            ? job.recommended_technicians.some((id) => Number(id) === Number(user.id))
            : false,
        }));

        setJobs(mappedJobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [user]);

  const recommendedJobs = useMemo(() => jobs.filter(j => j.recommended), [jobs]);
  const otherJobs = useMemo(() => jobs.filter(j => !j.recommended), [jobs]);

  return { jobs, recommendedJobs, otherJobs, loading, setJobs };
};
