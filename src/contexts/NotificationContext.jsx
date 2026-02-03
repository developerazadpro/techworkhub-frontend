import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api"; // your existing axios instance

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/notifications");
      setNotifications(res.data);
      //console.log("Notifications loaded:", res);     

    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const readNotification = async (id) => {
    try {
      await api.post(`/api/notifications/${id}/read`);
      fetchNotifications(); // re-sync
    
      // Optimistic UI update
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.read_at
  ).length;

  useEffect(() => {
    // Initial load
    fetchNotifications();

    // Poll every 30 seconds
    const interval = setInterval(() => {
        fetchNotifications();
    }, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        readNotification,
        loading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
