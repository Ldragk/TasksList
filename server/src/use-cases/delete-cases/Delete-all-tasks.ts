import { Prisma } from "@prisma/client";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";

export class DeleteAllTasks {
  static async execute(): Promise<Prisma.BatchPayload> {
    const prismaDeleteRepository = new PrismaDeleteRepository();

    return await prismaDeleteRepository.deleteAll();
  }
}
