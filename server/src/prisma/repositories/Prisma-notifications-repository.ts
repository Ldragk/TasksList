import { PrismaNotificationMapper } from "./Prisma-notifications-mapper";
import { PrismaClient, Tasks } from "@prisma/client";
import { Notification } from "../../entities/Notification";

const prisma = new PrismaClient();

export class PrismaNotificationsRepository extends PrismaNotificationMapper {
  constructor() {
    super();
  }

  async findNotifications(done: boolean): Promise<Notification[]> {
    const taskNotification = prisma.tasks.findMany({
      where: {
        done: done,
      },
    });

    return (await taskNotification).map(PrismaNotificationMapper.toDomain);
  }
}
