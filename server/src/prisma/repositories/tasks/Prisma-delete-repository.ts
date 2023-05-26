import { prisma } from "@src/prisma-client";
import { DeleteRepository } from "@src/repositories/delete-repository";


export class PrismaDeleteRepository implements DeleteRepository {
  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
  async deleteAll(): Promise<void> {
    await prisma.task.deleteMany();
  }
}
