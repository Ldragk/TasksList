import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IDateType { 
  year: number;
}

export class QueryByTheYear {
  private date: IDateType;
  private yearTasks!: object[];

  constructor(date: IDateType) {
    this.date = {     
      year: date.year,
    };
  }

  public async tasksByTheYear(): Promise<object[] | object> {
    this.yearTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {       
        limitYear: this.date.year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return this.yearTasks.length === 0 ? { message: "No tasks found" } : this.yearTasks;
  }
}
