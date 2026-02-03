import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <AppRoutes />
        </div>  
      </NotificationProvider>          
    </AuthProvider>
  )
}

export default App;