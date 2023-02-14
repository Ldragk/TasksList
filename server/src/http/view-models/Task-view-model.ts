import { Task } from "../../entities/Task";

export class TaskViewModel {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title.value,
      description: task.description.value,
      limitDay: task.limitDay.value,
      limitMonth: task.limitMonth.value,
      limitYear: task.limitYear.value,
      date: task.date,
      done: task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,      
    };
  }
}
