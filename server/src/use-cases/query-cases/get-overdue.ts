import { QueryRepository } from "@src/repositories/get-repository";
import { GetTasksResponse } from "./get-all";
import { Task } from "@src/entities/task";

export class OverdueTasks {
  constructor(private findRecipientRepository: QueryRepository) { }

  async execute(userId: string): Promise<GetTasksResponse> {
    const overdueTasks = (
      await this.findRecipientRepository.findByOverdue(userId, false)
    ).filter((task: Task) => new Date(task.date.value) < new Date(Date.now()));

    return { tasks: overdueTasks };
  }
}
