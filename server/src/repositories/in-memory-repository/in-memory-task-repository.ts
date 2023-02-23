import { Task } from "../../entities/Task";
import { ManageRepository } from "../Manage-repository";

export class InMemoryTaskRepository implements ManageRepository {
  public tasks: Task[] = [];

  async create(task: Task) {
    this.tasks.push(task);
  }

  async saveCondition(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    this.tasks[taskIndex] = task;
  }

  async save(task: Task): Promise<void> {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }
    this.tasks[taskIndex] = task;
  }
}
