import { ClassMiddleware, Controller, Get, Middleware } from "@overnightjs/core";
import { PrismaNotificationsRepository } from "@src/prisma/repositories/notification/Prisma-notifications-repository";
import { NotificationOfTasksNearTheDeadline } from "@src/use-cases/notifications-cases/notifications-deadline";
import { NotificationViewModel } from "../view-models/notification-view-model";
import { Request, Response } from "express";
import { BaseController } from ".";
import { RateLimiter } from "@src/middlewares/rate-limiter";
import { AuthMiddleware } from "@src/middlewares/auth";

const manyRequest = 5

@Controller("tasks")
@ClassMiddleware(AuthMiddleware)
export class Notifications extends BaseController {

  @Get("notifications/:daysOfDelay/:type")
  @Middleware(new RateLimiter(manyRequest).getMiddleware())
  notificationOfTasksNearTheDeadline = async (
    req: Request<{ daysOfDelay: string; type: string }>,
    res: Response
  ) => {
    const notifications = new NotificationOfTasksNearTheDeadline(
      new PrismaNotificationsRepository()
    );
    const userId = req.context.userId._id

    try {
      const { notification } = await notifications.execute(userId, {
        notificationsWithinThePeriod: Number(req.params.daysOfDelay),
        type: Number(req.params.type),
      });

      return {
        get: res.json(notification.map(NotificationViewModel.toHTTP)),
      };
    } catch (err) {
      return this.errorResponse(res, err as Error);
    }
  };
}
