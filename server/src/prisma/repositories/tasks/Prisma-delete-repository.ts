import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { TaskBody } from "../../../http/dtos/create-task-body";
import { DeleteRepository } from "../../../repositories/Delete-repository";

const prisma = new PrismaClient();

export class PrismaDeleteRepository implements DeleteRepository {
  async delete(id: string): Promise<TaskBody> {
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
