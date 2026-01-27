import { useUpdateJobStatus } from "../../hooks/useUpdateJobStatus";
import { useState } from "react";

export default function JobStatusDropdown({ job, setJob }) {
  const { updateJobStatus, loading } = useUpdateJobStatus();
  const [selectedStatus, setSelectedStatus] = useState(job.status);

  const statuses = ["open", "assigned", "in_progress", "completed", "cancelled"]; // can extend later

  const handleChangeStatus = async (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    try {
      const updatedJob = await updateJobStatus(job.id, newStatus);
      if (updatedJob) {
        setJob(updatedJob); // update parent state
      }      
    } catch (err) {
      setSelectedStatus(job.status); // revert on error
    }
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleChangeStatus}
      disabled={loading}
      className="px-3 py-1 border rounded-lg text-sm"
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </option>
      ))}
    </select>
  );
}
