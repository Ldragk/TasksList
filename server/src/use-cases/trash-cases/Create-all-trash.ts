import { Trash } from "../../entities/Trash";
import { PrismaTrashRepository } from "../../prisma/repositories/trash/Prisma-trash-repository";
import { QueryAllTasks } from "../query-cases/Get-all";
import { CreateTrashResponse } from "./Create-trash";

export class CreateAllTrash {
  static async execute(): Promise<CreateTrashResponse> {
    const prismaTrashRepository = new PrismaTrashRepository();

    const { tasks } = Object(await QueryAllTasks.execute());

    return tasks.map(async (task: Trash) => {
      const { id, title, content, date, done, createdAt } = task;
      const trashBody = new Trash(
        {
          title: title,
          content: String(content),
          date: String(date),
          done: done,
          createdAt: createdAt,
        },
        String(id)
      );    

      return { createTrash: await prismaTrashRepository.create(trashBody) };
    });
  }
}
