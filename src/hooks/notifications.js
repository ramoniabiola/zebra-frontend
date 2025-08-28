import { useEffect, useRef } from "react";
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
  const { loading, error, unreadCount } = useSelector((state) => state.notifications);
  const mounted = useRef(false);

  // Connect socket + register user
  useEffect(() => {
    if (!user?._id) return;

    if (!socket.connected) socket.connect();

    socket.emit("registerUser", user._id);

    const onNew = (notif) => {
      dispatch(addNotification(notif));
    };

    socket.on("newNotification", onNew);

    return () => {
      socket.off("newNotification", onNew);
      socket.disconnect();
    };
  }, [user?._id, dispatch]);

  
  // Initial fetch
  useEffect(() => {
    if (!user?._id || mounted.current) return;
    mounted.current = true;

    const fetchNotifications = async () => {
      try {
        dispatch(getNotificationsLoading());
        const { data } = await API.get("/notifications/");
        dispatch(getNotificationsSuccess(data));
      } catch (err) {
        dispatch(getNotificationsError(err.response?.data?.error || "Failed to fetch notifications"));
      }
    };

    fetchNotifications();
  }, [user?._id, dispatch]);

  // Mark single as read
  const markAsRead = async (id) => {
    try {
      const { data } = await API.patch(`/notifications/${id}/read`);
      dispatch(markNotificationAsReadSuccess(data._id));
    } catch (err) {
      dispatch(markNotificationAsReadError(err.response?.data?.error || "Failed to mark as read"));
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await API.patch(`/notifications/read-all`, {}, { withCredentials: true });
      dispatch(markAllNotificationsAsReadSuccess());
    } catch (err) {
      dispatch(markAllNotificationsAsReadError(err.response?.data?.error || "Failed to mark all as read"));
    }
  };

  return {
    loading,
    error,
    unreadCount, 
    markAsRead,
    markAllAsRead,
  };
}
