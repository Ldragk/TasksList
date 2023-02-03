import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class QueryAllTasks {
  tasks!: object[];

  async allTasks(): Promise<object[] | object> {
    this.tasks = await prisma.tasks.findMany({
      select: {
        id: true,
        title: true,
        description: true,        
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return this.tasks.length === 0 ? { message: "No tasks found" } : this.tasks;
  }
}
