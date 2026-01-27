import { useState } from "react";
import { JOB_STATUS_TRANSITIONS } from "../../constants/jobStatusTransitions";
import { useUpdateJobStatus } from "../../hooks/useUpdateJobStatus";
import { capitalize } from "../../utils/string";


export default function JobStatusDropdown({ job, setJob }) {
  const { updateJobStatus, loading } = useUpdateJobStatus();
  const [selectedStatus, setSelectedStatus] = useState(job.status);

  const allowedNext = JOB_STATUS_TRANSITIONS[job.status] || [];

  const allStatuses = Object.keys(JOB_STATUS_TRANSITIONS);

  //const statuses = ["open", "assigned", "in_progress", "completed", "cancelled"]; // can extend later

  const handleChangeStatus = async (e) => {
    const newStatus = e.target.value;    

    try {
      const updatedJob = await updateJobStatus(job.id, newStatus);
      if (updatedJob) {
        setJob(updatedJob); // update parent state
        setSelectedStatus(newStatus);
      }      
    } catch (err) {
      setSelectedStatus(job.status); // revert on error
    }
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleChangeStatus}
      disabled={loading || allowedNext.length === 0}
      className="px-3 py-1 border rounded-lg text-sm"
    >
      <option value={job.status}>
        {capitalize(job.status)} (current)
      </option>

      {allStatuses.map((status) => (
        <option key={status} value={status} disabled={!allowedNext.includes(status)}>
          {capitalize(status)}
        </option>
      ))}
    </select>
  );
}
