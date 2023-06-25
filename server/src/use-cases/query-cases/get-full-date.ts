import { QueryRepository } from "@src/repositories/get-repository";
import { GetTasksResponse } from "./get-all";

interface GetTaskRequest {
  date: string;
}

export class QueryByFullDate {

  constructor(private findRecipientRepository: QueryRepository) {

  }

  async execute(userId: string, getDate: GetTaskRequest): Promise<GetTasksResponse> {

    const { date } = getDate;
    return {
      tasks: await this.findRecipientRepository.findByFullDate(userId, date),
    };
  }
}
