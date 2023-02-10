import { Task } from "../entities/Task";
import { TaskBody } from "../http/dtos/create-task-body";

export abstract class ManageRepository {
  abstract create(task: Task): Promise<TaskBody>;
  abstract saveCondition(task: Task): Promise<TaskBody>;
  abstract save(task: Task): Promise<TaskBody>;
}
