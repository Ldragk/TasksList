import { Controller, Get } from "@overnightjs/core";
import { Notification } from "@src/entities/notification";
import { PrismaNotificationsRepository } from "@src/prisma/repositories/notification/Prisma-notifications-repository";
import { NotificationOfTasksNearTheDeadline } from "@src/use-cases/notifications-cases/notifications-deadline";
import { NotificationViewModel } from "../view-models/notification-view-model";
import logger from "@src/logger";

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

   try{
    const { notification } = await notifications.execute({
      notificationsWithinThePeriod: Number(req.params.daysOfDelay),
      type: Number(req.params.type),
    });

    return {
      get: res.json(notification.map(NotificationViewModel.toHTTP)),
    };
   } catch (err) {
      return logger.error(err);
    }
  };
}
