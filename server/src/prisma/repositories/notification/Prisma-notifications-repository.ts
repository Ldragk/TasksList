import { PrismaNotificationMapper } from "./Prisma-notifications-mapper";
import { Notification } from "../../../entities/Notification";
import { NotificationRepository } from "../../../repositories/Notification-repository";
import { PrismaService } from "../../prisma.service";

const prismaService = new PrismaService();

export class PrismaNotificationsRepository implements NotificationRepository {
  constructor() {}

  async findNotifications(done: boolean): Promise<Notification[]> {
    const taskNotification = await prismaService.task.findMany({
      where: {
        done: done,
      },
    });

    return taskNotification.map(PrismaNotificationMapper.toDomain);
  }
}
