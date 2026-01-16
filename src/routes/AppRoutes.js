import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import CreateJob from "../pages/CreateJob";
import Login from "../pages/Login";

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
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/create-job" element={<CreateJob />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}