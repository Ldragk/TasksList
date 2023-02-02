import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IDateType {
  day: number;
  month: number;
  year: number;
}

export class QueryByTheFullDate {
  private date: IDateType;
  private dateTasks!: object[];

  constructor(date: IDateType) {
    this.date = {
      day: date.day,
      month: date.month,
      year: date.year,
    };
  }

  public async tasksByTheFullDate(): Promise<object[] | object> {
    this.dateTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        limitDay: this.date.day,
        limitMonth: this.date.month,
        limitYear: this.date.year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return this.dateTasks.length === 0 ? { message: "No tasks found" } : this.dateTasks;
  }
}
