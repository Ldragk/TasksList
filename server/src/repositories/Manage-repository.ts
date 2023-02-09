import { Task } from "../entities/Task";
import { CreateTaskBody } from "../http/dtos/create-task-body";

export abstract class ManageRepository {
  abstract create(task: Task): Promise<CreateTaskBody>;
  abstract update(task: Task): Promise<void>;
  abstract delete(task: Task): Promise<void>;
}
