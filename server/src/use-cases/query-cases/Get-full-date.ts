import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

interface GetTaskRequest {
  date: string;
}

export class QueryByFullDate {
  async execute(getDate: GetTaskRequest): Promise<GetTasksResponse> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();
    const { date } = getDate;
    return {
      tasks: await prismaTaskRecipientRepository.findByFullDate(date),
    };
  }
}
