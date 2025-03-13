import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { scan } from "rxjs/operators";
import "./notifications.scss";
// Create an RxJS Subject for notifications
const notificationSubject = new Subject();
// Expose the notification service as a utility
export const NotificationService = {
    show: (message, type = "info") => {
        const id = Date.now(); // Unique ID for notifications
        notificationSubject.next({ id, message, type }); // Emit message and type
    },
};
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        // Subscribe to the notification subject
        const subscription = notificationSubject
            .pipe(
        // Accumulate notifications over time
        scan((allNotifications, newNotification) => {
            // Add new notification
            const notificationWithRemoval = [...allNotifications, newNotification];
            // Schedule auto-removal after 5 seconds
            setTimeout(() => {
                setNotifications((current) => current.filter((n) => n.id !== newNotification.id));
            }, 5000);
            return notificationWithRemoval;
        }, [] // Provide an empty array with explicit typing as the seed
        ))
            .subscribe((updatedNotifications) => setNotifications(updatedNotifications));
        // Clean up subscription on component unmount
        return () => subscription.unsubscribe();
    }, []);
    return (_jsx("div", { className: "notifications-container", children: notifications.map(({ id, message, type }) => (_jsx("div", { className: `notification ${type}`, children: message }, id))) }));
};
export default Notifications;
//# sourceMappingURL=notifications.js.map