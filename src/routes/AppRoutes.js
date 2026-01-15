import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import CreateJob from "../pages/CreateJob";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Dashboard</Link> | {" "}
                <Link to="/jobs">Jobs</Link> | {" "}
                <Link to="/create-jobs">Create Job</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/create-job" element={<CreateJob />} />
            </Routes>
        </BrowserRouter>
    )
}