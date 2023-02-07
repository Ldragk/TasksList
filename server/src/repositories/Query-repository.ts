import { Task } from "../entities/Task";

export abstract class QueryRepository { 
  abstract findAllTasks(done: boolean): Promise<Task[]>;
  abstract findByFullDate(day: number, month: number, year: number): Promise<Task[]>;
  abstract findByMonth(month: number, year: number): Promise<Task[]>;
  abstract findByYear(year: number): Promise<Task[]>;
  abstract findByStatus(condition: boolean): Promise<Task[]>;
  abstract findByOverdue(condition: boolean): Promise<Task[]>;
}
