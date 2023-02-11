import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

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
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return !!(await prismaTaskRecipientRepository.findByFullDate(
      this.date.day,
      this.date.month,
      this.date.year
    ))
      ? { message: "No tasks found" }
      : await prismaTaskRecipientRepository.findByFullDate(
          this.date.day,
          this.date.month,
          this.date.year
        );
  }
}
