import { Controller, Get } from "@overnightjs/core";
import { Notification } from "../../entities/notification";
import { PrismaNotificationsRepository } from "../../prisma/repositories/notification/Prisma-notifications-repository";
import { NotificationOfTasksNearTheDeadline } from "../../use-cases/notifications-cases/notifications-deadline";
import { NotificationViewModel } from "../view-models/notification-view-model";

@Controller("tasks")
export class Notifications {

  @Get("notifications/:daysOfDelay/:type")
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
