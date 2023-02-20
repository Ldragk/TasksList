import { Task } from "../../entities/Task";

export class TaskViewModel {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      content: task.content.value,
      date: task.date,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
