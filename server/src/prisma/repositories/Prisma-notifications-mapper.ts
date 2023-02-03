import { Notification } from '../../entities/Notification';



export class PrismaNotificationMapper {  
                                                      
  private static toPrisma(notification: Notification): Notification {
    return {
      id: notification.id,
      title: notification.title,      
      done: notification.done,
      limitDay: notification.limitDay,
      limitMonth: notification.limitMonth,
      limitYear: notification.limitYear,
    };
  }

  static toDomain(raw: Notification): Notification {
    return new Notification(
      {
      id: Notification.id,
      title: Notification.title,      
      done: Notification.done,
      limitDay: Notification.limitDay,
      limitMonth: Notification.limitMonth,
      limitYear: Notification.limitYear,
      },
      raw.done,
    );
  }

}
