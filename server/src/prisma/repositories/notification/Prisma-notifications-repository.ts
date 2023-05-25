import { PrismaNotificationMapper } from "./Prisma-notifications-mapper";
import { Notification } from "../../../entities/notification";
import { NotificationRepository } from "../../../repositories/notification-repository";
import { prisma } from "../../prisma-client";

export class PrismaNotificationsRepository implements NotificationRepository {
  async findNotifications(done: boolean): Promise<Notification[]> {
    const taskNotification = await prisma.task.findMany({
      where: {
        done: done,
      },
    });

    return taskNotification.map(PrismaNotificationMapper.toDomain);
  }
}
