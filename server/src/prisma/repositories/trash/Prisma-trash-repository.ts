import { PrismaClient } from "@prisma/client";
import { Trash } from "../../../entities/Trash";
import { TrashBody } from "../../../http/dtos/create-trash-body";
import { TrashRepository } from "../../../repositories/Trash-repository";
import { PrismaTrashMapper } from "./Prisma-trash-mapper";

const prisma = new PrismaClient();

export class PrismaTrashRepository implements TrashRepository {
  async create(task: Trash): Promise<TrashBody> {
    const trashTask = PrismaTrashMapper.toPrisma(task);

    const saveDeletedTasks: TrashBody = await prisma.deletedTask.create({
      data: {
        ...trashTask,
        deletedAt: new Date(),
      },
    });

    return saveDeletedTasks;
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
