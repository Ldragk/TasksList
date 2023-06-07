import { Controller, Get, Middleware } from "@overnightjs/core";
import { PrismaNotificationsRepository } from "@src/prisma/repositories/notification/Prisma-notifications-repository";
import { NotificationOfTasksNearTheDeadline } from "@src/use-cases/notifications-cases/notifications-deadline";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { Response } from "express";
import { BaseController } from ".";
import { RateLimiter } from "@src/middlewares/rate-limiter";

const manyRequest = new RateLimiter(5).getMiddleware()

@Controller("tasks")
export class Notifications extends BaseController{

  @Get("notifications/:daysOfDelay/:type")
  @Middleware(manyRequest)
  notificationOfTasksNearTheDeadline = async (
    req: { params: { daysOfDelay: string; type: string } },
    res: Response
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
    return this.sendCreateUpdateErrorResponse(res, err as Error);
    }
  };
}
