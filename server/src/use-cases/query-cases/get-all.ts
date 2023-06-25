import { Task } from "@src/entities/task";
import { QueryRepository } from "@src/repositories/get-repository";

export interface GetTasksResponse {
  tasks: Task[];
}

export class QueryAllTasks {
  constructor(private findRecipientRepository: QueryRepository) {}

  public async execute(userId: string): Promise<GetTasksResponse> {
    return { tasks: await this.findRecipientRepository.findAllTasks(userId) };
  }
}
