import { Task } from "../../../entities/Task";
import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { PrismaClient } from "@prisma/client";
import { ManageRepository } from "../../../repositories/Manage-repository";
import { PrismaService } from "../../prisma.service";

const prisma = new PrismaClient();

const prismaService = new PrismaService();

export class PrismaManageRepository implements ManageRepository {
  async create(task: Task): Promise<void> {
    const newTask = PrismaTaskMapper.toPrisma(task);
    await prismaService.task.create({
      data: newTask,
    });
  }

  async saveCondition(task: Task): Promise<void> {
    const taskConditionUpdate = PrismaTaskMapper.toPrisma(task);
    await prisma.task.update({
      where: {
        id: taskConditionUpdate.id,
      },
      data: {
        done: taskConditionUpdate.done,
      },
    });
  }

  async save(task: Task): Promise<void> {
    const taskUpdate = PrismaTaskMapper.toPrisma(task);
    await prisma.task.update({
      where: {
        id: taskUpdate.id,
      },
      data: taskUpdate,
    });
  }

  async findeById(taskId?: string): Promise<Task> {
    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });

    return PrismaTaskMapper.toDomain(task);
  }
}
