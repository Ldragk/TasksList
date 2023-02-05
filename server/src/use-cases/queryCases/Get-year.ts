import { Task } from "../../entities/Task";
import { PrismaTaskRepository } from "../../prisma/repositories/tasks/Prisma-task-repository";

interface IDateType {
  year: number;
}

export class QueryByYear {
  private date: IDateType;

  constructor(date: IDateType) {
    this.date = {
      year: date.year,
    };
  }

  public async tasksByYear(): Promise<Task[] | object> {
    const prismaTaskRepository = new PrismaTaskRepository();

    return (await prismaTaskRepository.findByYear(this.date.year)).length === 0
      ? { message: "No tasks found" }
      : await prismaTaskRepository.findByYear(this.date.year);
  }
}
