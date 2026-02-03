export function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function normalizeSkills(input) {
  if (Array.isArray(input)) {
    return input.map(s => String(s).trim()).filter(Boolean);
  }

  if (typeof input !== "string") return [];

  const trimmed = input.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.map(s => String(s).trim()).filter(Boolean);
    }
  } catch {}

  return trimmed
    .split(/[,|\n]/)
    .map(s => s.trim())
    .filter(Boolean);
}

export function formateDate(date) {
  return  date ? new Date(date).toLocaleDateString() : "N/A";  
}