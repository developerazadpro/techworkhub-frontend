// AppRoutes.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";


// Auth
import Login from "../pages/Login";
import RootRedirect from "./RootRedirect";
//import ProtectedRoute from "./ProtectedRoute";

// Layouts 
import TechnicianLayout from "../layouts/TechnicianLayout";
import ClientLayout from "../layouts/ClientLayout";

// Technician pages
import TechnicianDashboard from "../pages/technician/Dashboard";
import Jobs from "../pages/technician/Jobs";
import JobDetails from "../pages/technician/JobDetails";
import MyJobs from "../pages/technician/MyJobs";
import TechnicianProfile from "../pages/technician/Profile";

// Client pages
import ClientDashboard from "../pages/client/Dashboard";
import CreateJob from "../pages/client/CreateJob";
import ClientMyJobs from "../pages/client/ClientMyJobs";
import ClientProfile from "../pages/client/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        

        {/* App layout */}
        {/* <Route element={ <ProtectedRoute> <BaseLayout /> </ProtectedRoute>} > */}
          {/* Technician */}
          <Route path="/technician" element={<TechnicianLayout />}>
            <Route index element={<TechnicianDashboard />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="job/:id" element={<JobDetails />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="profile" element={<TechnicianProfile />} />
          </Route>

          {/* Client */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="create-job" element={<CreateJob />} />
            <Route path="my-jobs" element={<ClientMyJobs />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>
          
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
