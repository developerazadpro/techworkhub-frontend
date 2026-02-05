import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useJobDetails } from "../../hooks/client/useJobDetails";
import JobDetailsMain from "../../components/client/jobs/JobDetailsMain";
import JobDetailsSidebar from "../../components/client/jobs/JobDetailsSidebar";

export default function ClientJobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { job, loading, error } = useJobDetails(id, user);

  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can view this job.</p>;
  }

  if (loading) return <p className="text-brand-gray">Loading...</p>;
  if (!job) return <p className="text-brand-gray">Job not found.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <JobDetailsMain
        job={job}
        onEdit={() => navigate(`/client/jobs/${job.id}/edit`)}
      />
      <JobDetailsSidebar job={job} error={error} />
    </div>
  );
}
