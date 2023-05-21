import { Task } from "../../entities/task";
import { Content } from "../../entities/task-entities/content";
import { LimitDate } from "../../entities/task-entities/limitDate";
import { ManageRepository } from "../../repositories/manage-repository";

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
  constructor(private manageRepository: ManageRepository) {}

  async execute(
    taskId: string,
    body: EditTaskRequest
  ): Promise<EditTaskResponse> {
    const task: Task = await this.manageRepository.findeById(taskId);

    const { title, content, date, done } = body;

    task.title = title ?? task.title;
    task.content = new Content(content) ?? task.content;
    task.date = new LimitDate(date) ?? task.date;
    task.done = done ?? task.done;
    task.updated();

    await this.manageRepository.save(task);
    return { task: task };
  }
}
