import { Task } from "@src/entities/task";
import { ManageRepository } from "@src/repositories/manage-repository";

interface EditTaskResponse {
  task: Task;
}

export class TaskStatus {
  constructor(private manageRepository: ManageRepository) { }

  async execute(taskId: string, userId: string): Promise<EditTaskResponse> {
    const task = await this.manageRepository.findById(taskId, userId);

    task.done === false ? (task.done = true) : (task.done = false);
    task.updated();

    await this.manageRepository.saveCondition(task, userId);
    return { task: task };
  }
}
