import { Task } from "../entities/Task";
import { TaskBody } from "../http/dtos/create-task-body";

export abstract class ManageRepository {
  abstract create(task: Task): Promise<TaskBody>;
  abstract update(task: Task): Promise<TaskBody>;
  abstract delete(task: Task): Promise<void>;
}
