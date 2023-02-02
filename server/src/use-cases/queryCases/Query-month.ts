import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IDateType {
  month: number;
  year: number;
}

export class QueryByTheMonth {
  private date: IDateType;
  private monthTasks!: object[];

  constructor(date: IDateType) {
    this.date = {
      month: date.month,
      year: date.year,
    };
  }

  public async tasksByTheMonth(): Promise<object[] | object> {
    this.monthTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        limitMonth: this.date.month,
        limitYear: this.date.year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return this.monthTasks.length === 0 ? { message: "No tasks found" } : this.monthTasks;
  }
}
