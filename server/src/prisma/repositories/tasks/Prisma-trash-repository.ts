import { PrismaClient } from "@prisma/client";
import { Trash } from "../../../entities/Trash";
import { TaskBody } from "../../../http/dtos/create-task-body";
import { TrashBody } from "../../../http/dtos/create-trash-body";

const prisma = new PrismaClient();

export class PrismaTrashRepository {
  async trashRepository(id: string): Promise<TrashBody> {
    const idTaskDeleted = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    const saveDeletedTasks: TrashBody = await prisma.deletedTask.create({
      data: {
        id: String(idTaskDeleted?.id),
        title: String(idTaskDeleted?.title),
        description: String(idTaskDeleted?.description),
        limitDay: Number(idTaskDeleted?.limitDay),
        limitMonth: Number(String(idTaskDeleted?.limitMonth)),
        limitYear: Number(String(idTaskDeleted?.limitYear)),
        done: Boolean(idTaskDeleted?.done),
        date: String(idTaskDeleted?.date),
        createdAt: String(idTaskDeleted?.createdAt),
        deletedAt: new Date(),
      },
    });
    return saveDeletedTasks;
  }
}
