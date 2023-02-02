import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OverdueTasks {
  tasks!: Array<object>;
  overdueTasks!: Array<object>;

  public consultOverdueTasks = async () => {
    this.tasks = await prisma.tasks.findMany({
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
    this.overdueTasks = this.tasks.filter(
      (task: any) => new Date(task.date) < new Date(Date.now())
    );

    return this.overdueTasks.length === 0
      ? { message: "No overdue tasks" }
      : this.overdueTasks;
  };
}
