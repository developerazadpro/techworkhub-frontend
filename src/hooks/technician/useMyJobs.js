import { useState, useEffect } from "react";
import { getMyJobs } from "../../api/technician";

/**
 * Hook to fetch technician's accepted jobs
 */
export function useMyJobs(user) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "technician") return;

    async function fetchJobs() {
      try {
        const myJobs = await getMyJobs();
        setJobs(myJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [user]);

  return { jobs, loading };
}
