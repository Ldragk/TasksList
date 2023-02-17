import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

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

  public async execute(): Promise<GetTasksResponse> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return {
      tasks: await prismaTaskRecipientRepository.findByMonth(
        this.date.month,
        this.date.year
      ),
    };
  }
}
