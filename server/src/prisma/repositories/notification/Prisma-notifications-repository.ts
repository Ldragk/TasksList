import { PrismaNotificationMapper } from "./Prisma-notifications-mapper";
import { Notification } from "../../../entities/notification";
import { NotificationRepository } from "../../../repositories/notification-repository";
import { PrismaService } from "../../prisma.service";

const prismaService = new PrismaService();

export class PrismaNotificationsRepository implements NotificationRepository {
  async findNotifications(done: boolean): Promise<Notification[]> {
    const taskNotification = await prismaService.task.findMany({
      where: {
        done: done,
      },
    });

    return taskNotification.map(PrismaNotificationMapper.toDomain);
  }
}
