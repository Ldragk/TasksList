import { Task } from "@src/entities/task";
import { ManageRepository } from "../manage-repository";

export class InMemoryManageRepository implements ManageRepository {
  public tasks: Task[] = [];

  async create(task: Task) {
    this.tasks.push(task);
  }

  async saveCondition(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    this.tasks[taskIndex] = task;
  }

  async findeById(taskId: string, userId: string): Promise<Task> {      
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }
}
