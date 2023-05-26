import { Task } from "@src/entities/task";
import { QueryRepository } from "../get-repository";
import { InMemoryManageRepository } from "./in-memory-manage-repository";

export class InMemoryQueryRepository
  extends InMemoryManageRepository
  implements QueryRepository
{
  async findAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async findByFullDate(date: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.date.value === date);
  }

  async findByMonth(
    month: number,
    days: number[],
    year: number
  ): Promise<Task[]> {
    const tasksMonth: Task[] = [];
    for (const d of days) {
      this.tasks.map((task) => {
        if (task.date.value === `${month}/${d}/${year}`) {
          return tasksMonth.push(task);
        }
      });
    }
    return tasksMonth;

    /*
    Com a forma abaixo, não consigo retornar o resultado, assim so funcionaria com "Promise<any>",
    não sendo o ideal, pois o retorno deveria ser "Promise<Task[]>", como está declarado na classe abstrata.
    for (let i = 0; i < days.length; i++)
      return this.tasks.filter((task) => {
        return task.date.value[i] === `${month}/${days[i]}/${year}`[i];
      }); 
   */
  }

  async findByYear(
    month: number[],
    days: number[],
    year: number
  ): Promise<Task[]> {
    const tasksYear: Task[] = [];

    for (const d of days) {
      for (const m of month) {
        this.tasks.map((task) => {
          if (task.date.value === `${m}/${d}/${year}`) {
            return tasksYear.push(task);
          }
        });
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
