import { prisma } from "@src/prisma/prisma-client";
import { DeleteRepository } from "@src/repositories/delete-repository";
import { PrismaManageRepository } from "./prisma-manage-repository";
import { authz } from "@src/util/authz";
import { Task } from "@prisma/client";

export class PrismaDeleteRepository implements DeleteRepository {
  async delete(userId: string, id: string): Promise<void> {
    const task = await new PrismaManageRepository().findById(id, userId);

    const deleteTask: Task = await prisma.task.delete({
      where: {
        id,
      },
    });

    authz(task, deleteTask)
  }

  async deleteAll(userId: string): Promise<void> {

    await prisma.task.deleteMany({
      where: {
        userId,
      },
    });

  }
}
