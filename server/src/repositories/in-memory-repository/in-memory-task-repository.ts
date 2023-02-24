import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { ManageRepository } from "../Manage-repository";

export class InMemoryTaskRepository implements ManageRepository {
  public tasks: Task[] = [];

  async create(task: Task) {
    this.tasks.push(task);
  }

  async saveCondition(taskId: Task): Promise<void> {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    const task: Task = this.tasks[0];
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    this.tasks[taskIndex] = task;
  }
}
