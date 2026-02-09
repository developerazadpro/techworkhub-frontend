export function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formateDate(date) {
  return  date ? new Date(date).toLocaleDateString() : "N/A";  
}