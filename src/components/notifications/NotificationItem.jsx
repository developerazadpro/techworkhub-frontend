import { useNavigate } from "react-router-dom";

export default function NotificationItem({ notification, onRead }) {
  const navigate = useNavigate();  
  const isUnread = !notification.read_at;

  const handleClick = async () => {
    // 1. Mark as read (if needed)
    if (isUnread) {
      try {
        await onRead(notification.id);
      } catch (e) {
        console.error("Failed to mark notification as read", e);
      }
    }

    // 2. Navigate to related job
    if (notification.data?.route) {
      navigate(notification.data.route);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-3 border-b cursor-pointer transition ${
        isUnread
          ? "bg-blue-50 hover:bg-blue-100"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <p className="text-sm font-medium text-gray-800">
        {notification.title}
      </p>

      <p className="text-xs text-gray-600 mt-1">
        {notification.body}
      </p>

      <p className="text-[11px] text-gray-400 mt-1">
        {new Date(notification.created_at).toLocaleString()}
      </p>
    </div>
  );
}
