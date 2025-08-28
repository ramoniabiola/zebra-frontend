import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        notifications: {
            notifications: [], // docs array from backend
            total: 0,
            page: 0,
            limit: 0,
        },
        unreadCount: 0, // 🔹 new state for distinguishing unread
        loading: false,
        error: null,
    },

    reducers: {
        // === GET NOTIFICATIONS ===
        getNotificationsLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        getNotificationsSuccess: (state, action) => {
            state.notifications = action.payload; // { notifications: docs, total, page, limit }
            // recompute unread count from fresh payload
            state.unreadCount = action.payload.notifications.filter(n => !n.isRead).length;
            state.loading = false;
            state.error = null;
        },
        getNotificationsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // === ADD NEW NOTIFICATION (socket push) ===
        addNotification: (state, action) => {
            const newNotif = { ...action.payload, isRead: false }; // ensure new one is unread
            state.notifications.notifications.unshift(newNotif); 
            state.notifications.total += 1;
            state.unreadCount += 1; //  increment unread
        },

        // === MARK SINGLE NOTIFICATION AS READ ===
        markNotificationAsReadSuccess: (state, action) => {
            const id = action.payload;
            state.notifications.notifications = state.notifications.notifications.map(
                (notif) =>
                    notif._id === id && !notif.isRead
                        ? { ...notif, isRead: true }
                        : notif
            );
            // decrement unread count safely
            state.unreadCount = state.notifications.notifications.filter(n => !n.isRead).length;
            state.loading = false;
        },
        markNotificationAsReadError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // === MARK ALL AS READ ===
        markAllNotificationsAsReadSuccess: (state) => {
            state.notifications.notifications = state.notifications.notifications.map(
                (notif) => ({ ...notif, isRead: true })
            );
            state.unreadCount = 0; // all read now
            state.loading = false;
        },
        markAllNotificationsAsReadError: (state, action) => {
            state.loading = false;
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
