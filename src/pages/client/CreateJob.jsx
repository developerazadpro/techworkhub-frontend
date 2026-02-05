import { useAuth } from "../../contexts/AuthContext";
import { useJobForm } from "../../hooks/useJobForm";
import JobForm from "../../components/jobs/JobForm";

export default function CreateJob() {
  const { user } = useAuth();

  const jobForm = useJobForm({ mode: "create" });

  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can create jobs.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Create a New Job</h2>
          <p className="text-sm text-brand-muted mt-1 max-w-xl">
            Provide clear details so qualified technicians can match your job quickly.
          </p>
        </div>

        <JobForm
          {...jobForm}
          submitLabel="Create Job"
        />
      </div>
    </div>
  );
}
