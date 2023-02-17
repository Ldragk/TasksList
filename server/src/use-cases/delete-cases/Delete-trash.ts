import { PrismaDeleteTrashRepository } from "../../prisma/repositories/trash/Prisma-delete-trash-repository";

interface DeleteTrashResponse {
  deleteTrash: void;
}

export class DeleteTrash {
  static async execute(id: string): Promise<DeleteTrashResponse> {
    const prismaDeleteRepository = new PrismaDeleteTrashRepository();

    return { deleteTrash: await prismaDeleteRepository.delete(id) };
  }
}
