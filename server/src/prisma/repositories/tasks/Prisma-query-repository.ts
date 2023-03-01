import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { Task } from "../../../entities/Task";
import { QueryRepository } from "../../../repositories/Query-repository";
import { PrismaService } from "../../prisma.service";

const prismaService = new PrismaService();

export class PrismaTaskQueryRepository implements QueryRepository {
  async findAllTasks(): Promise<Task[]> {
    const task = prismaService.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await task).map(PrismaTaskMapper.toDomain);
  }

  async findByFullDate(date: string): Promise<Task[]> {
    const task = await prismaService.task.findMany({
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
    let task: any;
    for (let i = 0; i < days.length; i++) {
      task = await prismaService.task.findMany({
        where: {
          date: `${month}/${days[i]}/${year}`[i],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByYear(
    month: number[],
    days: number[],
    year: number
  ): Promise<Task[]> {
    let task: any;
    for (let i = 0; i < days.length; i++) {
      task = await prismaService.task.findMany({
        where: {
          date: `${month[i]}/${days[i]}/${year}`[i],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return task.map(PrismaTaskMapper.toDomain);
  }

  async findByStatus(condition: boolean): Promise<Task[]> {
    const task = await prismaService.task.findMany({
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
    const task = await prismaService.task.findMany({
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
