import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth as useAuthContext } from "../contexts/AuthContext";
import { loginUser, registerUser } from "../api/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setError("");
    setLoading(true);

    try {
      const { token, user } = await loginUser({ email, password });

      // Store auth info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Update context
      setUser(user);

      navigate("/", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const register = async ({ name, email, password, confirmPassword, role }) => {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { token, user } = await registerUser({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        role,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};
