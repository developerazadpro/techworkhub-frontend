import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RootRedirect from "./RootRedirect";

// Layouts 
import TechnicianLayout from "../layouts/TechnicianLayout";
import ClientLayout from "../layouts/ClientLayout";

// Technician pages
import TechnicianDashboard from "../pages/technician/Dashboard";
import TechnicianJobs from "../pages/technician/Jobs";
import TechnicianJobDetails from "../pages/technician/JobDetails";
import TechnicianMyJobs from "../pages/technician/MyJobs";
import TechnicianProfile from "../pages/technician/Profile";

// Client pages
import ClientDashboard from "../pages/client/Dashboard";
import ClientCreateJob from "../pages/client/CreateJob";
import ClientJobDetails from "../pages/client/JobDetails";
import ClientEditJob from "../pages/client/EditJob";
import ClientMyJobs from "../pages/client/MyJobs";
import ClientProfile from "../pages/client/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        {/* App layout */}
        
          {/* Technician */}
          <Route path="/technician" element={<TechnicianLayout />}>
            <Route index element={<TechnicianDashboard />} />
            <Route path="jobs" element={<TechnicianJobs />} />
            <Route path="job/:id" element={<TechnicianJobDetails />} />
            <Route path="my-jobs" element={<TechnicianMyJobs />} />
            <Route path="profile" element={<TechnicianProfile />} />
          </Route>

          {/* Client */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="create-job" element={<ClientCreateJob />} />
            <Route path="job/:id" element={<ClientJobDetails />} />
            <Route path="jobs/:id/edit" element={<ClientEditJob />} />
            <Route path="my-jobs" element={<ClientMyJobs />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>         
        
      </Routes>
    </BrowserRouter>
  );
}
