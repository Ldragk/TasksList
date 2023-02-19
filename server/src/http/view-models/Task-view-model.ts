import { Task } from "../../entities/Task";

export class TaskViewModel {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      content: task.content.value,
      limitDay: task.limitDay,
      limitMonth: task.limitMonth,
      limitYear: task.limitYear,     
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,      
    };
  }
}
