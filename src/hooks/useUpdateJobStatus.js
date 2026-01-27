import { useState } from "react";
import api from "../api/api";

export const useUpdateJobStatus = () => {
  const [loading, setLoading] = useState(false);

  const updateJobStatus = async (jobId, newStatus) => {
    //console.log(newStatus);
    setLoading(true);
    try {
      const res = await api.patch(`/api/work-jobs/${jobId}/status`, { status: newStatus });
      return res.data.job;
    } catch (err) {
      console.error("Failed to update job status:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateJobStatus, loading };
};
