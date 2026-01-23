// AppRoutes.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import CreateJob from "../pages/CreateJob";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import MyJobs from "../pages/MyJobs";
import ClientMyJobs from "../pages/ClientMyJobs";
import JobDetails from "../pages/JobDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* App layout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Technician */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/my-jobs" element={<MyJobs />} />

          {/* Client */}
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/client/my-jobs" element={<ClientMyJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
