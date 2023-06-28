import { convertExcessDaysAtTheTurnOfTheMonth } from "./functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "./functions/numberOfDaysInTheMonth";
import { Notification } from "@src/entities/notification";
import { NotificationRepository } from "@src/repositories/notification-repository";

export interface IParamsNotifications {
  notificationsWithinThePeriod: number;
  type: number;
}

interface NotificationResponse {
  notification: Notification[];
}

export class NotificationOfTasksNearTheDeadline {
  constructor(private notificationRepository: NotificationRepository) { }

  async execute(userId: string, {
    notificationsWithinThePeriod,
    type,
  }: IParamsNotifications): Promise<NotificationResponse> {

    if (notificationsWithinThePeriod > 25) {
      throw new Error('The maximum number of days in advance is 25 days');
    }
    return await this.notificationType(userId, {
      notificationsWithinThePeriod,
      type,
    });
  }

  private async notificationType(userId: string, {
    notificationsWithinThePeriod,
    type,
  }: IParamsNotifications): Promise<NotificationResponse> {

    const tasks: Notification[] =
      await this.notificationRepository.findNotifications(userId, false);

    const todayDate = `${new Date().getMonth() + 1
      }/${new Date().getDate()}/${new Date().getFullYear()}`;

    if (type === 1) {
      return {
        notification: tasks.filter(
          (task: Notification) =>
            convertExcessDaysAtTheTurnOfTheMonth(
              numberOfDaysInTheMonth(todayDate),
              notificationsWithinThePeriod
            ) === task.date
        ),
      };
    }
    return {
      notification: tasks.filter(
        (task: Notification) =>
          new Date(task.date) <=
          new Date(
            convertExcessDaysAtTheTurnOfTheMonth(
              numberOfDaysInTheMonth(todayDate),
              notificationsWithinThePeriod
            )
          ) && new Date(task.date) >= new Date(todayDate)
      ),
    };
  }
}
