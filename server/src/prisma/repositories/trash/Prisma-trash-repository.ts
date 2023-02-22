import { PrismaClient } from "@prisma/client";
import { Trash } from "../../../entities/Trash";
import { TrashRepository } from "../../../repositories/Trash-repository";
import { PrismaTrashMapper } from "./Prisma-trash-mapper";

const prisma = new PrismaClient();

export class PrismaTrashRepository implements TrashRepository {
  async create(task: Trash): Promise<void> {
    const trashTask = PrismaTrashMapper.toPrisma(task);

    await prisma.deletedTask.create({
      data: {
        ...trashTask,
        deletedAt: new Date(),
      },
    });
  }

  async findAllTrash(): Promise<Trash[]> {
    const allTrash = prisma.deletedTask.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return (await allTrash).map(PrismaTrashMapper.toDomain);
  }
}
