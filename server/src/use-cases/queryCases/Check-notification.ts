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
}[];

export class NotificationOfTasksNearTheDeadline {
  constructor(private daysInAdvanceForNotification: number) {
    this.daysInAdvanceForNotification = daysInAdvanceForNotification;
  }

  private async upcomingNotifications(): Promise<ISendNotification[]> {
    const tasks = await prisma.tasks.findMany({
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

    return tasks.filter(
      (task) =>
        convertExcessDaysAtTheTurnOfTheMonth(
          numberOfDaysInTheMonth(),
          this.daysInAdvanceForNotification
        ) == task.date
    );
  }

  public async sendNotification(): Promise<object | ISendNotification[]> {
    return (await this.upcomingNotifications()).length === 0
      ? { message: "There are no tasks within the established time frame" }
      : await this.upcomingNotifications();
  }
}
