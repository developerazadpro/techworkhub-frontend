import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import SkillsSelector from "../../components/SkillsSelector"; 

export default function EditJob() {
  const { id } = useParams();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [skillIds, setSkillIds] = useState([]);
  

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch job
  useEffect(() => {
    async function fetchJob() {
      try {
        // fetch job
        const res = await api.get(`/api/work-jobs/${id}`);
        const job = res.data.job;

        setTitle(job.title);
        setDescription(job.description);
        
        // Convert skill names to IDs
        const skillRes = await api.post("/api/skills/resolve-name-to-id", {
          skills: job.skills,
        });

        setSkillIds(skillRes.data.skill_ids);

      } catch {
        setError("Failed to load job or skills.");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

    // Guard
  if (!user || user.role !== "client") {
    return <p className="text-brand-gray">Only clients can edit jobs.</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    setSaving(true);
    try {
      await api.put(`/api/work-jobs/${id}`, {
        title,
        description,
        skill_ids: skillIds,
      });

      setSuccess("Job updated successfully. Matching refreshed.");
    } catch {
      setError("Failed to update job. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold">Edit Job</h2>
          <p className="text-sm text-brand-muted mt-1 max-w-xl">
            Update job details to improve technician matching.
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
                onChange={e => setTitle(e.target.value)}
                className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green"
                required
              />
            </section>

            {/* Description */}
            <section className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea
                rows={6}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green"
                required
              />
            </section>

            {/* Skills */}
            <section className="space-y-2">
              <label className="text-sm font-medium">Required Skills</label>
              <SkillsSelector value={skillIds} onChange={setSkillIds} />
              <p className="text-xs text-brand-muted">
                Select skills from the list or add custom skills.
              </p>
            </section>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 transition"
              >
                {saving ? "Updating..." : "Update Job"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-3">Editing tips</h4>
          <ul className="text-sm text-brand-gray space-y-2 list-disc pl-4">
            <li>Changing skills re-runs technician matching</li>
            <li>Be specific to improve recommendations</li>
            <li>Keep descriptions clear and concise</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
