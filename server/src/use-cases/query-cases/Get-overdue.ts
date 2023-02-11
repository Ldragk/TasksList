import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class OverdueTasks {
  public async consultOverdueTasks(): Promise<Task[] | object> {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();

    const overdueTasks = (
      await prismaTaskRecipientRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date) < new Date(Date.now()));

    return !!overdueTasks ? { message: "No overdue tasks" } : overdueTasks;
  }
}
