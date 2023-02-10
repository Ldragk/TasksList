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

  constructor(conditionParameter: ParameterType) {
    this.conditionParameter = conditionParameter;
  }

  public doneOrNot = async (): Promise<object | IPromiseType> => {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();
    const condition = this.conditionParameter === 1 ? true : false;

    return (await prismaTaskRecipientRepository.findByStatus(condition))
      .length === 0
      ? { message: "No tasks found" }
      : await prismaTaskRecipientRepository.findByStatus(condition);
  };
}
