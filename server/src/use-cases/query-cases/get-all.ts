import { Task } from "../../entities/task";
import { QueryRepository } from "../../repositories/get-repository";

export interface GetTasksResponse {
  tasks: Task[];
}

export class QueryAllTasks {
  constructor(private findRecipientRepository: QueryRepository) {}

  public async execute(): Promise<GetTasksResponse> {
    return { tasks: await this.findRecipientRepository.findAllTasks() };
  }
}
