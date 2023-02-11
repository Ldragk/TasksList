import { Prisma } from "@prisma/client";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";

export class DeleteAllTasks {
  static async execute(): Promise<Prisma.BatchPayload | object> {
    const prismaDeleteRepository = new PrismaDeleteRepository();

    if (!!(await prismaDeleteRepository.deleteAll())) {
      return { message: "Tasks not found" };
    }
    return await prismaDeleteRepository.deleteAll();
  }
}
