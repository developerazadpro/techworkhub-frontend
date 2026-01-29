import { Mail, User, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/api";
import SkillsSelector from "../../components/SkillsSelector";

export default function TechnicianProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [skills, setSkills] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch technician skills
  useEffect(() => {
    async function fetchMySkills() {
      const res = await api.get("/api/technician/skills");
      setSkills(res.data.skills);
      setSkillIds(res.data.skills.map((s) => s.id));
    }

    fetchMySkills();
  }, []);

  // Save skills handler
  async function handleSaveSkills() {
    setLoading(true);
    try {
      await api.put("/api/technician/skills", {
        skill_ids: skillIds,
      });

      // refresh UI
      const res = await api.get("/api/technician/skills");
      setSkills(res.data.skills);
      setIsEditingSkills(false);
    } catch {
      alert("Failed to update skills");
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
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage your personal and work information
          </p>
        </div>

        {/* Account Info */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>

          <div className="bg-white border border-brand-border rounded-2xl p-6 space-y-4 text-sm text-brand-gray">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-brand-muted" />
              <span className="font-medium">{user.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-muted" />
              <span>{user.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-brand-muted" />
              <span className="capitalize">
                {user.role || "technician"}
              </span>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white border border-brand-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>

            {!isEditingSkills && (
              <button
                onClick={() => setIsEditingSkills(true)}
                className="text-sm text-brand-green hover:underline"
              >
                Edit
              </button>
            )}
          </div>

          {/* VIEW MODE */}
          {!isEditingSkills && (
            skills.length === 0 ? (
              <p className="text-sm text-brand-muted">
                No skills added yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs px-3 py-1 rounded-full bg-brand-accent border border-brand-border"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )
          )}

          {/* EDIT MODE */}
          {isEditingSkills && (
            <div className="bg-white border border-brand-border rounded-2xl p-6 space-y-4">
              <SkillsSelector
                value={skillIds}
                onChange={setSkillIds}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsEditingSkills(false);
                    setSkillIds(skills.map((s) => s.id)); // reset
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-brand-border"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveSkills}
                  disabled={loading}
                  className="px-4 py-2 text-sm rounded-lg bg-brand-green text-white disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        {/* Work Overview */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h4 className="font-semibold mb-4">Work Overview</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-brand-accent rounded-xl p-4">
              <p className="text-sm text-brand-muted">Completed Jobs</p>
              <p className="text-2xl font-semibold mt-1">12</p>
            </div>

            <div className="bg-brand-accent rounded-xl p-4">
              <p className="text-sm text-brand-muted">Active Jobs</p>
              <p className="text-2xl font-semibold mt-1">3</p>
            </div>
          </div>
        </div>

        {/* Future Actions Placeholder */}
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <p className="text-sm text-brand-muted text-center">
            Profile editing & skills management coming soon
          </p>
        </div>
      </aside>
    </div>
  );
}
