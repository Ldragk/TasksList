import { prisma } from "@src/prisma/prisma-client";
import { DeleteRepository } from "@src/repositories/delete-repository";

export class PrismaDeleteTrashRepository implements DeleteRepository {
  async delete(id: string): Promise<void> {
    await prisma.deletedTask.delete({
      where: {
        id: id,
      },
    });
  }
  async deleteAll(): Promise<void> {
    await prisma.deletedTask.deleteMany();
  }
}
