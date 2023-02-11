import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";

export class TaskCondition {
  static async execute(taskId: string) {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    const task = await prismaQueryRepository.findeById(taskId);
    task.done === false ? (task.done = true) : (task.done = false);
    task.updated();

    const prismaManageRepository = new PrismaManageRepository();
    return await prismaManageRepository.saveCondition(task);
  }
}
