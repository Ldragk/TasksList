import { prisma } from "@src/prisma/prisma-client";
import { DeleteRepository } from "@src/repositories/delete-repository";
import { PrismaManageRepository } from "./prisma-manage-repository";

export class PrismaDeleteRepository implements DeleteRepository {
  async delete(userId: string, id: string): Promise<void> {
    const task = await new PrismaManageRepository().findeById(id, userId);

    if (task) {
      await prisma.task.delete({
        where: {
          id,
        },
      });
    } else {
      throw new Error("Access denied");
    }
  }

  async deleteAll(userId: string): Promise<void> {

    await prisma.task.deleteMany({
      where: {
        userId,
      },
    });

  }
}
