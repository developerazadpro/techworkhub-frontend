// AppRoutes.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// Auth
import Login from "../pages/Login";

// Technician pages
import TechnicianDashboard from "../pages/technician/Dashboard";
import Jobs from "../pages/technician/Jobs";
import JobDetails from "../pages/technician/JobDetails";
import MyJobs from "../pages/technician/MyJobs";

// Client pages
import ClientDashboard from "../pages/client/Dashboard";
import CreateJob from "../pages/client/CreateJob";
import ClientMyJobs from "../pages/client/ClientMyJobs";

// Common
import Dashboard from "../pages/Dashboard";


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
          <Route path="/" element={<TechnicianDashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/my-jobs" element={<MyJobs />} />

          {/* Client */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/create-job" element={<CreateJob />} />
          <Route path="/client/my-jobs" element={<ClientMyJobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
