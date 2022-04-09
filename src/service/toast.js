import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export const Toast = ({ type, message }) => {
  NotificationManager.listNotify.forEach((n) =>
    NotificationManager.remove({ id: n.id })
  );
  switch (type) {
    case "success":
      NotificationManager.success("Success", message, 3000);
      break;
    case "error":
      NotificationManager.error("Error", message, 3000);
      break;
    case "info":
      NotificationManager.info("Info", message, 3000);
      break;
    case "warning":
      NotificationManager.warning("Warning", message, 3000);
      break;
  }
};
