import { PrismaClient, PrismaPromise } from "@prisma/client";

const prisma = new PrismaClient();

export class DelayedTasks {
  delayedTasks!: Array<object>;
  overdueTasks!: Array<object>;

  public consultDelayedTasks = async () => {
    this.delayedTasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        done: true,
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
    this.overdueTasks = this.delayedTasks.filter(
      (task: any) => new Date(task.date) < new Date(Date.now())
    );

    return this.overdueTasks.length === 0
      ? { message: "No delayed tasks" }
      : this.overdueTasks;
  };
}
