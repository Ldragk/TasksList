import { Notification } from "../../entities/Notification";
import { PrismaNotificationsRepository } from "../../prisma/repositories/notification/Prisma-notifications-repository";
import { NotificationOfTasksNearTheDeadline } from "../../use-cases/notifications-cases/Notifications-deadline";
import { NotificationViewModel } from "../view-models/Notification-view-model";

export class Notifications {
  notificationOfTasksNearTheDeadline = async (
    req: { params: { daysOfDelay: string; type: string } },
    res: { json: (arg0: NotificationViewModel) => Notification }
  ) => {
    const notifications = new NotificationOfTasksNearTheDeadline(
      new PrismaNotificationsRepository()
    );

    const { notification } = await notifications.execute({
      notificationsWithinThePeriod: Number(req.params.daysOfDelay),
      type: Number(req.params.type),
    });

    return {
      get: res.json(notification.map(NotificationViewModel.toHTTP)),
    };
  };
}
