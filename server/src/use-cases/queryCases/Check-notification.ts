import { PrismaClient } from "@prisma/client";
import { convertExcessDaysAtTheTurnOfTheMonth } from "../functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "../functions/numberOfDaysInTheMonth";

const prisma = new PrismaClient();

export interface ISendNotification {
  id: string;
  title: string;
  date: string;
  done: boolean;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
}
[];

export interface IParams {
  notificationsWithinThePeriod: number;
  type: number;
}

export class NotificationOfTasksNearTheDeadline {
  private tasks!: ISendNotification[];
  private params!: IParams;

  constructor(params: IParams) {
    this.params = {
      notificationsWithinThePeriod: params.notificationsWithinThePeriod,
      type: params.type,
    };
  }

  private async upcomingNotifications(): Promise<ISendNotification[]> {
    this.tasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        date: true,
        done: true,
        limitDay: true,
        limitMonth: true,
        limitYear: true,
      },
      where: {
        done: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (this.params.type === 1) {
      return this.tasks.filter(
        (task) =>
          convertExcessDaysAtTheTurnOfTheMonth(
            numberOfDaysInTheMonth(),
            this.params.notificationsWithinThePeriod
          ) === task.date
      );
    }
    return this.tasks.filter(
      (task) =>
        new Date(task.date) <=
          new Date(
            convertExcessDaysAtTheTurnOfTheMonth(
              numberOfDaysInTheMonth(),
              this.params.notificationsWithinThePeriod
            )
          ) &&
        new Date(task.date) >=
          new Date(
            `${
              new Date().getMonth() + 1
            }/${new Date().getDate()}/${new Date().getFullYear()}`
          )
    );
  }

  public async sendNotification(): Promise<object | ISendNotification[]> {
    return (await this.upcomingNotifications()).length === 0
      ? { message: "There are no tasks within the established time frame" }
      : await this.upcomingNotifications();
  }
}
