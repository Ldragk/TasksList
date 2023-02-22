import { Task } from "../../entities/Task";
import { Trash } from "../../entities/Trash";
import { PrismaTaskQueryRepository } from "../../prisma/repositories/tasks/Prisma-query-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";

export interface CreateTrashResponse {
  deleteTrash?: void;
  createTrash: Trash;
}

export class CreateTrash {
  static async execute(taskId: string): Promise<CreateTrashResponse> {
    const prismaQueryRepository = new PrismaTaskQueryRepository();
    const prismaTrashRepository = new PrismaTrashRepository();

    const task: Task = await prismaQueryRepository.findeById(taskId);

    const {
      id,
      title,
      content,
      date,
      done,
      createdAt,
    } = task;

    const trash: Trash = new Trash(
      {
        title: String(title),
        content: String(content),
        date: String(date),
        done: done,
        createdAt: createdAt,
      },
      id
    );
    await prismaTrashRepository.create(trash);

    return { createTrash: trash };
  }
}
