import { Dates } from "../../helpers/Dates";
import { QueryRepository } from "../../repositories/Query-repository";
import { GetTasksResponse } from "./Get-all";

interface IDateType {
  year: number;
}

export class QueryByYear {
  constructor(private findRecipientRepository: QueryRepository) {}

  public async execute(date: IDateType): Promise<GetTasksResponse> {
    const months: number[] = new Dates().getMonths;
    const days: number[] = new Dates().getDays;

    return {
      tasks: await this.findRecipientRepository.findByYear(
        months,
        days,
        date.year
      ),
    };
  }
}
