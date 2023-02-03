import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OverdueTasks {
  public async consultOverdueTasks(): Promise<object[] | object> {
    const tasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        done: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const overdueTasks = tasks.filter(
      (task: any) => new Date(task.date) < new Date(Date.now())
    );

    return overdueTasks.length === 0
      ? { message: "No overdue tasks" }
      : overdueTasks;
  }
}
