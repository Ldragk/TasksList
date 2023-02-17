import { Notification } from "../../entities/Notification";
import { NotificationOfTasksNearTheDeadline } from "../../use-cases/notifications-cases/Notifications-deadline";
import { NotificationViewModel } from "../view-models/Notification-view-model";

export class Notifications {
  notificationOfTasksNearTheDeadline = async (
    req: { params: { daysOfDelay: string; type: string } },
    res: { json: (arg0: NotificationViewModel) => Notification }
  ) => {
    const notifications = new NotificationOfTasksNearTheDeadline({
      notificationsWithinThePeriod: Number(req.params.daysOfDelay),
      type: Number(req.params.type),
    });

    const { notification } = await notifications.execute();

    return {
      get: res.json(
        notification.map(NotificationViewModel.toHTTP)
      ),
    };
  };
}
