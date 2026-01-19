import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <AppRoutes />
      </div>      
    </AuthProvider>
  )
}

export default App;