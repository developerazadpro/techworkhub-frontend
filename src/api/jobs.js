import api from "./api";

export const getJob = async (id) => {
  const res = await api.get(`/api/work-jobs/${id}`);
  return res.data.job;
};




