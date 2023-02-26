import { Task } from "../../entities/Task";
import { QueryRepository } from "../Query-repository";
import { InMemoryManageRepository } from "./in-memory-manage-repository";

export class InMemoryFindRepository
  extends InMemoryManageRepository
  implements QueryRepository
{
  public tasks: Task[] = [];

  async findAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async findByFullDate(date: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.date.value === date);
  }

  async findByMonth(month: number, days: number[], year: number): Promise<any> {
    for (let i = 0; i < days.length; i++)
      return this.tasks.filter((task) => {
        return task.date.value[i] === `${month}/${days[i]}/${year}`[i];
      });
  }

  async findByYear(
    month: number[],
    days: number[],
    year: number
  ): Promise<Task[]> {
    return this.tasks;
  }

  async findByStatus(condition: boolean): Promise<Task[]> {
    return this.tasks;
  }

  async findByOverdue(condition: boolean): Promise<Task[]> {
    return this.tasks;
  }

  async findeById(taskId?: string): Promise<Task> {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }
}
