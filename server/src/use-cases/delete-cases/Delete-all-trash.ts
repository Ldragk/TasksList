import { Prisma } from "@prisma/client";
import { PrismaDeleteTrashRepository } from "../../prisma/repositories/tasks/Prisma-delete-trash-repository";

export class DeleteAllTrash {
  static async execute(): Promise<Prisma.BatchPayload | object> {
    const prismaDeleteRepository = new PrismaDeleteTrashRepository();

    if (!!(await prismaDeleteRepository.deleteAll())) {
      return { message: "Tasks not found" };
    }
    return await prismaDeleteRepository.deleteAll();
  }
}
