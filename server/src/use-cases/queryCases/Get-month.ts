import { Task } from "../../entities/Task";
import { PrismaTaskRepository } from "../../prisma/repositories/tasks/Prisma-task-repository";

interface IDateType {
  month: number;
  year: number;
}

export class QueryByMonth {
  constructor(private date: IDateType) {
    this.date = {
      month: date.month,
      year: date.year,
    };
  }

  public async tasksByMonth(): Promise<Task[] | object> {
    const prismaTaskRepository = new PrismaTaskRepository();

    return (
      await prismaTaskRepository.findByMonth(this.date.month, this.date.year)
    ).length === 0
      ? { message: "No tasks found" }
      : await prismaTaskRepository.findByMonth(this.date.month, this.date.year);
  }
}
