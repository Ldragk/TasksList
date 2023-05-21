import { QueryRepository } from "../../repositories/get-repository";
import { GetTasksResponse } from "./get-all";

export class OverdueTasks {
  constructor(private findRecipientRepository: QueryRepository) {}

  async execute(): Promise<GetTasksResponse> {
    const overdueTasks = (
      await this.findRecipientRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date.value) < new Date(Date.now()));

    return { tasks: overdueTasks };
  }
}
