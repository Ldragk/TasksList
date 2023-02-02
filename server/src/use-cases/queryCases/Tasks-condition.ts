import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ParameterType = number;

export interface IPromiseType {
  title: string;
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}[]

export class TasksCondition {
  public conditionParameter!: number;
  private condition!: boolean;
  private doneTasks!: object[];

  constructor(conditionParameter: ParameterType) {
    this.conditionParameter = conditionParameter;
  }

  public doneOrNot = async (): Promise<object | IPromiseType> => {
    this.condition = this.conditionParameter === 1 ? true : false;
    this.doneTasks = await prisma.tasks.findMany({
      select: {
        title: true,
        description: true,
        done: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        done: this.condition,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return this.doneTasks;
  };
}
