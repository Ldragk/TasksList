import { Task } from "@src/entities/task";
import { PrismaTaskMapper } from "./prisma-task-mapper";
import { ManageRepository } from "@src/repositories/manage-repository";
import { prisma } from "@src/prisma/prisma-client";
import { authz } from "@src/util/authz";

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
    const isTaskOwnedByUser = task.userId === userId
    const updateTask = await prisma.task.update({
      where: {
        id: taskConditionUpdate.id,
      },
      data: {
        done: taskConditionUpdate.done,
      },
    });
    authz(isTaskOwnedByUser, updateTask)
  }

  async save(task: Task, userId: string): Promise<void> {
    const taskUpdate = PrismaTaskMapper.toPrisma(task);
    const isTaskOwnedByUser = task.userId === userId
    const updateTask = await prisma.task.update({
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
    authz(isTaskOwnedByUser, updateTask)
  }

  async findById(taskId: string, userId: string): Promise<Task> {

    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });
    const isTaskOwnedByUser = task.userId === userId    

    if (isTaskOwnedByUser) {
      return PrismaTaskMapper.toDomain(task);
    } else {
      throw new Error("Access denied");
    }
  }
}
