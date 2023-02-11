import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

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

  public async tasksByYear(): Promise<Task[]> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return await prismaTaskRecipientRepository.findByYear(this.date.year);
  }
}
