import { Task } from "../entities/Task";

export abstract class ManageRepository {
  abstract create(task: Task): Promise<void>;
  abstract update(task: Task): Promise<void>;
  abstract delete(task: Task): Promise<void>;
}
