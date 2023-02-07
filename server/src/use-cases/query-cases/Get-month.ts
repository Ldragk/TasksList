import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

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
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return (
      await prismaTaskRecipientRepository.findByMonth(
        this.date.month,
        this.date.year
      )
    ).length === 0
      ? { message: "No tasks found" }
      : await prismaTaskRecipientRepository.findByMonth(
          this.date.month,
          this.date.year
        );
  }
}
