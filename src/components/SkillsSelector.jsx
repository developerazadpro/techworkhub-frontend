import { useEffect, useState } from "react";
import api from "../api/api";

export default function SkillsSelector({ value = [], onChange }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all available skills
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await api.get("/api/skills");
        setSkills(res.data.skills);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  // Toggle select / unselect
  function toggleSkill(id) {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  }

  if (loading) {
    return <p className="text-sm text-brand-muted">Loading skills…</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const selected = value.includes(skill.id);

        return (
          <button
            key={skill.id}
            type="button"
            onClick={() => toggleSkill(skill.id)}
            className={`text-xs px-3 py-1 rounded-full border transition
              ${
                selected
                  ? "bg-brand-green text-white border-brand-green"
                  : "bg-white border-brand-border text-brand-gray hover:bg-brand-accent"
              }`}
          >
            {skill.name}
          </button>
        );
      })}
    </div>
  );
}
