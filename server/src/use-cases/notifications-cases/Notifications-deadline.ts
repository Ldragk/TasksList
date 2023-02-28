import { PrismaNotificationsRepository } from "../../prisma/repositories/notification/Prisma-notifications-repository";
import { convertExcessDaysAtTheTurnOfTheMonth } from "./functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "./functions/numberOfDaysInTheMonth";
import { Notification } from "../../entities/Notification";

export interface IParamsNotifications {
  notificationsWithinThePeriod: number;
  type: number;
}

interface NotificationResponse {
  notification: Notification[];
}

export class NotificationOfTasksNearTheDeadline {
  constructor(private notificationRepository: PrismaNotificationsRepository) {}

  async execute({
    notificationsWithinThePeriod,
    type,
  }: IParamsNotifications): Promise<NotificationResponse> {
    const tasks: Notification[] =
      await this.notificationRepository.findNotifications(false);

    const todayDate: string = `${
      new Date().getMonth() + 1
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
