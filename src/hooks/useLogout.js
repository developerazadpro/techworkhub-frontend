import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        // Clear auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Optional: reset axios header if set it globally
        // delete api.defaults.headers.common["Authorization"];

        // Redirect to login
        navigate("/login");
    };

    return logout;
}