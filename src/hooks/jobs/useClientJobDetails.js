import { useEffect, useState } from "react";
import { getJob } from "../../api/jobs";

export const useClientJobDetails = (id, user) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "client") return;

    async function fetchJob() {
      try {
        const data = await getJob(id); // ✅ reuse existing API
        setJob(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load job.");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id, user]);

  return { job, loading, error };
};
