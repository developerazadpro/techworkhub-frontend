import { useState, useEffect } from "react";
import { getJob } from "../../api/jobs";

/**
 * Hook to fetch a single job's details
 */
export function useJobDetails(id) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchJob() {
      try {
        const data = await getJob(id);
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  return { job, setJob, loading };
}
