import { Notification } from "../../entities/Notification";
import { Tasks as RawNotification } from "@prisma/client";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      title: notification.title,
      limitDay: notification.limitDay,
      limitMonth: notification.limitMonth,
      limitYear: notification.limitYear,
      date: notification.date,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        title: raw.title,
        limitDay: raw.limitDay,
        limitMonth: raw.limitMonth,
        limitYear: raw.limitYear,
        date: raw.date,
      },
      raw.id
    );
  }
}
