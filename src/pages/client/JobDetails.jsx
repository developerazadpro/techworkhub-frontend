import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useClientJobDetails } from "../../hooks/jobs/useClientJobDetails";
import ClientJobDetailsMain from "../../components/client/jobs/ClientJobDetailsMain";
import ClientJobDetailsSidebar from "../../components/client/jobs/ClientJobDetailsSidebar";

export default function ClientJobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { job, loading, error } = useClientJobDetails(id, user);

  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can view this job.</p>;
  }

  if (loading) return <p className="text-brand-gray">Loading...</p>;
  if (!job) return <p className="text-brand-gray">Job not found.</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <ClientJobDetailsMain
        job={job}
        onEdit={() => navigate(`/client/jobs/${job.id}/edit`)}
      />
      <ClientJobDetailsSidebar job={job} error={error} />
    </div>
  );
}
