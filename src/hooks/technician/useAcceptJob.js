import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { acceptJob } from "../../api/technician";

export function useAcceptJob() {
  const navigate = useNavigate();
  const [acceptingJobId, setAcceptingJobId] = useState(null);

  async function handleAcceptJob(jobId) {
    const confirmed = window.confirm(
      "Are you sure you want to accept this job? Once accepted, it will be assigned to you."
    );
    if (!confirmed) return;

    try {
      setAcceptingJobId(jobId);

      await acceptJob(jobId);

      alert("Job accepted successfully");

      navigate("/technician/my-jobs");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("This job has already been assigned.");
      } else {
        alert("Failed to accept job.");
      }
    } finally {
      setAcceptingJobId(null);
    }
  }

  return { handleAcceptJob, acceptingJobId };
}
