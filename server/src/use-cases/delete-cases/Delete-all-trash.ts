import { Prisma } from "@prisma/client";
import { PrismaDeleteTrashRepository } from "../../prisma/repositories/trash/Prisma-delete-trash-repository";

interface DeleteAllTrashResponse {
  deleteTrash: void;
}

export class DeleteAllTrash {
  static async execute(): Promise<DeleteAllTrashResponse> {
    const prismaDeleteRepository = new PrismaDeleteTrashRepository();

    return { deleteTrash: await prismaDeleteRepository.deleteAll() };
  }
}
