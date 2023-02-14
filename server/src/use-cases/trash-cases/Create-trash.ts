import { Task } from "../../entities/Task";
import { Trash } from "../../entities/Trash";
import { TrashBody } from "../../http/dtos/create-trash-body";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";

export class CreateTrash {
  static async execute(taskId: string): Promise<TrashBody> {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    const prismaTrashRepository = new PrismaTrashRepository();

    const task: Task = await prismaQueryRepository.findeById(taskId);
    const taskBody: Trash = new Trash(
      {
        title: String(task.title),
        description: String(task.description),
        limitDay: Number(task.limitDay),
        limitMonth: Number(task.limitMonth),
        limitYear: Number(task.limitYear),
        done: task.done,
        createdAt: task.createdAt,
      },
      task.id
    );
    return await prismaTrashRepository.create(taskBody);
  }
}
