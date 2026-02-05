import { useEffect, useState } from "react";
import { getClientJobs } from "../../api/client";

export const useJobs = (user) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "client") return;

    async function fetchJobs() {
      try {
        const data = await getClientJobs();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching client jobs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [user]);

  return { jobs, loading };
};
