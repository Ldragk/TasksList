import { Prisma, Task } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { DeleteRepository } from "../../../repositories/Delete-repository";

const prisma = new PrismaClient();

export class PrismaDeleteRepository implements DeleteRepository {
  async delete(id: string): Promise<Task> {
    return await prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
  async deleteAll(): Promise<Prisma.BatchPayload> {
    return await prisma.task.deleteMany();
  }
}
