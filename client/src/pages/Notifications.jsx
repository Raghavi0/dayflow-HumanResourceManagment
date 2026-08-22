import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Notifications() {

  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    if (!user) return;

    fetch(
      `/api/notifications/${user.id}`
    )
      .then((response) =>
        response.json()
      )
      .then(setNotifications)
      .catch(console.error);

  }, [user]);

  return (

    <div className="notifications-page">

      <h1>Notifications</h1>

      {notifications.length === 0 ? (

        <p>
          No notifications yet.
        </p>

      ) : (

        <div className="notifications-list">

          {notifications.map(
            (notification) => (

              <div
                className="notification-card"
                key={notification.id}
              >

                <h3>
                  {notification.title}
                </h3>

                <p>
                  {notification.message}
                </p>

                <small>
                  {notification.createdAt}
                </small>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}
