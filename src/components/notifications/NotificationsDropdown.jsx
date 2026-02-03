import { useState } from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import NotificationItem from "./NotificationItem";
import { Bell } from "lucide-react";

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    readNotification,
    loading,
  } = useNotifications();

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-xl"
      >
        <Bell size={22}/>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="px-4 py-2 border-b font-semibold text-sm">
            Notifications
          </div>

          {loading && (
            <p className="p-4 text-sm text-gray-500">
              Loading...
            </p>
          )}

          {!loading && notifications.length === 0 && (
            <p className="p-4 text-sm text-gray-500">
              No notifications
            </p>
          )}

          {!loading &&
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={readNotification}
              />
            ))}
        </div>
      )}
    </div>
  );
}
