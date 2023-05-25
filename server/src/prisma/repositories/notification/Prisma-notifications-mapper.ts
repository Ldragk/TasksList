import { Notification } from "../../../entities/notification";
import { Task as RawNotification } from "../../../../prisma-files/node_modules/@prisma/client";

export class PrismaNotificationMapper {
  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        title: raw.title,
        date: raw.date,
      },
      raw.id
    );
  }
}
