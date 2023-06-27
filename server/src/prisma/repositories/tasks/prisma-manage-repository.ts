import { Task } from "@src/entities/task";
import { PrismaTaskMapper } from "./prisma-task-mapper";
import { ManageRepository } from "@src/repositories/manage-repository";
import { prisma } from "@src/prisma/prisma-client";

export class PrismaManageRepository implements ManageRepository {
  async create(task: Task): Promise<void> {
    const newTask = PrismaTaskMapper.toPrisma(task);

    await prisma.$transaction([
      prisma.task.create({
        data: newTask,
      })
    ])
  }

  async saveCondition(task: Task, userId: string): Promise<void> {
    const taskConditionUpdate = PrismaTaskMapper.toPrisma(task);

    if (task.userId === userId) {
      await prisma.task.update({
        where: {
          id: taskConditionUpdate.id,
        },
        data: {
          done: taskConditionUpdate.done,
        },
      });
    } else {
      throw new Error("Access denied");
    }
  }

  async save(task: Task, userId: string): Promise<void> {
    const taskUpdate = PrismaTaskMapper.toPrisma(task);

    if (task.userId === userId) {
      await prisma.task.update({
        where: {
          id: taskUpdate.id,
        },
        data: {
          title: taskUpdate.title,
          content: taskUpdate.content,
          date: taskUpdate.date,
          done: taskUpdate.done,
        },
      });
    } else {
      throw new Error("Access denied");
    }
  }

  async findById(taskId: string, userId: string): Promise<Task> {

    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });

    if (task.userId === userId) {
      return PrismaTaskMapper.toDomain(task);
    } else {
      throw new Error("Access denied");
    }
  }
}
