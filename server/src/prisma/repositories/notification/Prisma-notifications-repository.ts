import { PrismaNotificationMapper } from "./Prisma-notifications-mapper";
import { Notification } from "@src/entities/notification";
import { NotificationRepository } from "@src/repositories/notification-repository";
import { prisma } from "@src/prisma-client";

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
