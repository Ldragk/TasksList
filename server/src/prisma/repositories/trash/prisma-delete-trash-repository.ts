import { prisma } from "@src/prisma/prisma-client";
import { DeleteRepository } from "@src/repositories/delete-repository";

export class PrismaDeleteTrashRepository implements DeleteRepository {
  async delete(userId: string, id: string): Promise<void> {
    const trash = await prisma.deletedTask.findFirst({
      where: {
        userId,
      },
    });

    if (trash) {
      await prisma.deletedTask.delete({
        where: {
          id,
        },
      });
    }
  }

  async deleteAll(userId: string): Promise<void> {
    await prisma.deletedTask.deleteMany({
      where: {
        userId,
      },
    });
  }
}
