import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class QueryAllTasks {
  async allTasks(): Promise<Task[]> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    return await prismaTaskRecipientRepository.findAllTasks();
  }
}
