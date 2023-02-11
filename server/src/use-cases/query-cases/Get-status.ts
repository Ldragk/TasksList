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

  constructor(conditionParameter: ParameterType) {
    this.conditionParameter = conditionParameter;
  }

  public doneOrNot = async (): Promise<object | Task> => {
    const prismaTaskRecipientRepository = new PrismaTaskQueryRepository();
    const condition = this.conditionParameter === 1 ? true : false;

    return !!(await prismaTaskRecipientRepository.findByStatus(condition))
      ? { message: "No tasks found" }
      : await prismaTaskRecipientRepository.findByStatus(condition);
  };
}
