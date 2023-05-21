import { Task } from "../../../entities/task";
import { PrismaTaskMapper } from "./Prisma-task-mapper";
import { ManageRepository } from "../../../repositories/manage-repository";
import { PrismaService } from "../../prisma.service";


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
    await prismaService.task.update({
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
    await prismaService.task.update({
      where: {
        id: taskUpdate.id,
      },
      data: taskUpdate,
    });
  }

  async findeById(taskId?: string): Promise<Task> {
    const task = await prismaService.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });

    return PrismaTaskMapper.toDomain(task);
  }
}
