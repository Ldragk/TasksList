import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { GetTasksResponse } from "./Get-all";

type ParameterType = number;

export interface IPromiseType {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}
[];

export class TasksCondition {
  public conditionParameter!: ParameterType;
  static conditionParameter: number;

  constructor() {}

  public static async execute(
    conditionParameter: ParameterType
  ): Promise<GetTasksResponse> {
    this.conditionParameter = conditionParameter;
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();
    const condition = this.conditionParameter === 1 ? true : false;

    return {
      tasks: await prismaTaskRecipientRepository.findByStatus(condition),
    };
  }
}
