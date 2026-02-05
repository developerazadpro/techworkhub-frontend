import { useState, useEffect } from "react";
import { getMySkills, updateMySkills } from "../../api/technician";

export const useProfile = () => {
  const [skills, setSkills] = useState([]);
  const [skillIds, setSkillIds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getMySkills();
        setSkills(data);
        setSkillIds(data.map((s) => s.id));
      } catch (err) {
        console.error("Failed to fetch skills", err);
      }
    }
    fetchSkills();
  }, []);

  const saveSkills = async () => {
    setLoading(true);
    try {
      await updateMySkills(skillIds);
      const data = await getMySkills();
      setSkills(data);
      setSkillIds(data.map((s) => s.id));
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { skills, skillIds, setSkillIds, loading, saveSkills };
};
