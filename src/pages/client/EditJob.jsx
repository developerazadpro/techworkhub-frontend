import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useJobForm } from "../../hooks/useJobForm";
import JobForm from "../../components/jobs/JobForm";

export default function EditJob() {
  const { id } = useParams();
  const { user } = useAuth();

  const jobForm = useJobForm({ jobId: id, mode: "edit" });

  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can edit jobs.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Edit Job</h2>
          <p className="text-sm text-brand-muted mt-1 max-w-xl">
            Update job details to improve technician matching.
          </p>
        </div>

        <JobForm
          {...jobForm}
          submitLabel="Update Job"
          helperText="Changing skills re-runs technician matching"
        />
      </div>
    </div>
  );
}
