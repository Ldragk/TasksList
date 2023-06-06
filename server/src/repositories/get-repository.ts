import { Task } from '../entities/task';

export abstract class QueryRepository {
  abstract findAllTasks(): Promise<Task[]>;
  abstract findByFullDate(date: string): Promise<Task[]>;
  abstract findByMonth(month: number, year: number): Promise<Task[]>;
  abstract findByYear(year: number): Promise<Task[]>;
  abstract findByStatus(condition: boolean): Promise<Task[]>;
  abstract findByOverdue(condition: boolean): Promise<Task[]>;
}
