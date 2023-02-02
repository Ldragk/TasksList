import { PrismaClient } from "@prisma/client";
import { convertExcessDaysAtTheTurnOfTheMonth } from "../functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "../functions/numberOfDaysInTheMonth";

const prisma = new PrismaClient();

interface ISendNotification {
  id: string;
  title: string;
  date: string;
  done: boolean;
  limitDay: number;
  limitMonth: number;
  limitYear: number;
}
[];

export interface IParamsNotifications {
  notificationsWithinThePeriod: number;
  type: number;
}

type Tasks = ISendNotification[];

export class NotificationOfTasksNearTheDeadline {
  private tasks!: Tasks;
  private params!: IParamsNotifications;
  private todayDate!: string;

  constructor(params: IParamsNotifications) {
    this.params = {
      notificationsWithinThePeriod: params.notificationsWithinThePeriod,
      type: params.type,
    };
  }

  private async notificationsWithinTheEstablishedDeadline(): Promise<
    ISendNotification[]
  > {
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
    this.todayDate = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;

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
          ) && new Date(task.date) >= new Date(this.todayDate)
    );
  }

  public async sendNotification(): Promise<object | ISendNotification[]> {
    return (await this.notificationsWithinTheEstablishedDeadline()).length === 0
      ? { message: "There are no tasks within the established time frame" }
      : await this.notificationsWithinTheEstablishedDeadline();
  }
}
