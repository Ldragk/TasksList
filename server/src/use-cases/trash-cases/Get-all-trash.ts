import { Trash } from "../../entities/Trash";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";

interface GetTrashResponse {
  trash: Trash[];
}

export class AllTrash {
  static async execute(): Promise<GetTrashResponse> {
    const prismaTrashRepository = new PrismaTrashRepository();
    return { trash: await prismaTrashRepository.findAllTrash() };
  }
}
