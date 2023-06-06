import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { Task } from "@src/entities/task";
import { QueryRepository } from "@src/repositories/get-repository";
import { prisma } from "@src/prisma/prisma-client";

export class PrismaTaskQueryRepository implements QueryRepository {
  async findAllTasks(): Promise<Task[]> {
    const task = prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await task).map(PrismaTaskMapper.toDomain);
  }

  async findByFullDate(date: string): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        date: date,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByMonth(
    month: number,
    year: number
  ): Promise<Task[]> {
    const tasks = [];
    const task = await prisma.task.findMany({
      where: {
        date: {
          startsWith: `${month}/`,
          endsWith: `/${year}`
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    tasks.push(...task);
    return tasks.map(PrismaTaskMapper.toDomain);
  }

  async findByYear(
    year: number
  ): Promise<Task[]> {
    const tasks = [];

    const task = await prisma.task.findMany({
      where: {
        date: {
          contains: `/${year}`,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    tasks.push(...task);

    return tasks.map(PrismaTaskMapper.toDomain);
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
