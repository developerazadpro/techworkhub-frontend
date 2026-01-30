import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/api";
import SkillsSelector from "../../components/SkillsSelector";

export default function CreateJob() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillIds, setSkillIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!user || user.role !== "client") {
    return (
      <div className="space-y-10">
        <p className="text-brand-gray">Only clients can create jobs.</p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    setLoading(true);
    try {
      await api.post("/api/work-jobs", {
        title,
        description,
        skill_ids: skillIds,
      });

      setSuccess("Job created successfully.");
      setTitle("");
      setDescription("");
      setSkillIds("");
    } catch {
      setError("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold">Create a New Job</h2>
          <p className="text-sm text-brand-muted mt-1 max-w-xl">
            Provide clear details so qualified technicians can match your job quickly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Feedback */}
            {success && (
              <div className="rounded-lg bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Title */}
            <section className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Laptop Hardware Repair Technician"
                className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </section>

            {/* Description */}
            <section className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue, expectations, and any important details…"
                className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
            </section>

            {/* Skills */}            
            <section className="space-y-2">
              <label className="text-sm font-medium">Required Skills</label>
              <SkillsSelector value={skillIds} onChange={setSkillIds} />
            </section>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 transition"
              >
                {loading ? "Creating..." : "Create Job"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Tips for better matches</h4>
          <ul className="text-sm text-brand-gray space-y-2 list-disc pl-4">
            <li>Use a clear, specific job title</li>
            <li>Mention tools or certifications if needed</li>
            <li>Add multiple skills to improve matching accuracy</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

