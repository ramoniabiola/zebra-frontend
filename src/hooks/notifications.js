import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../api";
import { socket } from "../lib/socket";
import {
  getNotificationsLoading,
  getNotificationsSuccess,
  getNotificationsError,
  addNotification,
  markNotificationAsReadSuccess,
  markNotificationAsReadError,
  markAllNotificationsAsReadSuccess,
  markAllNotificationsAsReadError,
} from "../redux/notificationSlice";

export default function useNotifications(user) {
  const dispatch = useDispatch();
  const { items, loading, error, unreadCount } = useSelector((s) => s.notifications);
  const [page, setPage] = useState(1);
  const mounted = useRef(false);

  // === SOCKET HANDLING ===
  useEffect(() => {
    if (!user?._id) return;
    if (!socket.connected) socket.connect();

    socket.emit("registerUser", user._id);

    const onNew = (notif) => dispatch(addNotification(notif));
    socket.on("newNotification", onNew);

    return () => {
      socket.off("newNotification", onNew);
      socket.disconnect();
    };
  }, [user?._id, dispatch]);

  // === FETCH PAGINATED NOTIFICATIONS ===
  const fetchNotifications = async (pageNum = 1) => {
    try {
      dispatch(getNotificationsLoading());
      const { data } = await API.get(`/notifications?page=${pageNum}&limit=10`);
      dispatch(getNotificationsSuccess(data));
      setPage(pageNum);
    } catch (err) {
      dispatch(getNotificationsError(err.response?.data?.error || "Failed to fetch notifications"));
    }
  };

  useEffect(() => {
    if (!user?._id || mounted.current) return;
    mounted.current = true;
    fetchNotifications(1);
  }, [user?._id]);

  // === MARK AS READ ===
  const markAsRead = async (id) => {
    try {
      const { data } = await API.patch(`/notifications/${id}/read`);
      dispatch(markNotificationAsReadSuccess(data._id));
    } catch (err) {
      dispatch(markNotificationAsReadError(err.response?.data?.error || "Failed to mark as read"));
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.patch(`/notifications/read-all`);
      dispatch(markAllNotificationsAsReadSuccess());
    } catch (err) {
      dispatch(markAllNotificationsAsReadError(err.response?.data?.error || "Failed to mark all as read"));
    }
  };

  return {
    items, // { notifications, total, page, limit, totalPages }
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    page,
    setPage,
  };
}
