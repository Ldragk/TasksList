import { Task } from "@src/entities/task";
import { LimitDate } from "@src/entities/task-entities/limitDate";
import { ManageRepository } from "@src/repositories/manage-repository";

interface EditTaskRequest {
  title: string;
  content: string;
  date: string;
  done?: boolean;
}

interface EditTaskResponse {
  task: Task;
}

export class FullUpdate {
  constructor(private manageRepository: ManageRepository) { }

  async execute(
    taskId: string,
    userId: string,
    body: EditTaskRequest
  ): Promise<EditTaskResponse> {
    const task: Task = await this.manageRepository.findById(taskId, userId);
    const { title, content, date, done } = body;    

    task.updated();
    const taskUpdated = new Task({
      title: title || task.title,
      content: content ?? task.content,
      date: new LimitDate(date) ?? task.date,
      done: done ?? task.done,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userId: task.userId,
    }, task.id);    

    await this.manageRepository.save(taskUpdated, userId);
    return { task: taskUpdated };
  }
}
