import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/api";
import { Form } from "react-router-dom";

function CreateJob() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  if (!user || user.role !== "client") {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <p className="text-brand-gray">
            Only clients can create jobs.
          </p>
        </div>
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
        skills: normalizeSkills(skills),
      });

      setSuccess("Job created successfully.");
      setTitle("");
      setDescription("");
      setSkills("");
    } catch (err) {
      setError("Failed to create job, Please try again.")
    } finally {
      setLoading(false);
    }
  }

  function normalizeSkills(input) {
    // Already an array → trust but clean
    if (Array.isArray(input)) {
      return input.map(s => String(s).trim()).filter(Boolean);
    };

    if (typeof input !== "string") return [];

    const trimmed = input.trim();
    if (!trimmed) return [];

    // JSON array pasted as text
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(s => String(s).trim()).filter(Boolean);
      }
    } catch {
      // not JSON -> continue
    }

    // Split by commas OR new lines
    return trimmed.split(/[,|\n]/).map(s => s.trim()).filter(Boolean);
  }
  
  return (
    <div className="space-y-10">
      {/* Header */}  
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Create a New Job
        </h2>
        <p className="text-brand-gray mt-2 max-w-xl">
          Describe your job clearly so technicians can understand the scope and
          required skills.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-brand-border rounded-xl p-10 max-w-xl">
        <form onSubmit={handleSubmit} className="">

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
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Laptop Hardware Repair Technician"
              className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Job Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Describe the problem, expectations, and any important details…"
              className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
            />
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Required Skills
            </label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={3}
              placeholder="electrician, wiring, switch-repair"
              className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
            <p className="text-xs text-brand-muted">
              Separate skills with commas or new lines.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
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
  );
}

export default CreateJob;
