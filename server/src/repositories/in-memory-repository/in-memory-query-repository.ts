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

  async findByMonth(month: number, days: number[], year: number): Promise<Task[]> {
    const tasksMonth: Task[] = [];
    for (const d of days) {
      this.tasks.forEach((task: Task) => {
        if (task.date.value === `${month}/${d}/${year}`) {
          tasksMonth.push(task);
        }
      });
    }
    return tasksMonth;
  }

  async findByYear(month: number[], days: number[], year: number): Promise<Task[]> {
    const tasksYear: Task[] = [];

    for (const task of this.tasks) {
      const [taskMonth, taskDay, taskYear] = task.date.value.split('/');
      const taskMonthNumber = parseInt(taskMonth, 10);
      const taskDayNumber = parseInt(taskDay, 10);
      const taskYearNumber = parseInt(taskYear, 10);

      if (month.includes(taskMonthNumber)
        && days.includes(taskDayNumber)
        && taskYearNumber === year) {
        tasksYear.push(task);
      }
    }
    return tasksYear;
  }

  async findByStatus(condition: boolean): Promise<Task[]> {
    return this.tasks.filter((task) => task.done === condition);
  }

  async findByOverdue(condition: boolean): Promise<Task[]> {
    return this.tasks.filter((task) => task.done === condition);
  }
}
