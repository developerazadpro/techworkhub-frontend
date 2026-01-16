import { useAuth } from "../contexts/AuthContext";
function CreateJob() {
  const { user } = useAuth();
  
  if (!user || user.role !== "client") {
    return <p>Only clients can create jobs.</p>;
  }
  
  return <h1>Create Job Page: Form will be here</h1>;
}

export default CreateJob;
