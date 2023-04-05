import { Trash } from "../../../entities/Trash";
import { TrashRepository } from "../../../repositories/Trash-repository";
import { PrismaService } from "../../prisma.service";
import { PrismaTrashMapper } from "./Prisma-trash-mapper";

const prismaService = new PrismaService();

export class PrismaTrashRepository implements TrashRepository {
  async create(task: Trash): Promise<void> {
    const trashTask = PrismaTrashMapper.toPrisma(task);

    await prismaService.deletedTask.create({
      data: {
        ...trashTask,
        deletedAt: new Date(),
      },
    });
  }

  async findAllTrash(): Promise<Trash[]> {
    const allTrash = prismaService.deletedTask.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await allTrash).map(PrismaTrashMapper.toDomain);
  }
}
