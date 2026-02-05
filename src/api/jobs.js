import api from "./api";

export const createJob = async (payload) => {
  const res = await api.post("/api/work-jobs", payload);
  return res.data;
};

export const getJob = async (id) => {
  const res = await api.get(`/api/work-jobs/${id}`);
  return res.data.job;
};

export const updateJob = async (id, payload) => {
  const res = await api.put(`/api/work-jobs/${id}`, payload);
  return res.data;
};

export const resolveSkillNamesToIds = async (skills) => {
  const res = await api.post("/api/skills/resolve-name-to-id", {
    skills,
  });
  return res.data.skill_ids;
};
