import { Task } from "../entities/Task";

export abstract class QueryRepository { 
  abstract findAllTasks(done: boolean): Promise<Task[]>;
  abstract findByFullDate(date: string): Promise<Task[]>;
  abstract findByMonth(month: number, days: number[], year: number): Promise<Task[]>;
  abstract findByYear(month: number[], days: number[], year: number): Promise<Task[]>;
  abstract findByStatus(condition: boolean): Promise<Task[]>;
  abstract findByOverdue(condition: boolean): Promise<Task[]>; 
}
