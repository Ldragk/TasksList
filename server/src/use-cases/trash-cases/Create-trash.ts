import { TrashBody } from "../../http/dtos/create-trash-body";
import { PrismaTrashRepository } from "../../prisma/repositories/tasks/Prisma-trash-repository";

export class CreateTrash {
  static async execute(id: string): Promise<TrashBody | object> {
    const prismaTrashRepository = new PrismaTrashRepository();

    if (!!id) {
      return { message: "Task not found" };
    }
    return await prismaTrashRepository.trashRepository(id);
  }
}
