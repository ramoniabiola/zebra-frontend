import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        items: {
            notifications: [],
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
        },
        unreadCount: 0,
        loading: false,
        error: null,
    },

    reducers: {
        getNotificationsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        getNotificationsSuccess: (state, action) => {
            state.items = action.payload;
            state.unreadCount = action.payload.notifications.filter(n => !n.isRead).length;
            state.loading = false;
        },
        getNotificationsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        addNotification: (state, action) => {
            const newNotif = { ...action.payload, isRead: false };
            state.items.notifications.unshift(newNotif);
            state.items.total += 1;
            state.unreadCount += 1;
        },

        markNotificationAsReadSuccess: (state, action) => {
            const id = action.payload;
            state.items.notifications = state.items.notifications.map(
                notif => notif._id === id ? { ...notif, isRead: true } : notif
            );
            state.unreadCount = state.items.notifications.filter(n => !n.isRead).length;
        },
        markNotificationAsReadError: (state, action) => {
            state.error = action.payload;
        },

        markAllNotificationsAsReadSuccess: (state) => {
            state.items.notifications = state.items.notifications.map(
                notif => ({ ...notif, isRead: true })
            );
            state.unreadCount = 0;
        },
        markAllNotificationsAsReadError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
  getNotificationsLoading,
  getNotificationsSuccess,
  getNotificationsError,
  addNotification,
  markNotificationAsReadSuccess,
  markNotificationAsReadError,
  markAllNotificationsAsReadSuccess,
  markAllNotificationsAsReadError,
} = notificationSlice.actions;

export default notificationSlice.reducer;
