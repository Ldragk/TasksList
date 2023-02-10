import { Task } from "../../../entities/Task";
import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { PrismaClient } from "@prisma/client";
import { ManageRepository } from "../../../repositories/Manage-repository";
import { TaskBody } from "../../../http/dtos/create-task-body";

const prisma = new PrismaClient();

export class PrismaManageRepository implements ManageRepository {
  
  async update(task: Task): Promise<TaskBody> {
    const updateTask = PrismaTaskMapper.toPrisma(task);
    return await prisma.task.update({
      where: {
        id: updateTask.id,
      },
      data: {
        done: updateTask.done,
      },
    });
  }
  delete(task: Task): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(task: Task): Promise<TaskBody> {
    const newTask = PrismaTaskMapper.toPrisma(task);
    return await prisma.task.create({
      data: newTask,
    });
  }
}
