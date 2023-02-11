import { Trash } from "../../entities/Trash";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";

export class AllTrashs {
    
  static async execute(): Promise<Trash[]> {
    const prismaTrashRepository = new PrismaTrashRepository();
    return await prismaTrashRepository.findAllTrash();
  }
}
