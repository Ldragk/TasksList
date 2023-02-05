import { Task } from "../../entities/Task";
import { PrismaTaskRepository } from "../../prisma/repositories/tasks/Prisma-task-repository";

interface IDateType {
  day: number;
  month: number;
  year: number;
}

export class QueryByFullDate {
  constructor(private date: IDateType) {
    this.date = {
      day: date.day,
      month: date.month,
      year: date.year,
    };
  }

  public async tasksByFullDate(): Promise<Task[] | object> {
    const prismaTaskRepository = new PrismaTaskRepository();

    return (
      await prismaTaskRepository.findByFullDate(
        this.date.day,
        this.date.month,
        this.date.year
      )
    ).length === 0
      ? { message: "No tasks found" }
      : await prismaTaskRepository.findByFullDate(
          this.date.day,
          this.date.month,
          this.date.year
        );
  }
}
