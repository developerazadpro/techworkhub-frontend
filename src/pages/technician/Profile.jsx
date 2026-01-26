export default function TechnicianProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p>Email: {user.email}</p>
      <p>Role: Technician</p>
    </div>
  );
}
