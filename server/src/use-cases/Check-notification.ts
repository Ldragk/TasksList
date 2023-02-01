import { PrismaClient } from "@prisma/client";
import { convertExcessDaysAtTheTurnOfTheMonth } from "./functions/convertExcessDaysAtTheTurnOfTheMonth";
import { numberOfDaysInTheMonth } from "./functions/numberOfDaysInTheMonth";

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

export class NotificationOfTasksNearTheDeadline {
  constructor(private daysInAdvanceForNotification: number) {
    this.daysInAdvanceForNotification = daysInAdvanceForNotification;
  }

  private async upcomingNotifications() {
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

    if (
      !tasks.filter(
        (task) =>
          convertExcessDaysAtTheTurnOfTheMonth(
            numberOfDaysInTheMonth(),
            this.daysInAdvanceForNotification
          ) == task.date
      )
    ) {
      throw new Error("Notification not found");
    }
    return tasks.filter(
      (task) =>
        convertExcessDaysAtTheTurnOfTheMonth(
          numberOfDaysInTheMonth(),
          this.daysInAdvanceForNotification
        ) == task.date
    );
  }

  public async sendNotification(): Promise<ISendNotification[]> {
    return await this.upcomingNotifications();
  }
}
