import { Task } from "../../entities/Task";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

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
  ): Promise<Task[]> {
    this.conditionParameter = conditionParameter;
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();
    const condition = this.conditionParameter === 1 ? true : false;

    return await prismaTaskRecipientRepository.findByStatus(condition);
  }
}
