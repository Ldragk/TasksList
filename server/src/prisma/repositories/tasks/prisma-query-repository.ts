import { PrismaTaskMapper } from "./prisma-task-mapper";
import { Task } from "@src/entities/task";
import { QueryRepository } from "@src/repositories/get-repository";
import { prisma } from "@src/prisma/prisma-client";

export class PrismaTaskQueryRepository implements QueryRepository {
  async findAllTasks(userId: string): Promise<Task[]> {

    const task = prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await task).map(PrismaTaskMapper.toDomain);
  }

  async findByFullDate(userId: string, date: string): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
        date: date,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByMonth(
    userId: string,
    month: number,
    year: number
  ): Promise<Task[]> {
    const tasks = [];
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
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

  async findByYear(userId: string,
    year: number
  ): Promise<Task[]> {
    const tasks = [];

    const task = await prisma.task.findMany({
      where: {
        userId: userId,
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

  async findByStatus(userId: string, condition: boolean): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
        done: condition,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByOverdue(userId: string, condition: boolean): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        userId: userId,
        done: condition,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return task.map(PrismaTaskMapper.toDomain);
  }
}
