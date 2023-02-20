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
    days: number[],
    year: number
  ): Promise<Task[]> {
    const task = await prisma.task.findMany({
      where: {
        date: {
          contains: `${month}/${days.map((day) => day)}/${year}`,
        },
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
        date: {
          contains: `${year}`,
        },
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

  async findeById(taskId: string): Promise<Task> {
    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });

    return PrismaTaskMapper.toDomain(task);
  }
}
