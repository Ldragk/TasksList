import { Task } from "../../entities/Task";
import { Trash } from "../../entities/Trash";
import { TrashBody } from "../../http/dtos/create-trash-body";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { QueryAllTasks } from "../query-cases/Get-all";

export class CreateAllTrash {
  static async execute(): Promise<TrashBody> {
    const prismaTrashRepository = new PrismaTrashRepository();

    const allTasks: Task[] = await QueryAllTasks.execute();
    const tasks = Object(allTasks);

    return tasks.map((task: Trash) => {
      const trashBody: Trash = new Trash(
        {
          title: task.title,
          description: task.description,
          limitDay: task.limitDay,
          limitMonth: task.limitMonth,
          limitYear: task.limitYear,
          done: task.done,
          createdAt: task.createdAt,
        },
        task.id
      );
      return prismaTrashRepository.create(trashBody);
    });
  }
}
