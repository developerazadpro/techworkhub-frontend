import { formateDate } from "../../../utils/string";

export default function ClientJobDetailsSidebar({ job, error }) {
  return (
    <aside className="space-y-6">
      <div className="bg-white border border-brand-border rounded-2xl p-6">
        <h4 className="font-semibold mb-3">Job Details</h4>
        <p className="text-sm text-brand-gray">Job ID: {job.id}</p>
        <p className="text-sm text-brand-gray">
          Created: {new Date(job.created_at).toLocaleDateString()}
        </p>
        <p className="text-sm text-brand-gray">
          Updated: {formateDate(job.updated_at)}
        </p>
      </div>

      <div className="bg-white border border-brand-border rounded-2xl p-6">
        <h4 className="font-semibold mb-3">Tips</h4>
        <ul className="text-sm text-brand-gray space-y-2 list-disc pl-4">
          <li>Use clear job titles to attract the right technicians.</li>
          <li>Include multiple skills if needed.</li>
          <li>Edit job anytime while it's open.</li>
        </ul>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </aside>
  );
}
