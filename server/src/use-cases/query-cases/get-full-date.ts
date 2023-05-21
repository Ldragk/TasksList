import { QueryRepository } from "../../repositories/get-repository";
import { GetTasksResponse } from "./get-all";

interface GetTaskRequest {
  date: string;
}

export class QueryByFullDate {

  constructor(private findRecipientRepository: QueryRepository) {
    
  }

  async execute(getDate: GetTaskRequest): Promise<GetTasksResponse> {
    
    const { date } = getDate;
    return {
      tasks: await this.findRecipientRepository.findByFullDate(date),
    };
  }
}
