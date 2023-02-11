import { Task } from "../../../entities/Task";
import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { PrismaClient } from "@prisma/client";
import { ManageRepository } from "../../../repositories/Manage-repository";
import { TaskBody } from "../../../http/dtos/create-task-body";

const prisma = new PrismaClient();

export class PrismaManageRepository implements ManageRepository {
  async create(task: Task): Promise<TaskBody> {
    const newTask = PrismaTaskMapper.toPrisma(task);
    return await prisma.task.create({
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
