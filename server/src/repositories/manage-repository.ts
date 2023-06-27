import { Task } from '../entities/task';

export abstract class ManageRepository {
  abstract create(task: Task): Promise<void>;
  abstract saveCondition(taskId: Task, userId: string): Promise<void>;
  abstract save(task: Task, userId: string): Promise<void>;
  abstract findById(taskId: string, userId: string): Promise<Task>;
}
