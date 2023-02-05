import { Task } from "../../entities/Task";
import { PrismaTaskRepository } from "../../prisma/repositories/tasks/Prisma-task-repository";

export class QueryAllTasks {
  async allTasks(): Promise<Task[] | object> {
    const prismaTaskRepository = new PrismaTaskRepository();

    return (await prismaTaskRepository.findAllTasks()).length === 0
      ? { message: "No tasks found" }
      : await prismaTaskRepository.findAllTasks();
  }
}
