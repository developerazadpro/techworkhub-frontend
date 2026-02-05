import { useEffect, useState } from "react";
import {
  createJob,
  getJob,
  updateJob,
  resolveSkillNamesToIds,
} from "../api/jobs";

export const useJobForm = ({ jobId, mode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillIds, setSkillIds] = useState([]);

  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch job (edit mode only)
  useEffect(() => {
    if (mode !== "edit") return;

    async function fetchJob() {
      try {
        const job = await getJob(jobId);

        setTitle(job.title);
        setDescription(job.description);

        const resolvedSkillIds = await resolveSkillNamesToIds(job.skills);
        setSkillIds(resolvedSkillIds);
      } catch {
        setError("Failed to load job or skills.");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [jobId, mode]);

  const submit = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const payload = {
        title,
        description,
        skill_ids: skillIds,
      };

      if (mode === "create") {
        await createJob(payload);
        setSuccess("Job created successfully.");
        setTitle("");
        setDescription("");
        setSkillIds([]);
      } else {
        await updateJob(jobId, payload);
        setSuccess("Job updated successfully. Matching refreshed.");
      }
    } catch {
      setError(
        mode === "create"
          ? "Failed to create job. Please try again."
          : "Failed to update job. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    skillIds,
    setSkillIds,
    loading,
    saving,
    error,
    success,
    onSubmit: submit,
  };
};
