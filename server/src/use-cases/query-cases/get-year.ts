import { QueryRepository } from "@src/repositories/get-repository";
import { GetTasksResponse } from "./get-all";

interface IDateType {
  year: number;
}

export class QueryByYear {
  constructor(private findRecipientRepository: QueryRepository) { }

  public async execute(userId: string, date: IDateType): Promise<GetTasksResponse> {
    return {
      tasks: await this.findRecipientRepository.findByYear(userId, date.year)
    };
  }
}
