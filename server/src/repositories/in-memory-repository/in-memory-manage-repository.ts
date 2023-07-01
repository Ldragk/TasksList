import { Task } from "@src/entities/task";
import { ManageRepository } from "../manage-repository";

export class InMemoryManageRepository implements ManageRepository {
  public tasks: Task[] = [];

  async create(task: Task) {
    this.tasks.push(task);
  }

  async saveCondition(task: Task, userId: string): Promise<void> {
    if (task.userId === userId) {
      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
      this.tasks[taskIndex].done = task.done;
    } else {
      throw new Error("Access denied");
    }
  }

  async save(task: Task, userId: string): Promise<void> {
    if (task.userId === userId) {
      const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }
      this.tasks[taskIndex] = task;
    } else {
      throw new Error("Access denied");
    }
  }

  async findById(taskId: string, userId: string): Promise<Task> {
    const task = this.tasks.find((t) => t.id === taskId);

    if (!task) {
      throw new Error("Task not found");
    }
    if (task.userId === userId) {
      return task;
    } else {
      throw new Error("Access denied");
    }
  }
}
