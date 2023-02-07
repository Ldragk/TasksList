import {
    IParamsNotifications,
    NotificationOfTasksNearTheDeadline,
  } from "../../use-cases/notifications-cases/Notifications-deadline";

type NotificationsWithinThePeriod = object

export class Notifications{
    notificationsWithinThePeriod!: NotificationsWithinThePeriod;
    notifications!: NotificationOfTasksNearTheDeadline;
    paramsNotification!: IParamsNotifications;

    notificationOfTasksNearTheDeadline = async (
        req: { params: { daysOfDelay: string; type: string } },
        res: {
          json: (arg0: object) => JSON;
        }
      ) => {
        this.notifications = new NotificationOfTasksNearTheDeadline({
          notificationsWithinThePeriod: Number(req.params.daysOfDelay),
          type: Number(req.params.type),
        });    
        
        this.notificationsWithinThePeriod =
          await this.notifications.sendNotification();
        return res.json(this.notificationsWithinThePeriod);
      };
  static id: any;
  static title: any;
  static done: any;
  static limitDay: any;
  static limitMonth: any;
  static limitYear: any;
}