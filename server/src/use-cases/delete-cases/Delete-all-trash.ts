import { Prisma } from "@prisma/client";
import { PrismaDeleteTrashRepository } from "../../prisma/repositories/tasks/Prisma-delete-trash-repository";

export class DeleteAllTrash {
  static async execute(): Promise<Prisma.BatchPayload> {
    const prismaDeleteRepository = new PrismaDeleteTrashRepository();

    return await prismaDeleteRepository.deleteAll();
  }
}
