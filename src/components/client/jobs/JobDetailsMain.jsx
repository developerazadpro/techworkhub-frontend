import { capitalize } from "../../../utils/string";

export default function JobDetailsMain({ job, onEdit }) {
  const isEditable = job.status === "open";

  return (
    <div className="lg:col-span-2 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">{job.title}</h1>
        <p className="text-sm text-brand-muted mt-1">
          Status: {capitalize(job.status)} • Created on{" "}
          {new Date(job.created_at).toLocaleDateString()}
        </p>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-brand-gray leading-relaxed">
          {job.description}
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
        <div className="flex flex-wrap gap-2">
          {job.skills?.length ? (
            job.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-brand-accent border border-brand-border"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-brand-gray">No skills</span>
          )}
        </div>
      </section>

      {job.recommended_technicians?.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-2">
            Recommended Technicians
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.recommended_technicians.map((id) => (
              <span
                key={id}
                className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200"
              >
                Technician #{id}
              </span>
            ))}
          </div>
        </section>
      )}

      {isEditable && (
        <button
          onClick={onEdit}
          className="px-6 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:opacity-90 transition"
        >
          Edit Job
        </button>
      )}
    </div>
  );
}
