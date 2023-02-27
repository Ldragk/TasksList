import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

export class OverdueTasks {
  constructor(private findRecipientRepository: PrismaTaskQueryRepository) {}

  async execute(): Promise<GetTasksResponse> {
    const overdueTasks = (
      await this.findRecipientRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date.value) < new Date(Date.now()));

    return { tasks: overdueTasks };
  }
}
