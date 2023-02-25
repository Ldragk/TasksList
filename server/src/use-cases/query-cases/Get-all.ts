import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export interface GetTasksResponse {
  tasks: Task[];
}

export class QueryAllTasks {
  constructor(
    private findRecipientRepository: PrismaTaskQueryRepository
  ) {}

  public async execute(): Promise<GetTasksResponse> {
    return { tasks: await this.findRecipientRepository.findAllTasks() };
  }
}
