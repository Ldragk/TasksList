import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

export class OverdueTasks {
  public async execute(): Promise<GetTasksResponse> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    const overdueTasks = (
      await prismaTaskRecipientRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date) < new Date(Date.now()));

    return { tasks: overdueTasks };
  }
}
