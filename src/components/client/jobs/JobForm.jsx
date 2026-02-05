import SkillsSelector from "../../shared/SkillsSelector";

export default function JobForm({
  title,
  setTitle,
  description,
  setDescription,
  skillIds,
  setSkillIds,
  loading,
  saving,
  error,
  success,
  onSubmit,
  submitLabel,
  helperText,
}) {
  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  return (
    <div className="bg-white border border-brand-border rounded-2xl p-8 space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        {success && (
          <div className="bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <section className="space-y-2">
          <label className="text-sm font-medium">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green"
            required
          />
        </section>

        <section className="space-y-2">
          <label className="text-sm font-medium">Job Description</label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green"
            required
          />
        </section>

        <section className="space-y-2">
          <label className="text-sm font-medium">Required Skills</label>
          <SkillsSelector value={skillIds} onChange={setSkillIds} />
          {helperText && (
            <p className="text-xs text-brand-muted">{helperText}</p>
          )}
        </section>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand-green text-white text-sm font-medium hover:opacity-90 disabled:opacity-60 transition"
          >
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
