import { PrismaClient } from "@prisma/client";
import { PrismaManageRepository } from "../../../prisma/repositories/tasks/Prisma-manage-repository";

const prisma = new PrismaClient();

export class TaskCondition {
  async changeCondition(id: string, req: boolean) {
    Number(req) === 1 ? true : false;
    const tasksUpdate = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        done: req,
      },
    });
    const prismaManageRepository = new PrismaManageRepository();

    return await prismaManageRepository.update(task);

  }
}
