import { PrismaNotificationMapper } from "./Prisma-notifications-mapper";
import { PrismaClient } from "@prisma/client";
import { Notification } from "../../../entities/Notification";

const prisma = new PrismaClient();

export class PrismaNotificationsRepository extends PrismaNotificationMapper {
  constructor() {
    super();
  }

  async findNotifications(done: boolean): Promise<Notification[]> {
    const taskNotification = await prisma.task.findMany({
      where: {
        done: done,
      },
    });

    return taskNotification.map(PrismaNotificationMapper.toDomain);
  }
}
