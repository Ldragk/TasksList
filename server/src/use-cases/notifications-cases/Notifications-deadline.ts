import { PrismaNotificationsRepository } from "../../prisma/repositories/notification/Prisma-notifications-repository";
import { convertExcessDaysAtTheTurnOfTheMonth } from "./functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "./functions/numberOfDaysInTheMonth";
import { Notification } from "../../entities/Notification";

export interface IParamsNotifications {
  notificationsWithinThePeriod: number;
  type: number;
}

export class NotificationOfTasksNearTheDeadline {
  private params: IParamsNotifications;

  constructor(params: IParamsNotifications) {
    this.params = {
      notificationsWithinThePeriod: params.notificationsWithinThePeriod,
      type: params.type,
    };
  }

  private async notificationsWithinTheEstablishedDeadline(): Promise<
    Notification[]
  > {
    const prismaNotificationsRepository: any =
      new PrismaNotificationsRepository();

    const tasks: Notification[] =
      await prismaNotificationsRepository.findNotifications(false);

    const todayDate: string = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;

    if (this.params.type === 1) {
      return tasks.filter(
        (task: Notification) =>
          convertExcessDaysAtTheTurnOfTheMonth(
            numberOfDaysInTheMonth(),
            this.params.notificationsWithinThePeriod
          ) === task.date
      );
    }
    return tasks.filter(
      (task: Notification) =>
        new Date(task.date) <=
          new Date(
            convertExcessDaysAtTheTurnOfTheMonth(
              numberOfDaysInTheMonth(),
              this.params.notificationsWithinThePeriod
            )
          ) && new Date(task.date) >= new Date(todayDate)
    );
  }

  public async sendNotification(): Promise<object | Notification[]> {
    return !!(await this.notificationsWithinTheEstablishedDeadline())
      ? { message: "There are no tasks within the established time frame" }
      : await this.notificationsWithinTheEstablishedDeadline();
  }
}
