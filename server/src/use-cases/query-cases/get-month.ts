import { Dates } from "@src/helpers/dates";
import { QueryRepository } from "@src/repositories/get-repository";
import { GetTasksResponse } from "./get-all";

interface GetTaskRequest {
  month: number;
  year: number;
}

export class QueryByMonth {
  constructor(private findRecipientRepository: QueryRepository) {}

  public async execute(date: GetTaskRequest): Promise<GetTasksResponse> {
    const days: number[] = new Dates().getDays;
    return {
      tasks: await this.findRecipientRepository.findByMonth(
        date.month,
        days,
        date.year
      ),
    };
  }
}
