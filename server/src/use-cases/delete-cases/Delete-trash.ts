import { TaskBody } from "../../http/dtos/create-task-body";
import { PrismaDeleteTrashRepository } from "../../prisma/repositories/trash/Prisma-delete-trash-repository";

export class DeleteTrash {
  static async execute(id: string): Promise<TaskBody> {
    const prismaDeleteRepository = new PrismaDeleteTrashRepository();

    return await prismaDeleteRepository.delete(id);
  }
}
