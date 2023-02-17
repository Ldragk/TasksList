import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";
import { DeletedTaskResponse } from "./Delete-task";

export class DeleteAllTasks {
  static async execute(): Promise<DeletedTaskResponse> {
    const prismaDeleteRepository = new PrismaDeleteRepository();

    return { deleteTrash: await prismaDeleteRepository.deleteAll() };
  }
}
