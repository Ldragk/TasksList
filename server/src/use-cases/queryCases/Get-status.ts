import { PrismaTaskRepository } from "../../prisma/repositories/tasks/Prisma-task-repository";

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
  public conditionParameter!: number;

  constructor(conditionParameter: ParameterType) {
    this.conditionParameter = conditionParameter;
  }

  public doneOrNot = async (): Promise<object | IPromiseType> => {
    const prismaTaskRepository = new PrismaTaskRepository();
    const condition = this.conditionParameter === 1 ? true : false;

    return await prismaTaskRepository.findByStatus(condition);
  };
}
