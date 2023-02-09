import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { PrismaClient } from "@prisma/client";
import { Task } from "../../../entities/Task";
import { QueryRepository } from "../../../repositories/Query-repository";

const prisma = new PrismaClient();

export class PrismaTaskQueryRepository implements QueryRepository {
  constructor() {}

  async findAllTasks(): Promise<Task[]> {
    const task = prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await task).map(PrismaTaskMapper.toDomain);
  }

  async findByFullDate(
    day: number,
    month: number,
    year: number
  ): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        limitDay: day,
        limitMonth: month,
        limitYear: year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByMonth(month: number, year: number): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        limitMonth: month,
        limitYear: year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByYear(year: number): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        limitYear: year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByStatus(condition: boolean): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        done: condition,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByOverdue(condition: boolean): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        done: condition,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }
}
