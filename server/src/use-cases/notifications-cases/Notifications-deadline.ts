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
          ) === `${task.limitMonth}/${task.limitDay}/${task.limitYear}`
      );
    }

    return tasks.filter(
      (task: Notification) =>
        new Date(`${task.limitMonth}/${task.limitDay}/${task.limitYear}`) <=
          new Date(
            convertExcessDaysAtTheTurnOfTheMonth(
              numberOfDaysInTheMonth(),
              this.params.notificationsWithinThePeriod
            )
          ) &&
        new Date(`${task.limitMonth}/${task.limitDay}/${task.limitYear}`) >=
          new Date(todayDate)
    );
  }

  public async execute(): Promise<NotificationResponse> {
    return {
      notification: await this.notificationsWithinTheEstablishedDeadline(),
    };
  }
}
