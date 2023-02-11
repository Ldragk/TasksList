import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { TaskBody } from "../../../http/dtos/create-task-body";
import { DeleteRepository } from "../../../repositories/Delete-repository";

const prisma = new PrismaClient();

export class PrismaDeleteTrashRepository implements DeleteRepository {
  async delete(id: string): Promise<TaskBody> {
    return await prisma.deletedTask.delete({
      where: {
        id: id,
      },
    });
  }
  async deleteAll(): Promise<Prisma.BatchPayload> {
    return await prisma.deletedTask.deleteMany();
  }
}
