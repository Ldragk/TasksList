import { Task } from "../../entities/Task";
import { Trash } from "../../entities/Trash";
import { PrismaManageRepository } from "../../prisma/repositories/tasks/Prisma-manage-repository";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";

export interface CreateTrashResponse {
  deleteTrash?: void;
  createTrash: Trash;
}

export class CreateTrash {
  constructor(private trashRepository: PrismaTrashRepository) {}

  async execute(taskId: string): Promise<CreateTrashResponse> {
    const prismaManageRepository = new PrismaManageRepository();

    const task: Task = await prismaManageRepository.findeById(taskId);

    const { id, title, content, date, done, createdAt } = task;

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
    await this.trashRepository.create(trash);

    return { createTrash: trash };
  }
}
