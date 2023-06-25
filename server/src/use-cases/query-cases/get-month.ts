import { QueryRepository } from "@src/repositories/get-repository";
import { GetTasksResponse } from "./get-all";

interface GetTaskRequest {
  month: number;
  year: number;
}

export class QueryByMonth {
  constructor(private findRecipientRepository: QueryRepository) { }

  public async execute(userId: string, date: GetTaskRequest): Promise<GetTasksResponse> {
    return {
      tasks: await this.findRecipientRepository.findByMonth(
        userId,
        date.month,
        date.year
      ),
    };
  }
}
