import { Trash } from "../../entities/Trash";
import { PrismaDeleteRepository } from "../../prisma/repositories/tasks/Prisma-delete-repository";

export interface DeletedTaskResponse {
  deleteTrash: void;
  createTrash?: Trash
}

export class DeleteTask {
  static async execute(id: string): Promise<DeletedTaskResponse> {
    const prismaDeleteRepository = new PrismaDeleteRepository();

    return { deleteTrash: await prismaDeleteRepository.delete(id) };
  }
}
