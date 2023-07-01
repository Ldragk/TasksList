import { Task } from "@src/entities/task";
import { QueryRepository } from "../get-repository";
import { InMemoryManageRepository } from "./in-memory-manage-repository";

export class InMemoryQueryRepository
  extends InMemoryManageRepository
  implements QueryRepository {
  async findAllTasks(userId: string): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => task.userId === userId);
    return tasks;
  }

  async findByFullDate(userId: string, date: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.date.value === date && task.userId === userId);
  }

  async findByMonth(userId: string, month: number, year: number): Promise<Task[]> {
    const tasksMonth: Task[] = [];
    this.tasks.forEach((task: Task) => {
      if (task.userId === userId) {
        if (task.date.value.includes(`${month}/`) && task.date.value.includes(`/${year}`)) {
          tasksMonth.push(task);
        }
      }
    });
    return tasksMonth;
  }

  async findByYear(userId: string, year: number): Promise<Task[]> {
    const tasksYear: Task[] = [];

    this.tasks.forEach((task: Task) => {
      if (task.userId === userId) {
        if (task.date.value.includes(`/${year}`)) {
          tasksYear.push(task);
        }
      }
    });
    return tasksYear;
  }

  async findByStatus(userId: string, condition: boolean): Promise<Task[]> {
    return this.tasks.filter((task) => task.done === condition && task.userId === userId);
  }

  async findByOverdue(userId: string, condition: boolean): Promise<Task[]> {
    return this.tasks.filter((task) => task.done === condition && task.userId === userId);
  }
}
