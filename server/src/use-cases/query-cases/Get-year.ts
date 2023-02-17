import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

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

  public async execute(): Promise<GetTasksResponse> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return {
      tasks: await prismaTaskRecipientRepository.findByYear(this.date.year),
    };
  }
}
