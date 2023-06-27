import { Task } from "@src/entities/task";

export class TaskViewModel {
  static toHTTP(task: Task) {
    const{ id, title, content, date, done, createdAt, updatedAt, userId } = task;
    return {
      id,
      title,
      content,
      date,
      done,
      createdAt,
      updatedAt,
      userId
    };
  }
}
