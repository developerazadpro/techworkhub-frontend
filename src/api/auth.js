import api from "./api";

export const loginUser = async ({ email, password }) => {
  const response = await api.post("/api/login", { email, password });
  return response.data; // { token, user }
};

export const registerUser = async ({ name, email, password, password_confirmation, role }) => {
  const response = await api.post("/api/register", {
    name,
    email,
    password,
    password_confirmation,
    role,
  });
  return response.data; // { token, user }
};