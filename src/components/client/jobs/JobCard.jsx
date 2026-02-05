import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-brand-border rounded-2xl lg:p-8 shadow-sm">
      <h3 className="text-lg font-semibold">{job.title}</h3>

      <p className="text-sm text-brand-gray mt-1 line-clamp-3">
        {job.description}
      </p>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
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

      {/* Status */}
      <div className="mt-4 text-xs">
        <span className="font-medium">Status:</span>{" "}
        <span className="capitalize text-brand-gray">
          {job.status}
        </span>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-brand-muted">
        Created on {new Date(job.created_at).toLocaleDateString()}
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <button
          onClick={() => navigate(`/client/job/${job.id}`)}
          className="flex-1 px-4 py-2 rounded-lg bg-brand-green text-white text-sm font-medium hover:opacity-90 transition"
        >
          View
        </button>

        {job.status === "open" && (
          <button
            onClick={() => navigate(`/client/jobs/${job.id}/edit`)}
            className="flex-1 px-4 py-2 rounded-lg border border-brand-border text-sm font-medium text-brand-gray hover:bg-brand-accent hover:text-white transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
