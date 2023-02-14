import { Task } from "../../../entities/Task";
import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { PrismaClient } from "@prisma/client";
import { ManageRepository } from "../../../repositories/Manage-repository";
import { TaskBody } from "../../../http/dtos/create-task-body";
import { PrismaService } from "../../prisma.service";

const prisma = new PrismaClient();

const prismaService = new PrismaService();

export class PrismaManageRepository implements ManageRepository {
  async create(task: Task): Promise<void> {
    const newTask = PrismaTaskMapper.toPrisma(task);
    await prisma.task.create({
      data: newTask,
    });
  }
  async saveCondition(task: Task): Promise<TaskBody> {
    const taskConditionUpdate = PrismaTaskMapper.toPrisma(task);
    return await prisma.task.update({
      where: {
        id: taskConditionUpdate.id,
      },
      data: {
        done: taskConditionUpdate.done,
      },
    });
  }
  async save(task: Task): Promise<TaskBody> {
    const taskUpdate = PrismaTaskMapper.toPrisma(task);
    return await prisma.task.update({
      where: {
        id: taskUpdate.id,
      },
      data: taskUpdate,
    });
  }
}
