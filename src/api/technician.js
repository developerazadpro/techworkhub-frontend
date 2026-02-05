import api from "./api";

// Fetch technician's skills
export const getMySkills = async () => {
  const res = await api.get("/api/technician/skills");
  return res.data.skills;
};

// Update technician's skills
export const updateMySkills = async (skillIds) => {
  const res = await api.put("/api/technician/skills", { skill_ids: skillIds });
  return res.data;
};

// Fetch all open jobs
export const getOpenJobs = async () => {
  const res = await api.get("/api/work-jobs");
  return res.data.jobs || [];
};

// Accept a job
export const acceptJob = async (jobId) => {
  const res = await api.post(`/api/work-jobs/${jobId}/accept`);
  return res.data;
};

// Fetch all jobs assigned to the logged-in technician
export const getMyJobs = async () => {
  const res = await api.get("/api/my-jobs");
  return Array.isArray(res.data.jobs) ? res.data.jobs : [];
};
