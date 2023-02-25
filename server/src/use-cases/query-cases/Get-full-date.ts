import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

interface GetTaskRequest {
  date: string;
}

export class QueryByFullDate {

  constructor(private findRecipientRepository: PrismaTaskQueryRepository) {
    
  }

  async execute(getDate: GetTaskRequest): Promise<GetTasksResponse> {
    
    const { date } = getDate;
    return {
      tasks: await this.findRecipientRepository.findByFullDate(date),
    };
  }
}
