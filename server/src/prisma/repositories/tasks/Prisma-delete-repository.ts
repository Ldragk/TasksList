import { PrismaClient } from "@prisma/client";
import { DeleteRepository } from "../../../repositories/Delete-repository";

const prisma = new PrismaClient();

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
