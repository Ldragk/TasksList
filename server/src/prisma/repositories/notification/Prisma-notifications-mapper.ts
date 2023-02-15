import { Notification } from "../../../entities/Notification";
import { Task as RawNotification } from "@prisma/client";

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      title: notification.title,
      limitDay: notification.limitDay,
      limitMonth: notification.limitMonth,
      limitYear: notification.limitYear,      
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        title: raw.title,
        limitDay: raw.limitDay,
        limitMonth: raw.limitMonth,
        limitYear: raw.limitYear,       
      },
      raw.id
    );
  }
}
