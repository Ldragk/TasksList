import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export interface GetTasksResponse {
  tasks: Task[];
}

export class QueryAllTasks {
  public static async execute(): Promise<GetTasksResponse> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return { tasks: await prismaTaskRecipientRepository.findAllTasks() };
  }
}
