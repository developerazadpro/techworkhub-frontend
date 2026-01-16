import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import CreateJob from "../pages/CreateJob";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Dashboard</Link> | {" "}
                <Link to="/jobs">Jobs</Link> | {" "}
                <Link to="/create-job">Create Job</Link>| {" "}
                <Link to="/login">Login</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
                <Route path="/create-job" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}