import { PrismaTaskRepository } from "../../prisma/repositories/tasks/Prisma-task-repository";

export class OverdueTasks {
  public async consultOverdueTasks(): Promise<object[] | object> {
    const prismaTaskRepository = new PrismaTaskRepository();

    const overdueTasks = (
      await prismaTaskRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date) < new Date(Date.now()));

    return overdueTasks.length === 0
      ? { message: "No overdue tasks" }
      : overdueTasks;
  }
}
