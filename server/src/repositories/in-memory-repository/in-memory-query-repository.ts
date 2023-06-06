import { Task } from "@src/entities/task";
import { QueryRepository } from "../get-repository";
import { InMemoryManageRepository } from "./in-memory-manage-repository";

export class InMemoryQueryRepository
  extends InMemoryManageRepository
  implements QueryRepository {
  async findAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async findByFullDate(date: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.date.value === date);
  }

  async findByMonth(month: number, year: number): Promise<Task[]> {
    const tasksMonth: Task[] = [];
    this.tasks.forEach((task: Task) => {
      if (task.date.value.includes(`${month}/`) && task.date.value.includes(`/${year}`)) {
        tasksMonth.push(task);
      }
    });

    return tasksMonth;
  }

  async findByYear(year: number): Promise<Task[]> {
    const tasksYear: Task[] = [];

    this.tasks.forEach((task: Task) => {
      if (task.date.value.includes(`/${year}`)) {
        tasksYear.push(task);
      }
    });

    return tasksYear;
  }

  async findByStatus(condition: boolean): Promise<Task[]> {
    return this.tasks.filter((task) => task.done === condition);
  }

  async findByOverdue(condition: boolean): Promise<Task[]> {
    return this.tasks.filter((task) => task.done === condition);
  }
}
