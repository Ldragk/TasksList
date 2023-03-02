import { QueryRepository } from "../../repositories/Query-repository";
import { GetTasksResponse } from "./Get-all";

export class OverdueTasks {
  constructor(private findRecipientRepository: QueryRepository) {}

  async execute(): Promise<GetTasksResponse> {
    const overdueTasks = (
      await this.findRecipientRepository.findByOverdue(false)
    ).filter((task: any) => new Date(task.date.value) < new Date(Date.now()));

    return { tasks: overdueTasks };
  }
}
