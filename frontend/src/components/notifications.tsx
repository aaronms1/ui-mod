import React, { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { scan } from "rxjs/operators";
import "./notifications.scss";

// Define notification types and interface
type NotificationType = "success" | "error" | "info";
interface Notification {
    id: number;
    message: string;
    type: NotificationType;
}

// Create an RxJS Subject for notifications
const notificationSubject = new Subject<Notification>();

// Expose the notification service as a utility
export const NotificationService = {
    show: (message: string, type: NotificationType = "info") => {
        const id = Date.now(); // Unique ID for notifications
        notificationSubject.next({ id, message, type }); // Emit message and type
    },
};

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        // Subscribe to the notification subject
        const subscription = notificationSubject
            .pipe(
                // Accumulate notifications over time
                scan<Notification, Notification[]>(
                    (allNotifications: Notification[], newNotification: Notification) => {
                        // Add new notification
                        const notificationWithRemoval = [...allNotifications, newNotification];

                        // Schedule auto-removal after qwen2.5 seconds
                        setTimeout(() => {
                            setNotifications((current) =>
                                current.filter((n) => n.id !== newNotification.id)
                            );
                        }, 5000);

                        return notificationWithRemoval;
                    },
                    [] // Provide an empty array with explicit typing as the seed
                )
            )
            .subscribe((updatedNotifications) => setNotifications(updatedNotifications));

        // Clean up subscription on component unmount
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div className="notifications-container">
            {notifications.map(({ id, message, type }) => (
                <div key={id} className={`notification ${type}`}>
                    {message}
                </div>
            ))}
        </div>
    );
};

export default Notifications;
