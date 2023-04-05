import { Task } from "../../entities/Task";
import { QueryRepository } from "../../repositories/Query-repository";

export interface GetTasksResponse {
  tasks: Task[];
}

export class QueryAllTasks {
  constructor(private findRecipientRepository: QueryRepository) {}

  public async execute(): Promise<GetTasksResponse> {
    return { tasks: await this.findRecipientRepository.findAllTasks() };
  }
}
