import { Task } from '../entities/task';

export abstract class QueryRepository {
  abstract findAllTasks(userId: string): Promise<Task[]>;
  abstract findByFullDate(userId: string, date: string): Promise<Task[]>;
  abstract findByMonth(userId: string, month: number, year: number): Promise<Task[]>;
  abstract findByYear(userId: string, year: number): Promise<Task[]>;
  abstract findByStatus(userId: string, condition: boolean): Promise<Task[]>;
  abstract findByOverdue(userId: string, condition: boolean): Promise<Task[]>;
}
