import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class OverdueTasks {
  public async consultOverdueTasks(): Promise<object[] | object> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    const overdueTasks = (
      await prismaTaskRecipientRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date) < new Date(Date.now()));

    return overdueTasks.length === 0
      ? { message: "No overdue tasks" }
      : overdueTasks;
  }
}
